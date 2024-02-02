import { decryptData, encryptData } from "./cryptoUtils";

export const setUsetLocalStorage = (userApi, lojaDataApi) => {
  try {
    const data = JSON.stringify(userApi);
    const encryptedData = encryptData(data);
    localStorage.setItem("userData", encryptedData);
    return { succes: true, message: "Dados gravados com sucesso " };
  } catch (error) {
    return { succes: false, message: error.message };
  }
};

export const getUserLocalStorage = () => {
  const encryptedData = localStorage.getItem("userData");
  const decrypt = decryptData(encryptedData);
  return decrypt;
};

export const getUserLocalInit = () => {
  const userData = localStorage.getItem("userData");
  return userData;
};

export const logoutLocalStorage = () => {
  localStorage.removeItem("userData");
  return { succes: true };
};
