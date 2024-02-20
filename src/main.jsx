import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ConfigProvider } from 'antd'
import ptBR from "antd/lib/locale/pt_BR";

ReactDOM.createRoot(document.getElementById('root')).render(
  <ConfigProvider locale={ptBR} theme={{
    token: {
      colorPrimary: "#413ED0"
    }
  }}>
    <App />
  </ConfigProvider>,
)
