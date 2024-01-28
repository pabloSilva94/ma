import { Card, Flex, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import {   createNewProvider,  getLojas } from "../../hooks/loja/useLoja";


export const ModalAddProvider = ({ setOpen, open, lojaSelectec, setLojaApi }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [provider, setProvider] = useState({ name: "", email: "", phone: "" })
  const handleOk = async () => {
    const newProvider = {
      id: Math.random().toString(36).substring(2),
      id_loja: "",
      name: provider.name,
      email: provider.email.trim(),
      phone: provider.phone.trim(),
      password: Math.random().toString(36).substring(2),
      is_adm: false,
      is_provider: true
    }
    const resulProvider = await createNewProvider(newProvider);
    if (resulProvider.success === false) {
      return console.log(resulProvider.message);
    }
    const getAllLojas = await getLojas()
    if (getAllLojas.success === false) {
      return console.log(getAllLojas.message);
    }
    setLojaApi(getAllLojas.lojaData)
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
    setProvider({ name: "", email: "" })
  };
  return (
    <Modal
      title={<h3>Adicionar um prestador </h3>}
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Flex vertical gap={12}>
        <Input placeholder="Nome" value={provider.name} onChange={(e) => setProvider({ ...provider, name: e.target.value })} />
        <Input placeholder="E-mail" value={provider.email} onChange={(e) => setProvider({ ...provider, email: e.target.value })} />
        <Input placeholder="Telefone" value={provider.phone} onChange={(e) => setProvider({ ...provider, phone: e.target.value })} />
      </Flex>
    </Modal>
  );
};
