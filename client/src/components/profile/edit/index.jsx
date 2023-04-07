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
    <div className="get-started" id="login-screen">
      <p className="get-started-title">
        Profile <span className="login-p-subtitle">Edit</span>
      </p>

      <input
        type="text"
        name="first-name"
        id="first-name"
        placeholder="First Name"
        className="login-form"
        value={firstName}
        onChange={handleFirstNameOnChange}
      />
      <input
        type="text"
        name="last-name"
        id="last-name"
        className="login-form"
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
        className="login-btn"
        onClick={handleEditOnClick}
      />
    </div>
  );
};

export default ProfileEdit;
