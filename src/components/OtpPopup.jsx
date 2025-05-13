import React from "react";
import { Dialog, DialogContent, IconButton, TextField, InputAdornment, Typography, Button, Slide, } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAlert } from "./AlertContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const OtpPopup = ({
  open,
  onClose,
  captchaValue,
  onCaptchaChange,
  isCaptchaCorrect,
  captchaUrl,
  smsCode,
  setSmsCode,
  timer,
  handleGetSmsCode,
  onVerifySuccess,
  expectedSmsCode
}) => {
  const { showAlert } = useAlert();
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      fullWidth
      sx={{ "& .MuiDialog-paper": { borderRadius: "20px", position: "absolute", bottom: 0, m: 0, } }}>
      <DialogContent>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ color: (theme) => theme.palette.grey[500], ml: "90%", mt: "-1%", mb: "1%" }}
        >
          <CloseIcon />
        </IconButton>

        <TextField
          fullWidth
          value={captchaValue}
          onChange={onCaptchaChange}
          label="Enter CAPTCHA"
          placeholder="Enter the Number in image"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <img
                  src={captchaUrl}
                  alt="captcha"
                  style={{ height: 30, width: 80, borderRadius: 4 }}
                />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          margin="normal"
          fullWidth
          value={smsCode}
          onChange={(e) => setSmsCode(e.target.value)}
          label="SMS Verify Code"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {timer > 0 ? (
                  <Typography
                    variant="body2"
                    sx={{ color: "grey", userSelect: "none" }}
                  >
                    {timer}s
                  </Typography>
                ) : (
                  <Typography
                    variant="body2"
                    sx={{
                      color: isCaptchaCorrect ? "blue" : "grey",
                      cursor: isCaptchaCorrect ? "pointer" : "not-allowed",
                      "&:hover": isCaptchaCorrect
                        ? { textDecoration: "underline" }
                        : {},
                      userSelect: "none",
                    }}
                    onClick={() => {
                      if (isCaptchaCorrect) {
                        handleGetSmsCode();
                      }
                    }}
                  >
                    Get SMS Code
                  </Typography>
                )}
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 4, borderRadius: 8 }}
          onClick={() => {
            if (!captchaValue) {
              showAlert("Please enter the CAPTCHA", "error");
              return;
            }
            if (!isCaptchaCorrect) {
              showAlert("Captcha does not match", "error");
              return;
            }
            if (!smsCode) {
              showAlert("Please enter the SMS code", "error");
              return;
            }
            if (smsCode !== expectedSmsCode) {
              showAlert("Incorrect OTP Number", "error");
              return;
            }

            // If everything is fine, proceed
            onVerifySuccess(); // 🔥 This will call the createUser API from SignupForm
            onClose(); // Close the popup
          }}
        >
          Confirm
        </Button>
      </DialogContent>


    </Dialog>
  );
};

export default OtpPopup;
