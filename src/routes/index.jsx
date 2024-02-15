import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/dashboard'
import Login from '../pages/login'

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={< Login />} />
      <Route path='/dashboard' element={< Dashboard />} />
    </Routes>
  )
}

export default MainRoutes;
