import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addAnswear,
  deleteAnswear,
  editAnswear,
} from "../../services/answearService";
import { addQuestion, editQuestion } from "../../services/questionService";
import { useFacilityContext } from "../../contexts/FacilityContext";
import { isOnSubmitValid } from "./questionHelpers";
import { useAuthContext } from "../../contexts/AuthContext";

const useQuestionForm = (question) => {
  const navigate = useNavigate();
  const { auth } = useAuthContext();
  const { setFacility } = useFacilityContext();
  const { examId } = useParams();
  const [id, setId] = useState(0);
  const [text, setText] = useState("");
  const [points, setPoints] = useState(1);
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
    answears: "",
  });

  const handleTextChange = (event) => {
    event.preventDefault();
    const currentText = event.target.value;
    let textErrorMessage = "";

    if (currentText === "") textErrorMessage = "Text is required.";

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
    let newQuestion = {};

    if (!isOnSubmitValid(text, answears, setErrors)) return;

    await addQuestion({
      text,
      points,
      examId,
    })
      .then(async (questionData) => {
        newQuestion = questionData;

        for (let i = 0; i < answears.length; i++) {
          await addAnswear({
            text: answears[i].text,
            isCorrect: answears[i].isCorrect,
            questionId: questionData.id,
          }).then((answearData) => {
            newQuestion.answears.push(answearData);
          });
        }

        setFacility((oldFacility) => ({
          ...oldFacility,
          exams: oldFacility.exams.map((e) =>
            e.id === +examId
              ? { ...e, questions: [...e.questions, newQuestion] }
              : e
          ),
        }));

        navigate(`/exam/${examId}`);
      })
      .catch((error) => {
        switch (error.statusCode) {
          case 400:
            setErrors((oldErrors) => ({
              ...oldErrors,
              text: "Question text already exists in this exam.",
            }));
        }
      });
  };

  const handleEditOnClick = async (event) => {
    event.preventDefault();

    if (!isOnSubmitValid(text, answears, setErrors)) return;

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
      deleteAnswear(a.id);
    });

    await editQuestion(id, {
      text,
      points,
    })
      .then((questionData) => {
        setFacility((oldFacility) => ({
          ...oldFacility,
          exams: oldFacility.exams.map((e) =>
            e.id === +examId
              ? {
                  ...e,
                  questions: e.questions.map((q) =>
                    q.id === id ? questionData : q
                  ),
                }
              : e
          ),
        }));

        navigate(`/exam/${examId}`);
      })
      .catch((error) => {
        switch (error.statusCode) {
          case 400:
            setErrors((oldErrors) => ({
              ...oldErrors,
              text: "Answears successfully updated, but question text already exists in this exam.",
            }));
        }
      });
  };

  useEffect(() => {
    if (auth.role !== "Lecturer") {
      navigate("/");
    }
  }, [auth]);

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
