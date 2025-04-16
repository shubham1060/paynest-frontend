import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PersonIcon from "@mui/icons-material/Person";
import NumbersIcon from "@mui/icons-material/Numbers";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getAllBanks, addBankDetails } from "../api/userApi";

const BankCardForm = () => {
  const navigate = useNavigate();
  const [banks, setBanks] = useState([]);

  // Form State
  const [formData, setFormData] = useState({
    bankName: "",
    ifsc: "",
    cardholderName: "",
    accountNumber: "",
  });

  const [formErrors, setFormErrors] = useState({
    bankName: false,
    ifsc: false,
    cardholderName: false,
    accountNumber: false,
  });

  // Fetch Banks
  useEffect(() => {
    const fetchBanks = async () => {
      const bankList = await getAllBanks();
      setBanks(bankList);
    };
    fetchBanks();
  }, []);

  // Input Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === 'ifsc' ? value.toUpperCase() : value }));

    if (value.trim()) {
      setFormErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const validateForm = () => {
    const errors = {
      bankName: !formData.bankName.trim(),
      ifsc: !formData.ifsc.trim(),
      cardholderName: !formData.cardholderName.trim(),
      accountNumber: !formData.accountNumber.trim(),
    };
    setFormErrors(errors);
    return !Object.values(errors).includes(true);
  };

  // Submit Handler
  const handleSubmit = async () => {
    try {
      const userId = localStorage.getItem("userId"); // Get current user's ID
      console.log("User ID:==53==>", userId);
      if (!userId) {
        alert("logged in once again");
        navigate("/"); // Redirect to login if userId is not found
        return;
      }
      if (!validateForm()) return;
      console.log("Form submitted:", formData);

      const payload = { ...formData, userId };

      await addBankDetails(payload); // API call to backend
      alert("Bank card added successfully!");
      navigate("/account");
    }
    catch (err) {
      console.error(err);
      alert("Failed to add bank card");
    }
  };


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
          boxSizing: "border-box",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
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
            Add bank card
          </Typography>
        </Box>

        {/* Form */}
        <Box sx={{ padding: 2 }}>
          {/* Bank Dropdown */}
          <Box mt={2}>
            <Typography fontWeight="bold">Bank</Typography>
            <FormControl
              fullWidth
              variant="outlined"
              sx={{ backgroundColor: "#f8f8f8", borderRadius: 2, mt: 0.5 }}
              error={formErrors.bankName}
            >
              <InputLabel id="bank-select-label">Select Bank</InputLabel>
              <Select
                labelId="bank-select-label"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                label="Select Bank"
                startAdornment={
                  <InputAdornment position="start">
                    <AccountBalanceIcon />
                  </InputAdornment>
                }
              >
                {banks.map((bank) => (
                  <MenuItem key={bank._id} value={bank.name}>
                    {bank.name}
                  </MenuItem>
                ))}
              </Select>
              {formErrors.bankName && (
                <Typography color="error" fontSize="0.75rem" ml={2}>
                  Bank is required
                </Typography>
              )}
            </FormControl>
          </Box>

          {/* IFSC */}
          <Box mt={2}>
            <Typography fontWeight="bold">Bank IFSC</Typography>
            <TextField
              fullWidth
              name="ifsc"
              placeholder="Bank IFSC"
              value={formData.ifsc}
              onChange={handleChange}
              variant="outlined"
              error={formErrors.ifsc}
              helperText={formErrors.ifsc ? "IFSC is required" : ""}
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

          {/* Cardholder Name */}
          <Box mt={2}>
            <Typography fontWeight="bold">Cardholder Name</Typography>
            <TextField
              fullWidth
              name="cardholderName"
              placeholder="Cardholder Name"
              value={formData.cardholderName}
              onChange={handleChange}
              variant="outlined"
              error={formErrors.cardholderName}
              helperText={formErrors.cardholderName ? "Cardholder name is required" : ""}
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

          {/* Account Number */}
          <Box mt={2}>
            <Typography fontWeight="bold">Bank Account Number</Typography>
            <TextField
              fullWidth
              name="accountNumber"
              placeholder="Bank Account Number"
              value={formData.accountNumber}
              onChange={handleChange}
              variant="outlined"
              error={formErrors.accountNumber}
              helperText={formErrors.accountNumber ? "Account number is required" : ""}
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
              onClick={handleSubmit}
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
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BankCardForm;
