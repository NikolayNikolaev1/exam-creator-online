import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import { editFacility } from "../../../services/facilityService";
import { useFacilityContext } from "../../../contexts/FacilityContext";

const useFacilityEdit = () => {
  const { facilityId } = useParams();
  const { auth } = useAuthContext();
  const { facility, setFacility } = useFacilityContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    description: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleNameChange = (event) => {
    event.preventDefault();
    const currentName = event.target.value;
    let nameError = "";

    if (currentName.length < 3) {
      nameError = "Facility name must be 3 or more characters long.";
    }

    setErrors((oldErrors) => ({
      ...oldErrors,
      name: nameError,
    }));

    setName(currentName);
  };

  const handleDescriptionChange = (event) => {
    event.preventDefault();
    const currentDescription = event.target.value;

    setDescription(currentDescription);
  };

  const handleEditOnClick = async (event) => {
    event.preventDefault();

    setErrors({
      name: "",
      description: "",
    });
    setSuccessMessage("");

    await editFacility(facilityId, {
      name,
      description,
      ownerId: auth.id,
    }).then((facilityData) => {
      setSuccessMessage("Successfully edited facility");
      setFacility((oldFacility) => ({
        ...oldFacility,
        name: facilityData.name,
        description: facilityData.description,
      }));
    });
  };

  useEffect(() => {
    setName(facility.name);
    setDescription(facility.description);
  }, [facility]);

  return {
    name,
    handleNameChange,
    description,
    handleDescriptionChange,
    errors,
    successMessage,
    handleEditOnClick,
  };
};

export default useFacilityEdit;
