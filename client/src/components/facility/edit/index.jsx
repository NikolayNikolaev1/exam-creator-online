import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import useFacilityEdit from "./useFacilityEdit";

const FacilityEdit = () => {
  const {
    name,
    handleNameChange,
    description,
    handleDescriptionChange,
    errors,
    handleEditOnClick,
  } = useFacilityEdit();

  return (
    <div className="get-started" id="login-screen">
      <p className="get-started-title">
        Edit <span className="login-p-subtitle">Facility</span>
      </p>
      {/* <Typography variant="h5">Edit Facility</Typography> */}
      <FormControl
        sx={{
          "& .MuiTextField-root": { m: 1 },
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <TextField
              className="login-form"
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
              className="login-form"
              id="description"
              label="Description"
              multiline
              rows={6}
              variant="outlined"
              fullWidth
              value={description}
              onChange={handleDescriptionChange}
            />
          </Grid>

          <Button
            className="login-btn"
            variant="contained"
            disabled={Object.values(errors).filter((e) => e !== "").length > 0}
            onClick={handleEditOnClick}
          >
            Edit Exam
          </Button>
        </Grid>
      </FormControl>
    </div>
  );
};

export default FacilityEdit;
