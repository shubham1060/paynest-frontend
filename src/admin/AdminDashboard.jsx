import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, Grid } from "@mui/material";
import { getAdminStats } from "../api/adminApi";
import AdminTopbar from "./components/AdminTopbar";

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
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflowX: "hidden",
        width: "100vw",
        maxWidth: "100%"
      }}
    >

      {/* Main content area */}
      <Box sx={{ flexGrow: 1, bgcolor: "#f4f5f7", display: "flex", flexDirection: "column" }}>
        {/* Topbar Component */}
        <AdminTopbar />

        {/* Dashboard Content */}
        <Box sx={{ flexGrow: 1, bgcolor: "#f4f5f7", width: "100%", overflowX: "hidden" }}>
          <Paper
            sx={{ 
              p: { xs: 2, sm: 3 }, 
              borderRadius: 2, 
              boxShadow: 3, 
              width: "83%", 
              overflowX: "auto" 
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#3babd9",
                mb: 2,
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              Welcome to Admin Dashboard
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                mb: 3,
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              Here you can manage your admin activities, view reports, and more.
            </Typography>

            {/* Responsive Grid Layout */}
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
                  <Typography variant="h6">Total Pending Withdraw</Typography>
                  <Typography variant="h4">₹{stats.totalWithdraw.toFixed(2)}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Paper sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="h6">Total Commission</Typography>
                  <Typography variant="h4">₹{stats.totalCommission.toFixed(2)}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Paper sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="h6">Total Investment Amount</Typography>
                  <Typography variant="h4">₹{stats.totalInvestment.toFixed(2)}</Typography>
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
