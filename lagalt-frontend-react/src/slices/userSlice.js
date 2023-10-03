import { createSlice } from '@reduxjs/toolkit';
import { fetchUser, updateUser } from "../api/userAPI";

const initialState = {
    loading: 'idle',
    error: null,
    user: {
        id: null,
        username: '',
        email: '',
        description: '',
        fullname: '',
        skills: [],
        profileVisibility: '',
        projectIds: [],
        collaboratorIds: [],
        commentIds: [],
        sentMessageIds: [],
        receivedMessageIds: []
    }
};


const userSlice = createSlice({
        name: "user",
        initialState,
        reducers: {
            setUser: (state, action) => action.payload,

            setUsername: (state,action) => {
                state.username = action.payload;
            },

            setEmail: (state,action) => {
                state.email = action.payload;
            },

            setFullname: (state,action) => {
                state.fullname = action.payload;
            },

            setSkills: (state,action) => {
                state.skills = action.payload;
            },

            setProfileVisibility: (state,action) => {
                state.profileVisibility = action.payload;
            },

            setProjects: (state,action) => {
                state.projects = action.payload;
            },

            setCollaborators: (state,action) => {
                state.collaborators = action.payload;
            },

            setComments: (state,action) => {
                state.comments = action.payload;
            },

            setSentMessages: (state,action) => {
                state.sentMessages = action.payload;
            },

            setReceivedMessages: (state,action) => {
                state.receivedMessages = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchUser.pending, (state) => {
                    state.loading = 'loading'
                })
                .addCase(fetchUser.fulfilled, (state, action) => {
                    state.loading = 'loaded';
                    state.user = action.payload;
                })
                .addCase(fetchUser.rejected, (state, action) => {
                    state.loading = 'error';
                    state.error = action.error.message;
                })
                .addCase(updateUser.pending, (state) => {
                    state.loading = 'loading'
                })
                .addCase(updateUser.fulfilled, (state, action) => {
                    state.loading = 'loaded';
                    state.user = action.payload;
                })
                .addCase(updateUser.rejected, (state, action) => {
                    state.loading = 'error';
                    state.error = action.error.message;
                })
        }
});

export const { setUser, setUsername, setEmail, setFullname, setSkills, setProfileVisibility, setProjects, setCollaborators, setComments, setSentMessages, setReceivedMessages } = userSlice.actions;

export default userSlice.reducer;
