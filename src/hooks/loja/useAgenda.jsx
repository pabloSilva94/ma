import { supabase } from "../../services/supabase/supabase";

export const createAgendamentoApi = async (agendamentoLoja) => {
  const { id_loja, id_provider, id_service, id_user, time, date } =
    agendamentoLoja;
  console.log("dados antes de ir para o bd", agendamentoLoja);
  try {
    if (!id_loja || !id_provider || !id_service || !id_user) {
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
        .from("schedule")
        .insert({ id_loja, id_provider, id_service, id_user, time, date });
      console.log("inserindo", insertData);
      if (insertError) {
        console.log(insertError);
        return { success: false, message: insertError.message };
      }
      return {
        success: true,
        message: "Horaio adicionado com sucesso",
        insertData,
      };
    }

    return { success: true, message: "Horaio criado com sucesso" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
export const editAgendamentoApi = async (editDataAgendamento) => {
  const { id,
    id_loja,
    id_service,
    id_provider,
    date,
    time } = editDataAgendamento;
  try {
    if (!id_loja || !id || !date) {
      return { success: false, error: "Valores inválidos" };
    }
    const { data: getOneAgenda, error: getOneAgendaError } = await supabase
      .from("lojas")
      .select("id")
      .eq("id", id_loja);
    console.log(getOneAgenda);
    if (getOneAgendaError) {
      return { success: false, menssage: getOneAgendaError.message };
    } else if (getOneAgenda.length > 0) {
      const { error: insertError } = await supabase
        .from("schedule")
        .update({ id_provider, id_service, date, time })
        .eq("id", id);
      if (insertError) {
        return { success: false, menssage: insertError.message };
      }
      return { success: true, menssage: "Agendamento Alterado com sucesso" };
    }
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
export const deleteAgendamentoApi = async (idAgenda) => {
  const { id,
    id_loja,
    id_provider
  } = idAgenda;
  try {
    if (!id_loja || !id) {
      return { success: false, error: "Valores inválidos" };
    }
    const { data: getOneAgenda, error: getOneAgendaError } = await supabase
      .from("lojas")
      .select("id")
      .eq("id", id_loja);
    console.log(getOneAgenda);
    if (getOneAgendaError) {
      return { success: false, menssage: getOneAgendaError.message };
    } else if (getOneAgenda.length > 0) {
      const { error: deleteError } = await supabase
        .from("schedule").delete().eq("id", id).eq("id_loja", id_loja).eq("id_provider", id_provider);
      if (deleteError) {
        return { success: false, menssage: deleteError.message };
      }
      return { success: true, menssage: "Agendamento deletado com sucesso" };
    }
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
