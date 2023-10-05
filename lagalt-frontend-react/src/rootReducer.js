import { combineReducers } from '@reduxjs/toolkit';
import projectReducer from './slices/projectSlice';
import userReducer from './slices/userSlice';
import commentReducer from './slices/commentSlice'

const rootReducer = combineReducers({
    project: projectReducer,
    user: userReducer,
    comment: commentReducer
});

export default rootReducer;
