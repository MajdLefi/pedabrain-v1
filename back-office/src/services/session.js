import axios from 'axios';
import { API_URL } from 'src/config/api';

// Get all sessions
const getSessions = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/sessions`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (err) {
        return err.message;
    }
};

// Get session by ID
const getSessionById = async (sessionId, token) => {
    try {
        const response = await axios.get(`${API_URL}/sessions/${sessionId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (err) {
        return err.message;
    }
};

// Get all done sessions
const getDoneSessions = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/sessions/done`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (err) {
        return err.message;
    }
};

// Get sessions by parent ID
const getSessionsByParent = async (parentId, token) => {
    try {
        const response = await axios.get(`${API_URL}/sessions/parent/${parentId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (err) {
        return err.message;
    }
};

// Get done sessions by parent ID
const getDoneSessionsByParent = async (parentId, token) => {
    try {
        const response = await axios.get(`${API_URL}/sessions/done/parent/${parentId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (err) {
        return err.message;
    }
};

// Create a new session
const createSession = async (sessionData, token) => {
    try {
        const response = await axios.post(`${API_URL}/sessions`, sessionData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (err) {
        return err.message;
    }
};

// Update a session by ID
const updateSession = async (sessionId, sessionData, token) => {
    try {
        const response = await axios.patch(`${API_URL}/sessions/${sessionId}`, sessionData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (err) {
        return err.message;
    }
};

// Delete a session by ID
const deleteSession = async (sessionId, token) => {
    try {
        const response = await axios.delete(`${API_URL}/sessions/${sessionId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (err) {
        return err.message;
    }
};

const sessionService = {
    getSessions,
    getSessionById,
    getDoneSessions,
    getSessionsByParent,
    getDoneSessionsByParent,
    createSession,
    updateSession,
    deleteSession,
};

export default sessionService;
