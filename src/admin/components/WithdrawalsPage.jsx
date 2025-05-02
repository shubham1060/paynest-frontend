import React, { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container,
} from '@mui/material';
import { fetchWithdrawals } from '../../api/adminApi'; // adjust path

const WithdrawalsPage = () => {
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    fetchWithdrawals()
      .then(setWithdrawals)
      .catch(err => console.error('Failed to fetch withdrawals:', err));
  }, []);

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
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Bank AccountId</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Created Date Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {withdrawals.map((w, i) => (
              <TableRow key={i}>
                <TableCell>{w.userId}</TableCell>
                <TableCell>₹ {w.amount}</TableCell>
                <TableCell>{w.status}</TableCell>
                <TableCell>{w.bankAccountId}</TableCell>
                <TableCell>{new Date(w.createdAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default WithdrawalsPage;
