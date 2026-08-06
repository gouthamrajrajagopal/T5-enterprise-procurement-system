import api from "./axiosConfig";

export const getPendingVendorSelections = async () => {
    const response = await api.get(
        "/vendor-selection/pending"
    );

    return response.data;
};

export const getProcessedVendorSelections = async () => {
    const response = await api.get(
        "/vendor-selection/processed"
    );

    return response.data;
};

export const getAllSuppliers = async () => {
    const response = await api.get(
        "/suppliers"
    );

    return response.data;
};

export const selectVendor = async (
    requestId,
    supplierId
) => {
    const selectedByUserId = Number(
        localStorage.getItem("userId")
    );

    if (!selectedByUserId) {
        throw new Error(
            "Procurement Officer user ID is missing"
        );
    }

    if (!supplierId) {
        throw new Error(
            "Supplier ID is required"
        );
    }

    const response = await api.put(
        `/vendor-selection/${requestId}/select`,
        {
            supplierId: Number(supplierId),
            selectedByUserId,
        }
    );

    return response.data;
};