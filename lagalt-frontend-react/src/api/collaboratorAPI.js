import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const BASE_URL = "http://localhost:8080/api/collaborators"

export const sendCollaboratorRequest = createAsyncThunk("collaborator/sendCollaboratorRequest", async({projectId,collaborator, token }) => {

    if(!token){
        throw {message: "token is not available"}
    }

    try {

        const response = await axios.post(`${BASE_URL}/${projectId}/add-collaborator`);
        console.log("Reponse data: ", response.data)
        
        return response.data;
        
    } catch (error) {
        throw error.response ? error.response.data: {message : "An error occurred while posting collaborator"}
    }

})