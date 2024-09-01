import axios from 'axios';
import { API_URL } from 'src/config/api';

// Get all kids
const getKids = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/kids`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        return err.message;
    }
};

// Get kid by ID
const getKidById = async (kidId, token) => {
    try {
        const response = await axios.get(`${API_URL}/kids/${kidId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        return err.message;
    }
};

// Get kids by parent ID
const getKidsByParent = async (parentId, token) => {
    try {
        const response = await axios.get(`${API_URL}/kids/parent/${parentId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        return err.message;
    }
};

// Add new kid
const addKid = async (kidData, token) => {
    try {
        const response = await axios.post(`${API_URL}/kids`, kidData, {
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

// Edit kid
const updateKid = async (kidId, kidData, token) => {
    try {
        const response = await axios.patch(`${API_URL}/kids/${kidId}`, kidData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        return err.message;
    }
};

// Delete kid
const deleteKid = async (kidId, token) => {
    try {
        const response = await axios.delete(`${API_URL}/kids/${kidId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        return err.message;
    }
};

// Delete logged-in kid's data (deactivate kid)
const deleteLoggedKidData = async (token) => {
    try {
        const response = await axios.delete(`${API_URL}/kids/deleteMe`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        return err.message;
    }
};

const kidService = {
    getKids,
    getKidById,
    getKidsByParent,
    addKid,
    updateKid,
    deleteKid,
    deleteLoggedKidData
};

export default kidService;
