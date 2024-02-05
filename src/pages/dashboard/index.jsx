import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import moment from "moment";
import Sidebar from "../../components/Sidebar";
import { CardInfos, CardList } from "../../components/Card";
import "./Dashboard.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import {
  getUserLocalStorage,
  setUsetLocalStorage,
} from "../../utils/localStorageUtils";
import { getAllInfosLoja } from "../../hooks/loja/useLoja";

function Dashboard() {
  const { userOwner, setUserOwner } = useContext(AuthContext);
  const navigate = useNavigate();
  const lojaId = userOwner.id_loja;
  const countProvider = userOwner.lojaDataApi.providers;
  const countUsers = userOwner.lojaDataApi.users;
  const countServices = userOwner.lojaDataApi.services;


  const handleGetLocal =async ()=>{
    const userDataLocal = getUserLocalStorage();
    const data = JSON.parse(userDataLocal);
    console.log(data);
    console.log(userSchedule);
    console.log(providerSchedule);
    // const idLoja={
    //   id_loja:lojaId
    // }
    // const result = await getAllInfosLoja(idLoja)

    // if(result.success===false){
    //   console.log(result.message);
    // }
    // console.log(result.lojaData);
  }
  useEffect(() => {
    if (!localStorage.getItem("userData")) {
      return navigate("/", { replace: true });
    }

    const userDataLocal = getUserLocalStorage();
    const data = JSON.parse(userDataLocal);

    async function getNewData() {
      const idLoja = {
        id_loja: lojaId,
      };

      try {
        const getInfos = await getAllInfosLoja(idLoja);
        if (getInfos.success === true) {
          const infosApi = getInfos.lojaData;
          const newServices = infosApi.lojaDataApi.services;
          const newUsers = infosApi.lojaDataApi.users;
          const newProviders = infosApi.lojaDataApi.providers;
          const newSchedule = infosApi.lojaDataApi.schedule

          if (newServices.length > data.lojaDataApi.services.length) {
            setUserOwner((prevUserOwner) => ({
              ...prevUserOwner,
              lojaDataApi: {
                services: newServices.lojaDataApi?.services || [],
              },
            }));
            setUsetLocalStorage(infosApi);
          }

          if (newUsers.length > data.lojaDataApi.users.length) {
            setUserOwner((prevUserOwner) => ({
              ...prevUserOwner,
              lojaDataApi: {
                users: newUsers.lojaDataApi?.users || [],
              },
            }));
            setUsetLocalStorage(infosApi);
          }

          if (newProviders.length > data.lojaDataApi.providers.length) {
            setUserOwner((prevUserOwner) => ({
              ...prevUserOwner,
              lojaDataApi: {
                providers: newProviders.lojaDataApi?.providers || [],
              },
            }));
            setUsetLocalStorage(infosApi);
          }
          // if (newSchedule.length > data.lojaDataApi.schedule.length) {
          //   setUserOwner((prevUserOwner) => ({
          //     ...prevUserOwner,
          //     lojaDataApi: {
          //       schedule: newSchedule.lojaDataApi?.schedule || [],
          //     },
          //   }));
          //   setUsetLocalStorage(infosApi);
          // }
        }
      } catch (error) {
        console.error("Erro ao obter novos dados:", error);
      }
    }

    getNewData();

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
        name: data.lojas?.name || "",
        active: data.lojas?.active || false,
      },
      lojaDataApi: {
        providers: data.lojaDataApi?.providers || [],
        services: data.lojaDataApi?.services || [],
        users: data.lojaDataApi?.users || [],
        schedule: data.lojaDataApi?.schedule || [],
      },
    }));
  }, [navigate]);

  return (
    <div className="containerDashboard">
      <Sidebar userOwner={userOwner} />
      <div className="mainDashboard">
        <CardInfos
          providersApi={countProvider}
          servicesApi={countServices}
          countUsers={countUsers}
        />
        <CardList />
        <Button onClick={handleGetLocal}>Get local</Button>
      </div>
    </div>
  );
}

export default Dashboard;
