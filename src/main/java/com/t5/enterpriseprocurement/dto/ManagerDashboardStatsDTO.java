package com.t5.enterpriseprocurement.dto;

public class ManagerDashboardStatsDTO {

    private long pendingCount;
    private long approvedCount;
    private long rejectedCount;
    private long totalHandled;

    public ManagerDashboardStatsDTO(
            long pendingCount,
            long approvedCount,
            long rejectedCount) {

        this.pendingCount = pendingCount;
        this.approvedCount = approvedCount;
        this.rejectedCount = rejectedCount;
        this.totalHandled =
                approvedCount + rejectedCount;
    }

    public long getPendingCount() {
        return pendingCount;
    }

    public long getApprovedCount() {
        return approvedCount;
    }

    public long getRejectedCount() {
        return rejectedCount;
    }

    public long getTotalHandled() {
        return totalHandled;
    }
}