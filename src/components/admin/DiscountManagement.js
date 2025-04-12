// components/DiscountPage.jsx
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    MenuItem,
    Snackbar,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import * as discountService from "../services/discountService";
import * as productService from "../services/productService";

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
        <div style={{ padding: 20 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <h2>Discounts</h2>
                <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                    Create Discount
                </Button>
            </Stack>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Start</TableCell>
                        <TableCell>End</TableCell>
                        <TableCell>Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {discounts.map((d) => (
                        <TableRow key={d.id}>
                            <TableCell>{d.product?.name || "-"}</TableCell>
                            <TableCell>{d.discountPrice}</TableCell>
                            <TableCell>{d.startDate}</TableCell>
                            <TableCell>{d.endDate}</TableCell>
                            <TableCell>{d.description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Create Discount</DialogTitle>
                <DialogContent>
                    <TextField
                        select
                        label="Product"
                        fullWidth
                        margin="dense"
                        value={form.productId}
                        onChange={(e) => setForm({ ...form, productId: e.target.value })}
                    >
                        {products.map((p) => (
                            <MenuItem key={p.id} value={p.id}>
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
                    />

                    <TextField
                        label="Start Date"
                        type="date"
                        fullWidth
                        margin="dense"
                        InputLabelProps={{ shrink: true }}
                        value={form.startDate}
                        onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    />

                    <TextField
                        label="End Date"
                        type="date"
                        fullWidth
                        margin="dense"
                        InputLabelProps={{ shrink: true }}
                        value={form.endDate}
                        onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    />

                    <TextField
                        label="Description"
                        fullWidth
                        margin="dense"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />

                    <Button variant="contained" fullWidth onClick={handleCreate} sx={{ mt: 2 }}>
                        Save
                    </Button>
                </DialogContent>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message="Discount created!"
            />
        </div>
    );
}

export default DiscountPage;
