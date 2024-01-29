import { Button, Input, notification } from "antd";
import Calendar from "../../assets/calendar.svg";
import "./login.css";
import {
  LockFilled,
  MailFilled,
  RadiusUpleftOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { loginOwner } from "../../hooks/loja/useLoja";
import {
  getUserLocalStorage,
  setUsetLocalStorage,
} from "../../utils/localStorageUtils";
import { useNavigate } from "react-router-dom";
const nameApp = import.meta.env.VITE_APP_NOME_LOJA;

function Login() {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const [user, setUser] = useState({ email: "", password: "" });
  const [errorInput, setErrorinput] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async () => {
    setIsLoading(true);
    if (user.email === "" || user.password === "") {
      setIsLoading(false);
      setErrorinput("error");
      setTimeout(() => {
        setErrorinput("");
      }, 1200);
      return openNotificationAlert("topLeft");
    }
    const login = {
      email: user.email.trim(),
      password: user.password.trim(),
    };
    const loginResult = await loginOwner(login);
    setTimeout(() => {
      setIsLoading(false);
      if (loginResult.success === false) {
        return openNotification("topLeft");
      } else if (loginResult === true) {
        const userApi = loginResult.lojaData;
        if (userApi[0].is_adm === true) {
          const userLocalResult = setUsetLocalStorage(userApi);
          return navigate("/dashboard", { replace: true });
        }
      }
    }, 1200);
  };
  // const testelocal = () => {
  //   const dataLocal = getUserLocalStorage();
  //   console.log(dataLocal); // Verifique o que está sendo retornado
  //   const parsedData = JSON.parse(dataLocal);
  //   setData(parsedData);
  //   console.log("setando dentro do useState", data); // Verifique se o estado data está sendo atualizado
  // };

  const openNotification = (placement) => {
    api.info({
      message: `Atenção`,
      description: "Você não possui um cadastro 😥",
      placement,
    });
  };
  const openNotificationAlert = (placement) => {
    api.warning({
      message: `Atenção`,
      description: "Você Precisa preencher os campos 😒",
      placement,
    });
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
            status={errorInput}
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <Input.Password
            placeholder="Senha"
            className="inptForm"
            prefix={<LockFilled />}
            status={errorInput}
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
          {contextHolder}
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
