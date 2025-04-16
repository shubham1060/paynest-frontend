import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    IconButton, CircularProgress,
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useNavigate } from 'react-router-dom';
import { getMyBankDetails, withdrawAmount } from '../api/userApi';

const WithdrawPage = () => {
    const navigate = useNavigate();
    const [amount, setAmount] = useState('');
    const [selectedBank, setSelectedBank] = useState(null);
    const [bankChannels, setBankChannels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [balance, setBalance] = useState(0);
    // const [bankAccountId, setBankAccountId] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true); // start loading
                const res = await getMyBankDetails();
                console.log("User Bank Details:==27==> ", res);

                // Assuming res is like: { banks: [{ _id, name }, ...] }
                if (res?.data?.length > 0) {
                    setBankChannels(res.data.map(bank => ({
                        id: bank._id,
                        name: bank.bankName,
                    })));
                    if(res?.balance !== undefined) {
                        setBalance(res.balance); // Set balance if available
                    }
                } else {
                    setBankChannels([]); // fallback in case no data
                }
            } catch (err) {
                console.error(err.message);
            } finally {
                setLoading(false); // stop loading
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const input = e.target.value;
        if (/^\d*\.?\d{0,2}$/.test(input)) {
            setAmount(input);
        }
    };

    const handleConfirm = async () => {
        const withdrawAmountValue = amount;
        console.log("Withdraw Amount:==62==>", amount);
      
        // ✅ Basic validations
        if (isNaN(withdrawAmountValue) || withdrawAmountValue <= 0) {
          alert("Please enter a valid amount.");
          return;
        }
      
        if (withdrawAmountValue > balance && balance !== 0 && withdrawAmountValue !== 0) {
          alert("Withdraw amount exceeds your available balance.");
          return;
        }
      
        if (withdrawAmountValue < 199) {
          alert("Minimum withdrawal amount is ₹200.");
          return;
        }
      
        try {
          setLoading(true);
          const userId = localStorage.getItem('userId');
          if (!userId || !selectedBank) {
            alert("Missing user or bank account details.");
            return;
          }
      
          // ✅ Call API
          const response = await withdrawAmount({
            userId,
            amount: withdrawAmountValue,
            bankAccountId: selectedBank,
          });
          console.log("Withdraw Response:==93==>", response);
          alert(response.message || 'Withdrawal successful!');
      
          // Optional: Update balance state if needed
          setBalance(prev => prev - withdrawAmountValue);
        } catch (error) {
          alert(error?.message || 'Withdrawal failed!');
        } finally {
          setLoading(false);
        }
      };

    return (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                backgroundColor: '#f3f7fc',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                // overflow: 'auto',
            }}
        >

            {/* Header */}
            <Box
                sx={{
                    backgroundColor: '#156fb2',
                    color: '#fff',
                    width: '100%',
                    padding: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <IconButton sx={{ color: '#fff', ml: 1 }} onClick={() => navigate('/account')}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', mr: 2, fontWeight: 'bold' }}>
                    Withdraw
                </Typography>
            </Box>

            {/* Info Section (Mocked out lines) */}
            <Paper
                elevation={1}
                sx={{
                    width: '100%',
                    maxWidth: '87%',
                    my: 1,
                    p: 2,
                    borderRadius: 3,
                    backgroundColor: '#ffffff',
                }}
            >
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
                        <CircularProgress />
                    </Box>
                ) : bankChannels.length === 0 ? (
                    <>
                        <Typography
                            color="text.secondary"
                            sx={{
                                mt: 4,
                                mb: 2,
                                ml: 2,
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            No withdrawal account / bank account. Please add your Bank Account.
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                sx={{
                                    backgroundColor: '#156fb2',
                                    color: '#fff',
                                    width: '100%',
                                    maxWidth: '65%',
                                    borderRadius: '50px',
                                    py: 0.8,
                                    fontSize: '1rem',
                                    mb: 2,
                                }}
                                onClick={() => navigate('/bank-card')}
                            >
                                Add Bank Account
                            </Button>
                        </Box>
                    </>
                ) : (
                    <>
                        <Typography variant="subtitle1" gutterBottom>
                            Select Bank Account
                        </Typography>
                        {bankChannels.map((bank) => (
                            <Paper
                                key={bank.id}
                                elevation={3}
                                onClick={() => setSelectedBank(bank.id)}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    px: 2,
                                    py: 1.5,
                                    mb: 2,
                                    borderRadius: 2,
                                    backgroundColor: selectedBank === bank.id ? 'rgb(109, 193, 226)' : '#fff',
                                    cursor: 'pointer',
                                    transition: '0.2s',
                                }}
                            >
                                <Box>
                                    <Typography fontWeight="bold">{bank.name}</Typography>
                                </Box>
                                <AccountBalanceIcon color={selectedBank === bank.id ? 'primary' : 'action'} />
                            </Paper>
                        ))}
                    </>
                )}
            </Paper>
            {/* Amount Input Section */}
            <Paper
                elevation={1}
                sx={{
                    width: '100%',
                    maxWidth: '87%',
                    p: 2,
                    mb: 3,
                    borderRadius: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#ffffff',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', }} >
                    <Typography variant="subtitle1">Amount</Typography>
                    <Typography
                        sx={{ fontSize: { xs: 12, sm: 14 }, mt: { xs: 1, sm: 0 }, mr: 1 }}>
                        Withdrawal balance <strong>₹ {balance}</strong>
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#f3f7fc',
                        borderRadius: 2,
                        padding: 1,
                    }}
                >
                    <TextField
                        fullWidth
                        placeholder="Withdraw amount"
                        value={amount}
                        onChange={handleChange}
                        variant="standard"
                        InputProps={{
                            disableUnderline: true,
                            sx: { fontSize: 16 },
                        }}
                    />
                    <AccountBalanceWalletIcon color="action" />
                </Box>
            </Paper>

            {/* Confirm Button */}
            <Button
                onClick={handleConfirm}
                disabled={!selectedBank || !amount || bankChannels.length === 0 || parseFloat(amount) > balance} // 🔥 add bankChannels check
                sx={{
                    backgroundColor: '#156fb2',
                    color: '#fff',
                    width: '100%',
                    maxWidth: '93%',
                    borderRadius: '50px',
                    py: 1.5,
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    opacity: (!selectedBank || !amount || bankChannels.length === 0 ||
                        parseFloat(amount) > balance) ? 0.6 : 1,
                    pointerEvents: (!selectedBank || !amount || bankChannels.length === 0 ||
                        parseFloat(amount) > balance) ? 'none' : 'auto',
                    '&:hover': {
                        backgroundColor: '#156fb2',
                    },
                }}
            >
                CONFIRM
            </Button>
        </Box>
    );
};

export default WithdrawPage;
