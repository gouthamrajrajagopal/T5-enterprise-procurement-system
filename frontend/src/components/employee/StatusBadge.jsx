import { Chip } from "@mui/material";

const normalizeStatus = (status) =>
    String(status || "PENDING")
        .trim()
        .toUpperCase();

function StatusBadge({ status }) {
    const value = normalizeStatus(status);

    const styles = {
        PENDING: {
            label: "PENDING",
            color: "#92400e",
            backgroundColor: "#fef3c7",
            borderColor: "#f59e0b",
        },

        APPROVED: {
            label: "APPROVED",
            color: "#065f46",
            backgroundColor: "#d1fae5",
            borderColor: "#10b981",
        },

        "SUPPLIER SELECTION PENDING": {
            label: "SUPPLIER SELECTION PENDING",
            color: "#075985",
            backgroundColor: "#e0f2fe",
            borderColor: "#0ea5e9",
        },

        "SUPPLIER SELECTED": {
            label: "SUPPLIER SELECTED",
            color: "#115e59",
            backgroundColor: "#ccfbf1",
            borderColor: "#14b8a6",
        },

        "PO GENERATION PENDING": {
            label: "PO GENERATION PENDING",
            color: "#5b21b6",
            backgroundColor: "#ede9fe",
            borderColor: "#8b5cf6",
        },

        "PO GENERATED": {
            label: "PO GENERATED",
            color: "#6b21a8",
            backgroundColor: "#f3e8ff",
            borderColor: "#a855f7",
        },

        "GOODS RECEIPT PENDING": {
            label: "GOODS RECEIPT PENDING",
            color: "#9a3412",
            backgroundColor: "#ffedd5",
            borderColor: "#f97316",
        },

        "GOODS RECEIVED": {
            label: "GOODS RECEIVED",
            color: "#166534",
            backgroundColor: "#dcfce7",
            borderColor: "#22c55e",
        },

        COMPLETED: {
            label: "COMPLETED",
            color: "#14532d",
            backgroundColor: "#bbf7d0",
            borderColor: "#16a34a",
        },

        REJECTED: {
            label: "REJECTED",
            color: "#991b1b",
            backgroundColor: "#fee2e2",
            borderColor: "#ef4444",
        },

        CANCELLED: {
            label: "CANCELLED",
            color: "#334155",
            backgroundColor: "#e2e8f0",
            borderColor: "#64748b",
        },
    };

    const selectedStyle =
        styles[value] || {
            label: value.replaceAll("_", " "),
            color: "#334155",
            backgroundColor: "#f1f5f9",
            borderColor: "#94a3b8",
        };

    return (
        <Chip
            label={selectedStyle.label}
            size="small"
            sx={{
                minWidth: 100,
                height: 30,
                fontWeight: 800,
                fontSize: "0.75rem",
                color: selectedStyle.color,
                backgroundColor:
                    selectedStyle.backgroundColor,
                border: `1px solid ${selectedStyle.borderColor}`,
                "& .MuiChip-label": {
                    px: 1.5,
                },
            }}
        />
    );
}

export default StatusBadge;