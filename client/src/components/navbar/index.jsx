import { Link } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useAuthContext } from "../../contexts/AuthContext";
import NavbarLinks from "./NavbarLinks";

const Navbar = () => {
  const { auth } = useAuthContext();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" enableColorOnDark>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit" component={Link} to="/">
              Exam Online
            </Button>
          </Typography>

          <NavbarLinks role={auth.role} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
