import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from 'src/services/user'; // Importing user service
import { toast } from 'react-toastify';

const initialState = {
  users: [],
  loading: false,
  user: null,
  error: '',
  message: ''
};

export const fetchUsers = createAsyncThunk('user/fetchUsers', async (token, thunkAPI) => {
  try {
    return await userService.getUsers(token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchUserById = createAsyncThunk('user/fetchUserById', async ({ userId, token }, thunkAPI) => {
  try {
    return await userService.getUserById(userId, token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const addUser = createAsyncThunk('user/addUser', async ({ userData, token }, thunkAPI) => {
  try {
    return await userService.addUser(userData, token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const editUser = createAsyncThunk('user/editUser', async ({ userId, userData, token }, thunkAPI) => {
  try {
    await userService.editUser(userId, userData, token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteUser = createAsyncThunk('user/deleteUser', async ({ userId, token }, thunkAPI) => {
  try {
    await userService.deleteUser(userId, token);
    return userId;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = '';
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });

    builder.addCase(fetchUserById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = '';
    });
    builder.addCase(fetchUserById.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.error.message;
    });

    builder.addCase(addUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users?.data.push(action.payload);
      toast.success('A new user is added!', {
        position: 'bottom-left'
      });
      state.error = '';
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.error = action.error.message;
    });

    builder.addCase(editUser.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload;
      toast.info('User updated!', {
        position: 'bottom-left'
      });
    });
    builder.addCase(editUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = state.users?.data.filter((user) => user.id !== action.payload);
      toast.error('User removed!', {
        position: 'bottom-left'
      });
      state.error = '';
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  }
});

export default userSlice.reducer;
