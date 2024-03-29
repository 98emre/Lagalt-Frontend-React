import { createSlice } from '@reduxjs/toolkit';
import { addComment, getCommentById } from '../api/commentAPI';

const initialState = {
    projectCommentList: [],
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
        setComment: (state,action) => action.payload,

        setText: (state, action) => {
            state.text = action.payload;
        },

        setDate: (state, action) => {
            state.date = action.payload;
        },

        setUserId: (state, action) => {
            state.userId = action;
        },

        setProjectId: (state, action) => {
            state.projectId = action.payload;
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
            
              
                if (!state.projectCommentList.some(comment => comment.id === action.payload.id)) {
                    state.projectCommentList.push(action.payload);
                }
            })
            .addCase(addComment.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message;              
            })
            .addCase(getCommentById.pending, (state)=> {
                state.loading = "loading"
            })
            .addCase(getCommentById.fulfilled, (state, action) => {
                state.loading = "loaded";
                state.projectCommentList = action.payload;

            })
            .addCase(getCommentById.rejected, (state,action) => {
                state.loading = "failed";
                state.error = action.error.message;
            })
    }
})


export const { setComment, setText, setDate, setUserId, setProjectId } = commentSlice.actions;

export default commentSlice.reducer;