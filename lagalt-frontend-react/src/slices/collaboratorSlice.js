import { createSlice } from '@reduxjs/toolkit';
import { sendCollaboratorRequest } from '../api/collaboratorAPI';

const initialState = {
    loading: 'idle',
    error: null,
    collaboratorsList: [],
    collaborator: {
        id: null,
        status: null,
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

        setStatus: (state, action) => {
            state.status = action.payload;
        },

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
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendCollaboratorRequest.pending, (state,action) => {
                state.loading = "loading";
            }) 
            .addCase(sendCollaboratorRequest.fulfilled, (state, action) => {
                state.loading = "loaded";
                state.collaborator = action.payload;
                state.collaboratorsList.push(action.payload);
            })
            .addCase(sendCollaboratorRequest.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.error.message;
            })
    }
});

export const  { setCollaborator, setRequestDate, setApprovalDate, setMotivation, setUserId, setProjectId} = collaboratorSlice.actions;

export default collaboratorSlice.reducer;