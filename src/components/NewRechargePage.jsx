import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button,
    Container,
    Grid,
    useTheme,
    useMediaQuery,
    Card,
    CardContent,
} from "@mui/material";
import { QRSection } from "./QRSection";
import UPISection from "./UPISection";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { submitRechargePayment } from "../api/userApi"; // Assuming submitRechargePayment is defined in userApi.js
import { useAlert } from "./AlertContext"; // Assuming you have an alert context to show alerts
import { useNavigate } from "react-router-dom";

// Animation config
const pageVariants = {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.4 } },
    exit: { y: "100%", opacity: 0, transition: { duration: 0.3 } },
};

const NewRechargePage = () => {
    const [utr, setUtr] = useState("");
    const { showAlert } = useAlert();
    const navigate = useNavigate();

    // Get the passed amount and channel from the previous page
    const location = useLocation();
    const { amount, channel, userId } = location.state || {}; // Destructure amount, channel, and userId

    const upiIds = [
        "8357901140@pthdfc", "78paynest108@airtel"
    ];

    let selectedUPI = "";

    if (channel === "channel1") {
        selectedUPI = upiIds[0]; // Use UPI ID 1 for channel1
    } else if (channel === "channel2") {
        selectedUPI = upiIds[1]; // Use UPI ID 2 for channel2
    }

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleSubmit = async () => {
        if (!utr || utr.length < 10) {
          showAlert("Please enter a valid UTR number", "warning");
          return;
        }
      
        try {
          const data = {
            upiId: selectedUPI,
            amount: amount,
            utr: utr,
            userId: userId, // Ensure userId is correct and available
          };
      
          // Call the API to submit recharge data
          const response = await submitRechargePayment(data); // Assuming submitRechargePayment is an API call
      
        //   console.log("API Response:", response); // Log the response for debugging
      
          if (response.success) {
            // Show success alert
            showAlert("Recharge amount will be credited in 5-10 minutes.", "success");
          
            // Delay navigation to account page by 3 seconds
            setTimeout(() => {
              navigate("/account"); // Adjust to the correct account page route
            }, 3000); // 3000 milliseconds = 3 seconds
          } else {
            // Handle unexpected response
            showAlert("An error occurred. Please try again later.", "error");
          }
        } catch (error) {
          // Handle error
          showAlert("An error occurred. Please try again later.", "error");
        }
      };

    const handleBackButtonClick = () => {
        navigate("/recharge"); // Replace '/recharge' with your actual recharge page route
    };

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh", // Ensure it takes full viewport height
                background: "#f9f9f9",
            }}
        >
            <Box minHeight="100vh" width="100vw" display="flex" flexDirection="column" paddingBottom="35px">
                {/* App Bar */}
                <AppBar position="static" sx={{ backgroundColor: "#3babd9" }}>
                    <Toolbar sx={{ position: "relative" }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="back"
                            onClick={handleBackButtonClick} // Add the onClick handler
                        >
                            <ArrowBackIcon />
                        </IconButton>

                        <Typography
                            variant="h6"
                            sx={{
                                position: "absolute",
                                left: "50%",
                                transform: "translateX(-50%)",
                                fontWeight: "bold",
                            }}
                        >
                            PayNest Recharge
                        </Typography>

                        <Box sx={{ flexGrow: 1 }} />
                        <IconButton color="inherit">
                            <AccountCircleIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                {/* Page Content */}
                <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 0, pt: 0, pb: 0, '&::-webkit-scrollbar': { display: 'none' } }}>
                    <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                        <CardContent>
                            <Container maxWidth="md" sx={{ flexGrow: 1, py: 1 }}>
                                <Typography variant="h6" mb={1} fontWeight={600}>
                                    Payment Options
                                </Typography>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <QRSection upiId={selectedUPI} amount={amount} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <UPISection upiId={selectedUPI} onUTRChange={setUtr} />
                                    </Grid>
                                </Grid>
                            </Container>
                        </CardContent>
                    </Card>
                </Box>

                {/* Footer */}
                <Box
                    position="fixed"
                    bottom={0}
                    left={0}
                    right={0}
                    bgcolor="white"
                    borderTop="1px solid #ccc"
                    p={1.3}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    zIndex={1200}
                >
                    <Typography variant="h6" color="primary" sx={{ flex: 0.3, ml: 2, fontWeight: 'bold' }}>
                        ₹{amount}
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            flex: 0.6,
                            py: 1.5,
                            borderRadius: "10px",
                            fontWeight: 'bold',
                            backgroundColor: "#3babd9",
                            '&:hover': { backgroundColor: "#3babd8" }
                        }}
                        size="large"
                        onClick={handleSubmit}
                    >
                        SUBMIT
                    </Button>
                </Box>
            </Box>
        </motion.div>
    );
};

export default NewRechargePage;
