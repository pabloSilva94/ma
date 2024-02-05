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
      .select("*, estados(name, tag), providers(id, name, is_adm)")
      .eq("providers.is_adm", true);
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
};
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

export const createNewUser = async (newUser) => {
  const { id, id_loja, name, email, password, phone } = newUser;
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
        .insert({ id, id_loja, name, email, password, phone });
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

export const loginOwner = async (login) => {
  const { email, password } = login;
  if (!email || !password) {
    return { success: false, message: "Dados inválidos" };
  }

  try {
    // Consulta para obter dados da tabela 'providers' (usuários)
    const { data: loginData, error: getError } = await supabase
      .from("providers")
      .select("*, lojas(name, active)")
      .eq("email", email)
      .eq("password", password);

    if (getError) {
      return { success: false, message: getError.message };
    }

    let lojaData;

    if (loginData && loginData.length > 0) {
      if (loginData[0]?.is_adm === true) {
        // Consulta para obter dados da tabela 'lojas' (lojas)
        const { data: lojaDataApi, error: erroLoja } = await supabase
          .from("lojas")
          .select(
            "users(id, name), services(id, name, value), schedule(*,user:users(id, name), provider:providers(id, name), service:services(id, name, value)), providers(*)"
          )
          .eq("id", loginData[0].id_loja);

        if (erroLoja) {
          return { success: false, message: erroLoja.message };
        }

        lojaData = {
          ...loginData[0],
          lojaDataApi: {
            users: lojaDataApi[0]?.users || [],
            services: lojaDataApi[0]?.services || [],
            providers: lojaDataApi[0]?.providers || [],
            schedule: lojaDataApi[0]?.schedule || [],
          },
        };
      } else {
        // Consulta para obter dados da tabela 'lojas' (lojas) para usuários não administradores
        const { data: loginProvider, error: erroLoginProvider } = await supabase
          .from("lojas")
          .select("users(id, name), services(id, name, value), schedule(*)")
          .eq("id", loginData[0].id_loja)
          .eq("schedule(id)", loginData[0].id);

        if (erroLoginProvider) {
          return { success: false, message: erroLoginProvider.message };
        }

        lojaData = {
          loginData: loginData[0],
          lojaDataApi: {
            users: loginProvider[0]?.users || [],
            services: loginProvider[0]?.services || [],
            schedule: loginProvider[0]?.schedule || [],
          },
        };
      }

      return { success: true, lojaData };
    }

    return { success: false, message: "Ops! Algo deu errado" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
export const getAllInfosLoja = async (idLoja) => {
  const { id_loja } = idLoja;
  if (!id_loja) {
    return { success: false, message: "Dados inválidos" };
  }

  try {
    // Consulta para obter dados da tabela 'providers' (usuários)
    const { data: loginData, error: getError } = await supabase
      .from("providers")
      .select("*, lojas(name, active)")
      .eq("id_loja", id_loja);

    if (getError) {
      return { success: false, message: getError.message };
    }

    let lojaData;

    if (loginData && loginData.length > 0) {
      if (loginData[0]?.is_adm === true) {
        // Consulta para obter dados da tabela 'lojas' (lojas)
        const { data: lojaDataApi, error: erroLoja } = await supabase
          .from("lojas")
          .select(
            "users(id, name), services(id, name, value), schedule(*,user:users(id, name), provider:providers(id, name), service:services(id, name, value)), providers(*)"
          )
          .eq("id", loginData[0].id_loja);

        if (erroLoja) {
          return { success: false, message: erroLoja.message };
        }

        lojaData = {
          ...loginData[0],
          lojaDataApi: {
            users: lojaDataApi[0]?.users || [],
            services: lojaDataApi[0]?.services || [],
            providers: lojaDataApi[0]?.providers || [],
            schedule: lojaDataApi[0]?.schedule || [],
          },
        };
      } else {
        // Consulta para obter dados da tabela 'lojas' (lojas) para usuários não administradores
        const { data: loginProvider, error: erroLoginProvider } = await supabase
          .from("lojas")
          .select("users(id, name), services(id, name, value), schedule(*)")
          .eq("id", loginData[0].id_loja)
          .eq("schedule(id)", loginData[0].id);

        if (erroLoginProvider) {
          return { success: false, message: erroLoginProvider.message };
        }

        lojaData = {
          loginData: loginData[0],
          lojaDataApi: {
            users: loginProvider[0]?.users || [],
            services: loginProvider[0]?.services || [],
            schedule: loginProvider[0]?.schedule || [],
          },
        };
      }

      return { success: true, lojaData };
    }

    return { success: false, message: "Ops! Algo deu errado" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

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
export const getDataHorario = async (dataProvider) => {
  const { date, id_provider, id_loja } = dataProvider;
  if (!date || !id_provider || !id_loja) {
    return { success: false, message: "Dados invalidos" };
  }
  try {
    const { data: scheduleData, error: getScheduleError } = await supabase
      .from("schedule")
      .select("date, time")
      .eq("id_provider", id_provider)
      .eq("id_loja", id_loja)
      .eq("date", date);
    if (getScheduleError) {
      return { success: false, message: getScheduleError.message };
    }

    return { success: true, scheduleData };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
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

// export const getAllAgendamentosLoja = async (idLoja) => {
//   const { id_loja, is_adm, data } = idLoja;
//   if (!id_loja || !is_adm || !data) {
//     return { success: false, message: "Dados invalidos" }
//   }
//   try {
//     const { data: agendamentosData, error: getError } = await supabase
//       .from("schedule").select("*").eq("id", id_loja).eq("date", data);
//     if (getError) {
//       return { success: false, message: getError.message };
//     }

//     return { success: true, agendamentosData };
//   } catch (error) {
//     return { success: false, message: error.message };
//   }
// }
