import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, userData); // Replace with your actual API URL
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};

export const loginUser = async (phoneNumber, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
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
    const response = await axios.get(`${API_BASE_URL}/me`, {
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
    const response = await axios.get("http://localhost:3000/api/banks");
    return response.data;
  } catch (error) {
    console.error('Error fetching banks:', error);
    return [];
  }
};

export const addBankDetails = async (data) => {
  try {
    const res = await axios.post("http://localhost:3000/api/bank-details", data); // Adjust if needed
    return res.data;
  } catch (error) {
    console.error('Error Saving bank details:', error);
    return [];
  }
};
