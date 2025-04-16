import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// user signup api
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/user`, userData); // Replace with your actual API URL
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};

// user login api
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

// Get user profile and user details after login using token
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
    localStorage.setItem("phoneNumber", response.data.phoneNumber);
    console.log("User ID:==39==>", localStorage.getItem('userId'));
    console.log("PhoneNumber==41==>", localStorage.setItem("phoneNumber", response.data.phoneNumber));
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// update user profile data
export const updateUserProfile = async (userId, updatedData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/update-profile/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    // Try to parse JSON safely
    const text = await response.text(); // Read the raw response body
    const data = text ? JSON.parse(text) : {}; // Parse if not empty

    // console.log('text==62=>', text);
    // console.log('data==63=>', data);

    if (!response.ok) {
      throw new Error(data.message || "Failed to update user.");
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error in updateUserProfile:", error);
    return { success: false, error: error.message };
  }
};


// get all banks names from mongoDB and show on bank card page
export const getAllBanks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/banks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching banks:', error);
    return [];
  }
};

// add all bank details of user
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

// get user's bank details and show in withdraw component
export const getMyBankDetails = async () => {
  try {
    const response = await api.get(`${API_BASE_URL}/api/bank-details/my-bank-details`);
    console.log("Bank Details:==88==>", response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Unauthorized or error fetching profile" };
  }
};

// withdraw amount in user's bank
export const withdrawAmount = async (withdrawData) => {
  const token = localStorage.getItem('token'); // if auth token is used
  try {
    const response = await axios.post(`${API_BASE_URL}/api/withdraw`, withdrawData,
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

// show withdrwal records on account page
export const fetchUserWithdrawalRecords = async (userId) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_BASE_URL}/api/withdraw/records/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
};

// send data to mongoDB, which product is purchased by user
export const purchaseProduct = async (userId, productCode, investAmount) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/invest/purchase`, { userId, productCode, investAmount});
    return { success: true, data: response.data };
  } catch (error) {
    const message = error.response?.data?.message || 'Something went wrong';
    return { success: false, message };
  }
};

// retrive user's purchased order and show in orders 
export const fetchUserOrders = async (userId) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/invest/orders/${userId}`);
    console.log('orders data==133=>', res.data);
    return res.data;
  } catch (err) {
    console.error("Error fetching user orders:", err);
    return [];
  }
};

// reset password or forget password api
export const resetPassword = async (payload) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE_URL}/api/user/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to reset password");
  }

  return res.json();
};