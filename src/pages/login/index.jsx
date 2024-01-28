import { Button, Input, Space } from "antd";
import Calendar from "../../assets/calendar.svg";
import "./login.css";
import { LockFilled, MailFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { loginOwner } from "../../hooks/loja/useLoja";
import { getUserLocalStorage, setUsetLocalStorage } from "../../utils/localStorageUtils";
import { useNavigate } from "react-router-dom";
const nameApp = import.meta.env.VITE_APP_NOME_LOJA;

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({ email: "", password: "" });
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async () => {
    setIsLoading(true);
    const login = {
      email: user.email.trim(),
      password: user.password.trim()
    }
    const loginResult = await loginOwner(login)
    setTimeout(() => {
      setIsLoading(false);
      const userApi = loginResult.lojaData
      console.log(userApi[0].is_adm);
      if(userApi[0].is_adm === true){
        const userLocalResult = setUsetLocalStorage(userApi)
        return navigate('/dashboard', {replace:true})
      }
    }, 1200);
  };
  const testelocal = () => {
    const dataLocal = getUserLocalStorage();
    console.log(dataLocal); // Verifique o que está sendo retornado
    const parsedData = JSON.parse(dataLocal);
    setData(parsedData);
    console.log("setando dentro do useState",data); // Verifique se o estado data está sendo atualizado
  };

  return (
    <div className="lContainer">
      <div className="formLogin">
        <form>
          <h1>Seja bem Vindo</h1>
          <Input
            placeholder="E-mail"
            className="inptForm"
            prefix={<MailFilled />}
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <Input.Password
            placeholder="Senha"
            className="inptForm"
            prefix={<LockFilled />}
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type="password"
          />
          <Button
            className="btnLogin"
            type="primary"
            loading={isLoading}
            onClick={handleLogin}

          >
            Entrar
          </Button>
          {/* <Button onClick={testelocal}>teste</Button> */}
          {/* <p> ok {data[0].name}</p> */}
        </form>
      </div>
      <div className="imgBg">
        <h1>{nameApp}</h1>
        <img src={Calendar} />
      </div>
    </div>
  );
}

export default Login;
