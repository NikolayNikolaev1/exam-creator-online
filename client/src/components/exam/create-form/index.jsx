import { Button, FormControl, FormHelperText, TextField } from "@mui/material";
import useExamForm from "../useExamForm";

const ExamCreate = () => {
  const {
    name,
    handleNameChange,
    description,
    handleDescriptionChange,
    points,
    handlePointsChange,
    errors,
    handleAddOnClick,
  } = useExamForm();

  return (
    <FormControl
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
    >
      <TextField
        id="name"
        label="Name"
        variant="outlined"
        value={name}
        onChange={handleNameChange}
      />
      {errors.name && <FormHelperText error>{errors.name}</FormHelperText>}
      <TextField
        id="description"
        label="Description"
        multiline
        rows={4}
        variant="outlined"
        value={description}
        onChange={handleDescriptionChange}
      />
      <TextField
        id="avg-points"
        label="Average Points"
        type="number"
        variant="outlined"
        value={points.averagePoints}
        onChange={(e) => handlePointsChange(e, "averagePoints")}
      />
      {errors.averagePoints && (
        <FormHelperText error>{errors.averagePoints}</FormHelperText>
      )}
      <TextField
        id="good-points"
        label="Good Points"
        type="number"
        variant="outlined"
        value={points.goodPoints}
        onChange={(e) => handlePointsChange(e, "goodPoints")}
      />
      {errors.goodPoints && (
        <FormHelperText error>{errors.goodPoints}</FormHelperText>
      )}
      <TextField
        id="very-good-points"
        label="Very Good Points"
        type="number"
        variant="outlined"
        value={points.veryGoodPoints}
        onChange={(e) => handlePointsChange(e, "veryGoodPoints")}
      />
      {errors.veryGoodPoints && (
        <FormHelperText error>{errors.veryGoodPoints}</FormHelperText>
      )}
      <TextField
        id="excelent-points"
        label="Excelent Points"
        type="number"
        variant="outlined"
        value={points.excelentPoints}
        onChange={(e) => handlePointsChange(e, "excelentPoints")}
      />
      {errors.excelentPoints && (
        <FormHelperText error>{errors.excelentPoints}</FormHelperText>
      )}
      <Button
        disabled={Object.values(errors).filter((e) => e !== "").length > 0}
        onClick={handleAddOnClick}
      >
        Add
      </Button>
    </FormControl>
  );
};

export default ExamCreate;
