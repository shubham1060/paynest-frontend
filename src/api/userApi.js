import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  console.error('API_BASE_URL is not defined in environment variables.');
}

// User signup API
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/user`, userData);
    return response.data;
  } catch (error) {
    console.error("Create user error:", error);
    return { success: false, message: error.response?.data?.message || "Signup failed." };
  }
};

// ✅ update this after successful login
export const loginUser = async (phoneNumber, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/user/login`, {
      phoneNumber,
      password,
    });

    const { access_token, ...rest } = response.data.data;

    if (access_token) {
      sessionStorage.setItem("token", access_token); // ✅ This was missing!
      sessionStorage.setItem("userId", rest.data.userId);
      console.log("User ID set in sessionStorage:33=>", rest.data.userId);
    }

    return response.data.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed. Please try again.";
  }
};

// Get user profile
export const getUserProfile = async () => {
  const token = sessionStorage.getItem('token');
  if (!token) {
    console.warn("No token found for profile fetch.");
    return null;
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/api/user/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const user = response.data;
    sessionStorage.setItem('userId', user.userId);
    sessionStorage.setItem('phoneNumber', user.phoneNumber);
    // sessionStorage.setItem("firstLoginRewardGiven", user.firstLoginRewardGiven);
    sessionStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
};

export const getUserById = async (userId) => {
  return axios.get(`${API_BASE_URL}/api/user/${userId}`);
};

export const markRewardPopupSeen = async (userId) => {
  return axios.patch(`${API_BASE_URL}/api/user/reward-popup-seen/${userId}`);
};

// Update profile
export const updateUserProfile = async (userId, updatedData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/update-profile/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      throw new Error(data.message || "Update failed.");
    }

    return { success: true, data };
  } catch (error) {
    console.error("Profile update error:", error);
    return { success: false, message: error.message };
  }
};

// Get all banks from mongoDB and show on bank card page
export const getAllBanks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/banks`);
    return response.data;
  } catch (error) {
    console.error("Bank fetch error:", error);
    return [];
  }
};

// Add bank details
export const addBankDetails = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/bank-details`, data);
    return response.data;
  } catch (error) {
    console.error("Bank detail save error:", error);
    return null;
  }
};

// Axios instance with interceptor
const api = axios.create({ baseURL: API_BASE_URL });

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Get user's bank details
export const getMyBankDetails = async () => {
  try {
    const response = await api.get(`${API_BASE_URL}/api/bank-details/my-bank-details`);
    return response.data;
  } catch (error) {
    console.error("My bank details fetch error:", error);
    return null;
  }
};

// Withdraw amount
export const withdrawAmount = async (withdrawData) => {
  const token = sessionStorage.getItem('token');
  try {
    const response = await axios.post(`${API_BASE_URL}/api/withdraw`, withdrawData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Withdraw error:", error);
    return { success: false, message: error.response?.data?.message || "Withdraw failed." };
  }
};

// Withdrawal records
export const fetchUserWithdrawalRecords = async (userId) => {
  const token = sessionStorage.getItem('token');
  try {
    const response = await axios.get(`${API_BASE_URL}/api/withdraw/records/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    console.error("Withdrawal record fetch error:", error);
    return [];
  }
};

// Purchase product
export const purchaseProduct = async (userId, productCode, investAmount) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/invest/purchase`, {
      userId, productCode, investAmount
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Purchase failed." };
  }
};

// Fetch orders
export const fetchUserOrders = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/invest/orders/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Orders fetch error:", error);
    return [];
  }
};

// Reset password
export const resetPassword = async (payload) => {
  const token = sessionStorage.getItem("token");
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Reset failed.");

    return data;
  } catch (error) {
    console.error("Password reset error:", error);
    throw new Error(error.message);
  }
};

// Get commission
export const getCommissionByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/commission?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Commission fetch error:", error);
    return [];
  }
};

// Submit feedback
export const submitFeedback = async ({ rating, feedback }) => {
  const userId = sessionStorage.getItem('userId');
  // console.log('userId==217==>', sessionStorage.getItem('userId'));

  if (!userId || !feedback) {
    throw new Error('Missing userId or feedback');
  }

  const response = await fetch(`${API_BASE_URL}/api/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, rating, feedback }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to submit feedback');
  }

  return response.json();
};


// Get earnings
export const getEarningRecords = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/invest/earnings/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Earnings fetch error:", error);
    return [];
  }
};

// Submit recharge
export const submitRechargePayment = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/recharge/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Recharge failed.");

    return result;
  } catch (error) {
    console.error("Recharge error:", error);
    return { success: false, message: error.message };
  }
};

// Fetch recharge details
export const fetchRechargeDetails = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/recharge/getRechargeDetails/${userId}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Recharge details fetch error:", error);
    return [];
  }
};

export const generateQrData = async (upiId, amount) => {
  const response = await axios.post(`${API_BASE_URL}/api/qr/generate`, {
    upiId,
    amount,
  });
  return response.data.qrData;
};