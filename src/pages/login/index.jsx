import { Button, Input, notification, Space } from "antd";
import Calendar from "../../assets/calendar.svg";
import "./login.css";
import {
  LockFilled,
  MailFilled,
  GoogleOutlined,
  UserOutlined,
  IdcardFilled,
  PhoneFilled,
  ArrowLeftOutlined
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getIdLoja, getLojas, loginOwner } from "../../hooks/loja/useLoja";
import { setUsetLocalStorage } from "../../utils/localStorageUtils";
import { useNavigate } from "react-router-dom";
import { createNewUser } from "../../hooks/loja/useUsers";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
const nameApp = import.meta.env.VITE_APP_NOME_LOJA;

function Login() {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const [user, setUser] = useState({ email: "", password: "" });
  const [userRegister, setUserRegister] = useState({ name: "", cpf: "", phone: "", email: "", password: "" });
  const [errorInput, setErrorinput] = useState("");
  const [errorInputRegiste, setErrorinputRegiste] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false)
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
      id_loja: data[0].id,
      email: user.email.trim(),
      password: user.password.trim(),
    };
    const loginResult = await loginOwner(login);
    setTimeout(() => {
      setIsLoading(false);
      if (loginResult.success === true) {
        const userApi = loginResult.lojaData;
        setUsetLocalStorage(userApi);
        return navigate("/dashboard", { replace: true });
      } else {
        return openNotification("topLeft");
      }
    }, 1200);
  };
  const handleRegister = async () => {
    setIsLoading(true);
    const { name, cpf, phone, email, password } = userRegister;
    if (email === "" || password === "" || name === "" || cpf === "" || phone === "") {
      setIsLoading(false);
      setErrorinputRegiste("error");
      setTimeout(() => {
        setErrorinputRegiste("");
      }, 1200);
      return openNotificationAlert("topLeft");
    }
    const newUser = {
      id_loja: data[0].id,
      id: Math.random().toString(36).substring(2),
      email: email.trim(),
      password: password.trim(),
      name: name,
      cpf: cpf,
      phone: phone,
    };
    console.log(newUser);

    const loginResult = await createNewUser(newUser);
    setTimeout(() => {
      setIsLoading(false);
      if (loginResult.success === true) {
        setUserRegister([]);
        setIsRegister(false);
      } else {
        return openNotification("topLeft");
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
  const getLojaApi = async (e) => {
    e.preventDefault()
    const result = await getLojas();
    if (result.success === false) {
      return console.log(result.message);
    }
    console.log(result.lojaData);

  }
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

  useEffect(() => {
    const getLojaId = async () => {
      const name = nameApp;
      const nameLoja = {
        name: name,
      }
      try {
        const result = await getIdLoja(nameLoja)
        if (result.success === false) {
          return { success: false, message: result.message }
        }
        setData(result.lojaData)
      } catch (error) {
        return { success: false, message: error.message }
      }
    }
    getLojaId()
  }, [])

  return (
    <div className="lContainer">
      <div className="formLogin">
        {!isRegister && <>
          <form>
            <h1>Seja bem Vindo </h1>
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
          <Space direction="vertical" align="center">
            <Button type="link" onClick={() => setIsRegister(true)}>Cadastrar</Button>
            <GoogleOAuthProvider clientId="141263858504-f9rl2gj1nnr0usuahcs8nk5hq6n4f3je.apps.googleusercontent.com">

              <GoogleLogin
                onSuccess={credentialResponse => {
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />;
            </GoogleOAuthProvider>;
          </Space>
        </>}
        {isRegister && <>
          <form>
            {/* {console.log(data[0].id)} */}
            <Space style={{ width: "30%", justifyContent: "space-between" }}>
              <Button type="link" onClick={() => setIsRegister(false)}><ArrowLeftOutlined /></Button>
              <h1>Cadastro</h1>
            </Space>
            <Input
              placeholder="Nome"
              className="inptForm"
              prefix={<UserOutlined />}
              status={errorInputRegiste}
              value={userRegister.name}
              onChange={(e) => setUserRegister({ ...userRegister, name: e.target.value })}
            />
            <Space style={{ width: "30%" }}>
              <Input
                placeholder="Cpf"
                className="inptForm"
                prefix={<IdcardFilled />}
                status={errorInputRegiste}
                value={userRegister.cpf}
                onChange={(e) => setUserRegister({ ...userRegister, cpf: e.target.value })}
              />
              <Input
                placeholder="Telefone"
                className="inptForm"
                prefix={<PhoneFilled />}
                status={errorInputRegiste}
                value={userRegister.phone}
                onChange={(e) => setUserRegister({ ...userRegister, phone: e.target.value })}
              />
            </Space>
            <Input
              placeholder="E-mail"
              className="inptForm"
              prefix={<MailFilled />}
              status={errorInputRegiste}
              value={userRegister.email}
              onChange={(e) => setUserRegister({ ...userRegister, email: e.target.value })}
            />
            <Input.Password
              placeholder="Senha"
              className="inptForm"
              prefix={<LockFilled />}
              status={errorInputRegiste}
              value={userRegister.password}
              onChange={(e) => setUserRegister({ ...userRegister, password: e.target.value })}
              type="password"
            />
            <Button
              className="btnLogin"
              type="primary"
              loading={isLoading}
              onClick={handleRegister}
            >
              Entrar
            </Button>
            {contextHolder}

          </form>
        </>}
      </div>
      <div className="imgBg">
        <h1>{nameApp}</h1>
        <img src={Calendar} />
      </div>
    </div >
  );
}

export default Login;
