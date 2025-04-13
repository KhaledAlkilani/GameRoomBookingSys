import React, { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { usePlayerInfo } from "../../hooks/usePlayerInfo";
import { enqueueSnackbar } from "notistack";

interface RegistrationModalProps {
  open: boolean;
  onClose: () => void;
  onSend: (email: string) => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({
  open,
  onClose,
  onSend,
}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!email.endsWith("@edu.xamk.fi")) {
      setError("Please enter a valid university email (@edu.xamk.fi).");
      return;
    }
    try {
      await onSend(email);
      enqueueSnackbar(`Registration link sent to: ${email}`, {
        variant: "success",
      });
      setError("");
      onClose();
    } catch (e: any) {
      setError("Error sending registration email: " + (e.message || e));
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      BackdropProps={{
        sx: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: 600,
          height: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
          Enter your university email to receive a registration link
        </Typography>
        <TextField
          label="University Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <Box
          sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}
        >
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSend}>
            Send
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default RegistrationModal;

const styles = {
    
};
