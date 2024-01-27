import { ScissorOutlined, UserOutlined, WhatsAppOutlined } from "@ant-design/icons"
import { Avatar } from "antd"
import './List.css'
export const ListAgenda = () => {
    return (
        <div className="listContainer">
            <Avatar size={40}><UserOutlined /></Avatar>
            <div className='listInfosUser'>
                <h3>Pablo Almeida</h3>
                <p> <WhatsAppOutlined /> Whatsapp</p>
                <p> <ScissorOutlined /> Corte e barba</p>
                <p> R$ 50,00</p>
            </div>
        </div>
    )
}