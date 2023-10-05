import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const BASE_URL = "http://localhost:8080/api/comments";


export const addComment = createAsyncThunk("comment/addComment", async(comment, projectId, token) => {
    if (!token) {
        throw { message: "Token is not available" };
    }
   
    try {
        const response = await axios.post(`${BASE_URL}/project/${projectId}/add-comment`, comment,{
            headers:{
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            }
        });

        console.log("Comment ", response.data);
        return response.data;

    } catch (error) {
        throw error.response ? error.response.data: {message: "An error occurred while posting project"}
    }
})