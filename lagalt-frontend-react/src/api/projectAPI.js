import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/projects";

export const fetchProjects = createAsyncThunk('project/fetchProjects', async () => {
    try {
        const response = await axios.get(`${BASE_URL}/public`);
        return response.data;
   } catch (error) {
        throw error.response ? error.response.data : { message: "An unknown error occurred" };
    }
});