import api from "./axiosConfig";

export const generatePurchaseOrder = async (
    requestId,
    generateData
) => {
    const response = await api.post(
        `/purchase-orders/generate/${requestId}`,
        generateData
    );

    return response.data;
};

export const getAllPurchaseOrders = async () => {
    const response = await api.get("/purchase-orders");
    return response.data;
};

export const getPurchaseOrderById = async (poId) => {
    const response = await api.get(
        `/purchase-orders/${poId}`
    );

    return response.data;
};

export const getPurchaseOrderByRequestId = async (
    requestId
) => {
    const response = await api.get(
        `/purchase-orders/request/${requestId}`
    );

    return response.data;
};

export const getPurchaseOrdersBySupplier = async (
    supplierId
) => {
    const response = await api.get(
        `/purchase-orders/supplier/${supplierId}`
    );

    return response.data;
};

export const updatePurchaseOrderStatus = async (
    poId,
    status
) => {
    const response = await api.put(
        `/purchase-orders/${poId}/status`,
        { status }
    );

    return response.data;
};