import { Box, Typography, Button, TextField } from "@mui/material";
import { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const UPISection = ({ upiId, onUTRChange }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const maskedUPI = upiId ? upiId.replace(/^(.{5}).*(@.*)$/, "$1****$2") : "";

  return (
    <Box width="100%">
      {/* UPI ID Row */}
      <Box display="flex" alignItems="center" gap={3} width="100%" mb={4}>
        <Typography variant="body2" color="text.secondary" width="20%" textAlign="center">
          UPI ID
        </Typography>
        <Typography fontWeight="bold" color="error">
          {maskedUPI}
        </Typography>
        <Button
          size="small"
          variant="outlined"
          onClick={handleCopy}
          sx={{ textTransform: "none" }}
        >
          {copied ? "Copied" : "Copy UPI"}
        </Button>
      </Box>

      {/* UTR Input */}
      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <Typography fontWeight={500} width="35px">UTR</Typography>
        <TextField
          placeholder="Input 12 digits here"
          size="small"
          onChange={(e) => onUTRChange(e.target.value)}
          sx={{ flex: 1 }}
        />
      </Box>

      {/* Red Reminder */}
      <Typography fontSize={14} color="error" fontWeight={500} textAlign="center" mt={4}>
        Important reminder: After completing the UPI transaction, please backfill UPI Ref No./UTR No./Google Pay: UPI Transaction ID/Freecharge: Transaction ID (12 digits). If you do not back fill UTR, 100% of the deposit transaction will fail. Please be sure to backfill!
      </Typography>
    </Box>
  );
};

export default UPISection;
