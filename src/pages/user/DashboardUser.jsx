import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import moment from "moment";
import "moment/locale/pt-br";
import "./DashboardUser.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Calendar, Card, Space } from "antd";
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
import Hours from "../../components/Hours/Hours";
import CalendarList from "../../components/calendarList";
const { Meta } = Card;
function DashboardUser() {
  const { userOwner, setUserOwner } = useContext(AuthContext);
  const [isMoblieCalnedar, setIsMobileCalendar] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');
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
  }, [navigate]);
  useEffect(() => {
    function handleResizeCalendar() {
      setIsMobileCalendar(window.innerWidth < 400);
    }

    window.addEventListener("resize", handleResizeCalendar);
    handleResizeCalendar();

    return () => {
      window.removeEventListener("resize", handleResizeCalendar);
    };
  }, []);
  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };
  return (
    <div className="containerDashboard">
      <div className="mainDashboard">
        <div className="hUser">
          <div className="hTitle">
            <h1>Home</h1>
          </div>
          <div className="hNameAvatar">
            <p>Olá, {user?.data?.user?.name}</p>
            <Avatar
              size={50}
              src={
                user?.data?.user?.avatar ? (
                  user?.data?.user?.avatar
                ) : (
                  <UserOutlined />
                )
              }
            />
            <Button
              type="text"
              icon={<LoginOutlined />}
              onClick={handleLogout}
            />
          </div>
        </div>

        <div className="main">
          <div className="mCalendar">
            {isMoblieCalnedar && <CalendarList onDaySelect={handleDaySelect} />}

            {!isMoblieCalnedar && (
              <Calendar fullscreen={false} disabledDate={disabledDate} />
            )}
            <Space wrap>
              {user?.data?.providers.map((provider) => (
                <Card
                  key={provider.id}
                  className="mCCard"
                  title={provider.name}
                  style={{ width: 164 }}
                  extra={
                    <Button type="link">
                      <CalendarFilled />
                    </Button>
                  }
                >
                  <Meta
                    description={
                      <Space>
                        <ScheduleFilled />
                        <h4>8</h4>
                      </Space>
                    }
                  />
                </Card>
              ))}
            </Space>
          </div>

          <div className="minfos">
            <h1>
              Horarios disponiveis <Button type="link">todos</Button>
            </h1>

            <Hours user={user} selectedDay={selectedDay} />

            <Button onClick={handleGetLocal}>Get</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardUser;
