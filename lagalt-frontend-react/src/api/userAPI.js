import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/users";

export const fetchUser = createAsyncThunk("user/fetchUser", async(token) => {
    if (!token) {
        throw { message: "Token is not available" };
    }

    try {
        const response = await axios.get(`${BASE_URL}/public/token/username`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;

    } catch (error) {
        if (error.response && error.response.status === 404) {
            const createUserResponse = await axios.post(`${BASE_URL}/add-user`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return createUserResponse.data;
        }
        else {
            console.error("Unexpected error:", error);
            throw error;
        }
    }
});


export const updateUser = createAsyncThunk("user/updateUser", async ({ id, userUpdateData, token }) => {
    if (!token) {
        throw { message: "Token is not available" };
    }

    try {
        const response = await axios.patch(`${BASE_URL}/${id}/update`, userUpdateData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } 
    
    catch (error) {
        console.error("Error updating user:", error.response || error.message);
        throw error;
    }
})



