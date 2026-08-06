import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

const steps = [
    {
        title: "RFQ Published",
        desc: "New RFQ available",
        status: "completed",
    },
    {
        title: "Quotation",
        desc: "Quotation submitted",
        status: "completed",
    },
    {
        title: "Evaluation",
        desc: "Under review",
        status: "current",
    },
    {
        title: "Purchase Order",
        desc: "Waiting for approval",
        status: "pending",
    },
    {
        title: "Delivery",
        desc: "Pending",
        status: "pending",
    },
];

const ProcurementPipeline = () => {
    return (
        <Paper className="premium-panel pipeline-card">

            <Box className="panel-header">
                <Typography variant="h6" fontWeight={700}>
                    Procurement Pipeline
                </Typography>
            </Box>

            <Box className="pipeline-steps">

                {steps.map((step, index) => (
                    <React.Fragment key={index}>

                        <Box className={`step-item step-${step.status}`}>

                            <Box className="step-number">
                                {step.status === "completed" ? (
                                    <CheckCircleIcon fontSize="small" />
                                ) : (
                                    <RadioButtonUncheckedIcon fontSize="small" />
                                )}
                            </Box>

                            <Box className="step-content">
                                <Typography variant="subtitle2">
                                    {step.title}
                                </Typography>

                                <Typography variant="caption">
                                    {step.desc}
                                </Typography>
                            </Box>

                        </Box>


                        {index !== steps.length - 1 && (
                            <Box
                                className={`step-line ${
                                    step.status !== "pending" ? "active" : ""
                                }`}
                            />
                        )}

                    </React.Fragment>
                ))}

            </Box>

        </Paper>
    );
};

export default ProcurementPipeline;