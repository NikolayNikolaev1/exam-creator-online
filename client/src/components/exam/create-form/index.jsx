import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
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
    <Container maxWidth="sm" sx={{ mb: 4 }}>
      <Typography variant="h1">Create Exam</Typography>
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
          onClick={handleAddOnClick}
        >
          Add
        </Button>
      </FormControl>
    </Container>
  );
};

export default ExamCreate;
