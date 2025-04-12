// components/ProductPage.jsx
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import * as productService from "../../service/ProductService1";

function ProductManagementPage() {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ name: "", sku: "", description: "" });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const res = await productService.getProducts();
        setProducts(res.data);
    };

    const handleCreate = async () => {
        await productService.createProduct(form);
        fetchProducts();
        setOpen(false);
    };

    return (
        <div style={{ padding: 20 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <h2>Products</h2>
                <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                    Create Product
                </Button>
            </Stack>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>SKU</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Operations</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((prod) => (
                        <TableRow key={prod.id}>
                            <TableCell>{prod.name}</TableCell>
                            <TableCell>{prod.sku}</TableCell>
                            <TableCell>{prod.description}</TableCell>
                            <TableCell>
                                {/* You can add edit/delete buttons here */}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Create Product</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Name"
                        fullWidth
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="SKU"
                        fullWidth
                        value={form.sku}
                        onChange={(e) => setForm({ ...form, sku: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                    <Button variant="contained" onClick={handleCreate} fullWidth sx={{ mt: 2 }}>
                        Save
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ProductManagementPage;
