// components/DiscountPage.jsx
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import React, { useEffect, useState } from "react";
import * as discountService from "./../../service/DiscountService";
import * as productService from "./../../service/ProductService1";


function DiscountPage() {
    const [discounts, setDiscounts] = useState([]);
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const [form, setForm] = useState({
        productId: "",
        discountPrice: "",
        startDate: "",
        endDate: "",
        description: "",
    });

    useEffect(() => {
        fetchDiscounts();
        fetchProducts();
    }, []);

    const fetchDiscounts = async () => {
        const data = await discountService.getDiscounts();
        setDiscounts(data);
    };

    const fetchProducts = async () => {
        const data = await productService.getProducts();
        setProducts(data);
    };

    const handleCreate = async () => {
        const product = products.find((p) => p.id === Number(form.productId));
        const payload = {
            ...form,
            product,
            discountPrice: parseFloat(form.discountPrice),
            isActive: true,
        };
        await discountService.createDiscount(payload);
        fetchDiscounts();
        setOpen(false);
        setForm({
            productId: "",
            discountPrice: "",
            startDate: "",
            endDate: "",
            description: "",
        });
        setSnackbarOpen(true);
    };

    return (
        <Grid container justifyContent="center" style={{ color: "white", minHeight: "100vh" }}>
            <Grid item xs={9} style={{ padding: "0 12px" }}>
                <Grid container spacing={1.5}>
                    <Grid item xs={12}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "16px 0" }}>
                            <h2 style={{ color: "white" }}>Discounts</h2>
                            <Button
                                variant="outlined"
                                onClick={() => setOpen(true)}
                                sx={{ color: "white", borderColor: "white", height: 40 }}
                            >
                                Create Discount
                            </Button>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ color: "white" }}>Product</TableCell>
                                    <TableCell style={{ color: "white" }}>Price</TableCell>
                                    <TableCell style={{ color: "white" }}>Start</TableCell>
                                    <TableCell style={{ color: "white" }}>End</TableCell>
                                    <TableCell style={{ color: "white" }}>Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {discounts.map((d) => (
                                    <TableRow key={d.id}>
                                        <TableCell style={{ color: "white" }}>{d.product?.name || "-"}</TableCell>
                                        <TableCell style={{ color: "white" }}>{d.discountPrice}</TableCell>
                                        <TableCell style={{ color: "white" }}>{d.startDate}</TableCell>
                                        <TableCell style={{ color: "white" }}>{d.endDate}</TableCell>
                                        <TableCell style={{ color: "white" }}>{d.description}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Grid>

                    <Grid item xs={12}>
                        <Dialog
                            open={open}
                            onClose={() => setOpen(false)}
                            PaperProps={{
                                sx: {
                                    backgroundColor: "black",
                                    color: "white",
                                },
                            }}
                        >
                            <DialogTitle>
                                Create Discount
                                <Button
                                    onClick={() => setOpen(false)}
                                    sx={{ position: "absolute", right: 8, top: 8, color: "white" }}
                                >
                                    X
                                </Button>
                            </DialogTitle>
                            <DialogContent>
                                <TextField
                                    select
                                    label="Product"
                                    fullWidth
                                    margin="dense"
                                    value={form.productId}
                                    onChange={(e) => setForm({ ...form, productId: e.target.value })}
                                    InputProps={{
                                        style: { color: "white", border: "1px solid white", borderRadius: "4px" }, // Add border
                                    }}
                                    InputLabelProps={{
                                        style: { color: "white" },
                                    }}
                                >
                                    {products.map((p) => (
                                        <MenuItem key={p.id} value={p.id} sx={{ backgroundColor: "black", color: "white" }}>
                                            {p.name}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    label="Discount Price"
                                    fullWidth
                                    margin="dense"
                                    type="number"
                                    value={form.discountPrice}
                                    onChange={(e) => setForm({ ...form, discountPrice: e.target.value })}
                                    InputProps={{
                                        style: { color: "white", border: "1px solid white", borderRadius: "4px" }, // Add border
                                    }}
                                    InputLabelProps={{
                                        style: { color: "white" },
                                    }}
                                />

                                <TextField
                                    label="Start Date"
                                    type="date"
                                    fullWidth
                                    margin="dense"
                                    InputLabelProps={{ shrink: true, style: { color: "white" } }}
                                    value={form.startDate}
                                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                                    InputProps={{
                                        style: { color: "white", border: "1px solid white", borderRadius: "4px" }, // Add border
                                    }}
                                />

                                <TextField
                                    label="End Date"
                                    type="date"
                                    fullWidth
                                    margin="dense"
                                    InputLabelProps={{ shrink: true, style: { color: "white" } }}
                                    value={form.endDate}
                                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                                    InputProps={{
                                        style: { color: "white", border: "1px solid white", borderRadius: "4px" }, // Add border
                                    }}
                                />

                                <TextField
                                    label="Description"
                                    fullWidth
                                    margin="dense"
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    InputProps={{
                                        style: { color: "white", border: "1px solid white", borderRadius: "4px" }, // Add border
                                    }}
                                    InputLabelProps={{
                                        style: { color: "white" },
                                    }}
                                />

                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={handleCreate}
                                    sx={{ mt: 2 }}
                                >
                                    Save
                                </Button>
                            </DialogContent>
                        </Dialog>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default DiscountPage;
