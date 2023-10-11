import { createSlice } from '@reduxjs/toolkit';
import { fetchProjects, addProject, getProjectById, getProjectPendingCollaborator, getProjectApprovedCollaborator } from '../api/projectAPI'; 

const initialState = {
    currentUserId: null,
    projectsList: [],
    userProjects: [],
    loading: 'idle',
    error: null,
    project: {
        id: null,
        title: '',
        descriptions: '',
        gitlink: '',
        category: null,
        status: null,
        userId: {},
        commentIds: [],
        collaboratorIds: []
    }
};

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        setProject: (state, action) => action.payload,
        
        setCurrentUserId: (state, action) => {
            state.currentUserId = action.payload;
        },
        
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
            })
            .addCase(addProject.pending, (state) => {
                state.loading = 'loading';
            })
            .addCase(addProject.fulfilled, (state, action) => {
                state.loading = 'loaded';
                state.project = {
                    ...action.payload,
                    comments: action.payload.comments || [],
                    collaborators: action.payload.comments || []
                };

                if (!state.userProjects.some(project => project.id === action.payload.id)) {
                    if(state.project.userId == action.payload.userId){
                        state.userProjects.push(action.payload);
                    }
                }
            }) 
            .addCase(addProject.rejected, (state, action) => {
                state.loading = 'error';
                state.error = action.error.message;
            })
            .addCase(getProjectById.pending, (state) => {
                state.loading = 'loading';
            })
            .addCase(getProjectById.fulfilled, (state, action) => {
                state.loading = 'loaded';
                state.project = action.payload;

                if (action.payload.userId === state.currentUserId && !state.userProjects.some(project => project.id === action.payload.id)) {
                    state.userProjects.push(action.payload);
                }
            }) 
            .addCase(getProjectById.rejected, (state, action) => {
                state.loading = 'error';
                state.error = action.error.message;
            })
        }
});

export const { setProject, setTitle,setDescription,setCategory, setStatus,setUser,setComments,setCollaborators,setCurrentUserId }  = projectSlice.actions;

export default projectSlice.reducer;