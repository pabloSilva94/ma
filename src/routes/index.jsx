import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/dashboard'
import Login from '../pages/login'
import DashboardProvider from '../pages/provider/DashboardProvider';
import DashboardUser from '../pages/user/DashboardUser';

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={< Login />} />
      <Route path='/dashboard' element={< Dashboard />} />
      <Route path='/providerdashbord' element={<DashboardProvider />} />
      <Route path='/userdashboard' element={<DashboardUser />} />
    </Routes>
  )
}

export default MainRoutes;
