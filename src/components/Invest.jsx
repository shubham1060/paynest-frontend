import React from "react";
import { 
  AppBar, Grid,
  Toolbar,
  Avatar, 
  Tabs, 
  Tab, 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  BottomNavigation, 
  BottomNavigationAction 
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ForumIcon from "@mui/icons-material/Forum";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// Optional: Hook to dynamically check screen size for more complex logic if needed
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useTheme } from '@mui/material/styles';

const FutureFundApp = () => {
  // Optional: Example using useMediaQuery if sx prop isn't sufficient
  // const theme = useTheme();
  // const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    // Added paddingBottom to ensure content isn't hidden by fixed BottomNavigation
    <Box >
      <Box display="flex" justifyContent="center" alignItems="top" minHeight="100vh" width="100vw" sx={{ background: "linear-gradient(to bottom, #E3F2FD, #ffffff)" }}>
      
        <Card elevation={3} sx={{ p: 4, borderRadius: 4, textAlign: "center", backgroundColor: "#156fb2", width:"50vh" }}>
          <CardContent>
            {/* Move the header elements INSIDE CardContent */}
            <Box display="flex" justifyContent="left" mb={1}>
              <Avatar src="/PN_logo.png" alt="Company Logo" sx={{ width: 80, height: 80, mt: -2, ml:1 }} />
            </Box>
            <Typography variant="h4" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', color: '#fefeff', letterSpacing: 1.5, mt: -9, ml: 4 }}>PAYNEST</Typography>
            <Typography variant="body2" sx={{ fontFamily: 'Poppins, sans-serif', color: '#fefeff', letterSpacing: 1, mt: -1, mb: 3, ml: 3 }}>PROFIT COMPANY</Typography>
            
            {/* Tabs */}
            <Tabs 
              // Allow tabs to scroll horizontally on smaller screens if they don't fit
              variant="scrollable" 
              scrollButtons="auto" // Show scroll buttons automatically when needed
              allowScrollButtonsMobile // Ensure scroll buttons are visible on mobile
              centered // Keep centering the tabs if possible
              indicatorColor="primary" // Note: Your theme needs a primary color defined, or choose "secondary" / style directly
              textColor="primary"     // Same as above
              sx={{ 
                backgroundColor: "#ffffff",
                // Potentially add borderBottom for visual separation
                borderBottom: 1,
                borderColor: 'divider'
              }}
            >
              {/* Consider using value and onChange for controlled Tabs if needed */}
              <Tab label="Daily Earnings" />
              <Tab label="Monthly Earnings" />
              <Tab label="Advanced Plan" />
              {/* Add more tabs here if needed */}
            </Tabs>

            {/* Content Section */}
            {/* Use responsive padding */}
            <Box sx={{ padding: { xs: 1, sm: 2, md: 3 } }}> 
              <Typography variant="h6" color="white" sx={{ marginBottom: 0.5 }}>
                💰 Daily Earnings Introductory
              </Typography>
              <Typography color="white" sx={{ marginBottom: 2 }}>
                Investing in the first cycle product qualifies you for further benefits.
              </Typography>

              {/* Investment Cards */}
              {/* Container using flexbox for layout */}
              <Box sx={{ 
                display: "flex", 
                // Responsive gap between cards
                gap: { xs: 1.5, sm: 2, md: 3 }, 
                marginTop: 2, 
                flexWrap: "wrap", // Allow cards to wrap onto the next line
                justifyContent: "center" // Center cards when they wrap
              }}>
                {/* Card 1 - Width is already responsive */}
                <Card sx={{ 
                  width: { xs: "100%", sm: 300 }, // Full width on extra-small, fixed width on small and up
                  backgroundColor: "#dff6f5",
                  flexGrow: { xs: 1, sm: 0 } // Allow card to grow on xs to fill width, but not on sm+
                }}>
                  <CardContent>
                    <Typography variant="h6">Daily Income A</Typography>
                    <Typography>Invest Amount: 600</Typography>
                    <Typography>Total Earnings: 6,012</Typography>
                    <Typography>Return period: 30 Days</Typography>
                    <Typography>Periodic Return: 200</Typography>
                    <Button variant="contained" fullWidth sx={{ marginTop: 2 }}>
                      Invest Now
                    </Button>
                  </CardContent>
                </Card>
                
                {/* Card 2 - Width is already responsive */}
                <Card sx={{ 
                  width: { xs: "100%", sm: 300 }, // Full width on extra-small, fixed width on small and up
                  backgroundColor: "#f9f9d8",
                  flexGrow: { xs: 1, sm: 0 } // Allow card to grow on xs to fill width, but not on sm+
                }}>
                  <CardContent>
                    <Typography variant="h6">Monthly Income A</Typography>
                    <Typography>Invest Amount: 500</Typography>
                    <Typography>Total Earnings: 7,500</Typography>
                    <Typography>Return period: 1 Month</Typography>
                    <Typography>Periodic Return: 7,500</Typography>
                    <Typography color="error">Not activated yet</Typography>
                    {/* Maybe add a disabled button or placeholder here */}
                  </CardContent>
                </Card>
                {/* Add more cards here following the same pattern */}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
          
      {/* Bottom Navigation */}
      <BottomNavigation 
        showLabels // Explicitly show labels (default behavior might hide them on small screens if too many items)
        sx={{ 
          width: "100%", 
          position: "fixed", 
          bottom: 0, 
          backgroundColor: "blue",
          zIndex: (theme) => theme.zIndex.appBar // Ensure it's above content but below modals etc.
        }}
      >
        {/* Consider using value and onChange for navigation state */}
        <BottomNavigationAction label="Invest" icon={<AttachMoneyIcon />} sx={{ color: "black" }} />
        <BottomNavigationAction label="Forum" icon={<ForumIcon />} sx={{ color: "black" }} />
        <BottomNavigationAction label="Account" icon={<AccountCircleIcon />} sx={{ color: "black" }} />
      </BottomNavigation>
    </Box>
  );
};

export default FutureFundApp;