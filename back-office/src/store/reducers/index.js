// third-party
import { combineReducers } from 'redux';

// project import
import authSlice from './authSlice';
import userSlice from './userSlice';
import kidSlice from './kidSlice';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({authSlice, userSlice, kidSlice});

export default reducers;
