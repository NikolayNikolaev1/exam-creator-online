import { useState } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
import { register } from "../../../services/authService";
import useAuth from "../useAuth";
import { useFacilityContext } from "../../../contexts/FacilityContext";

const useRegister = () => {
  const { auth } = useAuthContext();
  const { email, handleEmailChange, password, handlePasswordChange } =
    useAuth();
  const { setFacility } = useFacilityContext();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("lecturer");
  const [error, setError] = useState("");
  const [successMeessage, setSuccessMessage] = useState("");

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

    setError("");
    setSuccessMessage("");

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
    })
      .then((userData) => {
        setError("");
        setSuccessMessage(
          `Successfully created a ${role} account with email: ${email}.`
        );
        setFacility((oldFacility) => ({
          ...oldFacility,
          members: [...oldFacility.members, userData],
        }));
      })
      .catch((error) => {
        switch (error.statusCode) {
          case 400:
            setError(`User with email '${email}' already exists.`);
            break;
          default:
            setError("Server error.");
            break;
        }
      });
  };

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
    successMeessage,
  };
};

export default useRegister;
