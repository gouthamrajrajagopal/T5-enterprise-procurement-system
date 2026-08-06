import { useEffect, useState } from "react";

import {
    Alert,
    Box,
    Chip,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

import ManagerLayout from "../../layouts/ManagerLayout";
import { getManagerHistory } from "../../api/managerApi";

function ApprovalHistory() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadHistory = async () => {
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
                    await getManagerHistory(managerId);

                setHistory(
                    Array.isArray(data)
                        ? data
                        : []
                );
            } catch (requestError) {
                setError(
                    requestError.response?.data?.message ||
                        requestError.message ||
                        "Unable to load approval history"
                );
            } finally {
                setLoading(false);
            }
        };

        loadHistory();
    }, []);

    return (
        <ManagerLayout>
            <Box>
                <Typography
                    variant="h4"
                    fontWeight={800}
                    mb={3}
                >
                    Approval History
                </Typography>

                {error && (
                    <Alert
                        severity="error"
                        sx={{ mb: 2 }}
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
                ) : history.length === 0 ? (
                    <Alert severity="info">
                        No approval history found.
                    </Alert>
                ) : (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Request ID
                                    </TableCell>

                                    <TableCell>
                                        Approval Level
                                    </TableCell>

                                    <TableCell>
                                        Role
                                    </TableCell>

                                    <TableCell>
                                        Status
                                    </TableCell>

                                    <TableCell>
                                        Remarks
                                    </TableCell>

                                    <TableCell>
                                        Date
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {history.map(
                                    (approval) => (
                                        <TableRow
                                            key={
                                                approval.approvalId ??
                                                `${approval.requestId}-${approval.approvalLevel}`
                                            }
                                        >
                                            <TableCell>
                                                {
                                                    approval.requestId
                                                }
                                            </TableCell>

                                            <TableCell>
                                                {
                                                    approval.approvalLevel
                                                }
                                            </TableCell>

                                            <TableCell>
                                                {
                                                    approval.approverRole
                                                }
                                            </TableCell>

                                            <TableCell>
                                                <Chip
                                                    label={
                                                        approval.status
                                                    }
                                                    color={
                                                        approval.status ===
                                                        "APPROVED"
                                                            ? "success"
                                                            : "error"
                                                    }
                                                    size="small"
                                                />
                                            </TableCell>

                                            <TableCell>
                                                {approval.remarks ||
                                                    "No remarks"}
                                            </TableCell>

                                            <TableCell>
                                                {approval.approvalDate
                                                    ? new Date(
                                                          approval.approvalDate
                                                      ).toLocaleString(
                                                          "en-IN"
                                                      )
                                                    : "Not available"}
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>
        </ManagerLayout>
    );
}

export default ApprovalHistory;