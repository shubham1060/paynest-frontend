import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PopupModel from "./PopupModel";
import { purchaseProduct } from "../api/userApi";
import { useAlert } from "./AlertContext";

const MonthlyEarning = ({ title, investAmount, productCode, earnings, returnPeriod, periodicReturn, totalEarnings }) => {
  const [open, setOpen] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const { showAlert } = useAlert();

  // Handle popup open
  const handleOpen = () => {
    // console.log("Clicked Invest for monthly=13=>");
    setSelectedInvestment({ title, investAmount, productCode, earnings, returnPeriod, periodicReturn, totalEarnings });
    setOpen(true);
  };

  const userId = sessionStorage.getItem('userId');
  const handleConfirmInvest = async () => {
     // Ideally from auth
    // console.log("userId==20==>", sessionStorage.getItem('userId'));
    if (!selectedInvestment) return;

    const cleanAmount = Number(selectedInvestment.investAmount.replace(/[₹,]/g, "").trim());
    // console.log('cleanAmount==22==>', cleanAmount);

    const res = await purchaseProduct(userId, selectedInvestment.productCode, cleanAmount);
    if (res.success) {
      // alert("✅ Investment successful!");
      showAlert("Investment successful!", "success");
      setOpen(false);
    } else {
      let alertType = "warning";
    
      if (res.message.includes("Insufficient balance")) {
        res.message = "Insufficient Recharge Amount";
        alertType = "info";
      } else if (res.message.includes("purchased this product")) {
        alertType = "warning";
      } else {
        alertType = "error"; // Fallback for unknown messages
      }
    
      showAlert(res.message, alertType);
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #E3F2FD, #ffffff)",
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "16px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        width: "90%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "15px" }}>{title}</Typography>
      {[["Invest Amount", investAmount], ["Total Earnings", earnings], ["Return Period", returnPeriod], ["Periodic Return", periodicReturn]].map(([label, value], index) => (
        <Box display="flex" justifyContent="space-between" alignItems="center" key={index}>
          <Typography sx={{ fontSize: "11px" }}>{label}</Typography>
          {label === "Return Period" ? <AccessTimeIcon fontSize="small" /> : null}
          <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>{value}</Typography>
        </Box>
      ))}

      {/* Button to open popup */}
      <Button 
        fullWidth 
        variant="outlined" 
        sx={{ backgroundColor: "#3babd9", color: "#fff", borderRadius: "25px", fontWeight: "bold", fontSize: "10px", mt:2 }} 
        onClick={handleOpen}
      >
        Invest Now
      </Button>

      {/* Investment Popup */}
      <PopupModel
        open={open} 
        onClose={() => setOpen(false)} 
        selectedInvestment={selectedInvestment} 
        onConfirmInvest={handleConfirmInvest}
      />
    </Box>
  );
};

export default MonthlyEarning;
