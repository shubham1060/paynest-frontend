import React from "react";
import { Snackbar, Alert } from "@mui/material";

const AlertNotify = ({ open, onClose, message, severity = "success", duration = 4000 }) => {
  const getBgColor = (severity) => {
    switch (severity) {
      case "success":
        return "#43a047"; // green
      case "error":
        return "#d32f2f"; // true red
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
        width: "100%",
        marginTop: "-2%",  // Move the alert higher up
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
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertNotify;
