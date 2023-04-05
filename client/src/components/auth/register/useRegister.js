import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import { register } from "../../../services/authService";
import useAuth from "../useAuth";

const useRegister = () => {
  const { auth } = useAuthContext();
  const { email, handleEmailChange, password, handlePasswordChange } =
    useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("lecturer");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFirstNameChange = (event) => {
    event.preventDefault();
    const currentFirstName = event.target.value;

    setFirstName(currentFirstName);
  };

  const handleLastNameChange = (event) => {
    event.preventDefault();
    const currentLastName = event.target.value;

    setLastName(currentLastName);
  };

  const handleRoleOnChange = (event) => {
    event.preventDefault();
    setRole((oldRole) => (oldRole === "lecturer" ? "student" : "lecturer"));
  };

  const handleRegisterOnClick = (event) => {
    event.preventDefault();

    if ([email, password, firstName, lastName].includes("")) {
      setError("All fields are requried.");
      return;
    }

    register({
      email,
      password,
      firstName,
      lastName,
      roleId: role === "lecturer" ? 2 : 3,
      facilityId: auth.facilityId,
      creatorId: auth.id,
    }).catch((error) => {
      switch (error.statusCode) {
        case 400:
          setError(`User with email '${email}' already exists.`);
          break;
      }
    });
  };

  useEffect(() => {
    if (auth.role !== "Owner") {
      navigate("/");
    }
  }, [auth]);

  return {
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
  };
};

export default useRegister;
