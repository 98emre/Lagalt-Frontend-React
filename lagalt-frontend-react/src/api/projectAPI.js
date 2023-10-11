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

export const addProject = createAsyncThunk("project/addProjects", async({project, token}) => {

    if (!token) {
        throw { message: "Token is not available" };
    }

    try {
        const response = await axios.post(BASE_URL, project, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });

        return response.data;

    } catch (error) {
        throw error.response ? error.response.data: {message: "An error occurred while posting project"}
    }
})

export const getProjectById = createAsyncThunk("project/getProjectById", async({id})=> {

    try {
        const response = await axios.get(`${BASE_URL}/public/${id}`);
        return response.data;

    } catch (error) {
        throw error.response ? error.response.data : { message: "An error occurred while get project by id"}
    }
})