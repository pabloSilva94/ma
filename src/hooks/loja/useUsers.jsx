import { supabase } from "../../services/supabase/supabase";

export const createNewUser = async (newUser) => {
  const { id, id_loja, name, email, password, phone, cpf } = newUser;
  console.log("dados antes de ir para o bd", newUser);
  try {
    if (!name || !email) {
      return { success: false, error: "Valores inválidos" };
    }

    const { data: getUsers, error: getUsersError } = await supabase
      .from("users")
      .select("name")
      .eq("id_loja", id_loja)
      .eq("id", id);
    console.log("select para verificar se existe alguem com id ", getUsers);
    if (getUsersError) {
      return { success: false, message: getUsersError.message };
    } else if (getUsers.length === 0) {
      const { data: insertData, error: insertError } = await supabase
        .from("users")
        .insert({ id, id_loja, name, email, password, phone, cpf });
      console.log("inserindo", insertData);
      if (insertError) {
        console.log(insertError);
        return { success: false, message: insertError.message };
      }
      return {
        success: true,
        message: "Usuario adicionado com sucesso",
        insertData,
      };
    }

    return { success: true, message: "Usuario criado com sucesso" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
