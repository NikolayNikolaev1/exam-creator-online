import { useParams } from "react-router-dom";
import { useFacilityContext } from "../../../contexts/FacilityContext";
import useExamTake from "./useExamTake";
import { Fragment } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";

const ExamTake = () => {
  const { examId } = useParams();
  const { facility } = useFacilityContext();
  const exam = facility.exams.find((e) => e.id === +examId);
  //   const currentQuestion = exam.questions[currentQuestionIndex];
  const {
    score,
    questionAnswears,
    handleQuestionAnswearOnChange,
    currentQuestionIndex,
    handleCurrentQuestionOnChange,
    handleNextQuestionChange,
    handlePreviosQuestionChange,
    handleFinishOnClick,
  } = useExamTake(exam);

  return (
    <Fragment>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          disabled={currentQuestionIndex === 0}
          onClick={handlePreviosQuestionChange}
        >
          {"<"}
        </Button>
        <Button
          variant="contained"
          disabled={exam.questions.length === currentQuestionIndex + 1}
          onClick={handleNextQuestionChange}
        >
          {">"}
        </Button>

        <Button
          variant="contained"
          disabled={
            questionAnswears.filter((qa) => qa.answearId === null).length > 0
          }
          onClick={handleFinishOnClick}
        >
          Finish Exam
        </Button>
        {score !== null && <h1>Points: {score}</h1>}
      </Stack>
      <h1>{exam.questions[currentQuestionIndex].text}</h1>
      <FormControl>
        <RadioGroup
          value={questionAnswears[currentQuestionIndex].answearId}
          onChange={handleQuestionAnswearOnChange}
        >
          {exam.questions[currentQuestionIndex].answears.map((a) => (
            <FormControlLabel
              key={a.id}
              label={a.text}
              value={a.id}
              control={<Radio />}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Fragment>
  );
};

export default ExamTake;
