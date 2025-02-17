import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "rgb(246, 158, 5)" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" fontFamily="Jaro">
          XVent
        </Typography>

        <Box>
          <Button color="inherit">FIN</Button>
          <Button color="inherit">EN</Button>
          <Button color="inherit">SWE</Button>
        </Box>

        <Link to="https://learn.xamk.fi/" target="_blank">
          <Button color="inherit">Learn</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;