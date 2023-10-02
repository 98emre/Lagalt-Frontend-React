import { createSlice } from '@reduxjs/toolkit';
import { fetchProjects } from '../api/projectAPI'; 

const initialState = {
    projectsList: [],
    loading: 'idle',
    error: null,
    project: {
        id: null,
        title: '',
        descriptions: '',
        gitlink: '',
        category: null,
        status: null,
        user: null,
        comments: [],
        collaborators: []
    }
};

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        setProject: (state, action) => action.payload,
        
        setTitle: (state, action) => {
            state.title = action.payload;
        },

        setDescription: (state, action) => {
            state.descriptions = action.payload;
        },

        setGitlink: (state, action) => {
            state.gitlink = action.payload;
        },

        setCategory: (state, action) => {
            state.category = action.payload;
        },

        setStatus: (state, action) => {
            state.status = action.payload;
        },

        setUser: (state, action) => {
            state.user = action.payload;
        },

        setComments: (state, action) => {
            state.comments = action.payload;
        },

        setCollaborators: (state, action) => {
            state.collaborators = action.payload;
        }        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.loading = 'loading';
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.loading = 'loaded';
                state.projectsList = action.payload;
            })
            
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = 'error';
                state.error = action.error.message;
            });
    }
});

export const { setProject, setTitle,setDescription,setCategory, setStatus,setUser,setComments,setCollaborators }  = projectSlice.actions;

export default projectSlice.reducer;