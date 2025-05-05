import React from 'react';
import { Box, List, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Users', path: '/admin/users' },
    { label: 'Recharge', path: '/admin/recharges' },
    { label: 'Investments', path: '/admin/investments' },
    { label: 'Withdrawals', path: '/admin/withdrawals' },
    { label: 'Bank Details', path: '/admin/bankdetails' },
    { label: 'Commission', path: '/admin/commissions' },
    { label: 'Feedback', path: '/admin/feedback' },
  ];

  return (
    <Box sx={{ width: '180px', bgcolor: '#1976d2', color: 'white', height: '100vh', mt: '29%' }}>
      <List>
        {menuItems.map(item => (
          <ListItemButton
            key={item.path}
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: '#1565c0',
                color: 'white',
                fontWeight: 'bold',
              },
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default AdminSidebar;
