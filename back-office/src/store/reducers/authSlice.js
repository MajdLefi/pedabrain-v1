import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from 'src/services/auth';
import { toast } from 'react-toastify';

const data = localStorage.getItem('user');

const initialState = {
  user: data ? JSON.parse(data) : null,
  error: false,
  isSuccess: false,
  loading: false,
  message: ''
};

export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    const response = await authService.login(userData);
    return response.data; 
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data); 
  }
});

export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const response = await authService.register(userData);
    return response.data; 
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data); 
  }
});

export const changePassword = createAsyncThunk('auth/changePassword', async ({ userId, token, passwordData }, thunkAPI) => {
  try {
    return await authService.changePassword(userId, token, passwordData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data || error.message || 'Failed to change password');
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await localStorage.removeItem('user');
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        toast.success('Login with success', {
          position: 'top-center'
        });
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error('Verify password or email', {
          position: 'top-center'
        });
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        toast.success('Compte crée avec succés', {
          position: 'top-center'
        });
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error('Verify teh fields', {
          position: 'top-center'
        });
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        toast.success('Password updated', {
          position: 'top-center'
        });
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error('verify password', {
          position: 'top-center'
        });
      })
  }
});

export const selectUser = (state) => state.authSlice.user;
export const { reset } = authSlice.actions;
export default authSlice.reducer;
