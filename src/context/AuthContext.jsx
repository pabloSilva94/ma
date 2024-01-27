const { createContext } = require("react");

const AuthContext = createContext();
function AuthProvider({ children }) {
    <AuthContext.Provider>
        {children}
    </AuthContext.Provider>
}
export { AuthProvider, AuthContext, }