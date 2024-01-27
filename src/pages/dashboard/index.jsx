import Sidebar from '../../components/Sidebar'
import { CardInfos, CardList } from '../../components/Card'
import './Dashboard.css'
function Dashboard() {
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
