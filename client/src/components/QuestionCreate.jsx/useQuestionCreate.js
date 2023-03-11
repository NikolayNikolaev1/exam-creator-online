import { useState } from "react";

const useQuestionCreate = () => {
  const [text, setText] = useState("");
  const [points, setPoints] = useState(0);
  const [answears, setAnswears] = useState([
    {
      id: Math.floor(Math.random() * 1000000),
      text: "",
      isCorrect: true,
    },
  ]);
  const [errors, setErrors] = useState({
    text: "",
    points: "",
  });

  const handleTextChange = (event) => {
    event.preventDefault();
    const currentText = event.target.value;
    let textErrorMessage = "";

    if (currentText.length < 5 || currentText.length > 30) {
      textErrorMessage =
        "Question text must be between 5 and 30 characters long.";
    }
    setErrors((oldErrors) => ({
      ...oldErrors,
      text: textErrorMessage,
    }));

    setText(currentText);
  };

  const handlePointsChange = (event) => {
    event.preventDefault();
    const currentPoints = Number(event.target.value);
    let pointsErrorMessage = "";

    if (currentPoints <= 0) {
      pointsErrorMessage = "Points must be greater than 0.";
    }

    setErrors((oldErrors) => ({
      ...oldErrors,
      points: pointsErrorMessage,
    }));

    setPoints(currentPoints);
  };

  const handleAddAnswearClick = (event) => {
    event.preventDefault();
    setAnswears((oldAnswears) => [
      ...oldAnswears,
      {
        id: Math.floor(Math.random() * 1000000),
        text: "",
        isCorrect: true,
      },
    ]);
  };

  const handleRemoveAnswearClick = (id) => {
    setAnswears((oldAnswears) => oldAnswears.filter((a) => a.id !== id));
  };

  return {
    text,
    handleTextChange,
    points,
    handlePointsChange,
    answears,
    handleAddAnswearClick,
    handleRemoveAnswearClick,
    errors,
  };
};

export default useQuestionCreate;
