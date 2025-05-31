import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button, Slide } from "@mui/material";
import { markRewardPopupSeen } from "../api/userApi";
import ConfettiEffect from "./ConfettiEffect"; 

const RewardPopup = ({ open, onClose, userId }) => {
  const [slideIn, setSlideIn] = useState(open);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setSlideIn(open);
    if (open) {
      setShowConfetti(true); // Start confetti when modal opens
      const timer = setTimeout(() => setShowConfetti(false), 5000); // Stop after 5s
      return () => clearTimeout(timer);
    }
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
      <>
        <ConfettiEffect trigger={showConfetti} /> {/* 🎉 Show confetti */}
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
            You just got <b>₹150</b> reward bonus!
          </Typography>

          <Box mt={2}>
            <button onClick={handleClose}>Great</button>
          </Box>
        </Box>
      </Slide>
      </>
    </Modal>
  );
};

export default RewardPopup;
