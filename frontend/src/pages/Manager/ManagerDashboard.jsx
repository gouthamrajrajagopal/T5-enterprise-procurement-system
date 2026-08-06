import { useEffect, useState } from "react";

import {
    Alert,
    Box,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    Typography,
} from "@mui/material";

import ManagerLayout from "../../layouts/ManagerLayout";
import { getManagerStats } from "../../api/managerApi";

function ManagerDashboard() {
    const [stats, setStats] = useState({
        pendingCount: 0,
        approvedCount: 0,
        rejectedCount: 0,
        totalHandled: 0,
    });

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        const loadStats = async () => {
            setLoading(true);
            setError("");

            try {
                const managerId = Number(
                    localStorage.getItem("userId")
                );

                if (!managerId) {
                    throw new Error(
                        "Manager ID is missing"
                    );
                }

                const data =
                    await getManagerStats(
                        managerId
                    );

                setStats({
                    pendingCount:
                        Number(
                            data.pendingCount
                        ) || 0,

                    approvedCount:
                        Number(
                            data.approvedCount
                        ) || 0,

                    rejectedCount:
                        Number(
                            data.rejectedCount
                        ) || 0,

                    totalHandled:
                        Number(
                            data.totalHandled
                        ) || 0,
                });
            } catch (requestError) {
                setError(
                    requestError.response?.data?.message ||
                        requestError.message ||
                        "Unable to load manager dashboard"
                );
            } finally {
                setLoading(false);
            }
        };

        loadStats();

        const refreshOnFocus = () => {
            loadStats();
        };

        window.addEventListener(
            "focus",
            refreshOnFocus
        );

        return () => {
            window.removeEventListener(
                "focus",
                refreshOnFocus
            );
        };
    }, []);

    const cards = [
        {
            label: "Pending Approvals",
            value: stats.pendingCount,
        },
        {
            label: "Total Approved",
            value: stats.approvedCount,
        },
        {
            label: "Total Rejected",
            value: stats.rejectedCount,
        },
        {
            label: "Total Handled",
            value: stats.totalHandled,
        },
    ];

    return (
        <ManagerLayout>
            <Typography
                variant="h4"
                fontWeight={800}
                mb={3}
            >
                Manager Dashboard
            </Typography>

            {error && (
                <Alert
                    severity="error"
                    sx={{ mb: 3 }}
                >
                    {error}
                </Alert>
            )}

            {loading ? (
                <Box
                    minHeight={300}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <CircularProgress />
                </Box>
            ) : (
                <Grid
                    container
                    spacing={3}
                >
                    {cards.map((card) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={3}
                            key={card.label}
                        >
                            <Card>
                                <CardContent>
                                    <Typography
                                        color="text.secondary"
                                    >
                                        {card.label}
                                    </Typography>

                                    <Typography
                                        variant="h4"
                                        fontWeight={800}
                                        mt={1}
                                    >
                                        {card.value}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </ManagerLayout>
    );
}

export default ManagerDashboard;