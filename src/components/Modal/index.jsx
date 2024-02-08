import {
  Card,
  DatePicker,
  Flex,
  Input,
  Modal,
  Space,
  Switch,
  TimePicker,
} from "antd";
import { useContext, useEffect, useState } from "react";
import {
  createAgendamentoApi,
  createNewProvider,
  createNewUser,
  createServicesApi,
  deleteAgendamentoApi,
  editAgendamentoApi,
  getAllInfosLoja,
  getDataHorario,
  getLojas,
  loginOwner,
} from "../../hooks/loja/useLoja";
import { AuthContext } from "../../context/AuthContext";
import {
  getUserLocalStorage,
  setUsetLocalStorage,
} from "../../utils/localStorageUtils";
import { CascadeProviders, CascadeServicos, CascadeUsers } from "../Cascade";
import { TimerAgenda, TimerApiAgenda } from "../Timer";
import moment from "moment";

export const ModalAddProvider = ({ setOpen, open, setLojaApi }) => {
  const { userOwner, setUserOwner } = useContext(AuthContext);
  const lojaId = userOwner.id_loja;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [provider, setProvider] = useState({ name: "", email: "", phone: "" });
  const [isAdm, setIsAdm] = useState(false);
  const onChange = (checked) => {
    setIsAdm(checked);
    console.log(checked);
  };
  const handleOk = async () => {
    const newProvider = {
      id: Math.random().toString(36).substring(2),
      id_loja: lojaId,
      name: provider.name,
      email: provider.email.trim(),
      phone: provider.phone.trim(),
      password: Math.random().toString(36).substring(2),
      is_adm: isAdm,
      is_provider: true,
      first_access: true,
      is_block: false,
    };
    const idLoja = {
      id_loja: lojaId,
    };
    const resulProvider = await createNewProvider(newProvider);
    if (resulProvider.success === false) {
      return console.log(resulProvider.message);
    }
    const getInfos = await getAllInfosLoja(idLoja);
    if (getInfos.success === !false) {
      const infosApi = getInfos.lojaData;
      setUsetLocalStorage(infosApi);
    } else {
      return console.log(getInfos.message);
    }
    const userDataLocal = getUserLocalStorage();
    const data = JSON.parse(userDataLocal);
    setUserOwner((prevUserOwner) => ({
      ...prevUserOwner,
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      is_adm: data.is_adm,
      is_provider: data.is_provider,
      id_loja: data.id_loja,
      lojas: {
        name: data.lojas?.name || "",
        active: data.lojas?.active || false,
      },
      lojaDataApi: {
        providers: data.lojaDataApi?.providers || [],
        services: data.lojaDataApi?.services || [],
        users: data.lojaDataApi?.users || [],
        schedule: data.lojaDataApi?.schedule || [],
      },
    }));
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      setIsAdm(false);
      setProvider({ name: "", email: "", phone: "" });
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
    setIsAdm(false);
    setProvider({ name: "", email: "" });
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
        <Input
          placeholder="Nome"
          value={provider.name}
          onChange={(e) => setProvider({ ...provider, name: e.target.value })}
        />
        <Input
          placeholder="E-mail"
          value={provider.email}
          onChange={(e) => setProvider({ ...provider, email: e.target.value })}
        />
        <Input
          placeholder="Telefone"
          value={provider.phone}
          onChange={(e) => setProvider({ ...provider, phone: e.target.value })}
        />
        <Space>
          <p>É Administrador ?</p>
          <Switch defaultChecked onChange={onChange} checked={isAdm} />
        </Space>
      </Flex>
    </Modal>
  );
};
export const ModalAddUser = ({ setOpen, open }) => {
  const { userOwner, setUserOwner } = useContext(AuthContext);
  const lojaId = userOwner.id_loja;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [user, setUser] = useState({ name: "", email: "", phone: "" });
  const handleOk = async () => {
    const newUser = {
      id: Math.random().toString(36).substring(2),
      id_loja: lojaId,
      name: user.name,
      email: user.email.trim(),
      phone: user.phone.trim(),
      password: Math.random().toString(36).substring(2),
    };
    const idLoja = {
      id_loja: lojaId,
    };
    const resulUser = await createNewUser(newUser);
    if (resulUser.success === false) {
      return console.log(resulUser.message);
    }

    const getInfos = await getAllInfosLoja(idLoja);
    if (getInfos.success === !false) {
      const infosApi = getInfos.lojaData;
      setUsetLocalStorage(infosApi);
    } else {
      return console.log(getInfos.message);
    }
    const userDataLocal = getUserLocalStorage();
    const data = JSON.parse(userDataLocal);
    setUserOwner((prevUserOwner) => ({
      ...prevUserOwner,
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      is_adm: data.is_adm,
      is_provider: data.is_provider,
      id_loja: data.id_loja,
      lojas: {
        name: data.lojas?.name || "",
        active: data.lojas?.active || false,
      },
      lojaDataApi: {
        providers: data.lojaDataApi?.providers || [],
        services: data.lojaDataApi?.services || [],
        users: data.lojaDataApi?.users || [],
        schedule: data.lojaDataApi?.schedule || [],
      },
    }));
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
    setUser({ name: "", email: "" });
  };
  return (
    <Modal
      title={<h3>Adicionar um cliente </h3>}
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Flex vertical gap={12}>
        <Input
          placeholder="Nome"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <Input
          placeholder="E-mail"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <Input
          placeholder="Telefone"
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
        />
      </Flex>
    </Modal>
  );
};
export const ModalAddService = ({ setOpen, open }) => {
  const { userOwner, setUserOwner } = useContext(AuthContext);
  const lojaId = userOwner.id_loja;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [service, setService] = useState({ name: "", value: "" });
  const handleOk = async () => {
    const servicesLoja = {
      id_loja: lojaId,
      name: service.name,
      value: service.value,
    };
    const idLoja = {
      id_loja: lojaId,
    };
    const resultService = await createServicesApi(servicesLoja);
    if (resultService.success === false) {
      return console.log(resultService.message);
    }

    const getInfos = await getAllInfosLoja(idLoja);
    if (getInfos.success === !false) {
      const infosApi = getInfos.lojaData;
      setUsetLocalStorage(infosApi);
    } else {
      return console.log(getInfos.message);
    }
    const userDataLocal = getUserLocalStorage();
    const data = JSON.parse(userDataLocal);
    setUserOwner((prevUserOwner) => ({
      ...prevUserOwner,
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      is_adm: data.is_adm,
      is_provider: data.is_provider,
      id_loja: data.id_loja,
      lojas: {
        name: data.lojas?.name || "",
        active: data.lojas?.active || false,
      },
      lojaDataApi: {
        providers: data.lojaDataApi?.providers || [],
        services: data.lojaDataApi?.services || [],
        users: data.lojaDataApi?.users || [],
        schedule: data.lojaDataApi?.schedule || [],
      },
    }));
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
    setService({ name: "", value: "" });
  };
  return (
    <Modal
      title={<h3>Adicionar um serviço </h3>}
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Flex vertical gap={12}>
        <Input
          placeholder="Nome"
          value={service.name}
          onChange={(e) => setService({ ...service, name: e.target.value })}
        />
        <Space>
          <Input
            placeholder="R$"
            value={service.value}
            onChange={(e) => setService({ ...service, value: e.target.value })}
          />
        </Space>
      </Flex>
    </Modal>
  );
};
export const ModalAddAgenda = ({ setOpen, open }) => {
  const { userOwner, setUserOwner } = useContext(AuthContext);
  const lojaId = userOwner.id_loja;
  const providerId = userOwner.lojaDataApi.providers;
  const servicosApi = userOwner.lojaDataApi.services;
  const usersApi = userOwner.lojaDataApi.users;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isDisableHora, setIsDisableHora] = useState(true);
  const [isDisableData, setIsDisableData] = useState(true);
  const [schedule, setShedule] = useState({
    time: "",
    date: "",
    idService: "",
    idProvider: "",
    idUser: "",
  });
  const [timerApi, setTimerApi] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);

  const handleServiceChange = (selectedServiceId) => {
    setShedule({ ...schedule, idService: selectedServiceId });
  };
  const handleProviderChange = (selectedProviderId) => {
    setIsDisableData(false);
    setShedule({ ...schedule, idProvider: selectedProviderId });
  };
  const handleUsersChange = (selectedUsersId) => {
    setIsDisableData(false);
    setShedule({ ...schedule, idUser: selectedUsersId });
  };
  const handleDate = async (value) => {
    const formattedDate = value.format(dateFormat);
    const dataProvider = {
      date: formattedDate,
      id_provider: schedule.idProvider,
      id_loja: lojaId,
    };
    const resulDate = await getDataHorario(dataProvider);
    if (resulDate.success === false) {
      console.log(resulDate.message);
    }
    setShedule({ ...schedule, date: formattedDate })
    setIsDisableHora(false);
    setTimerApi(resulDate.scheduleData);
  };
  const dateFormat = "DD/MM/YYYY";
  const handleOk = async () => {
    const agendamentoLoja = {
      id_loja: lojaId,
      id_provider: schedule.idProvider,
      id_service: schedule.idService,
      id_user: schedule.idUser,
      time: schedule.time,
      date: schedule.date,
    };
    const idLoja = {
      id_loja: lojaId,
    };
    const resultAgendamento = await createAgendamentoApi(agendamentoLoja);
    if (resultAgendamento.success === false) {
      return console.log(resultAgendamento.message);
    }

    const getInfos = await getAllInfosLoja(idLoja);
    if (getInfos.success === !false) {
      const infosApi = getInfos.lojaData;
      setUsetLocalStorage(infosApi);
    } else {
      return console.log(getInfos.message);
    }
    const userDataLocal = getUserLocalStorage();
    const data = JSON.parse(userDataLocal);
    setUserOwner((prevUserOwner) => ({
      ...prevUserOwner,
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      is_adm: data.is_adm,
      is_provider: data.is_provider,
      id_loja: data.id_loja,
      lojas: {
        name: data.lojas?.name || "",
        active: data.lojas?.active || false,
      },
      lojaDataApi: {
        providers: data.lojaDataApi?.providers || [],
        services: data.lojaDataApi?.services || [],
        users: data.lojaDataApi?.users || [],
        schedule: data.lojaDataApi?.schedule || [],
      },
    }));
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
    setShedule({ time: "", date: "", idService: "", idProvider: "" });
    setSelectedServices([]);
    setSelectedProvider([]);
    setIsDisableData(true);
    setIsDisableHora(true);
    setSelectedUser([]);
  };
  return (
    <Modal
      title={<h3>Adicionar um agendamento </h3>}
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Flex vertical gap={12}>
        <Space>
          <CascadeProviders
            selectedProvider={selectedProvider}
            setSelectedProvider={setSelectedProvider}
            providerApi={providerId}
            onChangeProvider={handleProviderChange}
          />
          <CascadeServicos
            selectedServices={selectedServices}
            setSelectedServices={setSelectedServices}
            servicosApi={servicosApi}
            onChangeService={handleServiceChange}
          />
        </Space>
        <CascadeUsers
          usersApi={usersApi}
          onChangeUsers={handleUsersChange}
          setSelectedUser={setSelectedUser}
          selectedUser={selectedUser}
        />
        <Space>
          <DatePicker
            placeholder="Data"
            disabledDate={(data) => data.isBefore(new Date(), "day")}
            format={dateFormat}
            onChange={handleDate}
            disabled={isDisableData}
          />
          <TimerAgenda timerApi={timerApi} isDisableHora={isDisableHora} schedule={schedule} setShedule={setShedule} />
        </Space>
      </Flex>
    </Modal>
  );
};
export const ModalEditAgenda = ({ setOpen, open, editOneAgendamento, setEditOneAgendamento }) => {
  const { userOwner, setUserOwner } = useContext(AuthContext);
  const dateFormat = "DD/MM/YYYY";
  const lojaId = userOwner.id_loja;

  const providerId = userOwner.lojaDataApi.providers;
  const servicosApi = userOwner.lojaDataApi.services;

  const [isDisableData, setIsDisableData] = useState(true)
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [alterData, setAlterData] = useState(false)
  const [error, setError] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [timerApi, setTimerApi] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const [selectedProvider, setSelectedProvider] = useState([]);
  const [editAgendamento, setEditAgendamento] = useState({
    date: editOneAgendamento?.date,
    provider: {
      id: editOneAgendamento.provider?.id,
      name: editOneAgendamento.provider?.name
    },
    service: {
      id: editOneAgendamento.service?.id,
      name: editOneAgendamento.service?.name,
      value: editOneAgendamento.service?.value
    }
  });
  const [editNewAgenda, setEditAgenda] = useState({
    idLoja: editOneAgendamento.id_loja,
    idUser: "",
    idProvider: "",
    idAgenda: "",
    idService: "",
    date: "",
    time: ""
  })

  const onChange = (checked) => {
    setAlterData(checked);
    setIsDisableData(true);
    console.log(checked);
  };
  const handleDate = async (value) => {

    const formattedDate = moment(`${value}`).format("DD/MM/YYYY")

    const dataProvider = {
      date: formattedDate,
      id_provider: editNewAgenda.idProvider,
      id_loja: lojaId,

    };
    console.log(dataProvider);
    if (dataProvider.date === "" || dataProvider.date === "Invalid date" || dataProvider.id_provider === "") {
      return { success: false, message: "Dados invalidos" }
    }
    const resultDate = await getDataHorario(dataProvider);

    if (resultDate.success === false) {
      return resultDate.message
    }
    setIsDisableData(false)
    setEditAgenda({ ...editNewAgenda, date: formattedDate })
    console.log("LOG MODAL", resultDate.scheduleData);
    setTimerApi(resultDate.scheduleData)

    // const resulDate = await getDataHorario(dataProvider);
    // if (resulDate.success === false) {
    //   console.log(resulDate.message);
    // }
    // setShedule({ ...schedule, date: formattedDate })
    // setIsDisableHora(false);
    // setTimerApi(resulDate.scheduleData);
  };
  const handleServiceChange = (selectedServiceId) => {
    setEditAgenda({ ...editNewAgenda, idService: selectedServiceId });
  };

  const handleProviderChange = (selectedProviderId) => {
    setEditAgenda({ ...editNewAgenda, idProvider: selectedProviderId });
  };


  const handleOk = async () => {
    const id = editOneAgendamento?.id
    const { service, provider } = editAgendamento;
    const { idService, idProvider, date, time, } = editNewAgenda;
    setEditAgenda({ ...editNewAgenda, idAgenda: id })
    if (idProvider === "" || idProvider === "") {
      return setError(true)
    }
    setError(false)
    const editDataAgendamento = {
      id: id,
      id_loja: lojaId,
      id_service: idService,
      id_provider: idProvider,
      date: date,
      time: time,
    };
    console.log("novos dados da agenda", { editDataAgendamento });

    const result = await editAgendamentoApi(editDataAgendamento);

    if (result.error === false) {
      return console.log(result.message);
    }
    const idLoja = {
      id_loja: lojaId,
    };
    const getInfos = await getAllInfosLoja(idLoja);
    if (getInfos.success === !false) {
      const infosApi = getInfos.lojaData;
      setUsetLocalStorage(infosApi);
    } else {
      return console.log(getInfos.message);
    }
    const userDataLocal = getUserLocalStorage();
    const data = JSON.parse(userDataLocal);
    setUserOwner((prevUserOwner) => ({
      ...prevUserOwner,
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      is_adm: data.is_adm,
      is_provider: data.is_provider,
      id_loja: data.id_loja,
      lojas: {
        name: data.lojas?.name || "",
        active: data.lojas?.active || false,
      },
      lojaDataApi: {
        providers: data.lojaDataApi?.providers || [],
        services: data.lojaDataApi?.services || [],
        users: data.lojaDataApi?.users || [],
        schedule: data.lojaDataApi?.schedule || [],
      },
    }));
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
    setError(false)
    setIsDisableData(true)
    setAlterData(false);
    setSelectedProvider([]);
    setSelectedServices([]);
  };
  return (
    <Modal
      title="Editar o Agendamento"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}

    >
      <Card
        title={<h1>{editOneAgendamento.user?.name}</h1>}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Space direction="vertical">
          <p>Selecione um prestador</p>
          <CascadeProviders
            selectedProvider={selectedProvider}
            setSelectedProvider={setSelectedProvider}
            providerApi={providerId}
            onChangeProvider={handleProviderChange}
            isError={error === true ? "error" : ""}

          />
          <p>Selecione um serviço</p>
          <CascadeServicos
            selectedServices={selectedServices}
            setSelectedServices={setSelectedServices}
            servicosApi={servicosApi}
            onChangeService={handleServiceChange}
            isError={error === true ? "error" : ""}

          />
          <p>Deseja alterar a data do agendamento ?</p>
          <Switch defaultChecked onChange={onChange} checked={alterData} />
          {alterData &&
            <Space>
              <DatePicker
                placeholder={editAgendamento.date}
                disabledDate={(data) => data.isBefore(new Date(), "day")}
                format={dateFormat}
                onChange={handleDate}
              />
              <TimerApiAgenda timerApi={timerApi} editNewAgenda={editNewAgenda} setEditAgenda={setEditAgenda} isDisableData={isDisableData} />
            </Space>}




        </Space>
      </Card>
    </Modal>
  );
};
export const ModalDeleteAgenda = ({ setOpen, open, deleteOneAgendamento, }) => {
  const { userOwner, setUserOwner } = useContext(AuthContext);
  const dateFormat = "DD/MM/YYYY";
  const lojaId = userOwner.id_loja;

  const providerId = userOwner.lojaDataApi.providers;
  const servicosApi = userOwner.lojaDataApi.services;

  const [isDisableData, setIsDisableData] = useState(true)
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [alterData, setAlterData] = useState(false)
  const [error, setError] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [timerApi, setTimerApi] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const [selectedProvider, setSelectedProvider] = useState([]);
  const [editAgendamento, setEditAgendamento] = useState({
    date: deleteOneAgendamento?.date,
    provider: {
      id: deleteOneAgendamento.provider?.id,
      name: deleteOneAgendamento.provider?.name
    },
    service: {
      id: deleteOneAgendamento.service?.id,
      name: deleteOneAgendamento.service?.name,
      value: deleteOneAgendamento.service?.value
    }
  });
  const [editNewAgenda, setEditAgenda] = useState({
    idLoja: deleteOneAgendamento.id_loja,
    idUser: "",
    idProvider: "",
    idAgenda: "",
    idService: "",
    date: "",
    time: ""
  })

  const handleOk = async () => {
    const id = deleteOneAgendamento?.id
    const { idProvider } = editNewAgenda;
    setEditAgenda({ ...editNewAgenda, idAgenda: id })

    const idAgenda = {
      id: id,
      id_loja: lojaId,
      id_provider: idProvider,
    };
    const result = await deleteAgendamentoApi(idAgenda);

    if (result.error === false) {
      return console.log(result.message);
    }
    const idLoja = {
      id_loja: lojaId,
    };
    const getInfos = await getAllInfosLoja(idLoja);
    if (getInfos.success === !false) {
      const infosApi = getInfos.lojaData;
      setUsetLocalStorage(infosApi);
    } else {
      return console.log(getInfos.message);
    }
    const userDataLocal = getUserLocalStorage();
    const data = JSON.parse(userDataLocal);
    setUserOwner((prevUserOwner) => ({
      ...prevUserOwner,
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      is_adm: data.is_adm,
      is_provider: data.is_provider,
      id_loja: data.id_loja,
      lojas: {
        name: data.lojas?.name || "",
        active: data.lojas?.active || false,
      },
      lojaDataApi: {
        providers: data.lojaDataApi?.providers || [],
        services: data.lojaDataApi?.services || [],
        users: data.lojaDataApi?.users || [],
        schedule: data.lojaDataApi?.schedule || [],
      },
    }));
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
    setError(false)
    setIsDisableData(true)
    setAlterData(false);
  };
  return (
    <Modal
      title="Excluir o Agendamento"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}


    >
      <Card
        title={<h4>Você deseja excluir o agendamento do {deleteOneAgendamento.user?.name} ?</h4>}
        style={{ display: "flex", flexDirection: "column" }}
      >
      </Card>
    </Modal>
  );
};
