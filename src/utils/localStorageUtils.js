import { decryptData, encryptData } from "./cryptoUtils";

export const setUsetLocalStorage = (userApi) => {
  const jsonData = JSON.stringify(userApi);
  const encryptedData = encryptData(jsonData);
  localStorage.setItem("userData", encryptedData);
  return { succes: true };
};

export const getUserLocalStorage = () => {
  const encryptData = localStorage.getItem("userData");
  const decrypt = decryptData(encryptData);
  return decrypt;
};

export const logoutLocalStorage=()=>{
  localStorage.removeItem("userData");
  return {succes:true};
}
