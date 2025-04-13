import { Outlet } from "react-router-dom";
import Navigation from "../SideNav/Navigation";
import { Box } from "@mui/material";
import LoaderBackdrop from "../LoaderBackDrop";

const Root = () => {
  return (
    <Box sx={styles.container}>
      <Navigation />
      <LoaderBackdrop />
      <Box sx={styles.outletComponents}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Root;

const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  outletComponents: {
    flexGrow: 1,
    padding: 3,
  },
};
