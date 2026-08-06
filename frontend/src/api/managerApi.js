import api from "./axiosConfig";

export const getPendingRequests = async () => {
    const response = await api.get(
        "/approvals/manager/pending"
    );

    return response.data;
};

export const approveRequest = async (
    requestId,
    approverId,
    remarks = ""
) => {
    const response = await api.put(
        `/approvals/manager/${requestId}/approve`,
        {
            approverId,
            remarks,
        }
    );

    return response.data;
};

export const rejectRequest = async (
    requestId,
    approverId,
    remarks
) => {
    const response = await api.put(
        `/approvals/manager/${requestId}/reject`,
        {
            approverId,
            remarks,
        }
    );

    return response.data;
};

export const getManagerHistory = async (
    managerId
) => {
    const response = await api.get(
        `/approvals/approver/${managerId}/history`
    );

    return response.data;
};

export const getManagerStats = async (
    managerId
) => {
    const response = await api.get(
        `/approvals/manager/${managerId}/stats`
    );

    return response.data;
};