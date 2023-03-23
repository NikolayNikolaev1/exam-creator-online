import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import PointsInputItem from "../points-input-item";
import useExamForm from "../useExamForm";
import { EXAM_POINTS, getExamData } from "../examHelpers";
import { Container } from "@mui/system";

const ExamEdit = () => {
  const { examId } = useParams();
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
    (async () => setExam(await getExamData(examId)))();
  }, [examId]);

  return (
    <Container maxWidth="sm" sx={{ mb: 4 }}>
      <Typography variant="h5">Edit {name}</Typography>
      <FormControl
        sx={{
          "& .MuiTextField-root": { m: 1 },
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={handleNameChange}
            />
            {errors.name && (
              <FormHelperText error>{errors.name}</FormHelperText>
            )}
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
          variant="contained"
          disabled={Object.values(errors).filter((e) => e !== "").length > 0}
          onClick={handleEditOnClick}
        >
          Edit Exam
        </Button>
      </FormControl>
    </Container>
  );
};

export default ExamEdit;
