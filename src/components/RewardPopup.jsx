import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button, Slide } from "@mui/material";
import { markRewardPopupSeen } from "../api/userApi";

const RewardPopup = ({ open, onClose, userId }) => {
  const [slideIn, setSlideIn] = useState(open);

  useEffect(() => {
    setSlideIn(open);
  }, [open]);

  const handleClose = async () => {
    try {
      await markRewardPopupSeen(userId); // ✅ Update DB
      setSlideIn(false); // 🔽 Trigger slide-out animation
      setTimeout(onClose, 300); // Wait for animation to finish
    } catch (error) {
      console.error("Error updating reward status", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Slide direction={slideIn ? "down" : "up"} in={slideIn} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: "absolute",
            top: "35%",
            left: "6%",
            transform: "translate(-50%, -50%)",
            width: "75%",
            bgcolor: "background.paper",
            borderRadius: 7,
            boxShadow: 24,
            p: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="h5" gutterBottom>
            🎉 Congratulations 🎉
          </Typography>
          <Typography sx={{ mb: 2 }}>
            You’ve received ₹150 reward bonus.
          </Typography>

          <Box mt={2}>
            <button onClick={handleClose}>Great</button>
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
};

export default RewardPopup;
