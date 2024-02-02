import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'
import moment from 'moment';
import Sidebar from '../../components/Sidebar'
import { CardInfos, CardList } from '../../components/Card'
import './Dashboard.css'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { getUserLocalStorage } from '../../utils/localStorageUtils';

function Dashboard() {
  const { userOwner, setUserOwner } = useContext(AuthContext);
  const navigate = useNavigate();
  const countProvider = userOwner.lojaDataApi.providers;
  const countUsers = userOwner.lojaDataApi.users;
  const countServices = userOwner.lojaDataApi.services;
  const allSchedule = userOwner.schedule;


  const handleGetLocal = () => {
    const userDataLocal = getUserLocalStorage();
    const data = JSON.parse(userDataLocal)
    console.log(data);

    // const dataAtual = moment().format('YYYY-MM-DD');
    // const convert = dataAtual.toString()
    // console.log(convert);

  }

  useEffect(() => {
    if (!localStorage.getItem("userData")) {
      return navigate("/", { replace: true })
    }
    const userDataLocal = getUserLocalStorage();
    const data = JSON.parse(userDataLocal)
    setUserOwner((prevUserOwner) => ({
      ...prevUserOwner,
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      is_adm: data.is_adm,
      is_provider: data.is_provider,
      id_loja: data.id_loja,
      lojas: {
        name: data.lojas?.name || '',
        active: data.lojas?.active || false
      },
      lojaDataApi: {
        providers: data.lojaDataApi?.providers || [],
        services: data.lojaDataApi?.services || [],
        users: data.lojaDataApi?.users || []
      },
    }));
  }, [navigate])
  return (
    <div className='containerDashboard'>
      <Sidebar userOwner={userOwner} />
      <div className='mainDashboard'>
        <CardInfos providersApi={countProvider} servicesApi={countServices} countUsers={countUsers} />
        <CardList providersApi={countProvider} />
        <Button onClick={handleGetLocal}>Get local storage</Button>
      </div>
    </div>
  )
}

export default Dashboard

