import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "rgb(246, 158, 5)" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" sx= {{fontFamily: "'Pixelify Sans', sans-serif", fontSize:"2rem"}}>
          XVENT
        </Typography>

        <Box>
          <Button color="inherit" sx={{ fontFamily: "'Pixelify Sans', sans-serif", fontSize: "1.5rem" }}>FIN</Button>
          <Button color="inherit" sx={{ fontFamily: "'Pixelify Sans', sans-serif", fontSize: "1.5rem" }}>EN</Button>
          <Button color="inherit" sx={{ fontFamily: "'Pixelify Sans', sans-serif", fontSize: "1.5rem" }}>SWE</Button>
        </Box>

        <Link to="https://learn.xamk.fi/" target="_blank">
          <Button sx={{color:"white",fontFamily: "'Pixelify Sans', sans-serif", fontSize: "1.5rem"}}>Learn</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;