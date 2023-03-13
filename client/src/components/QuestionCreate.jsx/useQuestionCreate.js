import { useState } from "react";
import { useParams } from "react-router-dom";
import { addAnswear } from "../../services/answearService";
import { addQuestion } from "../../services/questionService";

const useQuestionCreate = () => {
  const { examId } = useParams();
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

  const handleAnswearOnChange = (changedAnswear) => {
    setAnswears((oldAnswears) => {
      const newAnswears = oldAnswears.map((a) =>
        a.id === changedAnswear.id ? (a = changedAnswear) : a
      );

      return newAnswears;
    });
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

  const handleAddOnClick = async (event) => {
    event.preventDefault();

    await addQuestion({
      text,
      points,
      examId,
    }).then((questionId) => {
      answears.forEach(
        async (a) =>
          await addAnswear({
            text: a.text,
            isCorrect: a.isCorrect,
            questionId,
          })
      );

      // TODO: add redirect.
    });
  };

  return {
    text,
    handleTextChange,
    points,
    handlePointsChange,
    answears,
    handleAnswearOnChange,
    handleAddAnswearClick,
    handleRemoveAnswearClick,
    handleAddOnClick,
    errors,
  };
};

export default useQuestionCreate;
