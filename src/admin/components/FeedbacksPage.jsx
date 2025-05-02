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
import { getAllFeedback } from '../../api/adminApi'; // adjust path if needed

const FeedbacksPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const data = await getAllFeedback();
        setFeedbacks(data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 0.5 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: 'white', fontSize: { xs: '1rem', sm: '1.5rem', md: '1.8rem' } }}
      >
        Feedbacks
      </Typography>
      <Paper sx={{ width: '85vw', overflowX: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1 }}>UserId</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1 }}>Feedback</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1 }}>Rating</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1 }}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedbacks.map((feedback, i) => (
              <TableRow key={i}>
                <TableCell sx={{ py: 0.5 }}>{feedback.userId}</TableCell>
                <TableCell sx={{ py: 0.5 }}>{feedback.feedback}</TableCell>
                <TableCell sx={{ py: 0.5 }}>{feedback.rating}</TableCell>
                <TableCell sx={{ py: 0.5 }}>
                  {new Date(feedback.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default FeedbacksPage;
