import React from "react";
import { Box, Typography, Card, CardContent, Avatar, Grid, Button, IconButton, Container } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import RedeemIcon from "@mui/icons-material/Redeem";
import FeedbackIcon from "@mui/icons-material/Feedback";
import BuildIcon from "@mui/icons-material/Build";
import InfoIcon from "@mui/icons-material/Info";

const Account = () => {
  const fundEntryItems = [
    { name: "Billing List", icon: <ReceiptIcon color="primary" /> },
    { name: "Withdrawal Records", icon: <AccountBalanceWalletIcon color="primary" /> },
    { name: "Recharge Records", icon: <AccountBalanceWalletIcon color="primary" /> },
    { name: "Commission Records", icon: <ReceiptIcon color="primary" /> },
    { name: "Reward Records", icon: <RedeemIcon color="primary" /> },
    { name: "My Feedback", icon: <FeedbackIcon color="primary" /> },
    { name: "Self-Service", icon: <BuildIcon color="primary" /> },
    { name: "About Us", icon: <InfoIcon color="primary" /> }
  ];

  return (
    <Box sx={{ 
      width: "100vw", 
      minHeight: "100vh", 
      backgroundColor: "#f8f9fa", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center",
      padding: 2
    }}>
      <Container maxWidth="md" sx={{ 
        backgroundColor: "white", 
        borderRadius: "16px", 
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)", 
        padding: 3,
        position: "relative"
      }}>
        {/* Notification and Settings Icons - with reduced gap */}
        <Box sx={{ 
          position: "absolute", 
          top: 16, 
          right: 16,
          display: "flex",
          gap: 0.1
        }}>
          <IconButton>
            <NotificationsIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </Box>

        {/* User Info Section */}
        <Box sx={{ 
          backgroundColor: "#2c3e50", 
          p: 2, 
          borderRadius: "10px", 
          position: "relative", 
          textAlign: "left",
          marginTop: 6
        }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Typography variant="h6" color="white" fontWeight="bold">
                Sanjay
              </Typography>
              <Typography color="white">9977692577</Typography>
              <Typography color="white" fontWeight="bold">User ID: 40109939</Typography>
            </Box>
            <Avatar 
              src="/avatar.png" 
              alt="Profile" 
              sx={{ 
                width: 50, 
                height: 50,
                border: "2px solid white"
              }} 
            />
          </Box>
        </Box>

        <Card sx={{ backgroundColor: "#e0f7fa", p: 2, borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
          <Box>
            <Typography variant="body1" fontWeight="bold">Account Balance</Typography>
            <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>₹0.00</Typography>
          </Box>
          <Button variant="contained" sx={{ backgroundColor: "#26a69a", color: "white" }}>Recharge →</Button>
        </Card>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={4}>
            <Card sx={{ p: 2, textAlign: "center" }}>
              <AccountBalanceWalletIcon color="primary" fontSize="large" />
              <Typography>Withdraw</Typography>
              <Typography>0.00</Typography>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ p: 2, textAlign: "center" }}>
              <ReceiptIcon color="primary" fontSize="large" />
              <Typography>Orders</Typography>
              <Typography>0.00</Typography>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ 
              p: 2, 
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <AccountBalanceIcon color="primary" fontSize="large" />
              <Typography>Bank Account</Typography>
              <Typography variant="body2" sx={{ whiteSpace: "nowrap", fontSize: '0.8rem' }}>No Bank Linked</Typography>
            </Card>
          </Grid>
          
        </Grid>

        <Card 
  sx={{ 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    background: "linear-gradient(to right, #FFD700, #FFF5C3)", 
    p: 2, 
    borderRadius: "10px", 
    mt: 2 
  }}
>
  <Box sx={{ display: "flex", alignItems: "center" }}>
    <Avatar sx={{ bgcolor: "#FFC107", mr: 1 }}>
      <RedeemIcon sx={{ color: "white" }} />
    </Avatar>
    <Typography fontWeight="bold">Points: 0</Typography>
  </Box>
  <Button 
    variant="text" 
    sx={{ color: "#555", fontWeight: "bold", textTransform: "none" }}
  >
    Records →
  </Button>
</Card>


        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" fontWeight="bold">Fund Entry</Typography>
          {fundEntryItems.map((item) => (
            <Card key={item.name} sx={{ p: 2, mt: 1, display: "flex", alignItems: "center" }}>
              <Box sx={{ mr: 2 }}>{item.icon}</Box>
              <Typography>{item.name}</Typography>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Account;