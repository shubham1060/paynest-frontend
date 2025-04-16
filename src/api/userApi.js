import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/user`, userData); // Replace with your actual API URL
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};

export const loginUser = async (phoneNumber, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/user/login`, {
      phoneNumber,
      password,
    });

    return response.data.data; // contains access_token and user data
  } catch (error) {
    throw error.response?.data?.message || "Login failed. Please try again.";
  }
};

// Get user profile using token
export const getUserProfile = async () => {
  const token = localStorage.getItem('token');
  console.log("Token:==30==>", token);
  try {
    const response = await axios.get(`${API_BASE_URL}/api/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("User Profile Response:==37==>", response.data);
    localStorage.setItem('userId', response.data.userId); // Store userId in localStorage
    console.log("User ID:==39==>", localStorage.getItem('userId'));
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// get all banks names
export const getAllBanks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/banks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching banks:', error);
    return [];
  }
};

// add all bank details
export const addBankDetails = async (data) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/api/bank-details`, data); // Adjust if needed
    return res.data;
  } catch (error) {
    console.error('Error Saving bank details:', error);
    return [];
  }
};

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add interceptor to attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getMyBankDetails = async () => {
  try {
    const response = await api.get(`/api/bank-details/my-bank-details`);
    console.log("Bank Details:==88==>", response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Unauthorized or error fetching profile" };
  }
};

export const withdrawAmount = async (withdrawData) => {
  const token = localStorage.getItem('token'); // if auth token is used
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/withdraw`,
      withdrawData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Withdraw API error:', error);
    throw error.response?.data || error;
  }
};

export const fetchUserWithdrawalRecords = async (userId) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_BASE_URL}/api/withdraw/records/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
};
