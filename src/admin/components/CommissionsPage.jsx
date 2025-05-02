import React, { useEffect, useState } from 'react';
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Container } from '@mui/material';
import { getAllCommissions } from '../../api/adminApi'; // adjust path as needed

const CommissionsPage = () => {
  const [commission, setCommission] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCommissions();
        // console.log('API Response:', data); // 👈 See what's actually returned
        setCommission(data); // May need data.data or data.commissions instead
      } catch (error) {
        console.error('Error fetching commission:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 0.5 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: 'white', fontSize: { xs: '1rem', sm: '1.5rem', md: '1.8rem' } }}
      >
        Commissions
      </Typography>
      <Paper sx={{ width: '85vw', overflowX: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1 }}>UserId</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1 }}>Inviter</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1 }}>Product</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1 }}>Invest Amount</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1 }}>Commission</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1 }}>Status</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1 }}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {commission.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ py: 0.5 }}>{row.childUserId}</TableCell>
                <TableCell sx={{ py: 0.5 }}>{row.inviterUserId}</TableCell>
                <TableCell sx={{ py: 0.5 }}>{row.product}</TableCell>
                <TableCell sx={{ py: 0.5 }}>₹ {row.investAmount}</TableCell>
                <TableCell sx={{ py: 0.5 }}>₹ {row.commissionEarned}</TableCell>
                <TableCell sx={{ py: 0.5 }}>{row.status}</TableCell>
                <TableCell sx={{ py: 0.5 }}>
                  {new Date(row.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default CommissionsPage;
