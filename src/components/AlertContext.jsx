import React, { createContext, useContext, useState } from "react";
import AlertNotify from "./AlertNotify"; // adjust path

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: "success",
    duration: 2000,
  });

  const showAlert = (message, severity = "success", duration) => {
    const defaultDurations = {
      success: 3000,
      error: 3000,
      warning: 3500,
      info: 3000,
    };
    setAlertState({
      open: true, message, severity, duration: duration ?? defaultDurations[severity] ?? 3000,
    });
  };

  const handleClose = () => {
    setAlertState(prev => ({ ...prev, open: false }));
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <AlertNotify
        open={alertState.open}
        onClose={handleClose}
        message={alertState.message}
        severity={alertState.severity}
        duration={alertState.duration}
      />
    </AlertContext.Provider>
  );
};
