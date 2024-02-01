import "./App.css";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./routes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
