import api from "./axiosConfig";

export const getAllDepartments = async () => {
    const response = await api.get("/departments");
    return response.data;
};