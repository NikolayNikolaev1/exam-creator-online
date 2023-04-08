import useProfileEdit from "./useProfileEdit";

const ProfileEdit = () => {
  const {
    firstName,
    handleFirstNameOnChange,
    lastName,
    handleLastNameOnChange,
    successMessage,
    handleEditOnClick,
  } = useProfileEdit();

  return (
    <div className="form-wrapper">
      <p className="form-title">
        Profile <span className="form-p-subtitle">Edit</span>
      </p>

      <input
        type="text"
        name="first-name"
        placeholder="First Name"
        className="form-input legacy"
        value={firstName}
        onChange={handleFirstNameOnChange}
      />
      <input
        type="text"
        name="last-name"
        id="last-name"
        className="form-input legacy"
        placeholder="Last Name"
        value={lastName}
        onChange={handleLastNameOnChange}
      />

      {successMessage !== "" && (
        <h4 style={{ color: "green" }}>{successMessage}</h4>
      )}

      <input
        type="button"
        value="Edit"
        className="form-btn"
        onClick={handleEditOnClick}
      />
    </div>
  );
};

export default ProfileEdit;
