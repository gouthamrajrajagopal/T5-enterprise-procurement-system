import axiosClient from "./axiosClient";

export const getAllCategories = () => {
    return axiosClient.get("/categories");
};

export const getCategoryById = (id) => {
    return axiosClient.get(`/categories/${id}`);
};

export const saveCategory = (category) => {
    return axiosClient.post("/categories", category);
};

export const updateCategory = (id, category) => {
    return axiosClient.put(`/categories/${id}`, category);
};

export const deleteCategory = (id) => {
    return axiosClient.delete(`/categories/${id}`);
};