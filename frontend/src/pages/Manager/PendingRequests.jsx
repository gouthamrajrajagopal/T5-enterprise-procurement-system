import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    CircularProgress,
    Alert,
    TextField,
    Box,
} from "@mui/material";

import ManagerLayout from "../../layouts/ManagerLayout";
import { getPendingRequests } from "../../api/managerApi";

function PendingRequests() {

    const navigate = useNavigate();

    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {

        loadRequests();

    }, []);

    useEffect(() => {

        const value = search.toLowerCase();

        setFilteredRequests(

            requests.filter((request) =>

                (request.requestNumber || "")
                    .toLowerCase()
                    .includes(value)

                ||

                (request.user?.name || "")
                    .toLowerCase()
                    .includes(value)

            )

        );

    }, [search, requests]);

    const loadRequests = async () => {

        try {

            const data = await getPendingRequests();

            setRequests(data);
            setFilteredRequests(data);

        } catch {

            setError("Unable to load pending requests.");

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <ManagerLayout>

                <CircularProgress />

            </ManagerLayout>

        );

    }

    return (

        <ManagerLayout>

            <Typography
                variant="h4"
                fontWeight="bold"
                mb={3}
            >
                Pending Purchase Requests
            </Typography>

            {error &&

                <Alert
                    severity="error"
                    sx={{ mb: 2 }}
                >
                    {error}
                </Alert>

            }

            <Box mb={3}>

                <TextField

                    label="Search PR"

                    fullWidth

                    value={search}

                    onChange={(e) =>
                        setSearch(e.target.value)
                    }

                />

            </Box>

            <TableContainer
                component={Paper}
            >

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>
                                PR Number
                            </TableCell>

                            <TableCell>
                                Employee
                            </TableCell>

                            <TableCell>
                                Department
                            </TableCell>

                            <TableCell>
                                Amount
                            </TableCell>

                            <TableCell>
                                Status
                            </TableCell>

                            <TableCell>
                                Action
                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {filteredRequests.map((request) => (

                            <TableRow
                                key={request.requestId}
                            >

                                <TableCell>

                                    {request.requestNumber}

                                </TableCell>

                                <TableCell>

                                    {request.user?.name}

                                </TableCell>

                                <TableCell>

                                    {request.department?.deptName}

                                </TableCell>

                                <TableCell>

                                    ₹{request.totalAmount}

                                </TableCell>

                                <TableCell>

                                    {request.status}

                                </TableCell>

                                <TableCell>

                                    <Button

                                        variant="contained"

                                        onClick={() =>

                                            navigate(
                                                `/manager/request/${request.requestId}`
                                            )

                                        }

                                    >

                                        View

                                    </Button>

                                </TableCell>

                            </TableRow>

                        ))}

                    </TableBody>

                </Table>

            </TableContainer>

        </ManagerLayout>

    );

}

export default PendingRequests;