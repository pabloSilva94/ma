import {Route, Routes} from 'react-router-dom'
import Dashboard from '../pages/dashboard'
import Login from '../pages/login'
import Home from '../pages/home'
function MainRoutes(){
    return(
        <Routes>
            <Route path='/' element={< Home/>}/>
            <Route path='/dashboard' element={< Dashboard/>}/>
        </Routes>
    )
}

export default MainRoutes;
