import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";  
import api from "../../api/axiosConfig";

const emptyItem = {
    categoryId: "",
    itemName: "",
    itemDescription: "",
    quantity: 1,
    estimatedPrice: "",
};

function RaiseRequisition() {
    const navigate = useNavigate();

    const [departments, setDepartments] = useState([]);
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        departmentId: "",
        purpose: "",
        items: [{ ...emptyItem }],
    });

    const [loadingData, setLoadingData] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [message, setMessage] = useState({
        open: false,
        type: "success",
        text: "",
    });

    useEffect(() => {
        loadReferenceData();
    }, []);

    const loadReferenceData = async () => {
        setLoadingData(true);

        try {
            const [departmentResponse, categoryResponse] =
                await Promise.all([
                    api.get("/departments"),
                    api.get("/categories"),
                ]);

            setDepartments(
                Array.isArray(departmentResponse.data)
                    ? departmentResponse.data
                    : []
            );

            setCategories(
                Array.isArray(categoryResponse.data)
                    ? categoryResponse.data
                    : []
            );
        } catch (error) {
            setMessage({
                open: true,
                type: "error",
                text:
                    error.response?.data?.message ||
                    "Unable to load departments and categories",
            });
        } finally {
            setLoadingData(false);
        }
    };

    const handleMainFieldChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleItemChange = (index, event) => {
        const { name, value } = event.target;

        setFormData((previous) => {
            const updatedItems = [...previous.items];

            updatedItems[index] = {
                ...updatedItems[index],
                [name]: value,
            };

            return {
                ...previous,
                items: updatedItems,
            };
        });
    };

    const addItem = () => {
        setFormData((previous) => ({
            ...previous,
            items: [...previous.items, { ...emptyItem }],
        }));
    };

    const removeItem = (index) => {
        if (formData.items.length === 1) {
            setMessage({
                open: true,
                type: "warning",
                text: "At least one item is required",
            });
            return;
        }

        setFormData((previous) => ({
            ...previous,
            items: previous.items.filter(
                (_, itemIndex) => itemIndex !== index
            ),
        }));
    };

    const totalAmount = useMemo(() => {
        return formData.items.reduce((total, item) => {
            const quantity = Number(item.quantity) || 0;
            const price = Number(item.estimatedPrice) || 0;

            return total + quantity * price;
        }, 0);
    }, [formData.items]);

    const approvalFlow = useMemo(() => {
        if (totalAmount <= 50000) {
            return "Manager Approval";
        }

        if (totalAmount <= 200000) {
            return "Manager → Finance";
        }

        return "Manager → Finance → Procurement Head";
    }, [totalAmount]);

    const validateForm = () => {
        if (!formData.departmentId) {
            return "Please select a department";
        }

        if (
            !formData.purpose ||
            formData.purpose.trim().length < 5
        ) {
            return "Purpose must contain at least 5 characters";
        }

        for (let index = 0; index < formData.items.length; index++) {
            const item = formData.items[index];

            if (!item.categoryId) {
                return `Please select a category for item ${
                    index + 1
                }`;
            }

            if (!item.itemName.trim()) {
                return `Item name is required for item ${
                    index + 1
                }`;
            }

            if (Number(item.quantity) < 1) {
                return `Quantity must be at least 1 for item ${
                    index + 1
                }`;
            }

            if (Number(item.estimatedPrice) <= 0) {
                return `Estimated price must be greater than zero for item ${
                    index + 1
                }`;
            }
        }

        return null;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationError = validateForm();

        if (validationError) {
            setMessage({
                open: true,
                type: "error",
                text: validationError,
            });
            return;
        }

        const userId = Number(
            localStorage.getItem("userId")
        );

        if (!userId) {
            setMessage({
                open: true,
                type: "error",
                text: "Logged-in user information is missing",
            });
            return;
        }

        const requestBody = {
            userId,
            departmentId: Number(
                formData.departmentId
            ),
            purpose: formData.purpose.trim(),
            items: formData.items.map((item) => ({
                categoryId: Number(item.categoryId),
                itemName: item.itemName.trim(),
                itemDescription:
                    item.itemDescription.trim(),
                quantity: Number(item.quantity),
                estimatedPrice: Number(
                    item.estimatedPrice
                ),
            })),
        };

        setSubmitting(true);

        try {
            await api.post(
                "/purchase-requests",
                requestBody
            );

            setMessage({
                open: true,
                type: "success",
                text:
                    "Purchase request created successfully",
            });

            setTimeout(() => {
                navigate("/employee/my-requests");
            }, 1200);
        } catch (error) {
            setMessage({
                open: true,
                type: "error",
                text:
                    error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Unable to create purchase request",
            });
        } finally {
            setSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({
            departmentId: "",
            purpose: "",
            items: [{ ...emptyItem }],
        });
    };

    if (loadingData) {
        return (
            <Box
                minHeight="70vh"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                p: {
                    xs: 2,
                    md: 4,
                },
                background:
                    "radial-gradient(circle at top right, rgba(99,102,241,0.14), transparent 35%), var(--bg-primary)",
            }}
        >
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                flexWrap="wrap"
                gap={2}
                mb={4}
            >
                <Box>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() =>
                            navigate(
                                "/employee/dashboard"
                            )
                        }
                        sx={{ mb: 1 }}
                    >
                        Back to Dashboard
                    </Button>

                    <Typography
                        variant="h4"
                        fontWeight={800}
                    >
                        Raise Purchase Requisition
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        mt={0.5}
                    >
                        Add one or more required items and
                        submit them for approval.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        px: 2.5,
                        py: 1.5,
                        borderRadius: 3,
                        background:
                            "linear-gradient(135deg, rgba(99,102,241,0.20), rgba(168,85,247,0.16))",
                        border:
                            "1px solid rgba(139,92,246,0.25)",
                    }}
                >
                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        Workflow preview
                    </Typography>

                    <Typography
                        variant="body2"
                        fontWeight={700}
                    >
                        {approvalFlow}
                    </Typography>
                </Box>
            </Box>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, lg: 8 }}>
                        <Card
                            sx={{
                                borderRadius: 4,
                                border:
                                    "1px solid rgba(148,163,184,0.14)",
                                background:
                                    "rgba(15,23,42,0.72)",
                                backdropFilter:
                                    "blur(18px)",
                            }}
                        >
                            <CardContent
                                sx={{
                                    p: {
                                        xs: 2.5,
                                        md: 4,
                                    },
                                }}
                            >
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap={1.5}
                                    mb={3}
                                >
                                    <ShoppingCartIcon
                                        color="primary"
                                    />

                                    <Typography
                                        variant="h6"
                                        fontWeight={750}
                                    >
                                        Request Information
                                    </Typography>
                                </Box>

                                <Grid
                                    container
                                    spacing={2.5}
                                >
                                    <Grid
                                        size={{
                                            xs: 12,
                                            md: 5,
                                        }}
                                    >
                                        <FormControl
                                            fullWidth
                                            required
                                        >
                                            <InputLabel>
                                                Department
                                            </InputLabel>

                                            <Select
                                                label="Department"
                                                name="departmentId"
                                                value={
                                                    formData.departmentId
                                                }
                                                onChange={
                                                    handleMainFieldChange
                                                }
                                            >
                                                {departments.map(
                                                    (
                                                        department
                                                    ) => (
                                                        <MenuItem
                                                            key={
                                                                department.departmentId ??
                                                                department.deptId
                                                            }
                                                            value={
                                                                department.departmentId ??
                                                                department.deptId
                                                            }
                                                        >
                                                            {department.departmentName ??
                                                                department.deptName ??
                                                                department.name}
                                                        </MenuItem>
                                                    )
                                                )}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid
                                        size={{
                                            xs: 12,
                                            md: 7,
                                        }}
                                    >
                                        <TextField
                                            fullWidth
                                            required
                                            label="Purpose"
                                            name="purpose"
                                            value={
                                                formData.purpose
                                            }
                                            onChange={
                                                handleMainFieldChange
                                            }
                                            inputProps={{
                                                maxLength: 255,
                                            }}
                                            helperText={`${formData.purpose.length}/255 characters`}
                                        />
                                    </Grid>
                                </Grid>

                                <Divider sx={{ my: 4 }} />

                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    mb={2.5}
                                >
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            fontWeight={750}
                                        >
                                            Requested Items
                                        </Typography>

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Add all items required
                                            in this requisition.
                                        </Typography>
                                    </Box>

                                    <Button
                                        startIcon={
                                            <AddIcon />
                                        }
                                        onClick={addItem}
                                        variant="outlined"
                                    >
                                        Add Item
                                    </Button>
                                </Box>

                                {formData.items.map(
                                    (item, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                p: {
                                                    xs: 2,
                                                    md: 3,
                                                },
                                                mb: 2.5,
                                                borderRadius: 3,
                                                border:
                                                    "1px solid rgba(148,163,184,0.16)",
                                                background:
                                                    "rgba(30,41,59,0.46)",
                                            }}
                                        >
                                            <Box
                                                display="flex"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                mb={2.5}
                                            >
                                                <Typography
                                                    fontWeight={
                                                        700
                                                    }
                                                >
                                                    Item{" "}
                                                    {index +
                                                        1}
                                                </Typography>

                                                <IconButton
                                                    color="error"
                                                    onClick={() =>
                                                        removeItem(
                                                            index
                                                        )
                                                    }
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>

                                            <Grid
                                                container
                                                spacing={2}
                                            >
                                                <Grid
                                                    size={{
                                                        xs: 12,
                                                        md: 4,
                                                    }}
                                                >
                                                    <FormControl
                                                        fullWidth
                                                        required
                                                    >
                                                        <InputLabel>
                                                            Category
                                                        </InputLabel>

                                                        <Select
                                                            label="Category"
                                                            name="categoryId"
                                                            value={
                                                                item.categoryId
                                                            }
                                                            onChange={(
                                                                event
                                                            ) =>
                                                                handleItemChange(
                                                                    index,
                                                                    event
                                                                )
                                                            }
                                                        >
                                                            {categories.map(
                                                                (
                                                                    category
                                                                ) => (
                                                                    <MenuItem
                                                                        key={
                                                                            category.categoryId
                                                                        }
                                                                        value={
                                                                            category.categoryId
                                                                        }
                                                                    >
                                                                        {category.categoryName ??
                                                                            category.name}
                                                                    </MenuItem>
                                                                )
                                                            )}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>

                                                <Grid
                                                    size={{
                                                        xs: 12,
                                                        md: 8,
                                                    }}
                                                >
                                                    <TextField
                                                        fullWidth
                                                        required
                                                        label="Item Name"
                                                        name="itemName"
                                                        value={
                                                            item.itemName
                                                        }
                                                        onChange={(
                                                            event
                                                        ) =>
                                                            handleItemChange(
                                                                index,
                                                                event
                                                            )
                                                        }
                                                    />
                                                </Grid>

                                                <Grid
                                                    size={{
                                                        xs: 12,
                                                    }}
                                                >
                                                    <TextField
                                                        fullWidth
                                                        multiline
                                                        minRows={
                                                            2
                                                        }
                                                        label="Item Description"
                                                        name="itemDescription"
                                                        value={
                                                            item.itemDescription
                                                        }
                                                        onChange={(
                                                            event
                                                        ) =>
                                                            handleItemChange(
                                                                index,
                                                                event
                                                            )
                                                        }
                                                    />
                                                </Grid>

                                                <Grid
                                                    size={{
                                                        xs: 12,
                                                        md: 4,
                                                    }}
                                                >
                                                    <TextField
                                                        fullWidth
                                                        required
                                                        type="number"
                                                        label="Quantity"
                                                        name="quantity"
                                                        value={
                                                            item.quantity
                                                        }
                                                        onChange={(
                                                            event
                                                        ) =>
                                                            handleItemChange(
                                                                index,
                                                                event
                                                            )
                                                        }
                                                        inputProps={{
                                                            min: 1,
                                                        }}
                                                    />
                                                </Grid>

                                                <Grid
                                                    size={{
                                                        xs: 12,
                                                        md: 4,
                                                    }}
                                                >
                                                    <TextField
                                                        fullWidth
                                                        required
                                                        type="number"
                                                        label="Estimated Price"
                                                        name="estimatedPrice"
                                                        value={
                                                            item.estimatedPrice
                                                        }
                                                        onChange={(
                                                            event
                                                        ) =>
                                                            handleItemChange(
                                                                index,
                                                                event
                                                            )
                                                        }
                                                        inputProps={{
                                                            min: 0.01,
                                                            step: 0.01,
                                                        }}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <CurrencyRupeeIcon fontSize="small" />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </Grid>

                                                <Grid
                                                    size={{
                                                        xs: 12,
                                                        md: 4,
                                                    }}
                                                >
                                                    <TextField
                                                        fullWidth
                                                        disabled
                                                        label="Item Total"
                                                        value={(
                                                            (Number(
                                                                item.quantity
                                                            ) ||
                                                                0) *
                                                            (Number(
                                                                item.estimatedPrice
                                                            ) ||
                                                                0)
                                                        ).toLocaleString(
                                                            "en-IN",
                                                            {
                                                                style: "currency",
                                                                currency:
                                                                    "INR",
                                                            }
                                                        )}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    )
                                )}
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 12, lg: 4 }}>
                        <Card
                            sx={{
                                position: {
                                    lg: "sticky",
                                },
                                top: {
                                    lg: 24,
                                },
                                borderRadius: 4,
                                border:
                                    "1px solid rgba(139,92,246,0.25)",
                                background:
                                    "linear-gradient(160deg, rgba(30,41,59,0.95), rgba(15,23,42,0.90))",
                            }}
                        >
                            <CardContent sx={{ p: 3 }}>
                                <Typography
                                    variant="h6"
                                    fontWeight={750}
                                >
                                    Request Summary
                                </Typography>

                                <Divider sx={{ my: 2.5 }} />

                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    mb={2}
                                >
                                    <Typography
                                        color="text.secondary"
                                    >
                                        Total Items
                                    </Typography>

                                    <Typography fontWeight={700}>
                                        {
                                            formData.items
                                                .length
                                        }
                                    </Typography>
                                </Box>

                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    mb={2}
                                >
                                    <Typography
                                        color="text.secondary"
                                    >
                                        Total Quantity
                                    </Typography>

                                    <Typography fontWeight={700}>
                                        {formData.items.reduce(
                                            (
                                                total,
                                                item
                                            ) =>
                                                total +
                                                (Number(
                                                    item.quantity
                                                ) ||
                                                    0),
                                            0
                                        )}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        mt: 3,
                                        p: 2.5,
                                        borderRadius: 3,
                                        background:
                                            "linear-gradient(135deg, rgba(99,102,241,0.22), rgba(168,85,247,0.16))",
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        Estimated Total
                                    </Typography>

                                    <Typography
                                        variant="h4"
                                        fontWeight={850}
                                        mt={0.5}
                                    >
                                        {totalAmount.toLocaleString(
                                            "en-IN",
                                            {
                                                style: "currency",
                                                currency:
                                                    "INR",
                                                maximumFractionDigits: 2,
                                            }
                                        )}
                                    </Typography>
                                </Box>

                                <Box
                                    mt={3}
                                    p={2}
                                    borderRadius={2.5}
                                    sx={{
                                        border:
                                            "1px dashed rgba(148,163,184,0.28)",
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        Approval Route
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        fontWeight={700}
                                        mt={0.5}
                                    >
                                        {approvalFlow}
                                    </Typography>
                                </Box>

                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    disabled={submitting}
                                    endIcon={
                                        submitting ? null : (
                                            <SendIcon />
                                        )
                                    }
                                    sx={{
                                        mt: 3,
                                        py: 1.4,
                                        fontWeight: 750,
                                        background:
                                            "linear-gradient(135deg, #6366f1, #9333ea)",
                                    }}
                                >
                                    {submitting ? (
                                        <CircularProgress
                                            size={24}
                                            color="inherit"
                                        />
                                    ) : (
                                        "Submit Requisition"
                                    )}
                                </Button>

                                <Button
                                    fullWidth
                                    type="button"
                                    variant="text"
                                    startIcon={
                                        <RestartAltIcon />
                                    }
                                    onClick={resetForm}
                                    disabled={submitting}
                                    sx={{ mt: 1.5 }}
                                >
                                    Reset Form
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </form>

            <Snackbar
                open={message.open}
                autoHideDuration={4500}
                onClose={() =>
                    setMessage((previous) => ({
                        ...previous,
                        open: false,
                    }))
                }
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Alert
                    severity={message.type}
                    variant="filled"
                    onClose={() =>
                        setMessage((previous) => ({
                            ...previous,
                            open: false,
                        }))
                    }
                >
                    {message.text}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default RaiseRequisition ;