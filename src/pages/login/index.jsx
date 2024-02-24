import { Avatar, Button, Input, notification, Space } from "antd";
import Calendar from "../../assets/calendar.svg";
import "./login.css";
import { jwtDecode } from "jwt-decode";
import {
  LockFilled,
  MailFilled,
  UserOutlined,
  IdcardFilled,
  PhoneFilled,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import { getIdLoja, getLojas, loginOwner } from "../../hooks/loja/useLoja";
import { setUsetLocalStorage } from "../../utils/localStorageUtils";
import { useNavigate } from "react-router-dom";
import { createNewUser, loginUser } from "../../hooks/loja/useUsers";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { maskCPF, maskPhone, maskCNPJ } from "react-lf-tools";
const nameApp = import.meta.env.VITE_APP_NOME_LOJA;
function Login() {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const [user, setUser] = useState({ email: "", password: "" });
  const [userRegister, setUserRegister] = useState({
    avatar: "",
    name: "",
    cpf: "",
    phone: "",
    email: "",
    password: "",
  });
  const [errorInput, setErrorinput] = useState("");
  const [errorInputRegiste, setErrorinputRegiste] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [credential, setCredential] = useState([]);
  const [sessionUser, setSessionUser] = useState(null);
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
    try {
      const loginResult = await loginOwner(login);
      console.log(loginResult);

      if (loginResult.success === true) {
        const userApi = loginResult.lojaData;
        const isAdm = userApi.is_adm;

        if (isAdm === true) {
          setIsLoading(false);
          setUsetLocalStorage(userApi);
          return navigate("/dashboard", { replace: true });
        } else {
          setIsLoading(false);
          console.log("dados login", userApi);
          // setUsetLocalStorage(userApi);
          // return navigate("/providerdashbord", { replace: true });
        }
      } else {
        const userApi = await loginUser(login);

        if (userApi.success === true) {
          setIsLoading(false);
          setUsetLocalStorage(userApi);
          return navigate("/userdashboard", { replace: true });
        }
        console.log("log usuario", userApi.data);
      }

      setIsLoading(false);
      openNotification("topLeft");
    } catch (error) {
      setIsLoading(false);
      console.error("Erro durante o login:", error);
      openNotification("topLeft");

      // Lidar com o erro de forma apropriada aqui
    }
  };
  const onChangePhone = (e) => {
    const phoneUser = e.target.value;
    const masked = maskPhone(phoneUser);
    setUserRegister({ ...userRegister, phone: masked });
  };
  const onChangeCpf = (e) => {
    const cpfUser = e.target.value;
    const masked = maskCPF(cpfUser);
    setUserRegister({ ...userRegister, cpf: masked });
  };
  const backToLogin = () => {
    setIsRegister(false)
    setUserRegister({
      avatar: "",
      name: "",
      cpf: "",
      phone: "",
      email: "",
      password: "",
    })
  }
  const handleRegister = async () => {
    setIsLoading(true);
    if (sessionUser !== null) {
      setUserRegister({ ...userRegister, avatar: sessionUser.avatarURL, name: sessionUser.name, email: sessionUser.email });
    }
    const { name, cpf, phone, email, password, avatar } = userRegister;
    if (
      email === "" ||
      password === "" ||
      name === "" ||
      cpf === "" ||
      phone === ""
    ) {
      setIsLoading(false);
      setErrorinputRegiste("error");
      setTimeout(() => {
        setErrorinputRegiste("");
      }, 1200);
      return openNotificationAlert("topLeft");
    }
    const newUser = {
      avatar: avatar,
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
    e.preventDefault();
    const result = await getLojas();
    if (result.success === false) {
      return console.log(result.message);
    }
    console.log(result.lojaData);
  };
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
  const getIdLojaMemoized = useMemo(() => {
    return async (nameLoja) => {
      try {
        const result = await getIdLoja(nameLoja);
        if (result.success === false) {
          return { success: false, message: result.message };
        }
        console.log("Renderizou no memo");

        return result.lojaData;
      } catch (error) {
        return { success: false, message: error.message };
      }
    };
  }, []);
  useEffect(() => {
    const getLojaId = async () => {
      const nameLoja = { name: nameApp };
      const lojaData = await getIdLojaMemoized(nameLoja);
      setData(lojaData);
      console.log("Renderizou");
    };
    getLojaId();
  }, [nameApp, getIdLojaMemoized]);
  const getInfosUser = async (credentialResponse) => {
    var credentialApi = credentialResponse.credential;
    let userCredential = {
      name: "",
      email: "",
      avatarURL: "",
    };
    try {
      // Faça uma solicitação para obter as informações do perfil do usuário
      const decodedToken = jwtDecode(credentialApi);
      setCredential(decodedToken);
      setIsLoadingGoogle(true);
      userCredential = {
        ...userCredential,
        name: decodedToken.name,
        email: decodedToken.email,
        avatarURL: decodedToken.picture,
      };
      setTimeout(() => {
        setSessionUser(userCredential);
        sessionStorage.setItem(
          "userCredential",
          JSON.stringify(userCredential)
        );
        setIsLoadingGoogle(false);
        // setIsRegister(true);
      }, 1500);
      return { success: true, message: "deu certo" };
      // Atualize o estado com as informações do perfil do usuário
      // setCredential(response.data);
    } catch (error) {
      console.error("Erro ao obter informações do perfil do usuário:", error);
    }
  };

  return (
    <div className="lContainer">
      <div className="formLogin">
        {!isRegister && (
          <>
            <form>
              <h1>Seja bem Vindo </h1>
              <Input
                placeholder="E-mail"
                className="inptForm"
                prefix={<MailFilled />}
                status={errorInput}
                value={user.email}
                onChange={(e) =>
                  setUser((prevUser) => ({
                    ...prevUser,
                    email: e.target.value,
                  }))
                }
              />
              <Input.Password
                placeholder="Senha"
                className="inptForm"
                prefix={<LockFilled />}
                status={errorInput}
                value={user.password}
                onChange={(e) =>
                  setUser((prevUser) => ({
                    ...prevUser,
                    password: e.target.value,
                  }))
                }
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
              <Button type="link" onClick={() => setIsRegister(true)}>
                Cadastrar
              </Button>
              {sessionUser === null ? (
                isLoadingGoogle === false ? (
                  <GoogleOAuthProvider clientId="141263858504-o467hgk0hveld3i5399ev3srrufjdi9b.apps.googleusercontent.com">
                    <GoogleLogin
                      onSuccess={(credentialResponse) => {
                        getInfosUser(credentialResponse);
                      }}
                      onError={() => {
                        console.log("Login Failed");
                      }}
                    />
                  </GoogleOAuthProvider>
                ) : (
                  <Button type="link" loading style={{ height: 38 }}>
                    Loading...
                  </Button>
                )
              ) : null}

              <Space direction="vertical">
                <Avatar
                  src={
                    sessionUser?.avatarURL ? (
                      sessionUser?.avatarURL
                    ) : (
                      <UserOutlined />
                    )
                  }
                  size="large"
                />
                <p>{sessionUser?.name ? sessionUser?.name : ""}</p>
                <p>{sessionUser?.email ? sessionUser?.email : ""}</p>
              </Space>
            </Space>
          </>
        )}
        {isRegister && (
          <>
            <form>
              {/* {console.log(data[0].id)} */}
              <Space style={{ width: "30%", justifyContent: "space-between" }}>
                <Button type="link" onClick={backToLogin}>
                  <ArrowLeftOutlined />
                </Button>
                <h1>Cadastro</h1>
              </Space>
              <Input
                disabled={sessionUser?.name ? true : false}
                placeholder="Nome"
                className="inptForm"
                prefix={<UserOutlined />}
                status={errorInputRegiste}
                value={userRegister.name || (sessionUser?.name ? sessionUser?.name : "")}
                onChange={(e) =>
                  setUserRegister((prevUser) => ({
                    ...prevUser,
                    name: e.target.value,
                  }))
                }
              />

              <Space style={{ width: "30%" }}>
                <Input
                  placeholder="Cpf"
                  className="inptForm"
                  prefix={<IdcardFilled />}
                  status={errorInputRegiste}
                  value={userRegister.cpf}
                  onChange={onChangeCpf}
                  maxLength="14"
                />
                <Input
                  placeholder="Telefone"
                  className="inptForm"
                  prefix={<PhoneFilled />}
                  status={errorInputRegiste}
                  value={userRegister.phone}
                  onChange={onChangePhone}
                />
              </Space>
              <Input
                disabled={sessionUser?.email ? true : false}
                placeholder="E-mail"
                className="inptForm"
                prefix={<MailFilled />}
                status={errorInputRegiste}
                value={
                  sessionUser?.email ? sessionUser.email : userRegister?.email
                }
                onChange={(e) =>
                  setUserRegister({ ...userRegister, email: e.target.value })
                }
              />
              <Input.Password
                placeholder="Senha"
                className="inptForm"
                prefix={<LockFilled />}
                status={errorInputRegiste}
                value={userRegister.password}
                onChange={(e) =>
                  setUserRegister({ ...userRegister, password: e.target.value })
                }
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
          </>
        )}
      </div>
      <div className="imgBg">
        <h1>{nameApp}</h1>
        <img src={Calendar} />
      </div>
    </div>
  );
}

export default Login;
