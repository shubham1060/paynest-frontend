import React, { useState } from "react";
import { Box, Grid, Typography, Card } from "@mui/material";
import DailyAndMonthlyTabs from "./DailyAndMonthlyTabs";
import DailyEarning from "./DailyEarning";
import MonthlyEarning from "./MonthlyEarning";
import PopupModel from "./PopupModel";
import Footer from "./Footer";
import Header from "./Header";
import { investmentData, investmentMonthlyData } from "./Plandata";
import { purchaseProduct } from "../api/userApi";

const Invest = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [value, setValue] = useState("invest");
  const [open, setOpen] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState(null);

  // Function to handle opening the popup
  const handleOpen = (investment) => {
    setSelectedInvestment(investment);
    setOpen(true);
  };

  const userId = localStorage.getItem('userId');

  const handleConfirmInvest = async (investment) => {  
    if (!userId) {
      alert("User not logged in. Please log in to invest.");
      return;
    }
  
    // Clean ₹ and commas from amount
    const cleanAmount = Number(
      investment.investAmount.replace(/[₹,]/g, "").trim()
    );
  
    console.log('cleanAmount==41==>',cleanAmount);
    const res = await purchaseProduct(userId, investment.productCode, cleanAmount);
  
    if (res.success) {
      alert("✅ Investment successful!");
      setOpen(false);
    } else {
      alert("❌ " + res.message);
    }
  };  

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100vw", // Prevents extra white space
        minHeight: "100vh",
        backgroundColor: "#156fb2",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        overflowX: "hidden", // Hide horizontal scroll issue
        padding: 0, // Remove extra padding
        margin: 0, // Remove extra margin
        paddingBottom: "56px",
      }}
    >
      <Header />
      <DailyAndMonthlyTabs tabIndex={tabIndex} onChange={setTabIndex} />
      <Box
        sx={{
          padding: "10px",
          background: "linear-gradient(to bottom, #3babd9, #3babd9)",
          minHeight: "500px", // Same height for both tabs
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {tabIndex === 0 ? (
          <>
            <Typography
              sx={{
                color: "white",
                fontFamily: "sans-serif",
                fontWeight: "bold",
                mr: "7%",
                mt: "3%",
                mb: "-2%",
                fontSize: { xs: "0.9rem", sm: "0.9rem" },
              }}
            >
              💰 Daily Earnings Introductory
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontFamily: "sans-serif",
                padding: "25px",
                fontSize: { xs: "0.9rem", sm: "0.9rem" },
              }}
            >
              Investing in the first cycle product of each group qualifies you
              to invest in the second benefit product.
            </Typography>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              {investmentData.map((group, index) => (
                <Card
                  key={index}
                  sx={{
                    padding: "10px",
                    width: "90%",
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    border: "2px solid rgba(251, 250, 250, 0.2)",
                    borderColor: "#fefeff",
                  }}
                >
                  {/* Group Title */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#fff",
                      mb: "2%",
                      textAlign: "center",
                    }}
                  >
                    {index === 0
                      ? "Portfolio Investment Product A"
                      : index === 1
                      ? "Portfolio Investment Product B"
                      : "Portfolio Investment Product C"}
                  </Typography>

                  {/* Daily Earning Grid */}
                  <Grid
                    container
                    spacing={1}
                    sx={{ padding: "0.5px", width: "100%", color: "#000" }}
                  >
                    {group.map((item, itemIndex) => (
                      <Grid item xs={6} sm={6} key={itemIndex}>
                        <DailyEarning data={item} onInvest={handleOpen} />
                      </Grid>
                    ))}
                  </Grid>
                </Card>
              ))}
            </Box>
          </>
        ) : (
          <>
            <Typography
              sx={{
                color: "white",
                fontFamily: "sans-serif",
                fontWeight: "bold",
                mr: "7%",
                mt: "3%",
                mb: "-2%",
                fontSize: { xs: "0.9rem", sm: "0.9rem" },
              }}
            >
              📅 Monthly Earnings Introductory
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontFamily: "sans-serif",
                padding: "25px",
                fontSize: { xs: "0.9rem", sm: "0.9rem" },
              }}
            >
              Earn returns monthly with our premium investment plan.
            </Typography>
            {investmentMonthlyData.map((item, index) => (
              <MonthlyEarning key={index} {...item} />
            ))}
          </>
        )}
      </Box>

      {/* Popup Model for Investment Details */}
      <PopupModel
        open={open}
        onClose={() => setOpen(false)}
        selectedInvestment={selectedInvestment}
        onConfirmInvest={handleConfirmInvest}
      />

      {/* Footer */}
      <Footer
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
      />
    </Box>
  );
};

export default Invest;
