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

export const loginUser = async (login) => {
  const { email, password, id_loja } = login;
  if (!email || !password) {
    return { success: false, message: "Dados inválidos" };
  }

  try {
    // Consulta para obter dados do usuário
    const { data: userData, error: userError } = await supabase
      .from("user")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .eq("id_loja", id_loja)
      .single(); // Assume que apenas um usuário corresponderá a esse email e senha

    if (userError) {
      return { success: false, message: userError.message };
    }

    if (!userData) {
      return { success: false, message: "Credenciais inválidas" };
    }

    // Consulta para obter dados da loja
    const { data: lojaData, error: lojaError } = await supabase
      .from("lojas")
      .select("*")
      .eq("id", id_loja)
      .single(); // Assume que apenas uma loja corresponderá a esse id

    if (lojaError) {
      return { success: false, message: lojaError.message };
    }

    // Consulta para obter serviços da loja
    const { data: servicesData, error: servicesError } = await supabase
      .from("services")
      .select("*")
      .eq("id_loja", id_loja);

    if (servicesError) {
      return { success: false, message: servicesError.message };
    }

    // Consulta para obter prestadores da loja
    const { data: providersData, error: providersError } = await supabase
      .from("providers")
      .select("*")
      .eq("id_loja", id_loja);

    if (providersError) {
      return { success: false, message: providersError.message };
    }

    // Consulta para obter a programação da loja
    const { data: scheduleData, error: scheduleError } = await supabase
      .from("schedule")
      .select("*")
      .eq("id_loja", id_loja);

    if (scheduleError) {
      return { success: false, message: scheduleError.message };
    }

    // Agora, organize os dados em um objeto de resposta
    const responseData = {
      user: userData,
      loja: lojaData,
      services: servicesData || [],
      providers: providersData || [],
      schedule: scheduleData || [],
    };

    return { success: true, data: responseData };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

