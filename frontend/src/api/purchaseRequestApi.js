import api from "./axiosConfig";

export const createPurchaseRequest = async (requestData) => {
    const response = await api.post(
        "/purchase-requests",
        requestData
    );

    return response.data;
};

export const getAllPurchaseRequests = async () => {
    const response = await api.get("/purchase-requests");
    return response.data;
};

export const getMyPurchaseRequests = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
        throw new Error("Logged-in user ID is missing");
    }

    const response = await api.get(
        `/purchase-requests/user/${userId}`
    );

    return response.data;
};

export const getPurchaseRequestById = async (
    requestId
) => {
    const response = await api.get(
        `/purchase-requests/${requestId}`
    );

    return response.data;
};
export const getPendingPurchaseRequests = async () => {
    const response = await api.get(
        "/purchase-requests/pending"
    );

    return response.data;
};

export const updatePurchaseRequest = async (
    requestId,
    requestData
) => {
    const response = await api.put(
        `/purchase-requests/${requestId}`,
        requestData
    );

    return response.data;
};

export const cancelPurchaseRequest = async (requestId) => {
    const response = await api.delete(
        `/purchase-requests/${requestId}`
    );

    return response.data;
};