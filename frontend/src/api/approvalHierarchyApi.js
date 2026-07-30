import axiosClient from "./axiosClient";

export const getAllApprovalHierarchies = () => {
    return axiosClient.get("/approval-hierarchy");
};

export const getApprovalHierarchyById = (id) => {
    return axiosClient.get(`/approval-hierarchy/${id}`);
};

export const saveApprovalHierarchy = (approvalHierarchy) => {
    return axiosClient.post("/approval-hierarchy", approvalHierarchy);
};

export const updateApprovalHierarchy = (id, approvalHierarchy) => {
    return axiosClient.put(`/approval-hierarchy/${id}`, approvalHierarchy);
};

export const deleteApprovalHierarchy = (id) => {
    return axiosClient.delete(`/approval-hierarchy/${id}`);
};