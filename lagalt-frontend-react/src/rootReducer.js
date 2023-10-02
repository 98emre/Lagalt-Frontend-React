import { combineReducers } from '@reduxjs/toolkit';
import projectReducer from './slices/projectSlice';
import userReducer from './slices/userSlice';

const rootReducer = combineReducers({
    project: projectReducer,
    user: userReducer
});

export default rootReducer;
