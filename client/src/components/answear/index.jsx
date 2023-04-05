import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";
import useAnswear from "./useAnswear";

const AnswearForm = ({ clientId, handleAnswearOnChange, ...props }) => {
  const { text, handleTextChange, isCorrect, handleIsCorrectChange, errors } =
    useAnswear(clientId, props.text, props.isCorrect, handleAnswearOnChange);

  return (
    <FormControl
      sx={{
        "& .MuiTextField-root": { m: 1 },
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={8}>
          <TextField
            id="text"
            label="Text"
            variant="outlined"
            fullWidth
            error={errors.text !== ""}
            value={text}
            onChange={handleTextChange}
          />
        </Grid>

        <Grid item xs={4}>
          <FormControlLabel
            control={
              <Checkbox checked={isCorrect} onChange={handleIsCorrectChange} />
            }
            label="Correct"
          />
        </Grid>
      </Grid>

      {errors.text && <FormHelperText error>{errors.text}</FormHelperText>}
    </FormControl>
  );
};

export default AnswearForm;
