import React from "react";
import {
    Paper,
    Typography,
    Box,
    Chip,
    Button,
} from "@mui/material";

const rfqs = [
    {
        id: "RFQ-101",
        category: "Office Supplies",
        dueDate: "12 Aug 2026",
        status: "Open",
    },
    {
        id: "RFQ-102",
        category: "IT Equipment",
        dueDate: "15 Aug 2026",
        status: "Open",
    },
    {
        id: "RFQ-103",
        category: "Furniture",
        dueDate: "20 Aug 2026",
        status: "Closed",
    },
    {
        id: "RFQ-104",
        category: "Electrical Items",
        dueDate: "25 Aug 2026",
        status: "Open",
    },
];

const RFQTable = () => {
    return (
        <Paper className="premium-panel">

            <Box className="panel-header">
                <Typography variant="h6" fontWeight={700}>
                    Available RFQs
                </Typography>
            </Box>

            <Box className="table-wrap">

                <table className="premium-table">

                    <thead>
                    <tr>
                        <th>RFQ ID</th>
                        <th>Category</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>

                    <tbody>

                    {rfqs.map((rfq) => (

                        <tr key={rfq.id}>

                            <td>{rfq.id}</td>

                            <td>{rfq.category}</td>

                            <td>{rfq.dueDate}</td>

                            <td>
                                <Chip
                                    label={rfq.status}
                                    color={rfq.status === "Open" ? "success" : "default"}
                                    size="small"
                                />
                            </td>

                            <td>
                                <Button
                                    size="small"
                                    variant="contained"
                                >
                                    {rfq.status === "Open" ? "Submit Quote" : "View"}
                                </Button>
                            </td>

                        </tr>

                    ))}

                    </tbody>

                </table>

            </Box>

        </Paper>
    );
};

export default RFQTable;