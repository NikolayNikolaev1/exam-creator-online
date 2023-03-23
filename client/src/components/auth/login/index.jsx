import { useState } from "react";
import { login } from "../../../services/authService";
import "../Auth.css";
import useAuth from "../useAuth";

const Login = () => {
  const { email, handleEmailChange, password, handlePasswordChange } =
    useAuth();
  const [error, setError] = useState("");

  const handleLoginOnClick = async (event) => {
    event.preventDefault();

    if (email === "" || password === "") {
      setError("Email and password are required.");
      return;
    }

    await login({ email, password });
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
