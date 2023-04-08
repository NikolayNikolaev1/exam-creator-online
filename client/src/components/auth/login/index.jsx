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
    <div className="form-wrapper">
      <p className="form-title">
        Exam <span className="form-p-subtitle">Online</span>
      </p>

      <input
        type="text"
        name="email"
        placeholder="Email"
        className="form-input legacy"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        type="password"
        name="password"
        className="form-input legacy"
        placeholder="Pasword"
        value={password}
        onChange={handlePasswordChange}
      />

      {error !== "" && <h5 className="error-msg">{error}</h5>}

      <input
        type="button"
        value="Login"
        className="form-btn"
        onClick={handleLoginOnClick}
      />
    </div>
  );
};

export default Login;
