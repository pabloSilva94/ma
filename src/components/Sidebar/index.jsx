import { AuthContext } from "../../context/AuthContext";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CalendarOutlined,
  CloseCircleOutlined,
  FileAddOutlined,
  LogoutOutlined,
  MenuOutlined,
  ShoppingOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Divider, Button, Tooltip, Space } from "antd";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { AlertNotification } from "../Alert";
import { decryptData, encryptData } from "../../utils/cryptoUtils";
import "./Sidebar.css";
import {
  ModalAddAgenda,
  ModalAddProvider,
  ModalAddService,
  ModalAddUser,
} from "../Modal";
import { logoutLocalStorage } from "../../utils/localStorageUtils";
import { useNavigate } from "react-router-dom";
const nameApp = import.meta.env.VITE_APP_NOME_LOJA;
const Sidebar = () => {
  const navigate = useNavigate();
  const { userOwner } = useContext(AuthContext);
  const loja = userOwner.lojas.name;
  const [open, setOpen] = useState(false);
  const [openAddProvider, setOpenAddProvider] = useState(false);
  const [openAddUser, setOpenAddUser] = useState(false);
  const [openAddService, setOpenAddService] = useState(false);
  const [openAddAgenda, setOpenAddAgenda] = useState(false);
  const [active, setActive] = useState(true);
  //context geral
  const [segundos, setSegundos] = useState(60);
  const [isCheck, setIsCheck] = useState(false);
  const showModalUser = () => {
    setOpenAddUser(true);
  };
  const showModal = () => {
    setOpenAddProvider(true);
  };
  const showModalService = () => {
    setOpenAddService(true);
  };
  const showModalAgenda = () => {
    setOpenAddAgenda(true);
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
  const [width, setWidth] = useState(100); // Estado para controlar a largura da barra lateral

  const handleArrowLeftClick = () => {
    setWidth(100);
  };

  const handleArrowRightClick = () => {
    setWidth(350);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1000) {
        setWidth(100);
      } else {
        setWidth(300);
      }
    };

    // Adiciona um ouvinte de evento para redimensionamento da janela
    window.addEventListener('resize', handleResize);

    // Remove o ouvinte de evento quando o componente é desmontado
    return () => window.removeEventListener('resize', handleResize);
  }, []); // A dependência vazia faz com que este efeito seja executado apenas uma vez, após a montagem do componente

  return (
    <div
      className="containerSidebar"
      style={{ width: `${width}px`, paddingTop: 10 }}
    >
      {width !== 100 && (
        <>
          <Space direction="vertical" align="end">
            <Button type="text" onClick={handleArrowLeftClick}>
              <CloseCircleOutlined />
            </Button>
            <h1>{loja}</h1>
          </Space>
          <p>Bem Vindo, {userOwner.name}</p>
          <p>Dasshboard</p>
        </>
      )}
      {width === 100 && (
        <Tooltip title="menu" placement="left">
          <Button onClick={handleArrowRightClick}>
            <MenuOutlined />
          </Button>
        </Tooltip>
      )}
      <Divider />
      {open && <AlertNotification open={open} setOpen={setOpen} />}
      {width !== 100 && (
        <div className="linksSidebar">
          <Button disabled={!active} className="btnProfile" type="text">
            <UserOutlined />
            Perfil
          </Button>
          <Button
            disabled={!active}
            className="btnProfile"
            type="text"
            onClick={showModal}
          >
            <TeamOutlined />
            Adicionar prestador
          </Button>
          <Button
            disabled={!active}
            className="btnProfile"
            type="text"
            onClick={showModalUser}
          >
            <UsergroupAddOutlined />
            Adicionar usuarios
          </Button>
          <Button
            disabled={!active}
            className="btnProfile"
            type="text"
            onClick={showModalService}
          >
            <ShoppingOutlined />
            Adicionar um serviço
          </Button>
          <Button
            disabled={!active}
            className="btnProfile"
            type="text"
            onClick={showModalAgenda}
          >
            <CalendarOutlined />
            Novo um agendamento
          </Button>
          {!active && <p>Proxima verificação em : {segundos}s</p>}
          {isCheck && <p>Verificando</p>}
        </div>
      )}
      {width === 100 && (
        <div className="linksSidebar">
          <Tooltip title="Perfil" placement="left">
            <Button disabled={!active} className="btnProfile" type="text">
              <UserOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Novo Prestador" placement="left">
            <Button
              disabled={!active}
              className="btnProfile"
              type="text"
              onClick={showModal}
            >
              <TeamOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Novo Usuario" placement="left">
            <Button
              disabled={!active}
              className="btnProfile"
              type="text"
              onClick={showModalUser}
            >
              <UsergroupAddOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Novo Serviço" placement="left">
            <Button
              disabled={!active}
              className="btnProfile"
              type="text"
              onClick={showModalService}
            >
              <ShoppingOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Novo agendamento" placement="left">
            <Button
              disabled={!active}
              className="btnProfile"
              type="text"
              onClick={showModalAgenda}
            >
              <CalendarOutlined />
            </Button>
          </Tooltip>
          {!active && <p>Proxima verificação em : {segundos}s</p>}
          {isCheck && <p>Verificando</p>}
        </div>
      )}
      <ModalAddService setOpen={setOpenAddService} open={openAddService} />
      <ModalAddProvider setOpen={setOpenAddProvider} open={openAddProvider} />
      <ModalAddUser setOpen={setOpenAddUser} open={openAddUser} />
      <ModalAddAgenda setOpen={setOpenAddAgenda} open={openAddAgenda} />
      <Button type="text" disabled={!active} onClick={handleLogout}>
        {width === 100 && <LogoutOutlined />}
        {width !== 100 && (
          <>
            <LogoutOutlined /> Sair
          </>
        )}
      </Button>
      {/* <Button type="text" onClick={handleBlock}>
        block
      </Button>
      <Button type="text" onClick={toggleCronometro}>
        liberar
      </Button> */}
    </div>
  );
};
export default Sidebar;
