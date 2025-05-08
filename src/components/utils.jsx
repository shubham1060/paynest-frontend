import React, { useRef } from "react";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import ForgetPassword from "./ForgetPassword";

const ForgetPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (validateForm()) {
      // console.log("Resetting password for:", phone);
      // API Call for password reset logic
    }
  };

  const handleBack = () => {
    if (location.state?.from === "account") {
      navigate("/account");
    } else {
      navigate("/"); // default to login
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
        <IconButton onClick={() => navigate("/account")} sx={{ color: "#fff" }}>
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
        <Typography sx={{ mb: 2, fontWeight: 500 }}>
          Reset Payment Password
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 1.5,
            mb: 2,
            flexWrap: "nowrap",
          }}
        >
          {/* Content */}
          <CardContent>
            {/* Phone Number Field */}
            <FormControl fullWidth variant="outlined" sx={{ mb: 2, mt: 1 }}>
              <InputLabel error={!!errors.phone}>Mobile Number</InputLabel>
              <OutlinedInput
                type="tel"
                value={phone}
                placeholder="Enter Your Mobile Number"
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                error={!!errors.phone}
                startAdornment={
                  <InputAdornment position="start">
                    <PhoneIphone color="primary" />
                    <Typography sx={{ fontWeight: "bold", ml: 1 }}>+91</Typography>
                  </InputAdornment>
                }
                label="Mobile Number"
                sx={{
                  "& fieldset": { borderColor: errors.phone ? "red !important" : "rgba(0, 0, 0, 0.23)" },
                }}
              />
              {errors.phone && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1 }}>
                  {errors.phone}
                </Typography>
              )}
            </FormControl>

            {/* Password Field */}
            <FormControl fullWidth variant="outlined" sx={{ mb: 2, mt: 1 }} error={!!errors.password}>
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
                      {showPassword ? <VisibilityOff /> : <Visibility />}
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
      <Box sx={{ px: 2, mt: 3 }}>
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

/*
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  Paper,
} from '@mui/material';

const MyFeedbackPage = () => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    // You can replace this with an API call to save feedback
    // console.log('Submitted Feedback:', feedback);
    // console.log('Rating:', rating);
    alert('Thank you for your feedback!');
    setFeedback('');
    setRating(0);
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        maxWidth: '100vw',
        mx: 'auto',
        mt: 5,
        p: 4,
        borderRadius: 3,
      }}
    >
      <Typography variant="h5" gutterBottom>
        My Feedback
      </Typography>

      <Rating
        name="feedback-rating"
        value={rating}
        onChange={(event, newValue) => setRating(newValue)}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Write your feedback"
        multiline
        rows={4}
        fullWidth
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        variant="outlined"
        sx={{ mb: 3 }}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        disabled={!feedback}
      >
        Submit Feedback
      </Button>
    </Box>
  );
};


import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, Grid } from "@mui/material";
import { getAdminStats } from "../api/adminApi";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to load admin stats", err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <Typography>Loading...</Typography>;

  const productTitles = Object.keys(stats.productCounts);

  return (
    <Box sx={{ display: "flex", width: "100vw", overflowX: "hidden" }}>
      <Box sx={{ flexGrow: 1, bgcolor: "#f4f5f7", display: "flex", flexDirection: "column" }}>
        <Box sx={{ flexGrow: 1, width: "100%" }}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3, width: "90%", margin: "auto" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#3babd9", mb: 2 }}>
              Admin Dashboard
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Paper sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="h6">Total Users</Typography>
                  <Typography variant="h4">{stats.totalUsers}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Paper sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="h6">Total Recharge</Typography>
                  <Typography variant="h4">₹{stats.totalRecharge.toFixed(2)}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Paper sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="h6">Total Balance</Typography>
                  <Typography variant="h4">₹{stats.totalBalance.toFixed(2)}</Typography>
                </Paper>
              </Grid>
              {productTitles.map((title, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper sx={{ p: 2, textAlign: "center" }}>
                    <Typography variant="h6">{title}</Typography>
                    <Typography variant="h4">{stats.productCounts[title]}</Typography>
                  </Paper>
                </Grid>
              ))}
              <Grid item xs={12} sm={6} md={4}>
                <Paper sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="h6">Total Withdraw</Typography>
                  <Typography variant="h4">₹{stats.totalWithdraw.toFixed(2)}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Paper sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="h6">Total Commission</Typography>
                  <Typography variant="h4">₹{stats.totalCommission.toFixed(2)}</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
*/