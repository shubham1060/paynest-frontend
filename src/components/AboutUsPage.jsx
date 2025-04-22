import React from 'react';
import { Box, Typography, IconButton, Card, CardContent } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import a3 from '../assets/a3.png';

const AboutUsPage = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ height: '100vh', width: '100vw', backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}>
            {/* Blue Header */}
            <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center', backgroundColor: '#156fb2', px: 2, height: '48px' }}>
                <IconButton onClick={() => navigate('/account')} sx={{ color: '#fff', p: 0.5 }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#ffffff', flexGrow: 1, textAlign: 'center', fontSize: '15px', marginRight: '40px' }}>
                    About Us
                </Typography>
            </Box>

            {/* Page Content */}
            <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 2, pt: 3, pb: 4, '&::-webkit-scrollbar': { display: 'none' } }}>
                <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
                            Welcome to PayNest Profit Company !
                        </Typography>

                        {/* 🌟 Image Section Starts Here */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <img
                                src={a3}
                                alt="PayNest Office"
                                style={{ width: '100%', borderRadius: '12px', objectFit: 'cover' }}
                            />
                        </Box>

                        <Typography fontSize="14px" color="text.secondary" sx={{ mb: 2, mt: 5 }}>
                            Welcome to our platform — Our smart companion for managing profits and transactions with ease. Our Profit App is designed to help users track earnings, monitor growth, and gain financial insights in real-time. Whether you're an investor, a business owner, or just someone looking to manage passive income, our intuitive dashboard puts your profit journey front and center.

                            Complementing this is our powerful Transaction App, built for secure, seamless, and instant money transfers. From managing deposits and withdrawals to viewing transaction history, it offers complete transparency and control over your financial activities.

                            Together, these apps form a powerful ecosystem that promotes smart financial decisions. With advanced analytics, real-time notifications, and user-friendly interfaces, we empower individuals to take charge of their money confidently. Our mission is simple — to make finance easy, efficient, and accessible for everyone.
                        </Typography>

                        <Typography fontSize="14px" color="text.secondary" sx={{ mb: 2 }}>
                            Our mission is to provide valuable profit to the customers.
                        </Typography>

                        <Typography fontSize="14px" color="text.secondary">
                            Founded in 2021, we have proudly served over 10k+ customers and continue to grow every day. Thank you for being a part of our journey!
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default AboutUsPage;
