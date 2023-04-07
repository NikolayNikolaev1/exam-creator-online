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
    <div className="get-started" id="login-screen">
      <p className="get-started-title">
        Exam <span className="login-p-subtitle">Online</span>
      </p>

      <input
        type="text"
        name="email"
        id="email"
        placeholder="Email"
        className="login-form"
        value={email}
        onChange={handleEmailChange}
      />

      <input
        type="password"
        name="password"
        id="password"
        className="login-form"
        placeholder="Pasword"
        vvaluealie={password}
        onChange={handlePasswordChange}
      />

      <input
        type="text"
        name="facility-name"
        id="facility-name"
        className="login-form"
        placeholder="Facility Name"
        value={facilityName}
        onChange={handleFacilityNameChange}
      />

      {error !== "" && <h5>{error}</h5>}
      {successMeessage !== "" && (
        <h4 style={{ color: "green" }}>{successMeessage}</h4>
      )}

      <input
        type="button"
        value="Create Facility Owner"
        className="login-btn"
        onClick={handleFacilityCreateOnClick}
      />
    </div>
  );
};

export default FacilityOwner;
