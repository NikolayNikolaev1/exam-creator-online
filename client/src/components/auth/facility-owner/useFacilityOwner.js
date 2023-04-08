import { useState } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
import { createFacilityOwner } from "../../../services/facilityService";
import useAuth from "../useAuth";

const useFacilityOwner = () => {
  const { auth } = useAuthContext();
  const { email, handleEmailChange, password, handlePasswordChange } =
    useAuth();
  const [facilityName, setFacilityNmae] = useState("");
  const [error, setError] = useState("");
  const [successMeessage, setSuccessMessage] = useState("");

  const handleFacilityNameChange = (event) => {
    event.preventDefault();
    const currentFacilityName = event.target.value;

    setFacilityNmae(currentFacilityName);
  };

  const handleFacilityCreateOnClick = async (event) => {
    event.preventDefault();

    setError("");
    setSuccessMessage("");

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
      description:
        "Example Description - Please change it before using the facility.",
      firstName: "Facility",
      lastName: "Owner",
      adminId: auth.id,
    })
      .then(() => {
        setSuccessMessage(
          `Successfully created an owner account with email: ${email}.`
        );
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
    facilityName,
    handleFacilityNameChange,
    error,
    handleFacilityCreateOnClick,
    successMeessage,
  };
};

export default useFacilityOwner;
