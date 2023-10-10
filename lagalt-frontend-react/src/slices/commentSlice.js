import { createSlice } from '@reduxjs/toolkit';
import { addComment, getCommentById, getAllCommentsByProjectId } from '../api/commentAPI';
import { getUserById } from '../api/userAPI';

const initialState = {
    commentList: [],
    commentUsers: [],
    loading: 'idle',
    error: null,
    comment: {
        id: null,
        text: '',
        date: null,
        userId: null,
        projectId: null,
    }
};

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: ({
        setComment: (state,action) => state.comment = action.payload,

        setText: (state, action) => {
            state.comment.text = action.payload;
        },

        setDate: (state, action) => {
            state.comment.date = action.payload;
        },

        setUserId: (state, action) => {
            state.comment.userId = action.payload;
        },

        setProjectId: (state, action) => {
            state.comment.projectId = action.payload;
        }
    }),
    extraReducers: (builder) => {
        builder
            .addCase(addComment.pending, (state) => {
                state.loading = "loading";
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.loading = 'loaded';
                state.comment = action.payload;                
                state.commentList.push(action.payload);

                if(!state.commentUsers.some(comment => comment.id === action.payload.id)){
                    state.commentUsers.push(action.payload);
                }
            })
            
            .addCase(addComment.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message;              
            })
            .addCase(getUserById.pending, (state)=> {
                state.loading = "loading"
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.loading = "loaded";
                state.comment = action.payload;

                if(!state.commentUsers.some(comment => comment.id === action.payload.id)){
                    state.commentUsers.push(action.payload);
                }

            })
            .addCase(getUserById.rejected, (state,action) => {
                state.loading = "failed";
                state.error = action.error.message;
            })
            .addCase(getAllCommentsByProjectId.pending, (state)=> {
                state.loading = "loading"
            })
            .addCase(getAllCommentsByProjectId.fulfilled, (state, action) => {
                state.loading = "loaded";
                state.commentList = action.payload;
            })
            .addCase(getAllCommentsByProjectId.rejected, (state,action) => {
                state.loading = "failed";
                state.error = action.error.message;
            })
    }
})


export const { setComment, setText, setDate, setUserId, setProjectId } = commentSlice.actions;

export default commentSlice.reducer;