import api from "./axiosConfig";

export const createRequisition = async (data) => (await api.post("/api/requisitions", data)).data;
export const getMyRequisitions = async () => (await api.get("/api/requisitions/my")).data;
export const getRequisitionById = async (id) => (await api.get(`/api/requisitions/${id}`)).data;
export const getRequisitionWorkflow = async (id) => (await api.get(`/api/approvals/workflow/${id}`)).data;
export const cancelRequisition = async (id) => (await api.delete(`/api/requisitions/${id}`)).data;
