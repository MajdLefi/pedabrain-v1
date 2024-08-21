// third-party
import { combineReducers } from 'redux';

// project import
import authSlice from './authSlice';
import userSlice from './userSlice';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({authSlice});

export default reducers;
