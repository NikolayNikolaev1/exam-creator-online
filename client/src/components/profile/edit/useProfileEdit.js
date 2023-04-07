import { useState } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
import { editUser } from "../../../services/userService";
import { useFacilityContext } from "../../../contexts/FacilityContext";

const useProfileEdit = () => {
  const { auth, handleNameChange } = useAuthContext();
  const { setFacility } = useFacilityContext();
  const [firstName, setFirstName] = useState(auth.name.split(" ")[0]);
  const [lastName, setLastName] = useState(auth.name.split(" ")[1]);
  const [successMessage, setSuccessMessage] = useState();

  const handleFirstNameOnChange = (event) => {
    event.preventDefault();

    setFirstName(event.target.value);
  };

  const handleLastNameOnChange = (event) => {
    event.preventDefault();

    setLastName(event.target.value);
  };

  const handleEditOnClick = async (event) => {
    event.preventDefault();

    await editUser({
      firstName,
      lastName,
      userId: auth.id,
    }).then((userData) => {
      setFacility((oldFacility) => ({
        ...oldFacility,
        members: oldFacility.members.map((m) =>
          m.id === auth.id ? userData : m
        ),
      }));
      handleNameChange(userData.firstName, userData.lastName);
      setSuccessMessage("Successfully edited profile.");
    });
  };

  return {
    firstName,
    handleFirstNameOnChange,
    lastName,
    handleLastNameOnChange,
    successMessage,
    handleEditOnClick,
  };
};

export default useProfileEdit;
