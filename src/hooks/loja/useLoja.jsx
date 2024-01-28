import { supabase } from "../../services/supabase/supabase";
export const createNewLoja = async (newLoja) => {
  const { id, name, cnpj, phone, active } = newLoja;
  try {
    if (!name || !cnpj || !phone) {
      return { success: false, error: "Valores inválidos" };
    }
    const { data, error: insertError } = await supabase
      .from("lojas")
      .insert({ id, name, cnpj, phone, active });
    if (insertError) {
      console.log(insertError);
      throw insertError;
    }
    return { success: true, message: "Loja criada com sucesso" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getLojas = async () => {
  try {
    const { data: lojaData, error: getError } = await supabase
      .from("lojas")
      .select(
        "*, estados(name, tag), providers(id, name, is_adm)"
      ).eq("providers.is_adm", true);
    if (getError) {
      return { success: false, message: getError.message };
    }

    return { success: true, lojaData };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
export const getEstados = async () => {
  try {
    const { data: getEstadosData, error: getEstadosError } = await supabase
      .from("estados")
      .select("*");
    if (getEstadosError) {
      return { success: false, message: getEstadosError.message };
    }
    return { success: true, getEstadosData };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
export const editLojaApi = async (editDataLoja) => {
  const { id, name, cnpj, phone } = editDataLoja;
  try {
    if (!name || !cnpj || !phone) {
      return { success: false, error: "Valores inválidos" };
    }
    const { data: getOneLoja, error: getOneLojaError } = await supabase
      .from("lojas")
      .select("id")
      .eq("id", id);
    console.log(getOneLoja);
    if (getOneLojaError) {
      return { success: false, menssage: getOneLojaError.message };
    } else if (getOneLoja.length > 0) {
      const { error: insertError } = await supabase
        .from("lojas")
        .update({ name, cnpj, phone })
        .eq("id", id);
      if (insertError) {
        return { success: false, menssage: insertError.message };
      }
      return { success: true, menssage: "Loja Alterado com sucesso" };
    }
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
export const playLojaApi = async (idLoja) => {
  const { id, active } = idLoja;
  try {
    if (!id) {
      return { success: false, error: "Valores inválidos" };
    }
    const { data: getIdLoja, error: getIdLojaError } = await supabase
      .from("lojas")
      .select("id, active")
      .eq("id", id);
    if (getIdLojaError) {
      return { success: false, menssage: getIdLojaError.message };
    } else if (getIdLoja.length > 0) {
      const { error: insertError } = await supabase
        .from("lojas")
        .update({ active })
        .eq("id", id);
      if (insertError) {
        return { success: false, menssage: insertError.message };
      }
      return { success: true, menssage: "Loja Aberta novamente" };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};
export const pouseLojaApi = async (idLoja) => {
  const { id, active } = idLoja;
  try {
    if (!id) {
      return { success: false, error: "Valores inválidos" };
    }
    const { data: getIdLoja, error: getIdLojaError } = await supabase
      .from("lojas")
      .select("id, active")
      .eq("id", id);
    if (getIdLojaError) {
      return { success: false, menssage: getIdLojaError.message };
    } else if (getIdLoja.length > 0) {
      const { error: insertError } = await supabase
        .from("lojas")
        .update({ active })
        .eq("id", id);
      if (insertError) {
        return { success: false, menssage: insertError.message };
      }
      return { success: true, menssage: "Loja Palsada com sucesso" };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const createNewProvider = async (newProvider) => {
  const { id, id_loja, name, email, password, phone, is_adm, is_provider } = newProvider;
  console.log("dados antes de ir para o bd", newProvider);
  try {
    if (!name || !email) {
      return { success: false, error: "Valores inválidos" };
    }

    const { data: getProvider, error: getProviderError } = await supabase
      .from("providers")
      .select("name").eq("id_loja", id_loja).eq("id", id);
    console.log("select para verificar se existe alguem com id ", getProvider);
    if (getProviderError) {
      return { success: false, message: getProviderError.message }
    } else if (getProvider.length === 0) {
      const { data: insertData, error: insertError } = await supabase
        .from("providers")
        .insert({ id, id_loja, name, email, password, phone, is_adm, is_provider });
      console.log("inserindo", insertData);
      if (insertError) {
        console.log(insertError);
        return { success: false, message: insertError.message, }
      }
      return { success: true, message: "Gerente com sucesso", insertData };
    }

    return { success: true, message: "Loja criada com sucesso" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const loginOwner = async (login) => {
  const {email, password} = login
  if(!email || !password){
    return{success:false, message:"Dados invalidos"}
  }
  try {
    const { data: lojaData, error: getError } = await supabase
      .from("providers")
      .select(
        "*, loja(name), providers(id, name)"
      ).eq("email",email ).eq("password",password);
    if (getError) {
      return { success: false, message: getError.message };
    }

    return { success: true, lojaData };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
