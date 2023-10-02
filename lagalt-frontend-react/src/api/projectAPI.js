import axios from "axios";

const BASE_URL = "http://localhost:8080/api/projects";

export const getAllProjects = () => {
    return axios.get(`${BASE_URL}/public`);
}