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
import AnswearCreate from "../../AnswearCreate";
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
    <Container maxWidth="sm" sx={{ mb: 4 }}>
      <Typography variant="h2">Create Question</Typography>
      <FormControl
        sx={{
          "& .MuiTextField-root": { m: 1 },
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={9}>
            <TextField
              id="text"
              label="Text"
              variant="outlined"
              value={text}
              onChange={handleTextChange}
              fullWidth
            />
            {errors.text && (
              <FormHelperText error>{errors.text}</FormHelperText>
            )}
          </Grid>

          <Grid item xs={3}>
            <TextField
              id="points"
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
          <FormLabel>Answears: </FormLabel>
          <Grid item xs={12}>
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
          </Grid>

          <Grid item xs={6}>
            <Button
              variant="outlined"
              startIcon={<ControlPointRounded />}
              fullWidth
              onClick={handleAddAnswearClick}
            >
              Add an answear
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              variant="contained"
              disabled={
                Object.values(errors).filter((e) => e !== "").length > 0
              }
              fullWidth
              onClick={handleAddOnClick}
            >
              Create Question
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </Container>
  );
};

export default QuestionCreate;
