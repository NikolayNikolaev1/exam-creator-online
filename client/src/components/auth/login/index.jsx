import "../Auth.css";
import useLogin from "./useLogin";

const Login = () => {
  const {
    email,
    handleEmailChange,
    password,
    handlePasswordChange,
    error,
    handleLoginOnClick,
  } = useLogin();

  return (
    <div className="get-started" id="login-screen">
      <p className="get-started-title">
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
