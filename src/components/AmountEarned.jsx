import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    IconButton,
    CircularProgress
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { getEarningRecords } from '../api/userApi'; // adjust path as needed

const InfoLine = ({ label, value }) => (
    <Box display="flex" justifyContent="space-between" mb={0.5}>
        <Typography fontSize="14px">{label}</Typography>
        <Typography fontSize="14px">{value}</Typography>
    </Box>
);

const MoneyLine = ({ label, amount }) => (
    <Box display="flex" justifyContent="space-between">
        <Typography fontSize="14px">{label}</Typography>
        <Typography fontWeight="bold" fontSize="14px">₹ {amount}</Typography>
    </Box>
);

const EarningCard = ({ record }) => (
    <Card sx={{ marginBottom: 0.5, borderRadius: 3, boxShadow: 2 }}>
        <CardContent>
            <MoneyLine label="Earning Amount" amount={record.amountReceived} />
            <InfoLine label="Product Name" value={record.productName} />
            <InfoLine label="Payout Date" value={record.date} />
            <InfoLine label="Status" value="Credited" />
        </CardContent>
    </Card>
);

const AmountEarned = () => {
    const navigate = useNavigate();
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = sessionStorage.getItem('userId'); // adjust based on your auth logic

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getEarningRecords(userId);
                setRecords(data);
            } catch (err) {
                console.error('Error fetching earning records:', err);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchData();
        }
    }, [userId]);

    return (
        <Box
            sx={{
                paddingTop: '1px',
                height: '100vh',
                width: '100vw',
                backgroundColor: '#fff',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                paddingBottom: '50px',
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#156fb2',
                    px: 2,
                    py: 0.5,
                    height: '48px'
                }}
            >
                <IconButton onClick={() => navigate('/account')} sx={{ color: '#fff', p: 0.5 }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontWeight: 600,
                        color: '#ffffff',
                        flexGrow: 1,
                        textAlign: 'center',
                        fontSize: '15px',
                        marginRight: '40px'
                    }}
                >
                    Amount Earned
                </Typography>
            </Box>

            {/* Scrollable Content */}
            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    px: 2,
                    pt: 0.5,
                    pb: 3,
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    },
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}
            >
                {loading ? (
                    <Box display="flex" justifyContent="center" mt={30}>
                        <CircularProgress />
                    </Box>
                ) : records.length === 0 ? (
                    <Typography textAlign="center" mt={25}>No earning records found.</Typography>
                ) : (
                    records.map((record, index) => (
                        <EarningCard key={index} record={record} />
                    ))
                )}
            </Box>
        </Box>
    );
};

export default AmountEarned;
