import React, { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const UtilsReferralCopyButton = ({ referralCode }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const referralLink = `https://paynest-profit.com/signup?ref=${referralCode}`;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 5000); // 5 seconds later reset
  };

  return (
    <Tooltip title={copied ? "Copied invitation link" : "Copy link"}>
      <IconButton
        size="small"
        sx={{ color: "#ffeb3b" }}
        onClick={handleCopy}
      >
        <ContentCopyIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export default UtilsReferralCopyButton;
