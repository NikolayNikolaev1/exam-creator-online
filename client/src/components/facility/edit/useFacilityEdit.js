import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import { editFacility } from "../../../services/facilityService";
import { useFacilityContext } from "../../../contexts/FacilityContext";

const useFacilityEdit = () => {
  const { facilityId } = useParams();
  const { auth } = useAuthContext();
  const { facility } = useFacilityContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    description: "",
  });
  const navigate = useNavigate();

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
    if (typeof auth.id === "undefined") {
      navigate("/login");
      return;
    }

    if (auth.id !== facility.members.find((m) => m.role === "Owner").id) {
      navigate("/");
      return;
    }

    setName(facility.name);
    setDescription(facility.description);
  }, [auth, facilityId]);

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
