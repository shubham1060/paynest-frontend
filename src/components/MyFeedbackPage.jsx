import React, { useState } from 'react';
import {
    Typography,
    Box,
    IconButton, Paper, Rating,
    TextField,
    Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { submitFeedback } from '../api/userApi';
import { useAlert } from "./AlertContext";

const MyFeedbackPage = () => {
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(1);
    const { showAlert } = useAlert();

    const handleSubmit = async () => {
        try {
          const result = await submitFeedback({ rating, feedback });
        //   console.log('Feedback submitted:', result);
          setRating(1);
          setFeedback('');
        //   alert('Thanks for your feedback!');
          showAlert("Thanks for your feedback!", "success");
        } catch (err) {
          console.error('Error:', err.message);
        //   alert('Failed to submit feedback.');
        showAlert(err.message, "error");
        }
      };

    return (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                backgroundColor: '#fff',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {/* Fixed Blue Header */}
            <Box
                sx={{
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#156fb2',
                    px: 2,
                    py: 0.5,
                    height: '48px'
                }}
            >
                <IconButton onClick={() => navigate('/account')} sx={{ color: '#fff', p: 0.5 }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontWeight: 600,
                        color: '#ffffff',
                        flexGrow: 1,
                        textAlign: 'center',
                        fontSize: '15px',
                        marginRight: '40px' // balance back icon
                    }}
                >
                    My Feedback
                </Typography>
            </Box>
            <Paper
                elevation={1}
                sx={{
                    width: '100%',
                    p: 2,
                    borderRadius: 3,
                    backgroundColor: '#ffffff',
                    boxSizing: 'border-box'
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <Rating
                        name="feedback-rating"
                        value={rating}
                        onChange={(event, newValue) => setRating(newValue)}
                    />
                </Box>

                <TextField
                    label="Write your feedback"
                    multiline
                    rows={4}
                    fullWidth
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    variant="outlined"
                    sx={{ mb: 3 }}
                />

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={!feedback}
                    sx={{
                        backgroundColor: '#156fb2',
                        color: '#fff',
                        width: '100%',
                        maxWidth: '93%',
                        borderRadius: '50px',
                        py: 1,
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        mx: 'auto', // ✅ to horizontally center the button
                        display: 'block', // ✅ required for mx: 'auto' to take effect
                        mt: 0,
                    }}
                >
                    Submit Feedback
                </Button>

            </Paper>

        </Box>
    );
};
export default MyFeedbackPage;