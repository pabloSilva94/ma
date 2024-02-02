import "./Card.css";
import { Calendar, Avatar, Card, Tabs, Button } from "antd";

import {
  DeleteFilled,
  EditFilled,
  InstagramOutlined,
  ScissorOutlined,
  UserOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";

export const CardInfos = ({ providersApi, servicesApi, countUsers }) => {
  return (
    <div className="cardInfosContainer">
      <div className="cardInfos1">
        <p>Clientes cadastrados</p>
        <h1>{countUsers.length}</h1>
      </div>

      <div className="cardInfos2">
        <p>Colaboradores cadastrados</p>
        <h1>{providersApi.length}</h1>
      </div>
      <div className="cardInfos3">
        <p>Serviços criados cadastrados</p>
        <h1>{servicesApi.length}</h1>
      </div>
    </div>
  );
};

export const CardList = ({ providersApi, schedule }) => {
  const handleDateSelect = (data) => {
    console.log("Data selecionada:", data.format("DD-MM-YYYY"));
  };
  return (
    <div className="cardContainerList">
      <div className="cardFilter">
        {providersApi && providersApi.length > 0 ?
          <h4>Filtrar os agendamentos</h4>
          : ""}
        {providersApi && providersApi.length > 0 ? (
          providersApi.map((provider) => (
            <div key={provider.id} className="btnFilter">
              <Button id={provider.id} type="text" >
                {provider.name}
              </Button>
            </div>
          ))
        ) : (
          <p>Nenhum provedor disponível.</p>
        )}
        <div className="cardList">
          <Card
            title={<h1>Pablo</h1>}
            extra={<p>13:30</p>}
            className="cardHorario"
            actions={[
              <EditFilled key="editar" />,
              <DeleteFilled key="delete" />,
            ]}
          >
            <p>
              {" "}
              <WhatsAppOutlined /> Whatsapp
            </p>
            <p>
              {" "}
              <ScissorOutlined /> Corte e barba
            </p>
            <p> R$ 50,00</p>
          </Card>
        </div>
      </div>
      <div className="cardCalendar">
        <Calendar
          fullscreen={false}
          className="listCard"
          disabledDate={(data) => data.isBefore(new Date(), 'day')}
          onSelect={handleDateSelect}
          mode="month"
        />
        {providersApi && providersApi.length > 0 ? (
          providersApi.map((provider) => (
            <div className="cardCalendarUsers" key={provider.id} id={provider.id}>
              <Avatar size={40}>
                <UserOutlined />
              </Avatar>
              <div className="cardCalendarInfosUser">
                <h3>{provider.name}</h3>
                <p>
                  <WhatsAppOutlined /> Whatsapp
                </p>
              </div>
            </div>
          ))
        ) : ""}

      </div>
    </div>
  );
};
