import { FileAddOutlined, UsergroupAddOutlined, UserOutlined, } from '@ant-design/icons';
import { Divider, Button } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { AlertNotification } from '../Alert';
import crypto from 'crypto-js'
import './Sidebar.css'
const nameApp = import.meta.env.VITE_APP_KEY_APP
const salt = 'QWERTy@!!2024'
const Sidebar = () => {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(true)
    const [segundos, setSegundos] = useState(60);
    const [isCheck, setIsCheck] = useState(false);
    const handleBlock = () => {
        setOpen(true);
        setActive(false)
        const newData = { active: !active };
        const encryptedData = encryptData(newData);
        localStorage.setItem('pubKey', encryptedData);
    }

    useEffect(() => {
        let intervalId;
        var pubKeyDecript = {}
        const encryptedData = localStorage.getItem('pubKey');

        if (encryptedData !== "") {
            pubKeyDecript = decryptData(encryptedData);

            if (pubKeyDecript.active === false) {
                setOpen(true);
                setActive(false);

                intervalId = setInterval(() => {
                    setSegundos((prevSegundos) => {
                        if (prevSegundos > 0) {
                            return prevSegundos - 1;
                        } else {
                            if (!active) {
                                setIsCheck(true);
                                setTimeout(() => {
                                    setIsCheck(false);
                                    setSegundos(60);
                                }, 2000);
                            }
                            return 0;
                        }
                    });
                }, 1000);
            } else if (pubKeyDecript.active === true) {
                setActive(true);
                setOpen(false);

            }
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [active])
    const toggleCronometro = () => {
        const newData = { active: true };
        const encryptedData = encryptData(newData);
        localStorage.setItem('pubKey', encryptedData);
        setActive(true);
        setSegundos(60)
        setOpen(false)
    };
    const encryptData = (data) => {
        const encryptedData = crypto.AES.encrypt(JSON.stringify(data), `${salt}_chave_de_criptografia`).toString();
        return encryptedData;
    };
    const decryptData = (encryptedData) => {
        const decryptedBytes = crypto.AES.decrypt(encryptedData, `${salt}_chave_de_criptografia`);
        const decryptedData = JSON.parse(decryptedBytes.toString(crypto.enc.Utf8));
        return decryptedData;
    };
    const handleButtonClick = () => {
        // Ao clicar no botão, descriptografe os dados do localStorage e faça algo com eles
        const encryptedData = localStorage.getItem('pubKey');
        if (encryptedData) {
            const decryptedData = decryptData(encryptedData);
            console.log(decryptedData);
        }
    };
    return (
        <div className="containerSidebar">
            <h1>{nameApp}</h1>
            <p>Dasshboard</p>
            <Divider />
            {open && <AlertNotification open={open} setOpen={setOpen} />}
            <div className='linksSidebar'>
                <Button disabled={!active} className='btnProfile' type='link'>
                    <UserOutlined />
                    Perfil
                </Button>
                <Button disabled={!active} className='btnProfile' type='link'>
                    <UsergroupAddOutlined />
                    Adicionar usuarios
                </Button>
                <Button disabled={!active} className='btnProfile' type='link'>
                    <FileAddOutlined />
                    Adicionar um serviço
                </Button>
                {!active && <p>Proxima verificação em : {segundos}s</p>}
                {isCheck && <p>Verificando</p>}
                <Button onClick={handleButtonClick}>Desfazer</Button>
            </div>
            <Button type='text' disabled={!active} onClick={() => setOpen(true)}>Sair</Button>
            <Button type='text' onClick={handleBlock}>block</Button>
            <Button type='text' onClick={toggleCronometro}>liberar</Button>
        </div>
    );
};
export default Sidebar;