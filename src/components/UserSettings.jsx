import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import { updateUserProfile, getUserProfile } from "../api/userApi"; // make sure getUserProfile is available
import { useAlert } from "./AlertContext";

const UserSettings = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [userData, setUserData] = useState({
    phoneNumber: "",
    name: "",
    email: "",
  });

  // Load user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserProfile();
        if (user) {
          setUserData({
            phoneNumber: user.phoneNumber || "",
            name: user.name || "",
            email: user.email || "",
          });
        }
      } catch (err) {
        console.error("Failed to load user data", err);
        // alert("Failed to load user profile.");
        showAlert("Failed to load user profile", "error");
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (field) => (e) => {
    setUserData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleBack = () => {
    if (location.state?.from === "account") {
      navigate("/account");
    } else if (location.state?.from === "update-profile") {
      navigate("/update-profile");
    }
  };

  const handleConfirm = async () => {
    try {
      const userId = sessionStorage.getItem("userId");
      if (!userId) {
        // alert("User ID not found");
        showAlert("User not found", "error");
        return;
      }

      const res = await updateUserProfile(userId, userData);

      if (res.success) {
        // alert("✅ Profile updated successfully!");
        showAlert("Profile updated successfully!", "success");
      } else {
        // alert("❌ Failed to update profile.");
        showAlert("Failed to update profile", "error");
      }
    } catch (err) {
      console.error("Update failed", err);
      // alert("Error occurred while updating.");
      showAlert("Failed while updating profile", "error");
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "#f2f6fb",
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box
  sx={{
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#156fb2',
    px: 2,
    py: 0.5,
    height: '48px'
  }}
>
  <IconButton onClick={(handleBack) => navigate(-1)} sx={{ color: '#fff', p: 0.5 }}>
    <ArrowBackIosIcon />
  </IconButton>
  <Typography
    variant="subtitle1"
    sx={{
      fontWeight: 600,
      color: '#ffffff',
      flexGrow: 1,
      textAlign: 'center',
      fontSize: '15px',
      marginRight: '40px' // balance back icon
    }}
  >
    User Settings
  </Typography>
</Box>


      {/* Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          px: { xs: 2, md: 10 },
          py: 4,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "#fff",
            borderRadius: "30px",
            width: "100%",
            maxWidth: 500,
            p: 3,
            boxShadow: 3,
            position: "relative",
            mt: { xs: 4, md: 8 },
          }}
        >
          {/* Avatar */}
          <Box
            sx={{
              position: "absolute",
              top: -40,
              left: "50%",
              transform: "translateX(-50%)",
              bgcolor: "#fff",
              borderRadius: "50%",
              p: 1,
              boxShadow: 2,
            }}
          >
            <Avatar
              src="https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
              sx={{ width: 80, height: 80 }}
            />
          </Box>

          <Box mt={6}>
            <Typography>Mobile number (Account)</Typography>
            <TextField
              fullWidth
              size="small"
              disabled
              value={userData.phoneNumber}
              sx={{ my: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneAndroidIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Typography>User name</Typography>
            <TextField
              fullWidth
              size="small"
              value={userData.name}
              onChange={handleChange("name")}
              sx={{ my: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Typography>E-mail</Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="E-mail"
              value={userData.email}
              onChange={handleChange("email")}
              sx={{ my: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />

<Button
  fullWidth
  variant="contained"
  onClick={handleConfirm}
  sx={{
    mt: 2,
    py: 1,
    fontWeight: 600,
    fontSize: "14px",
    background: "#156fb2",
    color: "white",
    borderRadius: "30px",
    transition: "all 0.3s ease",
    textTransform: "none",
    "&:hover": {
      background: "#125a8c",
    },
  }}
>
  Confirm
</Button>

          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserSettings;
