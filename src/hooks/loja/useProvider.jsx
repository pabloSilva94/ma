import { supabase } from "../../services/supabase/supabase";

export const createNewProvider = async (newProvider) => {
  const {
    id,
    id_loja,
    name,
    email,
    password,
    phone,
    is_adm,
    is_provider,
    is_block,
    first_access,
  } = newProvider;
  console.log("dados antes de ir para o bd", newProvider);
  try {
    if (!name || !email) {
      return { success: false, error: "Valores inválidos" };
    }

    const { data: getProvider, error: getProviderError } = await supabase
      .from("providers")
      .select("name")
      .eq("id_loja", id_loja)
      .eq("id", id);
    console.log("select para verificar se existe alguem com id ", getProvider);
    if (getProviderError) {
      return { success: false, message: getProviderError.message };
    } else if (getProvider.length === 0) {
      const { data: insertData, error: insertError } = await supabase
        .from("providers")
        .insert({
          id,
          id_loja,
          name,
          email,
          password,
          phone,
          is_adm,
          is_provider,
          first_access,
          is_block,
        });
      console.log("inserindo", insertData);
      if (insertError) {
        console.log(insertError);
        return { success: false, message: insertError.message };
      }
      return { success: true, message: "Gerente com sucesso", insertData };
    }

    return { success: true, message: "Loja criada com sucesso" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
