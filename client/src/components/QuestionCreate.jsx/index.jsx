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
import AnswearCreate from "../AnswearCreate";
import useQuestionCreate from "./useQuestionCreate";

const QuestionCreate = () => {
  const {
    text,
    handleTextChange,
    points,
    handlePointsChange,
    answears,
    handleAnswearOnChange,
    handleAddAnswearClick,
    handleRemoveAnswearClick,
    handleAddOnClick,
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
        {answears.map((a, i) => (
          <ListItem key={a.id}>
            <AnswearCreate
              clientId={a.id}
              text={a.text}
              isCorrect={a.isCorrect}
              handleAnswearOnChange={handleAnswearOnChange}
            />
            {i !== 0 && (
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
        onClick={handleAddOnClick}
      >
        Add
      </Button>
    </FormControl>
  );
};

export default QuestionCreate;
