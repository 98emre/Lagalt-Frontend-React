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
        throw error.response ? error.response.data: {message: "An error occurred while posting a comment"}
    }
})

export const getAllCommentsByProjectId = createAsyncThunk("comment/getAllCommentsByProjectId", async({id, token}) => {
    if (!token) {
        throw { message: "Token is not available" };
    }
   
    try {
        const response = await axios.get(`${BASE_URL}/public/project/${id}`,{
            headers:{
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            }
        });

        return response.data;

    } catch (error) {
        throw error.response ? error.response.data: {message: "An error occurred while posting a comment"}
    }
})


export const getCommentById = createAsyncThunk("comment/getCommentById", async({id, token}) => {
    if (!token) {
        throw { message: "Token is not available" };
    }

    try {
        const response = await axios.get(`${BASE_URL}/public/${id}`);
        return response.data;
        
    } catch (error) {
        throw error.response ? error.response.data: {message: "An error occurred while getting comment by id"}
    }
})
