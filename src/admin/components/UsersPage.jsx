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
import { fetchUsers } from '../../api/adminApi'; // Import the API function

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    // Fetch users from API
    fetchUsers()
      .then((data) => {
        setUsers(data);  // Set users to state
        setLoading(false);  // Set loading to false once data is fetched
      })
      .catch((err) => {
        setError('Failed to fetch users. Please try again later.');
        setLoading(false);  // Set loading to false if error occurs
      });
  }, []);

  if (loading) {
    return <Typography variant="h6" sx={{ color: 'white' }}>Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" sx={{ color: 'red' }}>{error}</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 0.5 }}>
      <Typography variant="h5" gutterBottom sx={{ color: 'white', fontSize: { xs: '1rem', sm: '1.5rem', md: '1.8rem' } }}>
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
    </Container>
  );
};

export default UsersPage;
