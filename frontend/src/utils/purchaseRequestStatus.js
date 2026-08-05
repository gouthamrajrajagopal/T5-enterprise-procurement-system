export const getInternalStatus = (request) => {
    return String(request?.status ?? "PENDING")
        .trim()
        .toUpperCase();
};

export const getEmployeeDisplayStatus = (request) => {
    const status = getInternalStatus(request);

    const pendingStatuses = [
        "PENDING",
        "IN_APPROVAL",
        "PENDING_MANAGER_APPROVAL",
        "PENDING_FINANCE_APPROVAL",
        "PENDING_OWNER_APPROVAL",
        "PENDING_DIRECTOR_APPROVAL",
        "VENDOR_SELECTION_PENDING",
        "PO_PENDING",
        "GOODS_RECEIPT_PENDING",
    ];

    if (pendingStatuses.includes(status)) {
        return "PENDING";
    }

    if (
        status === "APPROVED" ||
        status === "PO_GENERATED" ||
        status === "COMPLETED"
    ) {
        return "APPROVED";
    }

    if (status === "REJECTED") {
        return "REJECTED";
    }

    if (status === "CANCELLED") {
        return "CANCELLED";
    }

    return status;
};

export const isEmployeeRequestPending = (request) => {
    return getEmployeeDisplayStatus(request) === "PENDING";
};