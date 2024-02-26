import { Button } from "antd";
import React, { useEffect, useState } from "react";


function Hours() {
  const [isMobile, setIsMobile] = useState(false);
  const [isExtraSmall, setIsExtraSmall] = useState(false)

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 924);
      setIsExtraSmall(window.innerWidth < 450);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
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
  const generateButtons = () => {
    const buttons = [];
    const times = [
      "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
      "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
      "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"
    ];

    times.forEach(time => {
      buttons.push(<Button key={time}>{time}</Button>);
    });

    return buttons;
  };
  return (
    <div style={isExtraSmall ? gridBtnHExtraSmall : (isMobile ? gridBtnHMobile : gridBtnH)}>
      {generateButtons()}
    </div>
  );
}

export default Hours;
