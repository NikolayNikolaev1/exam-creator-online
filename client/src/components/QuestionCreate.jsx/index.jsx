import { ControlPointRounded, DeleteRounded } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  List,
  ListItem,
  TextField,
} from "@mui/material";
import AnswearCreate from "../AnswearCreate";
import useQuestionCreate from "./useQuestionCreate";

const QuestionCreate = () => {
  const {
    text,
    handleTextChange,
    points,
    handlePointsChange,
    answears,
    handleAddAnswearClick,
    handleRemoveAnswearClick,
    errors,
  } = useQuestionCreate();

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
        {answears.map((a) => (
          <ListItem key={a.id}>
            <AnswearCreate text={a.text} isCorrect={a.isCorrect} />
            <Button
              variant="outlined"
              startIcon={<ControlPointRounded />}
              onClick={() => handleRemoveAnswearClick(a.id)}
            >
              Remove Answear
            </Button>
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
    </FormControl>
  );
};

export default QuestionCreate;