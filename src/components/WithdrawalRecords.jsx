import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton, CircularProgress
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { fetchUserWithdrawalRecords } from '../api/userApi';

const InfoLine = ({ label, value, isStatus }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Payment Success':
        return 'green';
      case 'Payment Failed':
        return 'red';
      case 'Payment Pending':
        return 'orange';
      default:
        return 'inherit';
    }
  };

  return (
    <Box display="flex" justifyContent="space-between" mb={0.3}>
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

const MoneyLine = ({ label, amount, boldValue = false }) => (
  <Box display="flex" justifyContent="space-between" mb={0.3}>
    <Typography fontSize="14px">{label}</Typography>
    <Typography fontSize="14px" fontWeight={boldValue ? 'bold' : 'normal'}>
      ₹ {amount.toFixed(2)}
    </Typography>
  </Box>
);

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  return date.toLocaleString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    day: '2-digit',
    month: 'short',
    year: '2-digit',
  });
};

const WithdrawalCard = ({ record }) => (
  <Card sx={{ marginBottom: 0.5, borderRadius: 3, boxShadow: 2 }}>
    <CardContent>
      <MoneyLine label="Arrival Money" amount={record.arrivalMoney} boldValue />
      <MoneyLine label="Withdraw Money" amount={record.withdrawMoney} />
      <MoneyLine label="Withdraw Tax" amount={record.withdrawTax} />
      <InfoLine label="Create Time" value={formatDate(record.createdAt)} />
      <InfoLine label="Status" value={record.status} isStatus />
      <InfoLine label="Finish Time" value={formatDate(record.updatedAt)} />
    </CardContent>
  </Card>
);

const WithdrawalRecords = () => {
  const navigate = useNavigate();
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      setLoading(false); // stop loader if no user
      return;
    }

    fetchUserWithdrawalRecords(userId)
      .then(data => {
        setWithdrawals(data);
        setLoading(false); // stop loader after data loads
      }).catch((err) => {
        console.error("Error loading withdrawals", err);
        setLoading(false);
      });
  }, []);

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
          Withdrawal Records
        </Typography>
      </Box>

      {/* Records */}
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
        ) : withdrawals.length === 0 ? (
          <Typography textAlign="center" mt={25}>
            No withdrawal records found.
          </Typography>
        ) : (
          withdrawals.map((record, index) => (
            <WithdrawalCard key={index} record={record} />
          ))
        )}
      </Box>
    </Box>
  );
};

export default WithdrawalRecords;
