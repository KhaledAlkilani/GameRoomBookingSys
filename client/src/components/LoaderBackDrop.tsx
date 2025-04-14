import { CircularProgress, Backdrop } from "@mui/material";
import { useContext } from "react";
import { LoaderContext } from "../context/LoaderProvider";

const LoaderBackdrop = () => {
  const { loading } = useContext(LoaderContext);
  return (
    <Backdrop sx={{ zIndex: 999999 }} open={loading} color="primary">
      <CircularProgress />
    </Backdrop>
  );
};

export default LoaderBackdrop;
