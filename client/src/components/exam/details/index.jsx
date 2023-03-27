import { Button, Container, Grid, List, ListItem } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFAcilityContext } from "../../../contexts/FacilityContext";
import { deleteExam } from "../../../services/examService";
import { deleteQuestion } from "../../../services/questionService";
import { getExamData } from "../examHelpers";

const ExamDetails = () => {
  const { examId } = useParams();
  const [exam, setExam] = useState({ questions: [] });
  const { exams } = useFAcilityContext();

  const handleExamDeleteOnClick = async (event) => {
    event.preventDefault();

    await deleteExam(examId);
  };

  const handleQuestionDeleteOnClick = async (event, questionId) => {
    event.preventDefault();

    await deleteQuestion(questionId).then(() =>
      setExam((oldExam) => ({
        ...oldExam,
        questions: oldExam.questions.filter((q) => q.id !== questionId),
      }))
    );
  };

  useEffect(() => {
    (async () => setExam(await getExamData(examId)))();
  }, [examId]);

  return (
    <Container maxWidth="sm" sx={{ mb: 4 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            component={Link}
            to={`/exam/${examId}/question/create`}
          >
            Add Questions
          </Button>
        </Grid>

        <Grid item xs={4}>
          <Button
            variant="contained"
            color="warning"
            fullWidth
            component={Link}
            to={`/exam/${examId}/edit`}
          >
            Edit
          </Button>
        </Grid>

        <Grid item xs={4}>
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleExamDeleteOnClick}
          >
            Delete
          </Button>
        </Grid>

        <Grid item xs={12}>
          <h1>{exam.name}</h1>
        </Grid>

        <Grid item xs={12}>
          <p>{exam.description}</p>
        </Grid>

        <List>
          {exam.questions.map((q) => (
            <ListItem key={q.id}>
              <Grid item xs={4}>
                <h2>{q.text}</h2>
              </Grid>

              <Grid item xs={4}>
                <Button
                  component={Link}
                  to={`/exam/${examId}/question/${q.id}/edit`}
                  variant="contained"
                  color="warning"
                >
                  Edit
                </Button>
              </Grid>

              <Grid item xs={4}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={(e) => handleQuestionDeleteOnClick(e, q.id)}
                >
                  Delete
                </Button>
              </Grid>

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
      </Grid>
    </Container>
  );
};

export default ExamDetails;
