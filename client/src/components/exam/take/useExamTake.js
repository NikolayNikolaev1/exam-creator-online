import { useEffect, useState } from "react";
import { finishExam } from "../../../services/examService";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useFacilityContext } from "../../../contexts/FacilityContext";

const useExamTake = (exam) => {
  const { auth } = useAuthContext();
  const { fetchFacilityData } = useFacilityContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionAnswears, setQuestionAnswears] = useState([
    { answearId: null },
  ]);
  const [score, setScore] = useState(null);

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
      examId: exam.id,
    }).then((data) => {
      fetchFacilityData();

      setScore(data);
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
    score,
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
