import { Link } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import NavbarLinks from "./NavbarLinks";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        enableColorOnDark
        sx={{ backgroundColor: "#001F61" }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit" component={Link} to="/">
              Exam Online
            </Button>
          </Typography>

          <NavbarLinks />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
