import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const BASE_URL = "http://localhost:8080/api/comments";


export const addComment = createAsyncThunk("comment/addComment", async({comment, projectId, token}) => {
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

        return response.data;

    } catch (error) {
        throw error.response ? error.response.data: {message: "An error occurred while posting project"}
    }
})

export const getCommentById = createAsyncThunk("comment/getCommentById", async({ids})=>{
    let comments = [];
    for(let id of ids) {
        try {
            const response = await axios.get(`${BASE_URL}/public/${id}`);
            comments.push(response.data);
        } catch (error) {
            console.error("Error fetching comment with ID:", id);
        }
    }
    return comments;
});
