import React, { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container, Button, Stack,
} from '@mui/material';
import { fetchWithdrawals, updateWithdrawalStatus } from '../../api/adminApi'; // adjust path

const WithdrawalsPage = () => {
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    fetchWithdrawals()
      .then(setWithdrawals)
      .catch(err => console.error('Failed to fetch withdrawals:', err));
  }, []);

  const handleStatusChange = async (id, newStatus) => {
      try {
        await updateWithdrawalStatus(id, newStatus); // from adminApi.js
        setWithdrawals(prev =>
          prev.map(item =>
            item._id === id ? { ...item, status: newStatus } : item
          )
        );
      } catch (error) {
        console.error('Failed to update status', error);
      }
    };

  return (
    <Container maxWidth="lg" sx={{ py: 0.5 }}>
      <Typography variant="h5" gutterBottom sx={{ color: 'white', fontSize: { xs: '1rem', sm: '1.5rem', md: '1.8rem' } }}>
        Withdrawals
      </Typography>
      <Paper sx={{ width: '85vw', overflowX: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>UserId</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Withdraw Amount</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Bank Account</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Created Date Time</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Updated Date Time</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {withdrawals.map((w, i) => (
              <TableRow key={i}>
                <TableCell>{w.userId}</TableCell>
                <TableCell>₹ {w.amount}</TableCell>
                <TableCell>{w.bankAccount}</TableCell>
                <TableCell>{new Date(w.createdAt).toLocaleString()}</TableCell>
                <TableCell>{new Date(w.updatedAt).toLocaleString()}</TableCell>
                {/* <TableCell>{w.status}</TableCell> */}
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => handleStatusChange(w._id, 'Payment Success')}
                      disabled={w.status === 'Payment Success'}
                    >
                      Success
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleStatusChange(w._id, 'Payment Failed')}
                      disabled={w.status === 'Payment Failed'}
                    >
                      Failed
                    </Button>
                  </Stack>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    Current: <strong>{w.status}</strong>
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default WithdrawalsPage;
