import axiosClient from "./axiosClient";

export const getAllDepartments = () => {
    return axiosClient.get("/departments");
};

export const getDepartmentById = (id) => {
    return axiosClient.get(`/departments/${id}`);
};

export const saveDepartment = (department) => {
    return axiosClient.post("/departments", department);
};

export const updateDepartment = (id, department) => {
    return axiosClient.put(`/departments/${id}`, department);
};

export const deleteDepartment = (id) => {
    return axiosClient.delete(`/departments/${id}`);
};