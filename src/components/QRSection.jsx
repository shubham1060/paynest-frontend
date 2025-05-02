import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { Box, Typography, Paper, Avatar } from "@mui/material";
import upiIcon from "../assets/Upi_icons.png"; // single icon for all UPI apps

export const QRSection = ({ upiId, amount }) => {
    const [timeLeft, setTimeLeft] = useState(8 * 60); // 8 minutes in seconds
    const [expired, setExpired] = useState(false);

    const qrData = `upi://pay?pa=${upiId}&pn=PayNest&am=${amount}&cu=INR`;

    // Countdown timer
    useEffect(() => {
        if (timeLeft <= 0) {
            setExpired(true);
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60)
            .toString()
            .padStart(2, "0");
        const seconds = (timeLeft % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    return (
        <Box p={2}>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>
                UPI QR <span style={{ float: "right" }}>⏱ {formatTime()}</span>
            </Typography>

            <Paper
                elevation={3}
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 1,
                    borderRadius: 2,
                    backgroundColor: "#f7fcfc",
                }}
            >
                {!expired ? (
                    <>
                        <QRCode value={qrData} size={130} />
                        <Box
                            textAlign="center"
                            sx={{
                                flexGrow: 1, // allow it to expand inside the flex container
                                px: 2, // add horizontal padding for spacing
                              }}
                        >
                            <Typography fontSize={14} fontWeight={500} mb={1}>
                                Scan the QR using <br /> any UPI App
                            </Typography>
                            <Avatar src={upiIcon} alt="upi" sx={{ width: '90%', height: '30%', mx: 'auto' }} />
                        </Box>

                    </>
                ) : (
                    <Box textAlign="center" width="100%">
                        <Typography fontSize={16} fontWeight={600} color="error">
                            Session Expired
                        </Typography>
                        <Typography fontSize={14} mt={1}>
                            Please refresh to generate a new QR code.
                        </Typography>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};


