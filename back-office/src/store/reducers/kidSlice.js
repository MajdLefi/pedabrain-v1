import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import kidService from 'src/services/kid'; // Importing kid service
import { toast } from 'react-toastify';

const initialState = {
  kids: [],
  loading: false,
  kid: null,
  error: '',
  message: ''
};

export const fetchKids = createAsyncThunk('kid/fetchKids', async (token, thunkAPI) => {
  try {
    return await kidService.getKids(token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchKidById = createAsyncThunk('kid/fetchKidById', async ({ kidId, token }, thunkAPI) => {
  try {
    return await kidService.getKidById(kidId, token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchKidsByParent = createAsyncThunk('kid/fetchKidsByParent', async ({ parentId, token }, thunkAPI) => {
  try {
    return await kidService.getKidsByParent(parentId, token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const addKid = createAsyncThunk('kid/addKid', async ({ kidData, token }, thunkAPI) => {
  try {
    return await kidService.addKid(kidData, token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const editKid = createAsyncThunk('kid/editKid', async ({ kidId, kidData, token }, thunkAPI) => {
  try {
    await kidService.updateKid(kidId, kidData, token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteKid = createAsyncThunk('kid/deleteKid', async ({ kidId, token }, thunkAPI) => {
  try {
    await kidService.deleteKid(kidId, token);
    return kidId;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const kidSlice = createSlice({
  name: 'kid',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchKids.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchKids.fulfilled, (state, action) => {
      state.loading = false;
      state.kids = action.payload;
      state.error = '';
    });
    builder.addCase(fetchKids.rejected, (state, action) => {
      state.loading = false;
      state.kids = [];
      state.error = action.error.message;
    });

    builder.addCase(fetchKidById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchKidById.fulfilled, (state, action) => {
      state.loading = false;
      state.kid = action.payload;
      state.error = '';
    });
    builder.addCase(fetchKidById.rejected, (state, action) => {
      state.loading = false;
      state.kid = null;
      state.error = action.error.message;
    });

    builder.addCase(fetchKidsByParent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchKidsByParent.fulfilled, (state, action) => {
      state.loading = false;
      state.kids = action.payload;
      state.error = '';
    });
    builder.addCase(fetchKidsByParent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(addKid.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addKid.fulfilled, (state, action) => {
      state.loading = false;
      state.kids?.data.push(action.payload);
      toast.success('A new kid is added!', {
        position: 'bottom-left'
      });
      state.error = '';
    });
    builder.addCase(addKid.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.error = action.error.message;
    });

    builder.addCase(editKid.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(editKid.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.kid = action.payload;
      toast.info('Kid updated!', {
        position: 'bottom-left'
      });
    });
    builder.addCase(editKid.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    builder.addCase(deleteKid.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteKid.fulfilled, (state, action) => {
      state.loading = false;
      state.kids = state.kids.filter((kid) => kid.id !== action.payload);
      toast.error('Kid removed!', {
        position: 'bottom-left'
      });
      state.error = '';
    });
    builder.addCase(deleteKid.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  }
});

export default kidSlice.reducer;
