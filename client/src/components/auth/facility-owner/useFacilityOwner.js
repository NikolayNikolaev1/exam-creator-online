import { useState } from "react";
import { createFacilityOwner } from "../../../services/authService";
import useAuth from "../useAuth";

const useFacilityOwner = () => {
  const { email, handleEmailChange, password, handlePasswordChange } =
    useAuth();
  const [facilityName, setFacilityNmae] = useState("");
  const [error, setError] = useState("");

  const handleFacilityNameChange = (event) => {
    event.preventDefault();
    const currentFacilityName = event.target.value;

    setFacilityNmae(currentFacilityName);
  };

  const handleFacilityCreateOnClick = async (event) => {
    event.preventDefault();

    if ([email, password, facilityName].includes("")) {
      setError("All fields are required.");
      return;
    }

    if (password.length < 3) {
      setError("Password length must be more than 3 characters long.");
      return;
    }

    if (facilityName.length < 3) {
      setError("Facility name must be atleast 3 characters long.");
      return;
    }

    await createFacilityOwner({
      email,
      password,
      facilityName,
    }).then(() => {
      setError("");
    });
  };

  return {
    email,
    handleEmailChange,
    password,
    handlePasswordChange,
    facilityName,
    handleFacilityNameChange,
    error,
    handleFacilityCreateOnClick,
  };
};

export default useFacilityOwner;
