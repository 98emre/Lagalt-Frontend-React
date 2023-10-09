import { combineReducers } from '@reduxjs/toolkit';
import projectReducer from './slices/projectSlice';
import userReducer from './slices/userSlice';
import commentReducer from './slices/commentSlice'
import collaboratorReducer from './slices/collaboratorSlice'

const rootReducer = combineReducers({
    project: projectReducer,
    user: userReducer,
    comment: commentReducer,
    collaborator: collaboratorReducer
});

export default rootReducer;
