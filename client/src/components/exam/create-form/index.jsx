import { Button, FormHelperText, Grid, TextField } from "@mui/material";
import PointsInputItem from "../points-input-item";
import useExamForm from "../useExamForm";
import { EXAM_POINTS } from "../examHelpers";

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
    <div className="form-wrapper">
      <p className="form-title">
        Create <span className="form-p-subtitle">Exam</span>
      </p>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={handleNameChange}
          />
          {errors.name && <FormHelperText error>{errors.name}</FormHelperText>}
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="description"
            label="Description"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={description}
            onChange={handleDescriptionChange}
          />
        </Grid>

        {Object.keys(EXAM_POINTS).map((ep) => (
          <Grid key={ep} item xs={3}>
            <PointsInputItem
              label={EXAM_POINTS[ep]}
              value={ep}
              points={points[ep]}
              handlePointsChange={handlePointsChange}
              error={errors[ep]}
            />
          </Grid>
        ))}
      </Grid>

      <Button
        className="form-btn"
        variant="contained"
        disabled={Object.values(errors).filter((e) => e !== "").length > 0}
        onClick={handleAddOnClick}
      >
        Add
      </Button>
    </div>
  );
};

export default ExamCreate;
