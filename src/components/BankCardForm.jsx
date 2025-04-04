import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PersonIcon from "@mui/icons-material/Person";
import NumbersIcon from "@mui/icons-material/Numbers";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BankCardForm = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#156fb2",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "600px",
          height: "100vh",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          overflowX: "hidden",
          padding: 2,
          boxSizing: "border-box",
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": { display: "none" }, // Chrome
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#156fb2",
            padding: 2,
            borderRadius: 2,
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <IconButton onClick={() => navigate("/account")} sx={{ color: "#ffffff" }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#ffffff",
              flexGrow: 1,
              textAlign: "center",
              mr: 4,
            }}
          >
            Add bank card
          </Typography>
        </Box>

        {/* Form Fields */}
        <Box mt={2}>
          <Typography fontWeight="bold">Bank</Typography>
          <TextField
            fullWidth
            variant="outlined"
            disabled
            value="Bank"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountBalanceIcon />
                </InputAdornment>
              ),
            }}
            sx={{ backgroundColor: "#f8f8f8", borderRadius: 2, mt: 0.5 }}
          />
        </Box>

        <Box mt={2}>
          <Typography fontWeight="bold">Bank IFSC</Typography>
          <TextField
            fullWidth
            placeholder="Bank IFSC"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <NumbersIcon />
                </InputAdornment>
              ),
            }}
            sx={{ backgroundColor: "#f8f8f8", borderRadius: 2, mt: 0.5 }}
          />
        </Box>

        <Box mt={2}>
          <Typography fontWeight="bold">Cardholder Name</Typography>
          <TextField
            fullWidth
            placeholder="Cardholder Name"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            sx={{ backgroundColor: "#f8f8f8", borderRadius: 2, mt: 0.5 }}
          />
        </Box>

        <Box mt={2}>
          <Typography fontWeight="bold">Bank Account Number</Typography>
          <TextField
            fullWidth
            placeholder="Bank Account Number"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CreditCardIcon />
                </InputAdornment>
              ),
            }}
            sx={{ backgroundColor: "#f8f8f8", borderRadius: 2, mt: 0.5 }}
          />
        </Box>

        {/* Confirm Button */}
        <Box mt={3} mb={1}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#156fb2",
              color: "white",
              py: 1.5,
              fontWeight: 700,
              borderRadius: 50,
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#125a8c",
              },
            }}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BankCardForm;
