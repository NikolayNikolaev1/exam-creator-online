import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
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
    successMeessage,
  } = useRegister();
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
      <input
        type="text"
        name="first-name"
        className="form-input legacy"
        placeholder="First Name"
        value={firstName}
        onChange={handleFirstNameChange}
      />
      <input
        type="text"
        name="last-name"
        className="form-input legacy"
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
      {error !== "" && <h5 className="error-msg">{error}</h5>}
      {successMeessage !== "" && (
        <h5 className="success-msg">{successMeessage}</h5>
      )}
      <input
        type="button"
        value="Register User"
        className="form-btn"
        onClick={handleRegisterOnClick}
      />
    </div>
  );
};

export default Register;
