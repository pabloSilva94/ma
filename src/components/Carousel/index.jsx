import React from "react";
import { Button, Carousel } from "antd";
import Estudio from '../../assets/estudio.jpg'
import "./carrousel.css"

const contentStyle = {
  display:"flex",
  height: "480px",
};
const CarouselApp = () => (
  <Carousel >
    <div>
      <div style={contentStyle}>
      <div className="subItem1">
          <h1>O Melhor Estudio, Para Você. </h1>
          <Button type="primary">Agenda</Button>
        </div>
        <div className="subItem2">
          <img src={Estudio}/>
        </div>
      </div>
    </div>
    <div>
      <h3 style={contentStyle}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div>
  </Carousel>
);
export default CarouselApp;
