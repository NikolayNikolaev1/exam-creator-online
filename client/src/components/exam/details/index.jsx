import { Button, List, ListItem } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteExam } from "../../../services/examService";
import { deleteQuestion } from "../../../services/questionService";
import { getExamData } from "../examHelpers";

const ExamDetails = () => {
  const { examId } = useParams();
  const [exam, setExam] = useState({ questions: [] });

  const handleExamDeleteOnClick = async (event) => {
    event.preventDefault();

    await deleteExam(examId);
  };

  const handleQuestionDeleteOnClick = async (event, questionId) => {
    event.preventDefault();

    await deleteQuestion(questionId).then(() =>
      setExam((oldExam) => ({
        ...exam,
        questions: exam.questions.filter((q) => q.id !== questionId),
      }))
    );
  };

  useEffect(() => {
    (async () => setExam(await getExamData(examId)))();
  }, [examId]);

  return (
    <Fragment>
      <Button
        component={Link}
        to={`/exam/${examId}/edit`}
        variant="contained"
        color="warning"
      >
        Edit
      </Button>
      <Button
        component={Link}
        to={`/exam/${examId}/question/create`}
        variant="contained"
        color="primary"
      >
        Add Questions
      </Button>

      <Button
        variant="contained"
        color="error"
        onClick={handleExamDeleteOnClick}
      >
        Delete
      </Button>
      <h1>{exam.name}</h1>
      <p>{exam.description}</p>
      <List>
        {exam.questions.map((q) => (
          <ListItem key={q.id}>
            <h2>
              {q.text} - {q.points} pts
            </h2>

            <Button
              component={Link}
              to={`/exam/${examId}/question/${q.id}/edit`}
              variant="contained"
              color="warning"
            >
              Edit Question
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={(e) => handleQuestionDeleteOnClick(e, q.id)}
            >
              Delete Question
            </Button>

            <List>
              {q.answears.map((a, i) => (
                <ListItem key={a.id}>
                  <h3>
                    {i + 1}. {a.text}
                  </h3>
                </ListItem>
              ))}
            </List>
          </ListItem>
        ))}
      </List>
    </Fragment>
  );
};

export default ExamDetails;
