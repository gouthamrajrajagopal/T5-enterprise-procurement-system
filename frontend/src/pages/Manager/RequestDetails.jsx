import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    Box,
    Button,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Alert,
    Divider,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";

import ManagerLayout from "../../layouts/ManagerLayout";
import StatusBadge from "../../components/employee/StatusBadge";

import {
    approveRequest,
    rejectRequest,
} from "../../api/managerApi";

import {
    getPurchaseRequestById,
} from "../../api/purchaseRequestApi";

function RequestDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [request, setRequest] = useState(null);

    const [loading, setLoading] = useState(true);

    const [remarks, setRemarks] = useState("");

    const [rejectDialog, setRejectDialog] =
        useState(false);

    useEffect(() => {

        loadRequest();

    }, []);

    const loadRequest = async () => {

        try {

            const data =
                await getPurchaseRequestById(id);

            setRequest(data);

        } finally {

            setLoading(false);

        }

    };

    const handleApprove = async () => {

        await approveRequest(

            id,

            Number(localStorage.getItem("userId")),

            "Approved"

        );

        alert("Purchase Request Approved");

        navigate("/manager/pending");

    };

    const handleReject = async () => {

        await rejectRequest(

            id,

            Number(localStorage.getItem("userId")),

            remarks

        );

        alert("Purchase Request Rejected");

        navigate("/manager/pending");

    };

    if (loading) {

        return (

            <ManagerLayout>

                <CircularProgress />

            </ManagerLayout>

        );

    }

    if (!request) {

        return (

            <ManagerLayout>

                <Alert severity="error">

                    Request Not Found

                </Alert>

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
                Purchase Request Details
            </Typography>

            <Card>

                <CardContent>

                    <Typography>
                        <b>PR Number :</b>{" "}
                        {request.requestNumber}
                    </Typography>

                    <Typography>
                        <b>Employee :</b>{" "}
                        {request.user?.name}
                    </Typography>

                    <Typography>
                        <b>Department :</b>{" "}
                        {request.department?.deptName}
                    </Typography>

                    <Typography>
                        <b>Purpose :</b>{" "}
                        {request.purpose}
                    </Typography>

                    <Typography>
                        <b>Total Amount :</b> ₹
                        {request.totalAmount}
                    </Typography>

                    <Box
    display="flex"
    alignItems="center"
    gap={1}
    mt={1}
>
    <Typography fontWeight={700}>
        Status:
    </Typography>

    <StatusBadge status={request.status} />
</Box>

                    <Divider sx={{ my:3 }}/>

                    <Typography
                        variant="h6"
                        mb={2}
                    >
                        Items
                    </Typography>

                    {

                        request.items?.map(item => (

                            <Box
                                key={item.itemId}
                                mb={2}
                            >

                                <Typography>

                                    <b>

                                        {item.itemName}

                                    </b>

                                </Typography>

                                <Typography>

                                    Qty :
                                    {item.quantity}

                                </Typography>

                                <Typography>

                                    Price :
                                    ₹{item.estimatedPrice}

                                </Typography>

                            </Box>

                        ))

                    }

                    <Divider sx={{my:3}}/>

                    <Button

                        variant="contained"

                        color="success"

                        onClick={handleApprove}

                        sx={{mr:2}}

                    >

                        Approve

                    </Button>

                    <Button

                        variant="contained"

                        color="error"

                        onClick={()=>
                            setRejectDialog(true)
                        }

                    >

                        Reject

                    </Button>

                </CardContent>

            </Card>

            <Dialog

                open={rejectDialog}

                onClose={()=>
                    setRejectDialog(false)
                }

            >

                <DialogTitle>

                    Reject Purchase Request

                </DialogTitle>

                <DialogContent>

                    <TextField

                        fullWidth

                        multiline

                        rows={4}

                        label="Remarks"

                        value={remarks}

                        onChange={(e)=>

                            setRemarks(e.target.value)

                        }

                    />

                </DialogContent>

                <DialogActions>

                    <Button

                        onClick={()=>
                            setRejectDialog(false)
                        }

                    >

                        Cancel

                    </Button>

                    <Button

                        color="error"

                        onClick={handleReject}

                    >

                        Reject

                    </Button>

                </DialogActions>

            </Dialog>

        </ManagerLayout>

    );

}

export default RequestDetails;