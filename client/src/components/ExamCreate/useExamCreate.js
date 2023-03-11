import { useEffect, useState } from "react";
import { validatePoints } from "./examCreateHelpers";

const useExamCreate = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState({
    averagePoints: 0,
    goodPoints: 0,
    veryGoodPoints: 0,
    excelentPoints: 0,
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    averagePoints: "",
    goodPoints: "",
    veryGoodPoints: "",
    excelentPoints: "",
  });

  const handleNameChange = (event) => {
    event.preventDefault();
    const currentName = event.target.value;
    let nameErrorMessage = "";

    if (currentName.length < 3 || currentName.length > 15) {
      nameErrorMessage =
        "Name length must be between 3 and 15 characters long.";
    }

    if (currentName === "") nameErrorMessage = "Name is required.";

    setErrors((oldErrors) => ({
      ...oldErrors,
      name: nameErrorMessage,
    }));

    setName(currentName);
  };

  const handleDescriptionChange = (event) => {
    event.preventDefault();
    const currentDescription = event.target.value;
    let descriptionErrorMessage = "";

    if (currentDescription.length > 50) {
      descriptionErrorMessage = "Description can be max 50 characters long.";
    }

    setErrors({
      ...errors,
      description: descriptionErrorMessage,
    });

    setDescription(currentDescription);
  };

  const handlePointsChange = (event, forScore) => {
    event.preventDefault();
    const currentPoints = Number(event.target.value);
    let pointsErrorMessage = "";

    if (currentPoints <= 0) {
      pointsErrorMessage = "Points can not be less than 0.";
    }

    setErrors({ ...errors, [forScore]: pointsErrorMessage });

    setPoints({
      ...points,
      [forScore]: currentPoints,
    });
  };

  useEffect(() => {
    validatePoints(points, setErrors);
  }, [points]);

  return {
    name,
    handleNameChange,
    description,
    handleDescriptionChange,
    points,
    handlePointsChange,
    errors,
  };
};

export default useExamCreate;
