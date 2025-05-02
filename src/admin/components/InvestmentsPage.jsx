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
import { fetchInvestments } from '../../api/adminApi'; // adjust path if needed

const InvestmentsPage = () => {
  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    fetchInvestments()
      .then(data => setInvestments(data))
      .catch(err => console.error('Failed to fetch investments:', err));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 0.5 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          color: 'white',
          fontSize: { xs: '1rem', sm: '1.5rem', md: '1.8rem' }
        }}
      >
        Investments
      </Typography>
      <Paper sx={{ width: '85vw', overflowX: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
            <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1 }}>UserId</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1 }}>Username</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1 }}>Invest Amount</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1 }}>Product</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1 }}>Payment sent(Days)</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1 }}>Next Payout</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1 }}>Purchased Date</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1 }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {investments.map((inv, i) => (
              <TableRow key={i}>
                <TableCell sx={{ py: 0.5 }}>{inv.userId}</TableCell>
                <TableCell sx={{ py: 0.5 }}>{inv.user?.name || 'N/A'}</TableCell>
                <TableCell sx={{ py: 0.5 }}>₹ {inv.investAmount}</TableCell>
                <TableCell sx={{ py: 0.5 }}>{inv.productName}</TableCell>
                <TableCell sx={{ py: 0.5 }}>{inv.earningChancesUsed}</TableCell>
                <TableCell sx={{ py: 0.5 }}>
                  {inv.nextPayoutDate ? new Date(inv.nextPayoutDate).toLocaleDateString() : 'N/A'}
                </TableCell>
                <TableCell sx={{ py: 0.5 }}>{new Date(inv.createdAt).toLocaleDateString()}</TableCell>
                <TableCell sx={{ py: 0.5 }}>{inv.isCompleted ? 'Completed' : 'Active'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default InvestmentsPage;
