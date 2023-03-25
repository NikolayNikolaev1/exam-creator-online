import { createContext, useContext, useState } from "react";
import { login } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const onLogin = async (credentials) => {
    await login(credentials)
      .then((response) => {
        setAuth({
          id: response.id,
          email: response.email,
          role: response.role,
          facilityId: response.facilityId,
        });
      })
      .catch((error) => {
        switch (error.statusCode) {
          case 400:
            throw "Email is not valid";
          case 404:
            throw "User with given credentials not found.";
          default:
            throw "Server error.";
        }
      });
  };

  const onLogout = () => setAuth({});

  const contextValues = {
    auth,
    onLogin,
    onLogout,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
