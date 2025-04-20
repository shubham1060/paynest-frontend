import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { getCommissionByUserId } from '../api/userApi';
import CircularProgress from '@mui/material/CircularProgress';

const InfoLine = ({ label, value, isStatus }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Credited':
        return 'green';
      case 'Pending':
        return 'orange';
      case 'Failed':
        return 'red';
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
    <Typography fontSize="14px">₹ {amount.toFixed(2)}</Typography>
  </Box>
);

const CommissionCard = ({ record }) => (
  <Card sx={{ marginBottom: 0.5, borderRadius: 3, boxShadow: 2 }}>
    <CardContent>
      <MoneyLine label="Commission Amount" amount={record.commissionEarned} />
      <InfoLine label="Source" value="Referral: user invited"/>
      <InfoLine label="Type" value={record.product} />
      <InfoLine label="Date Earned" value={new Date(record.createdAt).toLocaleString()} />
      <InfoLine label="Status" value={record.status} isStatus />
      <InfoLine label="Credited Time" value={record.status === 'Pending' ? 'Coming soon' : new Date(record.updatedAt).toLocaleString()} />
    </CardContent>
  </Card>
);

const CommisionRecords = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommissions = async () => {
      try {
        const userId = localStorage.getItem('userId'); // assuming userId is stored in localStorage
        const data = await getCommissionByUserId(userId);
        setRecords(data.commissionRecords || []);
      } catch (err) {
        console.error('Error fetching commission data:', err);
      } finally {
        setLoading(false); // ✅ stop loading once done
      }
    };

    fetchCommissions();
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
          Commission Records
        </Typography>
      </Box>

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
          <Box display="flex" justifyContent="center" alignItems="center" height="80%">
            <CircularProgress />
          </Box>
        ) : records.length === 0 ? (
          <Typography textAlign="center" mt={30}>
            You don't invite any user so invite user and get Bonus.
          </Typography>
        ) : (
          records.map((record, index) => (
            <CommissionCard key={index} record={record} />
          ))
        )}
      </Box>
    </Box>
  );
};

export default CommisionRecords;
