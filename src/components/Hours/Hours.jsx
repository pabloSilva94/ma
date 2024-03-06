import { Button, notification } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";


function Hours({ user, selectedDay }) {
  const [api, contextHolder] = notification.useNotification();
  const [isMobile, setIsMobile] = useState(false);
  const [isExtraSmall, setIsExtraSmall] = useState(false)
  const [isBlock, setIsBlock] = useState(false)
  const [actualDay, setActualDay] = useState([]);

  useEffect(() => {

    function handleResize() {
      setIsMobile(window.innerWidth < 924);
      setIsExtraSmall(window.innerWidth < 450);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    console.log("ok");
    setActualDay(user?.data?.schedule)
  }, [user])

  const gridBtnH = {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gridGap: "10px",
    transition: "all 0.5s ease",
  };
  const gridBtnHMobile = {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gridGap: "10px",
    transition: "all 0.5s ease",
  };
  const gridBtnHExtraSmall = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridGap: "10px",
    transition: "all 0.5s ease",
  };
  const handleGetHour = (time) => {
    // openNotification("topLeft");
    // const diaAtual = moment().format('DD/MM/YYYY');

    // console.log(selectedDay, time);
    const timesApi = actualDay.length > 0 ? actualDay.map(timeApi => timeApi) : [];

    console.log(timesApi);
  }

  const generateButtons = () => {
    let daySelect = selectedDay;

    let dayApi = user?.data?.schedule.map(day => day)
    console.log("dia selecionado", daySelect);
    const buttons = [];
    const times = [
      "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
      "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
      "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"
    ];
    const handleBlock = (day) => {
      let block = false
      let dayApi = day.date
      return block
    }
    dayApi?.forEach(day => {
      buttons.push(
        <Button
          key={day.id}
          disabled={handleBlock(day)}
          onClick={() => handleGetHour(day.time)}
          style={{ margin: '5px' }}
        >
          {day.time}
        </Button>
      );
    });

    return buttons;
  };
  const openNotification = (placement) => {
    api.warning({
      message: `Atenção`,
      description: "Você precisa selecionar uma data 🗓",
      placement,
    });
  };
  return (
    <div style={isExtraSmall ? gridBtnHExtraSmall : (isMobile ? gridBtnHMobile : gridBtnH)}>
      {generateButtons()}
      {contextHolder}
    </div>
  );
}

export default Hours;
