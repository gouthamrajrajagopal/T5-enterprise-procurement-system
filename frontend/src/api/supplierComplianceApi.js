import axiosClient from "./axiosClient";

export const getAllCompliance = () => {
    return axiosClient.get("/supplier-compliance");
};

export const getComplianceById = (id) => {
    return axiosClient.get(`/supplier-compliance/${id}`);
};

export const saveCompliance = (compliance) => {
    return axiosClient.post("/supplier-compliance", compliance);
};

export const updateCompliance = (id, compliance) => {
    return axiosClient.put(`/supplier-compliance/${id}`, compliance);
};

export const deleteCompliance = (id) => {
    return axiosClient.delete(`/supplier-compliance/${id}`);
};