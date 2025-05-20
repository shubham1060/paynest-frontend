// TelegramModal.jsx
import React from "react";
import { Modal, Box, Typography, Button, Slide, Stack } from "@mui/material";
import tlogo from '../assets/tlogo.png';

const TelegramModal = ({ open, onClose }) => {
    const channelInfo = {
        name: "PAYNEST PROFIT COMPANY",
        subscribers: "2000+ subscribers",
        imageUrl: tlogo,
        telegramLink: "https://t.me/paynestprofit",
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Slide direction="down" in={open}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '22%',
                        left: '4%',
                        transform: 'translate(-50%, -50%)',
                        width: '75%',
                        bgcolor: 'background.paper',
                        borderRadius: 3,
                        boxShadow: 24,
                        p: 4,
                        textAlign: 'center',
                    }}
                >
                    <img
                        src={channelInfo.imageUrl}
                        alt="Channel DP"
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: "50%",
                            marginBottom: 16,
                        }}
                    />
                    <Typography variant="body2" sx={{ mb: 1, fontWeight:"bold"}}>
                        Join our official Telegram channel
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                        {channelInfo.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                        {channelInfo.subscribers}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        Stay updated with latest updates, offers and support. Don’t miss out!
                    </Typography>

                    {/* Buttons in one row */}
                    <Stack direction="row" spacing={2} justifyContent="center" mt={1}>
                        <Button
                            variant="contained"
                            href={channelInfo.telegramLink}
                            target="_blank"
                            sx={{
                                backgroundColor: '#3babd9',
                                color: '#fff',
                                borderRadius: '20px',
                                px: 3,
                            }}
                        >
                            Join Now
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={onClose}
                            sx={{ borderRadius: "20px", px: 3 }}
                        >
                            Not Now
                        </Button>
                    </Stack>
                </Box>
            </Slide>
        </Modal>
    );
};

export default TelegramModal;
