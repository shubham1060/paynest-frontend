import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL; // change to your backend URL

// Assuming you have an API endpoint for admin login
const loginAdmin = async (phoneNumber, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/admin/login`, { phoneNumber, password });
    // console.log('adminData=16=>',response.data);
    // Store the access token in session storage or local storage
    sessionStorage.setItem('accessToken', response.data.data.access_token); // Store the access token
    return response.data; // Return the response data (access_token and user info)
  } catch (error) {
    throw error; // Handle error appropriately
  }
};

// Export the loginAdmin function
export { loginAdmin };

export const getBankDetails = () => {
  return axios.get(`${BASE_URL}/api/bank-details`);
};

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/user`);  // Your backend URL here
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;  // You can handle errors more gracefully as needed
  }
};

export const fetchInvestments = async () => {
  const response = await axios.get(`${BASE_URL}/invest`);
  return response.data;
};

export const fetchWithdrawals = async () => {
  const res = await axios.get(`${BASE_URL}/api/withdraw`);
  return res.data;
};

export const getAllCommissions = async () => {
  const response = await axios.get(`${BASE_URL}/commission/all`);
  // console.log('commission data=52=>',response.data);
  return response.data;
};

export const getAllFeedback = async () => {
  const response = await axios.get(`${BASE_URL}/api/feedback`);
  return response.data;
};

export const getAdminStats = async () => {
  const token = sessionStorage.getItem('accessToken');
  // console.log('token=56=>',token);
  
  const response = await axios.get(`${BASE_URL}/api/admin/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAllRecharge = async () => {
  const response = await axios.get(`${BASE_URL}/api/recharge/all`);
  // console.log('recharge data=70=>',response.data);
  return response.data;
};

export const updateRechargeStatus = (id, status) => {
  return axios.patch(`${BASE_URL}/api/recharge/status/${id}`, { status });
};

// export const updateRechargeStatus = async (id, status) => {
//   const res = await fetch(`/api/recharge/admin/update-status/${id}`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ status }),
//   });

//   if (!res.ok) throw new Error("Failed to update status");
//   return res.json();
// };
