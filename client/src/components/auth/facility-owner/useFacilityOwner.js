import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import { createFacilityOwner } from "../../../services/facilityService";
import useAuth from "../useAuth";

const useFacilityOwner = () => {
  const { auth } = useAuthContext();
  const { email, handleEmailChange, password, handlePasswordChange } =
    useAuth();
  const [facilityName, setFacilityNmae] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      name: facilityName,
      adminId: auth.id,
    }).then(() => {
      setError("");
    });
  };

  useEffect(() => {
    if (auth.role !== "Admin") {
      navigate("/");
    }
  }, [auth]);

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
