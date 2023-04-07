import useFacilityOwner from "./useFacilityOwner";

const FacilityOwner = () => {
  const {
    email,
    handleEmailChange,
    password,
    handlePasswordChange,
    facilityName,
    handleFacilityNameChange,
    error,
    handleFacilityCreateOnClick,
    successMeessage,
  } = useFacilityOwner();

  return (
    <div className="form-wrapper">
      <p className="form-title">
        Exam <span className="form-p-subtitle">Online</span>
      </p>

      <input
        type="text"
        name="email"
        placeholder="Email"
        className="form-input legacy"
        value={email}
        onChange={handleEmailChange}
      />

      <input
        type="password"
        name="password"
        className="form-input legacy"
        placeholder="Pasword"
        vvaluealie={password}
        onChange={handlePasswordChange}
      />

      <input
        type="text"
        name="facility-name"
        className="form-input legacy"
        placeholder="Facility Name"
        value={facilityName}
        onChange={handleFacilityNameChange}
      />

      {error !== "" && <h5 className="warning">{error}</h5>}
      {successMeessage !== "" && (
        <h4 style={{ color: "green" }}>{successMeessage}</h4>
      )}

      <input
        type="button"
        value="Create Facility Owner"
        className="form-btn"
        onClick={handleFacilityCreateOnClick}
      />
    </div>
  );
};

export default FacilityOwner;
