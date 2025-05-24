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
  Pagination,
} from '@mui/material';
import { getAllRecharge, updateRechargeStatus } from '../../api/adminApi'; // adjust path if needed

const RechargesPage = () => {
  const [recharges, setRecharges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 15;
  const [total, setTotal] = useState(0);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await getAllRecharge({ limit, skip: (page - 1) * limit });

      // Adjust based on how your backend response looks
      const data = res.data || []; // assuming backend returns { data, total }
      const totalCount = res.total || 0;
      // console.log('Recharges data:33', data, 'Total:33', totalCount);
      setRecharges(data);
      setTotal(totalCount);
    } catch (err) {
      console.error('Error loading recharges:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [page]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateRechargeStatus(id, newStatus);
      setRecharges(prev =>
        prev.map(item => (item._id === id ? { ...item, status: newStatus } : item))
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
        <>
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
                {recharges.map(rec => (
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

          <Stack spacing={2} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
            <Pagination
              count={Math.ceil(total / limit)}
              page={page}
              onChange={(event, value) => setPage(value)}
              color="primary"
              shape="rounded"
              size="large"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: 'white',
                },
                '& .Mui-selected': {
                  backgroundColor: 'white',
                  color: '#1976d2',
                },
              }}
            />
          </Stack>
        </>
      )}
    </Container>
  );
};

export default RechargesPage;
