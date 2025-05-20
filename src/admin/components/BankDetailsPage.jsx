import React, { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container
} from '@mui/material';
import { getBankDetails } from '../../api/adminApi';

const BankDetailsPage = () => {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    getBankDetails()
      .then(res => {
        // console.log('Bank details response:=20=>', res);
        setDetails(res?.data || []);
        // console.log('Bank details response:=22=>', res.data);
      })
      .catch(err => console.error('Failed to fetch bank details:', err));
  }, []);

  return (
    <Container sx={{ py: 0.5 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: 'white', fontSize: { xs: '1rem', sm: '1.5rem', md: '1.8rem' } }}
      >
        Bank Details
      </Typography>
      <Paper sx={{ width: '85vw', overflowX: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>User ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Cardholder Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Bank</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Account No.</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>IFSC</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {details.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.userId}</TableCell>
                <TableCell>{row.cardholderName}</TableCell>
                <TableCell>{row.bankName}</TableCell>
                <TableCell>{row.accountNumber}</TableCell>
                <TableCell>{row.ifsc}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default BankDetailsPage;
