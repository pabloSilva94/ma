import { useState, createContext, useEffect } from "react";
import { getUserLocalInit, getUserLocalStorage } from "../utils/localStorageUtils";

const AuthContext = createContext();
function AuthProvider({ children }) {
  const [userOwner, setUserOwner] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    is_adm: "",
    is_provider: "",
    id_loja: "",
    lojas: {
      name: '',
      active: false
    },
    lojaDataApi: {
      providers: {},
      services: {},
      users: {}
    },
    schedule: [],
  });

  useEffect(() => {
    const getLocalOwner = getUserLocalInit();
    // console.log(getLocalOwner);
    // if (getLocalOwner !== null) {
    //   const getUserLocalOwner = getUserLocalStorage();
    //   const userParser = JSON.parse(getUserLocalOwner);
    //   setUserOwner((prevUserOwner) => ({
    //     ...prevUserOwner,
    //     id: userParser.id,
    //     name: userParser.name,
    //     email: userParser.email,
    //     phone: userParser.phone,
    //     is_adm: userParser.is_adm,
    //     is_provider: userParser.is_provider,
    //     id_loja: userParser.id_loja,
    //     lojas: {
    //       name: userParser.lojas?.name || '',
    //       active: userParser.lojas?.active || false
    //     },
    //     lojaDataApi: {
    //       providers: userParser.lojaDataApi?.providers || [],
    //       services: userParser.lojaDataApi?.services || [],
    //       users: userParser.lojaDataApi?.users || []
    //     },

    //   }));

    // }
  }, []);


  return (
    <AuthContext.Provider value={{ userOwner, setUserOwner }}>
      {children}
    </AuthContext.Provider>
  );
}
export { AuthProvider, AuthContext };
