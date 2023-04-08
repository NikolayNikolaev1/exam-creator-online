import { Button, FormHelperText, TextField } from "@mui/material";
import useFacilityEdit from "./useFacilityEdit";

const FacilityEdit = () => {
  const {
    name,
    handleNameChange,
    description,
    handleDescriptionChange,
    errors,
    successMessage,
    handleEditOnClick,
  } = useFacilityEdit();

  return (
    <div className="form-wrapper">
      <p className="form-title">
        Edit <span className="form-p-subtitle">Facility</span>
      </p>
      <TextField
        className="form-input"
        label="Name"
        variant="outlined"
        fullWidth
        value={name}
        onChange={handleNameChange}
      />
      {errors.name && (
        <FormHelperText className="warning" error>
          {errors.name}
        </FormHelperText>
      )}

      <TextField
        className="form-input"
        label="Description"
        multiline
        rows={10}
        variant="outlined"
        fullWidth
        value={description}
        onChange={handleDescriptionChange}
      />

      {successMessage !== "" && (
        <h5 className="success-msg">{successMessage}</h5>
      )}

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

export default FacilityEdit;
