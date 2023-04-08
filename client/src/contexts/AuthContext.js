import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { login } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useLocalStorage("auth", {});

  const onLogin = async (credentials) => {
    await login(credentials)
      .then((credentialsData) => {
        setAuth({
          id: credentialsData.id,
          email: credentialsData.email,
          name: credentialsData.firstName + " " + credentialsData.lastName,
          role: credentialsData.role,
          facilityId: credentialsData.facilityId,
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

  const handleNameChange = (firstName, lastName) => {
    setAuth((oldAuth) => ({
      ...oldAuth,
      name: firstName + " " + lastName,
    }));
  };

  const onLogout = () => setAuth({});

  const contextValues = {
    auth,
    onLogin,
    onLogout,
    handleNameChange,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
