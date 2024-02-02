import { AuthContext } from "../../context/AuthContext";
import {
  FileAddOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Divider, Button } from "antd";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { AlertNotification } from "../Alert";
import { decryptData, encryptData } from "../../utils/cryptoUtils";
import "./Sidebar.css";
import { ModalAddProvider } from "../Modal";
import { logoutLocalStorage } from "../../utils/localStorageUtils";
import { useNavigate } from "react-router-dom";
const nameApp = import.meta.env.VITE_APP_NOME_LOJA;
const Sidebar = () => {
  const navigate = useNavigate();
  const { userOwner } = useContext(AuthContext);
  const loja = userOwner.lojas.name
  const [open, setOpen] = useState(false);
  const [openAddProvider, setOpenAddPrivder] = useState(false);
  const [active, setActive] = useState(true);
  //context geral
  const [segundos, setSegundos] = useState(60);
  const [isCheck, setIsCheck] = useState(false);
  const showModal = () => {
    setOpenAddPrivder(true);
  };
  const handleBlock = () => {
    setOpen(true);
    setActive(false);
    const newData = { active: !active };
    const encryptedData = encryptData(newData);
    localStorage.setItem("pubKey", encryptedData);
  };
  const handleLogout = () => {
    const resultLogout = logoutLocalStorage();
    if (resultLogout.succes === true) {
      return navigate("/", { replace: true });
    }
  };
  // useEffect(() => {
  //     let intervalId;
  //     var pubKeyDecript = {}
  //     const encryptedData = localStorage.getItem('pubKey');

  //     if (encryptedData !== null && encryptedData !== "") {
  //         pubKeyDecript = decryptData(encryptedData);

  //         if (pubKeyDecript.active === false) {
  //             setOpen(true);
  //             setActive(false);

  //             intervalId = setInterval(() => {
  //                 setSegundos((prevSegundos) => {
  //                     if (prevSegundos > 0) {
  //                         return prevSegundos - 1;
  //                     } else {
  //                         if (!active) {
  //                             setIsCheck(true);
  //                             setTimeout(() => {
  //                                 setIsCheck(false);
  //                                 setSegundos(60);
  //                             }, 2000);
  //                         }
  //                         return 0;
  //                     }
  //                 });
  //             }, 1000);
  //         } else if (pubKeyDecript.active === true) {
  //             setActive(true);
  //             setOpen(false);

  //         }
  //     }

  //     return () => {
  //         clearInterval(intervalId);
  //     };
  // }, [active])
  const toggleCronometro = () => {
    const newData = { active: true };
    const encryptedData = encryptData(newData);
    localStorage.setItem("pubKey", encryptedData);
    setActive(true);
    setSegundos(60);
    setOpen(false);
  };
  return (
    <div className="containerSidebar">
      <h1>{loja}</h1>
      <p>Bem Vindo, {userOwner.name}</p>
      <p>Dasshboard</p>
      <Divider />
      {open && <AlertNotification open={open} setOpen={setOpen} />}
      <div className="linksSidebar">
        <Button disabled={!active} className="btnProfile" type="link">
          <UserOutlined />
          Perfil
        </Button>
        <Button
          disabled={!active}
          className="btnProfile"
          type="link"
          onClick={showModal}
        >
          <UsergroupAddOutlined />
          Adicionar usuarios
        </Button>
        <Button disabled={!active} className="btnProfile" type="link">
          <FileAddOutlined />
          Adicionar um serviço
        </Button>
        <Button disabled={!active} className="btnProfile" type="link">
          <FileAddOutlined />
          Novo um agendamento
        </Button>
        {!active && <p>Proxima verificação em : {segundos}s</p>}
        {isCheck && <p>Verificando</p>}
      </div>
      <ModalAddProvider setOpen={setOpenAddPrivder} open={openAddProvider} />
      <Button type="text" disabled={!active} onClick={handleLogout}>
        Sair
      </Button>
      <Button type="text" onClick={handleBlock}>
        block
      </Button>
      <Button type="text" onClick={toggleCronometro}>
        liberar
      </Button>
    </div>
  );
};
export default Sidebar;
