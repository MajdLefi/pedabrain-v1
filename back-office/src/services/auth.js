import axios from 'axios';

import { API_URL } from 'src/config/api';

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + '/auth/login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify({ role: response.data.data.role, token: response.data.token, id: response.data.data._id }));
  }
  return response.data;
};

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + '/auth/register', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify({ role: response.data.data.role, token: response.data.token, id: response.data.data._id }));
  }
  return response.data;
};

//change password
const changePassword = async (userId, token, passwordData) => {
  try {
    const response = await axios.patch(`${API_URL}/change-password/${userId}`, passwordData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (err) {
    return err.message;
  }
};

// Logout user
const logout = () => {
  localStorage.removeItem('userToken');
};

const authService = {
  login,
  register,
  changePassword,
  logout
};

export default authService;
