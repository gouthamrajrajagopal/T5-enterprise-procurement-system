import axiosClient from "./axiosClient";

export const getAllSuppliers = () => {
    return axiosClient.get("/suppliers");
};

export const getSupplierById = (id) => {
    return axiosClient.get(`/suppliers/${id}`);
};

export const saveSupplier = (supplier) => {
    return axiosClient.post("/suppliers", supplier);
};

export const updateSupplier = (id, supplier) => {
    return axiosClient.put(`/suppliers/${id}`, supplier);
};

export const deleteSupplier = (id) => {
    return axiosClient.delete(`/suppliers/${id}`);
};