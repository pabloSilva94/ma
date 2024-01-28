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
export const CardInfos = () => {
  return (
    <div className="cardInfosContainer">
      <div className="cardInfos1">
        <p>Clientes cadastrados</p>
        <h1>50</h1>
      </div>
      <div className="cardInfos2">
        <p>Colaboradores cadastrados</p>
        <h1>50</h1>
      </div>
      <div className="cardInfos3">
        <p>Serviços criados cadastrados</p>
        <h1>50</h1>
      </div>
    </div>
  );
};
export const CardList = () => {
  const handleDateSelect = (data) => {
    console.log("Data selecionada:", data.format("DD-MM-YYYY"));
  };
  return (
    <div className="cardContainerList">
      <div className="cardFilter">
        <h4>Filtrar os agendamentos</h4>
        <div className="btnilter">
          <Button type="text">Paulo</Button>
          <Button type="text">Paulo</Button>
          <Button type="text">Paulo</Button>
          <Button type="text">Todos</Button>
        </div>
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

        <div className="cardCalendarUsers">
          <Avatar size={40}>
            <UserOutlined />
          </Avatar>
          <div className="cardCalendarInfosUser">
            <h3>Pablo Almeida</h3>
            <p>
              <WhatsAppOutlined /> Whatsapp
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
