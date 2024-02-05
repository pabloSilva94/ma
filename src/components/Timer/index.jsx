import { Select } from "antd";
import React from "react";

const fixedTimes = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"
];

export const TimerAgenda = ({timerApi, isDisableHora, setShedule, schedule}) => {
  const handleChange = (value) => {
   return setShedule({...schedule, time:value})
  };
  const availableTimes = timerApi.length > 0 ? timerApi : fixedTimes;
  return (
    <Select placeholder="Horario"  onChange={handleChange} disabled={isDisableHora}>
      {availableTimes.map((time) => (
        <Select.Option key={time} value={time}>
          {time}
        </Select.Option>
      ))}
    </Select>
  );
};
