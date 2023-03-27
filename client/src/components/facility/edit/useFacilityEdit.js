import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import { editFacility, getFacility } from "../../../services/facilityService";

const useFacilityEdit = () => {
  const { facilityId } = useParams();
  const { auth } = useAuthContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    description: "",
  });

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

    await editFacility(facilityId, {
      name,
      description,
      ownerId: auth.id,
    }).then(() => {
      navigator(`/`);
    });
  };

  useEffect(() => {
    (async () => {
      await getFacility(facilityId).then((response) => {
        setName(response.name);
        setDescription(response.description);
      });
    })();
  }, [facilityId]);

  return {
    name,
    handleNameChange,
    description,
    handleDescriptionChange,
    errors,
    handleEditOnClick,
  };
};

export default useFacilityEdit;
