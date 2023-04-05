import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import "../Auth.css";
import useRegister from "./useRegister";

const Register = () => {
  const {
    email,
    handleEmailChange,
    password,
    handlePasswordChange,
    firstName,
    handleFirstNameChange,
    lastName,
    handleLastNameChange,
    role,
    handleRoleOnChange,
    error,
    handleRegisterOnClick,
  } = useRegister();
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
      <input
        type="text"
        name="first-name"
        id="first-name"
        className="login-form"
        placeholder="First Name"
        value={firstName}
        onChange={handleFirstNameChange}
      />
      <input
        type="text"
        name="last-name"
        id="last-name"
        className="login-form"
        placeholder="Last Name"
        value={lastName}
        onChange={handleLastNameChange}
      />
      <FormLabel id="demo-row-radio-buttons-group-label">User role</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={role}
        onChange={handleRoleOnChange}
      >
        <FormControlLabel
          value="lecturer"
          control={<Radio />}
          label="Lecturer"
        />
        <FormControlLabel value="student" control={<Radio />} label="Student" />
      </RadioGroup>
      {error !== "" && <h5>{error}</h5>}
      <input
        type="button"
        value="Register User"
        className="login-btn"
        onClick={handleRegisterOnClick}
      />
    </div>
  );
};

export default Register;
