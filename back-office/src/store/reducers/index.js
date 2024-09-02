// third-party
import { combineReducers } from 'redux';

// project import
import authSlice from './authSlice';
import userSlice from './userSlice';
import kidSlice from './kidSlice';
import sessionSlice from './sessionSlice';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({authSlice, userSlice, kidSlice, sessionSlice});

export default reducers;
