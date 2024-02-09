import { supabase } from "../../services/supabase/supabase";
export const createServicesApi = async (servicesLoja) => {
  const { id_loja, name, value } = servicesLoja;
  console.log("dados antes de ir para o bd", servicesLoja);
  try {
    if (!id_loja || !name || !value) {
      return { success: false, error: "Valores inválidos" };
    }

    const { data: getLoja, error: getLojaError } = await supabase
      .from("lojas")
      .select("id")
      .eq("id", id_loja);
    console.log("select para verificar se existe alguem com id ", getLoja);
    if (getLojaError) {
      return { success: false, message: getLojaError.message };
    } else if (getLoja.length > 0) {
      const { data: insertData, error: insertError } = await supabase
        .from("services")
        .insert({ id_loja, name, value });
      console.log("inserindo", insertData);
      if (insertError) {
        console.log(insertError);
        return { success: false, message: insertError.message };
      }
      return {
        success: true,
        message: "Serviço adicionado com sucesso",
        insertData,
      };
    }

    return { success: true, message: "Serviço criado com sucesso" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
