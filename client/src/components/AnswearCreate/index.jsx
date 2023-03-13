import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  TextField,
} from "@mui/material";
import useAnswearCreate from "./useAnswearCreate";

const AnswearCreate = ({ clientId, handleAnswearOnChange, ...props }) => {
  const { text, handleTextChange, isCorrect, handleIsCorrectChange, errors } =
    useAnswearCreate(
      clientId,
      props.text,
      props.isCorrect,
      handleAnswearOnChange
    );

  return (
    <FormControl
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
    >
      <div>
        <TextField
          id="text"
          label="Text"
          variant="outlined"
          value={text}
          onChange={handleTextChange}
        />
        {errors.text && <FormHelperText error>{errors.text}</FormHelperText>}
        <FormControlLabel
          control={
            <Checkbox checked={isCorrect} onChange={handleIsCorrectChange} />
          }
          label="Is Correct"
          labelPlacement="start"
        />
      </div>
    </FormControl>
  );
};

export default AnswearCreate;
