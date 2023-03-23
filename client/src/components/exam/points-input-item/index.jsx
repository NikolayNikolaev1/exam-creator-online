import { Fragment } from "react";
import { FormHelperText, TextField } from "@mui/material";

const PointsInputItem = ({
  label,
  value,
  points,
  handlePointsChange,
  error,
}) => {
  return (
    <Fragment>
      <TextField
        label={label}
        type="number"
        variant="outlined"
        value={points}
        onChange={(e) => handlePointsChange(e, value)}
        error={error !== ""}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </Fragment>
  );
};

export default PointsInputItem;
