import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import useAuth from "../useAuth";

const useLogin = () => {
  const { email, handleEmailChange, password, handlePasswordChange } =
    useAuth();
  const [error, setError] = useState("");
  const { onLogin } = useAuthContext();
  const navigate = useNavigate();

  const handleLoginOnClick = async (event) => {
    event.preventDefault();
    setError("");

    if (email === "" || password === "") {
      setError("Email and password are required.");
      return;
    }

    await onLogin({ email, password })
      .then(() => navigate("/"))
      .catch((error) => setError(error));
  };

  return {
    email,
    handleEmailChange,
    password,
    handlePasswordChange,
    error,
    handleLoginOnClick,
  };
};

export default useLogin;
