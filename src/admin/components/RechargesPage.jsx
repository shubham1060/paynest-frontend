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
  Button,
  Stack,
  CircularProgress,
} from '@mui/material';
import { getAllRecharge, updateRechargeStatus } from '../../api/adminApi'; // adjust path as needed

const RechargesPage = () => {
  const [recharges, setRecharges] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await getAllRecharge();
      setRecharges(res.data || []);
    } catch (err) {
      console.error("Error loading recharges:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateRechargeStatus(id, newStatus); // from adminApi.js
      setRecharges(prev =>
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
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          color: 'white',
          fontSize: { xs: '1rem', sm: '1.5rem', md: '1.8rem' },
        }}
      >
        Recharges
      </Typography>

      {loading ? (
        <CircularProgress sx={{ mt: 4 }} />
      ) : (
        <Paper sx={{ width: '85vw', overflowX: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1976d2' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>UserId</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Recharge Amount</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>UPI ID</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>UTR</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recharges.map((rec) => (
                <TableRow key={rec._id}>
                  <TableCell>{rec.userId}</TableCell>
                  <TableCell>₹{rec.amount}</TableCell>
                  <TableCell>
                    {new Date(rec.createdAt).toLocaleString('en-IN', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: true,
                    })}
                  </TableCell>
                  <TableCell>{rec.upiId}</TableCell>
                  <TableCell>{rec.utr}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => handleStatusChange(rec._id, 'Success')}
                        disabled={rec.status === 'Success'}
                      >
                        Success
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleStatusChange(rec._id, 'Failed')}
                        disabled={rec.status === 'Failed'}
                      >
                        Failed
                      </Button>
                    </Stack>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      Current: <strong>{rec.status}</strong>
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Container>
  );
};

export default RechargesPage;
