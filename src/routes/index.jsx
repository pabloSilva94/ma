import {Route, Routes} from 'react-router-dom'
import Dashboard from '../pages/dashboard'
import Login from '../pages/login'
import Home from '../pages/home'
function MainRoutes(){
    return(
        <Routes>
            <Route path='/' element={< Login/>}/>
            <Route path='/dashboard' element={< Dashboard/>}/>
            <Route path='/home' element={< Home/>}/>
        </Routes>
    )
}   

export default MainRoutes;