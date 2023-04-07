import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ControlPointRounded } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  List,
  ListItem,
  TextField,
} from "@mui/material";
import useQuestionForm from "../useQuestionForm";
import { getQuestionData } from "../questionHelpers";
import AnswearForm from "../../answear/";
import { useFacilityContext } from "../../../contexts/FacilityContext";

const QuestionEdit = () => {
  const { examId, questionId } = useParams();
  const { facility } = useFacilityContext();
  const [question, setQuestion] = useState({});
  const {
    text,
    handleTextChange,
    points,
    handlePointsChange,
    answears,
    handleAnswearOnChange,
    handleAddAnswearClick,
    handleRemoveAnswearClick,
    handleEditOnClick,
    errors,
  } = useQuestionForm(question);

  useEffect(() => {
    setQuestion(
      facility.exams
        .find((e) => e.id === +examId)
        .questions.find((q) => q.id === +questionId)
    );
  }, [questionId]);

  return (
    <div className="form-wrapper">
      <p className="form-title">
        Edit <span className="form-p-subtitle">Question</span>
      </p>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={9}>
          <TextField
            label="Text"
            variant="outlined"
            value={text}
            onChange={handleTextChange}
          />
          {errors.text && <FormHelperText error>{errors.text}</FormHelperText>}
        </Grid>

        <Grid item xs={3}>
          <TextField
            label="Points"
            type="number"
            variant="outlined"
            value={points}
            onChange={handlePointsChange}
          />
          {errors.points && (
            <FormHelperText error>{errors.points}</FormHelperText>
          )}
        </Grid>
        <p>Answears : </p>

        {errors.answears && (
          <FormHelperText error>{errors.answears}</FormHelperText>
        )}
        <List>
          {answears.map((a, i) => (
            <ListItem key={a.id}>
              <AnswearForm
                clientId={a.id}
                text={a.text}
                isCorrect={a.isCorrect}
                handleAnswearOnChange={handleAnswearOnChange}
              />
              {answears.length > 1 && (
                <Button
                  className="delete-btn"
                  variant="outlined"
                  onClick={() => handleRemoveAnswearClick(a.id)}
                >
                  X
                </Button>
              )}
            </ListItem>
          ))}
        </List>

        <Button
          className="form-btn-secondary"
          variant="outlined"
          startIcon={<ControlPointRounded />}
          onClick={handleAddAnswearClick}
        >
          Add an answear
        </Button>

        <Button
          className="form-btn"
          disabled={Object.values(errors).filter((e) => e !== "").length > 0}
          onClick={handleEditOnClick}
        >
          Save changes
        </Button>
      </Grid>
    </div>
  );
};

export default QuestionEdit;
