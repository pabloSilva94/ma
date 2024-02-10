import { Button, Space } from "antd";
import Carousel from '../../components/Carousel'
import Logo from "../../assets/logo.jpg";
import "./home.css";
function Home() {
  return (
    <div className="hContainer">
      <div className="header">
        <div className="logo">
          <img src={Logo} />
          <h4>Espaço da unha</h4>
        </div>
        <Space>
          <Button>Login</Button>
        </Space>
      </div>
    <div className="slider">
      <Carousel />
    </div>
    </div>
  );
}

export default Home;
