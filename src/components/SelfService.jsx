import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardActionArea
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LockResetIcon from '@mui/icons-material/LockReset';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const SelfService = () => {
  const navigate = useNavigate();

  const selfServiceOptions = [
    {
      title: 'Change Password',
      icon: <LockResetIcon sx={{ fontSize: 30, color: '#156fb2' }} />,
      onClick: () => navigate("/forget-password", { state: { from: "self-service" } })
    },
    {
      title: 'Update Profile',
      icon: <AccountCircleIcon sx={{ fontSize: 30, color: '#156fb2' }} />,
      onClick: () => navigate('/user-settings', { state: { from: "update-profile" } })
    },
    {
      title: 'Contact Support',
      icon: <SupportAgentIcon sx={{ fontSize: 30, color: '#156fb2' }} />,
      onClick: () => navigate('/support')
    }
  ];

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
      {/* Top Blue Header */}
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
            marginRight: '40px'
          }}
        >
          Self Service
        </Typography>
      </Box>

      {/* Scrollable Options */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          px: 2,
          pt: 2,
          pb: 3,
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {selfServiceOptions.map((option, index) => (
          <Card
            key={index}
            sx={{
              borderRadius: 3,
              boxShadow: 2,
              mb: 2
            }}
          >
            <CardActionArea onClick={option.onClick}>
              <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                {option.icon}
                <Typography sx={{ ml: 2, fontSize: '15px', fontWeight: 500 }}>
                  {option.title}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default SelfService;
