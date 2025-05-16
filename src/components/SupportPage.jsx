import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useNavigate } from 'react-router-dom';

const SupportPage = () => {
  const navigate = useNavigate();

  const supportDetails = [
    {
      label: 'Email',
      value: 'a68818151@gmail.com',
      icon: <EmailIcon sx={{ color: '#156fb2' }} />
    },
    {
      label: 'Phone',
      value: '+91 9********9 (Please share your issue on email)',
      icon: <PhoneIcon sx={{ color: '#156fb2' }} />
    },
    {
      label: 'WhatsApp',
      value: '+91 9********9 (Please share your issue on email)',
      icon: <WhatsAppIcon sx={{ color: '#25D366' }} />
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
      {/* Blue Header */}
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
        <IconButton onClick={() => navigate('/self-service')} sx={{ color: '#fff', p: 0.5 }}>
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
          Contact Support
        </Typography>
      </Box>

      {/* Support Info */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          px: 2,
          pt: 3,
          pb: 4,
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              We're here to help!
            </Typography>

            {supportDetails.map((item, index) => (
              <Box key={index} display="flex" alignItems="center" mb={2}>
                {item.icon}
                <Box ml={2}>
                  <Typography fontSize="14px" fontWeight={500}>
                    {item.label}
                  </Typography>
                  <Typography fontSize="13px" color="text.secondary">
                    {item.value}
                  </Typography>
                </Box>
              </Box>
            ))}

            <Divider sx={{ my: 3 }} />

            <Typography fontSize="13px" color="text.secondary">
              Our support team is available 24/7. You can contact us anytime via email or WhatsApp, or call us between 10 AM to 6 PM.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default SupportPage;
