import './Card.css'
import { Calendar, Avatar, Card, Tabs } from 'antd';
import { DeleteFilled, EditFilled, InstagramOutlined, ScissorOutlined, UserOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { useState } from 'react';
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
    )
}
// const onPanelChange = (value, mode) => {
//     console.log(value.format('YYYY-MM-DD'), mode);
// };
export const CardList = () => {
    const [selectedName, setSelectedName] = useState(null);
    const onChange = (key) => {
        setSelectedName(key)
    };
    const agendaAllLoja = {
        item1: {
            key: '1',
            children: {
                provider: "João",
                nameUser: "Pedrinho ",
                horario: "13:30",
                servico: "Corte & Barba",
                total: "50,00"
            }
        },
        item2: {
            key: '2',
            children: {
                provider: "Pedro",
                nameUser: "Marcio ",
                horario: "13:30",
                servico: "Corte & Barba",
                total: "50,00"
            }
        },
        item3: {
            key: '3',
            children: {
                provider: "André",
                nameUser: "Mauricio ",
                horario: "13:30",
                servico: "Corte & Barba",
                total: "50,00"
            }
        }
    }


    const items = [
        {
            key: agendaAllLoja.item1.key,
            label: agendaAllLoja.item1.children.provider,
            children: (
                <Card title={<h1>{agendaAllLoja.item1.children.nameUser}</h1>} extra={<p >{agendaAllLoja.item1.children.horario}</p>} className="cardHorario" actions={[<EditFilled key="editar" />, <DeleteFilled key="delete" />]}>
                    <p> <WhatsAppOutlined /> Whatsapp</p>
                    <p> <ScissorOutlined /> {agendaAllLoja.item1.children.servico}</p>
                    <p> R$ {agendaAllLoja.item1.children.total}</p>
                </Card>
            ),
        },
        {
            key: agendaAllLoja.item2.key,
            label: agendaAllLoja.item2.children.provider,
            children: (
                <Card title={<h1>{agendaAllLoja.item2.children.nameUser}</h1>} extra={<p >{agendaAllLoja.item2.children.horario}</p>} className="cardHorario" actions={[<EditFilled key="editar" />, <DeleteFilled key="delete" />]}>
                    <p> <WhatsAppOutlined /> Whatsapp</p>
                    <p> <ScissorOutlined /> {agendaAllLoja.item2.children.servico}</p>
                    <p> R$ {agendaAllLoja.item2.children.total}</p>
                </Card>
            ),
        },
        {
            key: agendaAllLoja.item3.key,
            label: agendaAllLoja.item3.children.provider,
            children: (
                <Card title={<h1>{agendaAllLoja.item3.children.nameUser}</h1>} extra={<p >{agendaAllLoja.item3.children.horario}</p>} className="cardHorario" actions={[<EditFilled key="editar" />, <DeleteFilled key="delete" />]}>
                    <p> <WhatsAppOutlined /> Whatsapp</p>
                    <p> <ScissorOutlined /> {agendaAllLoja.item3.children.servico}</p>
                    <p> R$ {agendaAllLoja.item3.children.total}</p>
                </Card>
            ),
        },
    ];
    const firstKey = agendaAllLoja[0]?.key || '1';


    return (
        <div className='cardContainerList'>
            <Tabs className='cardList ' defaultActiveKey="1" onChange={onChange} items={items} />
            <div className='cardCalendar'>
                <Calendar fullscreen={false} className="listCard" locale={"pt-br"} />

                <div className='cardCalendarUsers'>
                    <Avatar size={40}><UserOutlined /></Avatar>
                    <div className='cardCalendarInfosUser'>
                        <h3>Pablo Almeida</h3>
                        <p> <InstagramOutlined /> Instagram</p>
                        <p> <WhatsAppOutlined /> Whatsapp</p>
                    </div>
                </div>
            </div>
        </div>
    )
}