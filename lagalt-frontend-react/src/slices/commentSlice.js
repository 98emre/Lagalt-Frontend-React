import { createSlice } from '@reduxjs/toolkit';


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
    })
})


export const { setComment, setText, setDate, setUserId, setProjectId } = commentSlice.actions;

export default commentSlice.reducer;