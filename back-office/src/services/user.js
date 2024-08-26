import axios from 'axios';
import { API_URL } from 'src/config/api';

// Get users
const getUsers = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        return err.message;
    }
};

// Get users
const getUsersByRole = async (token, role) => {
    try {
        const response = await axios.get(`${API_URL}/users/role/${role}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        return err.message;
    }
};

// Get user by ID
const getUserById = async (userId, token) => {
    try {
        const response = await axios.get(`${API_URL}/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        return err.message;
    }
};

// Add new user
const addUser = async (userData, token) => {
    try {
        const response = await axios.post(`${API_URL}/users`, userData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
        return response.data;
    } catch (err) {
        return err.message;
    }
};

// Edit user
const editUser = async (userId, userData, token) => {
    try {
        const response = await axios.patch(`${API_URL}/users/${userId}`, userData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        return err.message;
    }
};

// Delete user
const deleteUser = async (userId, token) => {
    try {
        const response = await axios.delete(`${API_URL}/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        return err.message;
    }
};

// change password user
const changePassword = async (userId, userData, token) => {
    try {
        const response = await axios.delete(`${API_URL}/users/change-password/${userId}`, userData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        return err.message;
    }
};

const userService = {
    getUsers,
    getUsersByRole,
    getUserById,
    addUser,
    editUser,
    deleteUser,
    changePassword
};

export default userService;
