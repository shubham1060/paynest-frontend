import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!BASE_URL) {
  console.error('BASE_URL is not defined. Please check your environment variables.');
}

// Admin login
export const loginAdmin = async (phoneNumber, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/admin/login`, { phoneNumber, password });
    const token = response?.data?.data?.access_token;
    if (token) {
      sessionStorage.setItem('accessToken', token);
    } else {
      console.warn('No access token received during admin login.');
    }
    return response.data;
  } catch (error) {
    console.error('Error during admin login:', error);
    return null;
  }
};

export const getBankDetails = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/bank-details`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bank details:', error);
    return null;
  }
};

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/user`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export const fetchInvestments = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/invest`);
    return response.data;
  } catch (error) {
    console.error('Error fetching investments:', error);
    return [];
  }
};

export const fetchWithdrawals = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/withdraw`);
    return response.data;
  } catch (error) {
    console.error('Error fetching withdrawals:', error);
    return [];
  }
};

export const getAllCommissions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/commission/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching commissions:', error);
    return [];
  }
};

export const getAllFeedback = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/feedback`);
    // console.log('response.data=79=>', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return [];
  }
};

export const getAdminStats = async () => {
  const token = sessionStorage.getItem('accessToken');
  if (!token) {
    console.warn('No access token found in session storage.');
    return null;
  }

  try {
    const response = await axios.get(`${BASE_URL}/api/admin/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return null;
  }
};

export const getAllRecharge = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/recharge/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recharge data:', error);
    return [];
  }
};

export const updateRechargeStatus = async (id, status) => {
  try {
    const response = await axios.patch(`${BASE_URL}/api/recharge/status/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error(`Error updating recharge status for ID ${id}:`, error);
    return null;
  }
};
