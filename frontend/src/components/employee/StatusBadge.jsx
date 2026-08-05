import { Chip } from "@mui/material";

const config = {
  PENDING: { label: "Pending", color: "warning" },
  IN_APPROVAL: { label: "In approval", color: "info" },
  APPROVED: { label: "Approved", color: "success" },
  REJECTED: { label: "Rejected", color: "error" },
  CANCELLED: { label: "Cancelled", color: "default" },
};

export default function StatusBadge({ status }) {
  const item = config[status] || { label: status || "Unknown", color: "default" };
  return <Chip size="small" label={item.label} color={item.color} variant="outlined" sx={{ fontWeight: 700 }} />;
}
