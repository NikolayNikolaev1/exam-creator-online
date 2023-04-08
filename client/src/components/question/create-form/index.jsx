import { ControlPointRounded } from "@mui/icons-material";
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import AnswearForm from "../../answear/";
import useQuestionForm from "../useQuestionForm";

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
  } = useQuestionForm();

  return (
    <div className="form-wrapper">
      <p className="form-title">
        Create <span className="form-p-subtitle">Question</span>
      </p>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={9}>
          <TextField
            label="Text"
            variant="outlined"
            value={text}
            onChange={handleTextChange}
            fullWidth
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
            <FormHelperText className="error-msg" error>
              {errors.points}
            </FormHelperText>
          )}
        </Grid>
        <p>Answears : </p>

        {errors.answears && (
          <FormHelperText error>{errors.answears}</FormHelperText>
        )}
        <Grid item xs={12}>
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
        </Grid>

        <Button
          className="form-btn-secondary"
          variant="outlined"
          startIcon={<ControlPointRounded />}
          fullWidth
          onClick={handleAddAnswearClick}
        >
          Add an answear
        </Button>

        <Button
          className="form-btn"
          variant="contained"
          disabled={
            typeof Object.values(errors).find(
              (e) => e !== "" && !e.startsWith(" ")
            ) !== "undefined"
          }
          onClick={handleAddOnClick}
        >
          Create
        </Button>
      </Grid>
    </div>
  );
};

export default QuestionCreate;
