import crypto from "crypto-js";

const salt = "QWERTy@!!2024";

export const encryptData = (data) => {
  try {
    const encryptedData = crypto.AES.encrypt(
      JSON.stringify(data),
      `${salt}_chave_de_criptografia`
    ).toString();
    return encryptedData;
  } catch (error) {
    console.error("Error during encryption:", error);
    return { success: false, message: error.message };
  }
};

export const decryptData = (encryptedData) => {
  try {
    const decryptedBytes = crypto.AES.decrypt(
      encryptedData,
      `${salt}_chave_de_criptografia`
    );
    const decryptedData = JSON.parse(decryptedBytes.toString(crypto.enc.Utf8));
    return decryptedData;
  } catch (error) {
    console.error("Error during decryption:", error);
    return null;
  }
};
