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
    const [form, setForm] = useState({
        name: "",
        sku: "",
        description: "",
        images: [],
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const res = await productService.getProducts();
        setProducts(res || []);
        console.log("Products fetched:", res.data);
    };

    const handleCreate = async () => {
        try {
            await productService.createProduct(form);
            fetchProducts();
            setOpen(false);
            setForm({
                name: "",
                sku: "",
                description: "",
                images: [],
            });
        } catch (error) {
            console.error("Product creation failed:", error);
            alert("Failed to create product.");
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <h2 style={{ color: "white" }}>Products</h2>
                <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                    Create Product
                </Button>
            </Stack>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ color: "white" }}>Name</TableCell>
                        <TableCell style={{ color: "white" }}>SKU</TableCell>
                        <TableCell style={{ color: "white" }}>Description</TableCell>
                        <TableCell style={{ color: "white" }}>Operations</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products && products.length > 0 ? (
                        products.map((prod) => (
                            <TableRow key={prod.id}>
                                <TableCell style={{ color: "white" }}>{prod.name}</TableCell>
                                <TableCell style={{ color: "white" }}>{prod.sku}</TableCell>
                                <TableCell style={{ color: "white" }}>{prod.description}</TableCell>
                                <TableCell style={{ color: "white" }}>
                                    {/* Add edit/delete buttons here if needed */}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} align="center" style={{ color: "white" }}>
                                No products available
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle style={{ color: "white" }}>Create Product</DialogTitle>
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

                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) =>
                            setForm({ ...form, images: Array.from(e.target.files) })
                        }
                        style={{ marginTop: 16 }}
                    />

                    {form.images.length > 0 && (
                        <div style={{ marginTop: 10 }}>
                            <p style={{ color: "white" }}>Preview:</p>
                            <Stack direction="row" spacing={2}>
                                {form.images.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={URL.createObjectURL(img)}
                                        alt="preview"
                                        style={{
                                            width: 60,
                                            height: 60,
                                            objectFit: "cover",
                                            borderRadius: 4,
                                        }}
                                        onLoad={(e) =>
                                            URL.revokeObjectURL(e.target.src)
                                        }
                                    />
                                ))}
                            </Stack>
                        </div>
                    )}

                    <Button
                        variant="contained"
                        onClick={handleCreate}
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Save
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ProductManagementPage;
