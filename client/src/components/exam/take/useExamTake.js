import { useEffect, useState } from "react";
import { finishExam } from "../../../services/examService";
import { useAuthContext } from "../../../contexts/AuthContext";

const useExamTake = (exam) => {
  const { auth } = useAuthContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionAnswears, setQuestionAnswears] = useState([
    { answearId: null },
  ]);

  const handleCurrentQuestionOnChange = (event) => {
    setCurrentQuestionIndex(event.target.value);
  };

  const handleNextQuestionChange = () => {
    setCurrentQuestionIndex((oldState) => oldState + 1);
  };

  const handlePreviosQuestionChange = () => {
    setCurrentQuestionIndex((oldState) => oldState - 1);
  };

  const handleQuestionAnswearOnChange = (event) => {
    event.preventDefault();

    setQuestionAnswears((oldState) =>
      oldState.map((qa) =>
        qa.questionId === exam.questions[currentQuestionIndex].id
          ? { ...qa, answearId: +event.target.value }
          : qa
      )
    );
  };

  const handleFinishOnClick = async () => {
    await finishExam({
      marks: questionAnswears,
      studentId: auth.id,
    });
  };

  useEffect(() => {
    setQuestionAnswears(
      exam.questions.map((q) => ({
        questionId: q.id,
        answearId: null,
      }))
    );
  }, [exam]);

  return {
    questionAnswears,
    handleQuestionAnswearOnChange,
    currentQuestionIndex,
    handleCurrentQuestionOnChange,
    handleNextQuestionChange,
    handlePreviosQuestionChange,
    handleFinishOnClick,
  };
};

export default useExamTake;
