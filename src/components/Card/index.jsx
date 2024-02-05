import "./Card.css";
import { Calendar, Avatar, Card, Tabs, Button, DatePicker } from "antd";
import "moment/locale/pt-br";
import {
  DeleteFilled,
  EditFilled,
  InstagramOutlined,
  ScissorOutlined,
  UserOutlined,
  WhatsAppOutlined,
  ScheduleOutlined
} from "@ant-design/icons";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const ptBR = moment.locale("pt-br");

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

export const CardList = () => {
  const { userOwner, setUserOwner } = useContext(AuthContext);
  const providersApi = userOwner.lojaDataApi.providers;
  const allSchedule = userOwner.lojaDataApi.schedule;
  console.log(allSchedule);
  const dateFormat = "DD/MM/YYYY";
  const currentDate = moment();
  const handleDateSelect = (data) => {
    console.log(data.format("DD-MM-YYYY"));
  };
  return (
    <div className="cardContainerList">
      <div className="cardFilter">
        {providersApi && providersApi.length > 0 && allSchedule.length > 0 ? (
          <h4>Filtrar os agendamentos</h4>
        ) : (
          ""
        )}
        {providersApi && providersApi.length > 0 && allSchedule.length > 0 ? (
          providersApi.map((provider) => (
            <div key={provider.id} className="btnFilter">
              <Button id={provider.id} type="text">
                {provider.name}
              </Button>
            </div>
          ))
        ) : (
          <p>Nenhum agendamento disponível para hoje.</p>
        )}
        <div className="cardList">
        {allSchedule && allSchedule.length > 0 ? (
          allSchedule.map((schedule) => (
            <Card
              key={schedule.id}
              title={<h1>{schedule.user.name}</h1>}
              extra={<p>{schedule.time}</p>}
              className="cardHorario"
              actions={[
                <EditFilled key="editar" />,
                <DeleteFilled key="delete" />,
              ]}
            >
              <p>
                <WhatsAppOutlined /> Whatsapp
              </p>
              <p>
                <ScissorOutlined /> {schedule.service.name}
              </p>
              <p> R$ {schedule.service.value}</p>
              <p><ScheduleOutlined/> {schedule.date}</p>
              <p><UserOutlined/> <strong>{schedule.provider.name}</strong></p>
            </Card>
          ))
        ) : (
          <p>Nenhum agendamento disponível para hoje.</p>
        )}
        </div>
      </div>
      <div className="cardCalendar">
        <DatePicker
          locale={ptBR}
          disabledDate={(data) => data.isBefore(new Date(), "day")}
          onSelect={handleDateSelect}
          format={dateFormat}
          placeholder={moment(currentDate).format(dateFormat)}
          style={{ width: "100%" }}
        />
        <p>Lista dos prestadores</p>
        {providersApi && providersApi.length > 0
          ? providersApi.map((provider) => (
              <div
                className="cardCalendarUsers"
                key={provider.id}
                id={provider.id}
              >
                <Avatar size={40}>
                  <UserOutlined />
                </Avatar>
                <div className="cardCalendarInfosUser">
                  <h3>{provider.name}</h3>
                  <p>
                    <WhatsAppOutlined /> {provider.phone}
                  </p>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};
