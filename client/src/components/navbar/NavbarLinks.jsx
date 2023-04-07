import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useAuthContext } from "../../contexts/AuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const { onLogout } = useAuthContext();

  const handleLogoutOnClick = (event) => {
    event.preventDefault();

    onLogout();
    navigate("/login");
  };

  return (
    <Button color="inherit" onClick={handleLogoutOnClick}>
      Logout
    </Button>
  );
};

const EditProfile = () => {
  return <Button color="inherit" component={Link} to="/profile/edit"></Button>;
};

const NavbarLinks = () => {
  const { auth } = useAuthContext();

  switch (auth.role) {
    case "Admin":
      return (
        <Fragment>
          <Button color="inherit" component={Link} to="/facility/create">
            Create Facility
          </Button>
          <Logout />
        </Fragment>
      );

    case "Owner":
      return (
        <Fragment>
          <Button color="inherit" component={Link} to="/register">
            Register Facility User
          </Button>
          <Button
            color="inherit"
            component={Link}
            to={`/facility/${auth.facilityId}/edit`}
          >
            Edit Facility
          </Button>
          <Logout />
        </Fragment>
      );

    case "Lecturer":
      return (
        <Fragment>
          <Button color="inherit" component={Link} to="/exam/create">
            Create Exam
          </Button>
          Welcome
          <Button color="inherit" component={Link} to="/profile/edit">
            {auth.email}
          </Button>
          <Logout />
        </Fragment>
      );

    case "Student":
      return (
        <Fragment>
          Welcome
          <Button color="inherit" component={Link} to="/profile/edit">
            {auth.email}
          </Button>
          <Logout />
        </Fragment>
      );

    default:
      return (
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
      );
  }
};

export default NavbarLinks;
