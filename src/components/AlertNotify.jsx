import React from "react";
import { Snackbar, Alert } from "@mui/material";

const AlertNotify = ({ open, onClose, message, severity = "success", duration = 3000 }) => {
  const getBgColor = (severity) => {
    switch (severity) {
      case "success":
        return "#43a047";
      case "error":
        return "#d32f2f";
      case "warning":
        return "#ffa000";
      case "info":
        return "#0288d1";
      default:
        return undefined;
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{
        position: "fixed",       // Fix to top of screen
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1300,            // Ensure it floats above other components
        width: "100%",
        maxWidth: "100%",
      }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{
          width: "100%",
          fontWeight: "bold",
          fontSize: "1rem",
          backgroundColor: getBgColor(severity),
          color: "white",
          borderRadius: 0,
          justifyContent: "center", // center message
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertNotify;
