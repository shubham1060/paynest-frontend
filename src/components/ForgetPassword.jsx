import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  TextField,
  CardContent,
  FormControl,
  InputLabel,
  Typography,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PhoneIphone from "@mui/icons-material/PhoneIphone";
import VpnKey from "@mui/icons-material/VpnKey";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPassword } from '../api/userApi';
import { jwtDecode } from "jwt-decode";
import { useAlert } from "./AlertContext";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { showAlert } = useAlert();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded?.phoneNumber) {
          setPhone(decoded.phoneNumber);
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error("Invalid token");
      }
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!phone || phone.length !== 10) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBack = () => {
    if (location.state?.from === "account") {
      navigate("/account");
    } else if (location.state?.from === "self-service") {
      navigate("/self-service");
    } else {
      navigate("/");
    }
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const payload = isLoggedIn ? { password } : { phoneNumber: phone, password };
  
        const response = await resetPassword(payload);
        // alert("Password changed successfully!");
        showAlert("Password changed successfully!", "success");
        setPassword("");
      } catch (error) {
        console.error("Reset error:", error);
        // alert("Error resetting password");
        showAlert("Error in changing password", "error");
      }
    }
  };

  return (
    <Box sx={{ width: "100vw", minHeight: "100vh", bgcolor: "#f1f5f9" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#156fb2",
          px: 2,
          py: 0.5,
        }}
      >
        <IconButton onClick={handleBack} sx={{ color: "#fff" }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            color: "#ffffff",
            flexGrow: 1,
            textAlign: "center",
            fontSize: "15px",
          }}
        >
          Reset Login Password
        </Typography>
      </Box>

      {/* Card with inputs */}
      <Box
        sx={{
          bgcolor: "#fff",
          borderRadius: "20px",
          p: 3,
          mt: 2,
          mx: 2,
        }}
      >
        {/* <Typography sx={{ mb: 2, fontWeight: 500 }}>
          Reset Payment Password
        </Typography> */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 1.5,
            mb: 1,
            flexWrap: "nowrap",
          }}
        >
          <CardContent sx={{ p: 0, width: "100%" }}>
            {/* Phone Number Field */}
            <FormControl fullWidth variant="outlined" sx={{ mb: 2, mt: 1 }}>
              <InputLabel error={!!errors.phone}>Mobile Number</InputLabel>
              <OutlinedInput
                type="tel"
                value={phone}
                placeholder="Enter Your Mobile Number"
                disabled={isLoggedIn}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                }
                error={!!errors.phone}
                startAdornment={
                  <InputAdornment position="start">
                    <PhoneIphone color="primary" />
                    <Typography sx={{ fontWeight: "bold", ml: 1 }}>+91</Typography>
                  </InputAdornment>
                }
                label="Mobile Number"
                sx={{
                  "& fieldset": {
                    borderColor: errors.phone
                      ? "red !important"
                      : "rgba(0, 0, 0, 0.23)",
                  },
                }}
              />
              {errors.phone && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1 }}>
                  {errors.phone}
                </Typography>
              )}
            </FormControl>

            {/* Password Field */}
            <FormControl
              fullWidth
              variant="outlined"
              sx={{ mb: 1, mt: 1 }}
              error={!!errors.password}
            >
              <InputLabel>Set Password</InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Login Password"
                onChange={(e) => setPassword(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <VpnKey color="primary" />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Set Password"
              />
              {errors.password && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1 }}>
                  {errors.password}
                </Typography>
              )}
            </FormControl>
          </CardContent>
        </Box>
      </Box>

      {/* Confirm Button */}
      <Box sx={{ px: 2, mt: 1 }}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 1,
            py: 1,
            fontWeight: 600,
            fontSize: "14px",
            background: "#156fb2",
            color: "white",
            borderRadius: "30px",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "#125a8c",
            },
          }}
          onClick={handleSubmit}
        >
          Confirm
        </Button>
      </Box>
    </Box>
  );
};

export default ForgetPassword;
