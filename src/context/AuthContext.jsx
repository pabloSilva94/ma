import { useState, createContext, useEffect } from "react";
import { getUserLocalStorage } from "../utils/localStorageUtils";

const AuthContext = createContext();
function AuthProvider({ children }) {
  const [userOwner, setUserOwner] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    is_adm: "",
    is_provider: "",
    id_loja:"",
  });
  useEffect(() => {
    const getLocalOwner = getUserLocalStorage();
    const userParser = JSON.parse(getLocalOwner);

    if (userParser && userParser[0]) {
      setUserOwner(prevUserOwner => ({
        ...prevUserOwner,
        id: userParser[0].id,
        name: userParser[0].name,
        email: userParser[0].email,
        phone: userParser[0].phone,
        is_adm: userParser[0].is_adm,
        is_provider: userParser[0].is_provider,
        id_loja:userParser[0].id_loja
      }));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userOwner }}>
      {children}
    </AuthContext.Provider>
  );
}
export { AuthProvider, AuthContext };
