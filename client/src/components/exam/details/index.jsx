import { Button, List, ListItem } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getExamData } from "../examHelpers";

const ExamDetails = () => {
  const { examId } = useParams();
  const [exam, setExam] = useState({ questions: [] });

  useEffect(() => {
    (async () => setExam(await getExamData(examId)))();
  }, [examId]);

  useEffect(() => {
    console.log({ exam });
  }, [exam]);

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
      <h1>{exam.name}</h1>
      <p>{exam.description}</p>
      <List>
        {exam.questions.map((q) => (
          <ListItem key={q.id}>
            <h2>
              {q.text} - {q.points} pts
            </h2>
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
