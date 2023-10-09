import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    loading: 'idle',
    error: null,
    collaborator: {
        id: null,
        requestDate: null,
        approvalDate: null,
        motivation: '',
        userId: null,
        projectId: null,
    }
};

const collaboratorSlice = createSlice({
    name: "collaborator",
    initialState,
    reducers: {
        setCollaborator: (state, action) => action.payload,

        setRequestDate: (state, action) => {
            state.requestDate = action.payload;
        },

        setApprovalDate: (state, action) => {
            state.approvalDate = action.payload;
        },

        setMotivation: (state, action) => {
            state.motivation = action.payload;
        },

        setUserId: (state, action) => {
            state.userId = action.payload;
        },

        setProjectId: (state, action) => {
            state.projectId = action.payload;
        }
    }
});

export const  { setCollaborator, setRequestDate, setApprovalDate, setMotivation, setUserId, setProjectId} = collaboratorSlice.actions;

export default collaboratorSlice.reducer;