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
import { fetchRechargeDetails } from '../api/userApi'; // API import

const InfoLine = ({ label, value, isStatus }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'green';
      case 'failed':
        return 'red';
      case 'pending':
        return 'orange';
      default:
        return 'inherit';
    }
  };

  return (
    <Box display="flex" justifyContent="space-between" mb={0.5}>
      <Typography fontSize="14px">{label}</Typography>
      <Typography
        fontSize="14px"
        sx={{
          color: isStatus ? getStatusColor(value) : 'inherit',
          fontWeight: isStatus ? 'bold' : 'normal'
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

const MoneyLine = ({ label, amount }) => (
  <Box display="flex" justifyContent="space-between" mb={1}>
    <Typography fontSize="14px">{label}</Typography>
    <Typography fontSize="14px">₹ {amount}</Typography>
  </Box>
);

const RechargeCard = ({ record }) => (
  <Card sx={{ marginBottom: 0.5, borderRadius: 3, boxShadow: 2 }}>
    <CardContent>
      <MoneyLine label="Arrival Money" amount={record.amount} />
      <InfoLine label="Create Time" value={new Date(record.createdAt).toLocaleString()} />
      <InfoLine label="Status" value={record.status} isStatus />
      <InfoLine label="Finish Time" value={new Date(record.updatedAt).toLocaleString()} />
    </CardContent>
  </Card>
);

const RechargeRecords = ({ userId }) => {
  const navigate = useNavigate();
  const [rechargeRecords, setRechargeRecords] = useState([]);
  const [loading, setLoading] = useState(true);  // Add loading state

  useEffect(() => {
    const loadRecords = async () => {
      const userId = sessionStorage.getItem('userId');
      if (userId) {
        setLoading(true);  // Start loading
        const data = await fetchRechargeDetails(userId);
        setRechargeRecords(data);
        setLoading(false);  // Stop loading after data is fetched
      }
    };
    loadRecords();
  }, [userId]);

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        backgroundColor: '#fff',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Fixed Blue Header */}
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
            marginRight: '40px' // balance back icon
          }}
        >
          Recharge Records
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
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress />
          </Box>
        ) : rechargeRecords.length > 0 ? (
          rechargeRecords.map((record, index) => (
            <RechargeCard key={index} record={record} />
          ))
        ) : (
          <Typography textAlign="center" mt={30} color="gray">
            No recharge records found.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default RechargeRecords;
