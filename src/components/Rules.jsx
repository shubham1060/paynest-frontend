import React from 'react';
import { Box, Typography, IconButton, Card, CardContent } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const RulesPage = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ height: '100vh', width: '100vw', backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}>
            {/* Blue Header */}
            <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center', backgroundColor: '#156fb2', px: 2, height: '48px' }}>
                <IconButton onClick={() => navigate('/account')} sx={{ color: '#fff', p: 0.5 }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#ffffff', flexGrow: 1, textAlign: 'center', fontSize: '15px', marginRight: '40px' }}>
                    Rules & Conditions
                </Typography>
            </Box>

            {/* Page Content */}
            <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 2, pt: 3, pb: 4, '&::-webkit-scrollbar': { display: 'none' } }}>
                <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                    <CardContent>

                        {/* Rules & Conditions Section */}
                        <Typography fontSize="15px" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Please Read Carefully this rules:
                        </Typography>

                        <Typography fontSize="14px" color="text.secondary" sx={{ mb: 2 }}>
                            • <b>Account Balance</b> and <b>Recharge Balance</b> are different.
                        </Typography>

                        <Typography fontSize="14px" color="text.secondary" sx={{ mb: 2 }}>
                            • <b>Account Balance:</b> The amount shown here is your daily or monthly earnings from purchased products. You can withdraw only from your Account Balance.
                        </Typography>

                        <Typography fontSize="14px" color="text.secondary" sx={{ mb: 2 }}>
                            • <b>Recharge Amount:</b> This is the amount you manually add to your wallet, which can only be used to purchase products. It cannot be withdrawn or returned.
                        </Typography>

                        <Typography fontSize="15px" sx={{ fontWeight: 'bold', mb: 0.5, mt: 1 }}>
                            Referral System
                        </Typography>

                        <Typography fontSize="14px" color="text.secondary" sx={{ mb: 2 }}>
                            • You will earn <b>10% of the referred user's product purchase amount</b> directly into your Account Balance, which you can withdraw.
                        </Typography>

                        <Typography fontSize="15px" sx={{ fontWeight: 'bold', mb: 0.5, mt: 1 }}>
                            Withdrawal Rules
                        </Typography>

                        <Typography fontSize="14px" color="text.secondary" sx={{ mb: 2 }}>
                            • Minimum withdrawal amount is <b>₹200</b>. You cannot withdraw amounts less than ₹200.
                        </Typography>

                        <Typography fontSize="14px" color="text.secondary" sx={{ mb: 2 }}>
                            • Withdrawals will take <b>2–3 days</b> to reach your bank account.
                        </Typography>

                        <Typography fontSize="15px" sx={{ fontWeight: 'bold', mb: 0.5, mt: 1 }}>
                            Product Purchase Rules
                        </Typography>

                        <Typography fontSize="14px" color="text.secondary" sx={{ mb: 2 }}>
                            • Once purchased, a product <b>cannot be canceled or refunded</b>.
                        </Typography>

                        <Typography fontSize="14px" color="text.secondary" sx={{ mb: 2 }}>
                            • A <b>product can only be purchased once</b> per user.
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );

};

export default RulesPage;