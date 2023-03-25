import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import { login } from "../../../services/authService";
import "../Auth.css";
import useAuth from "../useAuth";

const Login = () => {
  const { email, handleEmailChange, password, handlePasswordChange } =
    useAuth();
  const [error, setError] = useState("");
  const { onLogin } = useAuthContext();
  const navigate = useNavigate();

  const handleLoginOnClick = async (event) => {
    event.preventDefault();

    if (email === "" || password === "") {
      setError("Email and password are required.");
      return;
    }

    await onLogin({ email, password })
      .then(() => navigate("/"))
      .catch((error) => setError(error));
  };

  return (
    <div className="get-started" id="login-screen">
      <p>
        Exam <span className="login-p-subtitle">Online</span>
      </p>

      <input
        type="text"
        name="email"
        id="email"
        placeholder="Email"
        className="login-form"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        type="password"
        name="password"
        id="password"
        className="login-form"
        placeholder="Pasword"
        value={password}
        onChange={handlePasswordChange}
      />

      {error !== "" && <h5>{error}</h5>}

      <input
        type="button"
        value="Login"
        className="login-btn"
        onClick={handleLoginOnClick}
      />
    </div>
  );
};

export default Login;
