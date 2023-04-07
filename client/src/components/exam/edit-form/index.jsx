import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, FormHelperText, Grid, TextField } from "@mui/material";
import PointsInputItem from "../points-input-item";
import useExamForm from "../useExamForm";
import { EXAM_POINTS } from "../examHelpers";
import { useFacilityContext } from "../../../contexts/FacilityContext";

const ExamEdit = () => {
  const { examId } = useParams();
  const { facility } = useFacilityContext();
  const [exam, setExam] = useState({});
  const {
    name,
    handleNameChange,
    description,
    handleDescriptionChange,
    points,
    handlePointsChange,
    errors,
    handleEditOnClick,
  } = useExamForm(exam);

  useEffect(() => {
    setExam(facility.exams.find((e) => e.id === +examId));
  }, [examId]);

  return (
    <div className="form-wrapper">
      <p className="form-title">
        Edit <span className="form-p-subtitle">Exam</span>
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
        onClick={handleEditOnClick}
      >
        Save Changes
      </Button>
    </div>
  );
};

export default ExamEdit;
