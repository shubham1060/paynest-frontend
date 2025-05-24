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
  Pagination,
  Stack,
} from '@mui/material';
import { fetchUsers } from '../../api/adminApi'; // Import the API function

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle errors

  // Pagination states
  const [page, setPage] = useState(1);   // 1-based page index for MUI Pagination
  const limit = 50;                      // Number of users per page
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);
    // Call fetchUsers with limit and skip based on current page
    fetchUsers({ limit, skip: (page - 1) * limit })
      .then(({ data, total }) => {
        setUsers(data);
        setTotalUsers(total);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch users. Please try again later.');
        setLoading(false);
      });
  }, [page]);

  if (loading) {
    return <Typography variant="h6" sx={{ color: 'white' }}>Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" sx={{ color: 'red' }}>{error}</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 0.5 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: 'white', fontSize: { xs: '1rem', sm: '1.5rem', md: '1.8rem' } }}
      >
        Users
      </Typography>

      <Paper sx={{ width: '85vw', overflowX: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1 }}>UserId</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1 }}>Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1 }}>Phone Number</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1 }}>Recharge Amount</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1 }}>Account Balance</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1 }}>invitate Code</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1 }}>Referral Code</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1 }}>Joined</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell sx={{ py: 0.5 }}>{user.userId}</TableCell>
                <TableCell sx={{ py: 0.5 }}>{user.name}</TableCell>
                <TableCell sx={{ py: 0.5 }}>{user.phoneNumber}</TableCell>
                <TableCell sx={{ py: 0.5 }}>₹ {user.rechargeAmount}</TableCell>
                <TableCell sx={{ py: 0.5 }}>₹ {user.balance}</TableCell>
                <TableCell sx={{ py: 0.5 }}>{user.invitationCode}</TableCell>
                <TableCell sx={{ py: 0.5 }}>{user.referralCode}</TableCell>
                <TableCell sx={{ py: 0.5 }}>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Pagination */}
      <Stack spacing={2} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
        <Pagination
          count={Math.ceil(totalUsers / limit)}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
          shape="rounded"
          size="large"
          sx={{
            '& .MuiPaginationItem-root': {
              color: 'white',
            },
            // Optional: change selected page color
            '& .Mui-selected': {
              backgroundColor: 'white',
              color: '#1976d2', // or any contrast color
            },
          }}
        />
      </Stack>
    </Container>
  );
};

export default UsersPage;
