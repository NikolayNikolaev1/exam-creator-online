import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addAnswear,
  deleteAnswear,
  editAnswear,
} from "../../services/answearService";
import { addQuestion, editQuestion } from "../../services/questionService";

const useQuestionForm = (question) => {
  const navigate = useNavigate();
  const { examId } = useParams();
  const [id, setId] = useState(0);
  const [text, setText] = useState("");
  const [points, setPoints] = useState(0);
  const [answears, setAnswears] = useState([
    {
      id: Math.floor(Math.random() * 1000000),
      text: "",
      isCorrect: true,
    },
  ]);
  const [removedAnswears, setRemovedAnswears] = useState([]);
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
        a.id === changedAnswear.id
          ? (a = {
              ...a,
              text: changedAnswear.text,
              isCorrect: changedAnswear.isCorrect,
            })
          : a
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
    const removedAnswear = answears.filter((a) => a.id === id)[0];
    setAnswears((oldAnswears) => oldAnswears.filter((a) => a.id !== id));

    if (typeof removedAnswear.questionId !== "undefined")
      setRemovedAnswears((oldAnswears) => [...oldAnswears, removedAnswear]);
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

      navigate(`/exam/${examId}`);
    });
  };

  const handleEditOnClick = async (event) => {
    event.preventDefault();

    await editQuestion(id, {
      text,
      points,
    });

    answears.forEach(async (a) => {
      if (typeof a.questionId === "undefined") {
        await addAnswear({
          text: a.text,
          isCorrect: a.isCorrect,
          questionId: id,
        });
        return;
      }

      await editAnswear(a.id, {
        text: a.text,
        isCorrect: a.isCorrect,
      });
    });

    removedAnswears.forEach(async (a) => {
      await deleteAnswear(a.id);
    });

    navigate(`/exam/${examId}`);
  };

  useEffect(() => {
    if (typeof question?.id === "undefined") return;

    setId(question.id);
    setText(question.text);
    setPoints(question.points);
    setAnswears(question.answears);
  }, [question]);

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
    handleEditOnClick,
    errors,
  };
};

export default useQuestionForm;
