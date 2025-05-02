import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminTopbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('accessToken'); // Remove the access token from session storage
    sessionStorage.removeItem('userId'); // Remove the user ID from session storage
    navigate('/admin-login');
  };

  return (
    <AppBar 
      position="static" 
      sx={{ bgcolor: '#1565c0', width: '100%', boxShadow: 3 }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
        <Typography variant="h6">Admin Panel</Typography>
        <Button color="inherit" onClick={handleLogout}>
          Log out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AdminTopbar;
