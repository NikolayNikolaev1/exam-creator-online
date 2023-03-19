import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ControlPointRounded } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  List,
  ListItem,
  TextField,
} from "@mui/material";
import useQuestionForm from "../useQuestionForm";
import { getQuestionData } from "../questionHelpers";
import AnswearCreate from "../../AnswearCreate";

const QuestionEdit = () => {
  const { questionId } = useParams();
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
    (async () => setQuestion(await getQuestionData(questionId)))();
  }, [questionId]);

  return (
    <FormControl
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
    >
      <TextField
        id="text"
        label="Text"
        variant="outlined"
        value={text}
        onChange={handleTextChange}
      />
      {errors.text && <FormHelperText error>{errors.text}</FormHelperText>}
      <TextField
        id="points"
        label="Points"
        type="number"
        variant="outlined"
        value={points}
        onChange={handlePointsChange}
      />
      {errors.points && <FormHelperText error>{errors.points}</FormHelperText>}
      <FormLabel>Answears: </FormLabel>
      <List>
        {answears.map((a, i) => (
          <ListItem key={a.id}>
            <AnswearCreate
              clientId={a.id}
              text={a.text}
              isCorrect={a.isCorrect}
              handleAnswearOnChange={handleAnswearOnChange}
            />
            {answears.length > 1 && (
              <Button
                variant="outlined"
                startIcon={<ControlPointRounded />}
                onClick={() => handleRemoveAnswearClick(a.id)}
              >
                Remove Answear
              </Button>
            )}
          </ListItem>
        ))}
      </List>

      <Button
        variant="outlined"
        startIcon={<ControlPointRounded />}
        onClick={handleAddAnswearClick}
      >
        Add an answear
      </Button>

      <Button
        disabled={Object.values(errors).filter((e) => e !== "").length > 0}
        onClick={handleEditOnClick}
      >
        Save changes
      </Button>
    </FormControl>
  );
};

export default QuestionEdit;
