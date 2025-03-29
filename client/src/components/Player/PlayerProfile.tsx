import { Typography, Container, Box } from "@mui/material";
import Loader from "../Reusable/Loader";
import { usePlayerInfo } from "../../hooks/usePlayerInfo";
import UnknownProfilePic from "../../assets/UnknownProfilePic.svg";

const PlayerProfile = () => {
  const { data, loading, error } = usePlayerInfo();

  return (
    <Container sx={styles.container}>
      {error ? (
        <Typography sx={styles.error}>Error: {error}</Typography>
      ) : loading ? (
        <Loader />
      ) : data ? (
        <>
          <Box>
            <Typography variant="h3">Player Profile</Typography>
            <Typography variant="body1">Email: {data.email}</Typography>
            <Typography variant="body1">Username: {data.username}</Typography>
            <Typography variant="body1">Phone: {data.phoneNumber}</Typography>
            <Typography variant="body1">Theme: {data.theme}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img src={UnknownProfilePic} width={"100%"} alt="Profile pic" />
          </Box>
        </>
      ) : (
        <Typography>No player data found.</Typography>
      )}
    </Container>
  );
};

export default PlayerProfile;

const styles = {
  container: {
    marginTop: "2rem",
    display: "grid",
    gridTemplateColumns: "80% 20%",
    gap: "1rem",
  },
  error: {
    color: "red",
  },
};
