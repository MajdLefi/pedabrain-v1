import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import sessionService from 'src/services/session'; // Importing session service
import { toast } from 'react-toastify';

const initialState = {
  sessions: [],
  loading: false,
  session: null,
  error: '',
  message: ''
};

// Fetch all sessions
export const fetchSessions = createAsyncThunk('session/fetchSessions', async (token, thunkAPI) => {
  try {
    return await sessionService.getSessions(token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Fetch session by ID
export const fetchSessionById = createAsyncThunk('session/fetchSessionById', async ({ sessionId, token }, thunkAPI) => {
  try {
    return await sessionService.getSessionById(sessionId, token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Fetch done sessions
export const fetchDoneSessions = createAsyncThunk('session/fetchDoneSessions', async (token, thunkAPI) => {
  try {
    return await sessionService.getDoneSessions(token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Fetch sessions by parent ID
export const fetchSessionsByParent = createAsyncThunk('session/fetchSessionsByParent', async ({ parentId, token }, thunkAPI) => {
  try {
    return await sessionService.getSessionsByParent(parentId, token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Fetch done sessions by parent ID
export const fetchDoneSessionsByParent = createAsyncThunk('session/fetchDoneSessionsByParent', async ({ parentId, token }, thunkAPI) => {
  try {
    return await sessionService.getDoneSessionsByParent(parentId, token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Add new session
export const addSession = createAsyncThunk('session/addSession', async ({ sessionData, token }, thunkAPI) => {
  try {
    return await sessionService.createSession(sessionData, token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Edit session
export const editSession = createAsyncThunk('session/editSession', async ({ sessionId, sessionData, token }, thunkAPI) => {
  try {
    return await sessionService.updateSession(sessionId, sessionData, token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete session
export const deleteSession = createAsyncThunk('session/deleteSession', async ({ sessionId, token }, thunkAPI) => {
  try {
    await sessionService.deleteSession(sessionId, token);
    return sessionId;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const sessionsSlice = createSlice({
  name: 'session',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchSessions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSessions.fulfilled, (state, action) => {
      state.loading = false;
      state.sessions = action.payload;
      state.error = '';
    });
    builder.addCase(fetchSessions.rejected, (state, action) => {
      state.loading = false;
      state.sessions = [];
      state.error = action.error.message;
    });

    builder.addCase(fetchSessionById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSessionById.fulfilled, (state, action) => {
      state.loading = false;
      state.session = action.payload;
      state.error = '';
    });
    builder.addCase(fetchSessionById.rejected, (state, action) => {
      state.loading = false;
      state.session = null;
      state.error = action.error.message;
    });

    builder.addCase(fetchDoneSessions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDoneSessions.fulfilled, (state, action) => {
      state.loading = false;
      state.sessions = action.payload;
      state.error = '';
    });
    builder.addCase(fetchDoneSessions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(fetchSessionsByParent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSessionsByParent.fulfilled, (state, action) => {
      state.loading = false;
      state.sessions = action.payload;
      state.error = '';
    });
    builder.addCase(fetchSessionsByParent.rejected, (state, action) => {
      state.loading = false;
      state.sessions = [];
      state.error = action.error.message;
    });

    builder.addCase(fetchDoneSessionsByParent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDoneSessionsByParent.fulfilled, (state, action) => {
      state.loading = false;
      state.sessions = action.payload;
      state.error = '';
    });
    builder.addCase(fetchDoneSessionsByParent.rejected, (state, action) => {
      state.loading = false;
      state.sessions = [];
      state.error = action.error.message;
    });

    builder.addCase(addSession.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addSession.fulfilled, (state, action) => {
      state.loading = false;
      state.sessions.push(action.payload);
      toast.success('A new session is added!', {
        position: 'bottom-left'
      });
      state.error = '';
    });
    builder.addCase(addSession.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.error = action.error.message;
    });

    builder.addCase(editSession.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(editSession.fulfilled, (state, action) => {
      state.loading = false;
      state.session = action.payload;
      toast.info('Session updated!', {
        position: 'bottom-left'
      });
    });
    builder.addCase(editSession.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteSession.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteSession.fulfilled, (state, action) => {
      state.loading = false;
      state.sessions = state.sessions.filter((session) => session.id !== action.payload);
      toast.error('Session removed!', {
        position: 'bottom-left'
      });
      state.error = '';
    });
    builder.addCase(deleteSession.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  }
});

export default sessionsSlice.reducer;
