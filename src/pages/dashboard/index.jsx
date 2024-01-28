import { useContext } from 'react';
import {AuthContext} from '../../context/AuthContext'
import Sidebar from '../../components/Sidebar'
import { CardInfos, CardList } from '../../components/Card'
import './Dashboard.css'

function Dashboard() {
  const { userOwner } = useContext(AuthContext);
  console.log(userOwner.name);
  console.log(userOwner.id_loja);

    return (
        <div className='containerDashboard'>
            <Sidebar />
            <div className='mainDashboard'>
                <CardInfos />
                <CardList />
            </div>
        </div>
    )
}

export default Dashboard
