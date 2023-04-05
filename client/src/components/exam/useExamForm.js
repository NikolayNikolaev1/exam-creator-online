import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { addExam, editExam } from "../../services/examService";
import { validatePoints } from "./examHelpers";
import { useFacilityContext } from "../../contexts/FacilityContext";

const useExamForm = (exam) => {
  const { auth } = useAuthContext();
  const { setFacility } = useFacilityContext();
  const navigate = useNavigate();
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState({
    averagePoints: 50,
    goodPoints: 65,
    veryGoodPoints: 75,
    excelentPoints: 90,
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

  const handleAddOnClick = async (event) => {
    event.preventDefault();

    if (name.length < 3 || name.length > 15) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        name: "Name length must be between 3 and 15 characters long.",
      }));
      return;
    }

    const { averagePoints, goodPoints, veryGoodPoints, excelentPoints } =
      points;

    await addExam({
      name,
      description,
      averagePoints,
      goodPoints,
      veryGoodPoints,
      excelentPoints,
      facilityId: auth.facilityId,
      lecturerId: auth.id,
    })
      .then((response) => {
        setFacility((oldFacility) => ({
          ...oldFacility,
          exams: [...oldFacility.exams, response],
        }));
        navigate(`/exam/${response.id}`);
      })
      .catch((error) => {
        switch (error.statusCode) {
          case 400:
            setErrors((oldErrors) => ({
              ...oldErrors,
              name: "Exam name already exists in this facility.",
            }));
        }
      });
  };

  const handleEditOnClick = async (event) => {
    event.preventDefault();

    if (name.length < 3 || name.length > 15) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        name: "Name length must be between 3 and 15 characters long.",
      }));
      return;
    }

    const { averagePoints, goodPoints, veryGoodPoints, excelentPoints } =
      points;

    await editExam(id, {
      name,
      description,
      averagePoints,
      goodPoints,
      veryGoodPoints,
      excelentPoints,
      lecturerId: auth.id,
    })
      .then((response) => {
        setFacility((oldFacility) => ({
          ...oldFacility,
          exams: oldFacility.exams.map((e) => (e.id === id ? response : e)),
        }));
        navigate(`/exam/${id}`);
      })
      .catch((error) => {
        switch (error.statusCode) {
          case 400:
            setErrors((oldErrors) => ({
              ...oldErrors,
              name: "Exam name already exists in this facility.",
            }));
        }
      });
  };

  useEffect(() => {
    validatePoints(points, setErrors);
  }, [points]);

  useEffect(() => {
    if (typeof exam?.id === "undefined") return;

    setId(exam.id);
    setName(exam.name);
    setDescription(exam.description);
    setPoints({
      averagePoints: exam.averagePoints,
      goodPoints: exam.goodPoints,
      veryGoodPoints: exam.veryGoodPoints,
      excelentPoints: exam.excelentPoints,
    });
  }, [exam]);

  useEffect(() => {
    if (auth.role !== "Lecturer") {
      navigate("/");
    }
  }, [auth]);

  return {
    name,
    handleNameChange,
    description,
    handleDescriptionChange,
    points,
    handlePointsChange,
    errors,
    handleAddOnClick,
    handleEditOnClick,
  };
};

export default useExamForm;
