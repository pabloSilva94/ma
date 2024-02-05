import { Cascader } from "antd";

export const CascadeProviders = ({
  onChangeProvider,
  selectedProvider,
  setSelectedProvider,
  providerApi,
}) => {
  const optionsApi = providerApi.map((provider) => ({
    value: provider.id,
    label: provider.name,
    key: provider.id,
  }));
  const onChange = (selectedOptionsProvider) => {
    if (Array.isArray(selectedOptionsProvider) && selectedOptionsProvider.length > 0) {
      const selectedProviderString = selectedOptionsProvider.join(', ');
      setSelectedProvider(selectedOptionsProvider);
      if (onChangeProvider) {
        onChangeProvider(selectedProviderString);
      }
      console.log(selectedOptionsProvider);
    }
  };


  return (
    <Cascader
      options={optionsApi}
      onChange={onChange}
      value={selectedProvider}
      placeholder="Selecione um prestador"
    />
  );
};

export const CascadeServicos = ({
  servicosApi,
  onChangeService,
  selectedServices,
  setSelectedServices,
}) => {
  const options = servicosApi.map((service) => ({
    value: service.id,
    label: service.name,
    key: service.id,
  }));

  const onChange = (selectedOptions) => {
    if (Array.isArray(selectedOptions) && selectedOptions.length > 0) {
      const selectedProviderString = selectedOptions.join(', ');
      setSelectedServices(selectedOptions);
      if (onChangeService) {
        onChangeService(selectedProviderString);
      }
      console.log(selectedOptions);
    }
  };

  return (
    <Cascader
      options={options}
      onChange={onChange}
      value={selectedServices}
      placeholder="Selecione um serviço"
    />
  );
};
export const CascadeUsers = ({
  selectedUser,
  usersApi,
  onChangeUsers,
  setSelectedUser,
}) => {
  const options = usersApi.map((user) => ({
    value: user.id,
    label: user.name,
    key: user.id,
  }));

  const onChange = (selectedOptions) => {
    if (Array.isArray(selectedOptions) && selectedOptions.length > 0) {
      const selectedUserString = selectedOptions.join(', ');
      setSelectedUser(selectedOptions);
      if (onChangeUsers) {
        onChangeUsers(selectedUserString);
      }
      console.log(selectedOptions);
    }
  };

  return (
    <Cascader
      options={options}
      onChange={onChange}
      value={selectedUser}
      placeholder="Selecione um usuario"
    />
  );
};


