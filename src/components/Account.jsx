import React, { useState } from "react";
import { Box, Typography, Card, Avatar, Grid, Button, IconButton, Container } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import RedeemIcon from "@mui/icons-material/Redeem";
import FeedbackIcon from "@mui/icons-material/Feedback";
import BuildIcon from "@mui/icons-material/Build";
import InfoIcon from "@mui/icons-material/Info";
import PaymentIcon from "@mui/icons-material/Payment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useNavigate } from "react-router-dom";
import BankAccountPopup from "./BankAccountPopup";

const Account = () => {
  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false);

  const fundEntryItems = [
    { name: "Billing List", icon: <ReceiptIcon color="primary" />, path: "billing" },
    { name: "Withdrawal Records", icon: <AccountBalanceWalletIcon color="primary" />, path: "withdrawal" },
    { name: "Recharge Records", icon: <PaymentIcon color="primary" />, path: "recharge" },
    { name: "Commission Records", icon: <MonetizationOnIcon color="primary" />, path: "commission" },
    { name: "Reward Records", icon: <RedeemIcon color="primary" /> },
    { name: "My Feedback", icon: <FeedbackIcon color="primary" /> },
    { name: "Self-Service", icon: <BuildIcon color="primary" /> },
    { name: "About Us", icon: <InfoIcon color="primary" /> }
  ];

  const handleRechargeClick = () => {
    navigate("/recharge");
  };

  const handleBankAccountClick = () => {
    setOpenPopup(true);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#156fb2",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          borderRadius: "0px",
          boxShadow: "none",
          padding: 3,
          position: "relative",
          overflowY: "scroll",
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Chrome, Safari
          },
        }}
      >
        {/* Header Icons */}
        <Box sx={{ position: "absolute", top: 16, right: 16, display: "flex", gap: 1 }}>
          <IconButton sx={{ backgroundColor: "#3babd9" }}><NotificationsIcon /></IconButton>
          <IconButton sx={{ backgroundColor: "#3babd9" }}><SettingsIcon /></IconButton>
        </Box>

        {/* User Info Card */}
        <Box sx={{ background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", boxShadow: "0 4px 15px rgba(0, 242, 254, 0.3)", p: 2, borderRadius: "10px", position: "relative", textAlign: "left", mt: 6 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Typography variant="h6" color="white" fontWeight="bold">Sanjay</Typography>
              <Typography color="white">9977692577</Typography>
              <Typography color="white" fontWeight="bold">User ID: 40109939</Typography>
            </Box>
            <Avatar src="/avatar.png" alt="Profile" sx={{ width: 50, height: 50, backgroundColor: "rgba(255, 255, 255, 0.5)", border: "2px solid white" }} />
          </Box>
        </Box>

        {/* Account Balance */}
        <Card sx={{ backgroundColor: "#e0f7fa", p: 2, borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
          <Box>
            <Typography variant="body1" fontWeight="bold">Account Balance</Typography>
            <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>₹0.00</Typography>
          </Box>
          <Button variant="contained" sx={{ backgroundColor: "#26a69a", color: "white" }} onClick={handleRechargeClick}>Recharge →</Button>
        </Card>

        {/* Quick Actions */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={4}>
            <Card sx={{ p: 2, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100px" }}>
              <AccountBalanceWalletIcon color="primary" fontSize="large" />
              <Typography>Withdraw</Typography>
              <Typography>0.00</Typography>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ p: 2, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100px" }}>
              <ReceiptIcon color="primary" fontSize="large" />
              <Typography>Orders</Typography>
              <Typography>0.00</Typography>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card onClick={handleBankAccountClick} sx={{ p: 2, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100px", cursor: "pointer" }}>
              <AccountBalanceIcon color="primary" fontSize="large" />
              <Typography>Bank Account</Typography>
              <Typography variant="body2" sx={{ fontSize: "0.75rem", marginTop: "2px" }}>No Bank Linked</Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Points Section */}
        <Card sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "linear-gradient(to right, #FFD700, #FFF5C3)", p: 2, borderRadius: "10px", mt: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ bgcolor: "#FFC107", mr: 1 }}>
              <RedeemIcon sx={{ color: "white" }} />
            </Avatar>
            <Typography fontWeight="bold">Points: 0</Typography>
          </Box>
          <Button variant="text" sx={{ color: "#555", fontWeight: "bold", textTransform: "none" }}>Records →</Button>
        </Card>

        {/* Fund Entry Section */}
        <Box sx={{ mt: 2, mb: 5 }}>
          <Typography variant="h6" fontWeight="bold">Fund Entry</Typography>
          {fundEntryItems.map((item) => (
            <Card
              key={item.name}
              sx={{ p: 2, mt: 1, display: "flex", alignItems: "center", cursor: item.path ? "pointer" : "default" }}
              onClick={() => {
                if (item.path) navigate(`/list/${item.path}`);
              }}
            >
              <Box sx={{ mr: 2 }}>{item.icon}</Box>
              <Typography>{item.name}</Typography>
            </Card>
          ))}
        </Box>
      </Container>

      <BankAccountPopup open={openPopup} onClose={() => setOpenPopup(false)} />
    </Box>
  );
};

export default Account;
