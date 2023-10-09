import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const BASE_URL = "http://localhost:8080/api/collaborators"

export const sendCollaboratorRequest = createAsyncThunk("collaborator/sendCollaboratorRequest", async({projectId,collaborator, token }) => {

    if(!token){
        throw {message: "token is not available"}
    }

    try {

        const response = await axios.post(`${BASE_URL}/${projectId}/add-collaborator`, collaborator, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });        
        return response.data;
        
    } catch (error) {
        throw error.response ? error.response.data: {message : "An error occurred while posting collaborator"}
    }

})


export const getCollaborators = createAsyncThunk("collaborator/getCollaborators", async() => {
    try {
        const response = axios.get(`${BASE_URL}/public`)
        return (await response).data;
        
    } catch (error) {
        throw error.response ? error.response.data: {message: "An error occurred while getting collaborators"}
    }
})