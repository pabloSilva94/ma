import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import moment from "moment";
import "moment/locale/pt-br";
import "./DashboardUser.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Calendar, Card, Col, Flex, Row, Space } from "antd";
import {
  getUserLocalStorage,
  logoutLocalStorage,
} from "../../utils/localStorageUtils";
import { getAllInfosLoja } from "../../hooks/loja/useLoja";
import {
  CalendarFilled,
  LoginOutlined,
  ScheduleFilled,
  UserOutlined,
} from "@ant-design/icons";
const { Meta } = Card;
function DashboardUser() {
  const { userOwner, setUserOwner } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState([])
  const lojaId = userOwner.id_loja;
  const countProvider = userOwner.lojaDataApi.providers;
  const countUsers = userOwner.lojaDataApi.users;
  const countServices = userOwner.lojaDataApi.services;
  const handleGetLocal = async () => {
    const userDataLocal = getUserLocalStorage();
    const data = JSON.parse(userDataLocal);
    console.log(data);
    // const idLoja={
    //   id_loja:lojaId
    // }
    // const result = await getAllInfosLoja(idLoja)

    // if(result.success===false){
    //   console.log(result.message);
    // }
    // console.log(result.lojaData);
  };
  function disabledDate(current) {
    // Disable dates before today
    return current && current < moment().startOf("day");
  }
  const handleLogout = () => {
    const resultLogout = logoutLocalStorage();
    if (resultLogout.succes === true) {
      return navigate("/", { replace: true });
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("userData")) {
      return navigate("/", { replace: true });
    }
    const userDataLocal = getUserLocalStorage();
    const data = JSON.parse(userDataLocal);
    setUser(data);
  }, [navigate])
  return (
    <div className="containerDashboard">
      <div className="mainDashboard">
        <div className="hUser">
          <div className="hTitle">
            <h1>Home</h1>
          </div>
          <div className="hNameAvatar">
            <p>Olá, {user?.data?.user?.name}</p>
            <Avatar size={50} src={user?.data?.user?.avatar ? user?.data?.user?.avatar : <UserOutlined />} />
            <Button type="text" icon={<LoginOutlined />} />
          </div>
        </div>
        <div className="main">


          <div className="mCalendar">
            <Calendar fullscreen={false} disabledDate={disabledDate} />
            <Space wrap >
              <Card
                className="mCCard"
                title="João"
                style={{ width: 164 }}
                extra={<Button type="link"><CalendarFilled /></Button>}
              >
                <Meta
                  description={<Space><ScheduleFilled /><h4>8</h4></Space>}
                />
              </Card>
              <Card
                className="mCCard"
                title="João"
                style={{ width: 164 }}
                extra={<Button type="link"><CalendarFilled /></Button>}
              >
                <Meta
                  description={<Space><ScheduleFilled /><h4>8</h4></Space>}
                />
              </Card>
              <Card
                className="mCCard"
                title="João"
                style={{ width: 164 }}
                extra={<Button type="link"><CalendarFilled /></Button>}
              >
                <Meta
                  description={<Space><ScheduleFilled /><h4>8</h4></Space>}
                />
              </Card>

            </Space>
          </div>
          <div className="minfos">
            <h1>Horarios disponiveis <Button type="link">todos</Button></h1>
            <Row gutter={[7, 7]}>
              <Col span={4}>
                <Button>08:00</Button>
              </Col>
              <Col span={4}>
                <Button>08:30</Button>
              </Col>
              <Col span={4}>
                <Button>09:00</Button>
              </Col>
              <Col span={4}>
                <Button>09:30</Button>
              </Col>
              <Col span={4}>
                <Button>10:00</Button>
              </Col>
              <Col span={4}>
                <Button>10:30</Button>
              </Col>
              <Col span={4}>
                <Button>11:00</Button>
              </Col>
              <Col span={4}>
                <Button>11:30</Button>
              </Col>
              <Col span={4}>
                <Button>12:00</Button>
              </Col>
              <Col span={4}>
                <Button>12:30</Button>
              </Col>
              <Col span={4}>
                <Button>13:00</Button>
              </Col>
              <Col span={4}>
                <Button>13:30</Button>
              </Col>
              <Col span={4}>
                <Button>14:00</Button>
              </Col>
              <Col span={4}>
                <Button>14:30</Button>
              </Col>
              <Col span={4}>
                <Button>15:00</Button>
              </Col>
              <Col span={4}>
                <Button>15:30</Button>
              </Col>
              <Col span={4}>
                <Button>16:00</Button>
              </Col>
              <Col span={4}>
                <Button>16:30</Button>
              </Col>
              <Col span={4}>
                <Button>17:00</Button>
              </Col>
              <Col span={4}>
                <Button>17:30</Button>
              </Col>
              <Col span={4}>
                <Button>18:00</Button>
              </Col>
              <Col span={4}>
                <Button>18:30</Button>
              </Col>
              <Col span={4}>
                <Button>19:00</Button>
              </Col>
              <Col span={4}>
                <Button>19:30</Button>
              </Col>
            </Row>
          </div>
        </div>
        <Button onClick={handleGetLocal}>Get local</Button>
      </div>
    </div>
  );
}

export default DashboardUser;
