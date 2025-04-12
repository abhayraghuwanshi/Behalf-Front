import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminService from "../../service/AdminService";
import * as ProductService from "../../service/ProductService1";

const BASE_URL = "http://localhost:8080/api";

export default function InventoryManagement() {
    const [stores, setStores] = useState([]);
    const [products, setProducts] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [selectedStore, setSelectedStore] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [form, setForm] = useState({
        storeId: "",
        productId: "",
        quantity: "",
        price: "",
        locationWithinStore: "",
        reorderLevel: "",
        reorderQuantity: "",
    });

    useEffect(() => {
        const initStores = async () => {
            const data = await AdminService.fetchStores();
            setStores(data || []);
            if (data?.length) {
                setSelectedStore(data[0].id.toString());
            }
        };
        initStores();
        fetchProducts();
    }, []);

    useEffect(() => {
        if (selectedStore) {
            fetchInventory(selectedStore);
        }
    }, [selectedStore]);

    const fetchProducts = async () => {
        const data = await ProductService.getProducts();
        setProducts(data || []);
    };

    const fetchInventory = async (storeId) => {
        try {
            const res = await axios.get(`${BASE_URL}/inventory/store/${storeId}`, {
                withCredentials: true,
                headers: {
                    "Accept": "application/json",
                },
            });
            setInventory(res.data || []);
        } catch (err) {
            console.error("Failed to fetch inventory:", err);
        }
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setForm({
            storeId: "",
            productId: "",
            quantity: "",
            price: "",
            locationWithinStore: "",
            reorderLevel: "",
            reorderQuantity: "",
        });
    };

    const handleAddInventory = async () => {
        try {
            const payload = {
                store: stores.find((s) => s.id.toString() === form.storeId),
                product: products.find((p) => p.id.toString() === form.productId),
                quantity: Number(form.quantity),
                price: Number(form.price),
                locationWithinStore: form.locationWithinStore,
                reorderLevel: Number(form.reorderLevel),
                reorderQuantity: Number(form.reorderQuantity),
            };

            await AdminService.addInventoryItem(payload);

            handleDialogClose();
            fetchInventory(selectedStore);
        } catch (err) {
            console.error("Failed to add inventory item:", err);
            alert("Error while adding inventory item.");
        }
    };

    return (
        <div style={{ backgroundColor: "black", color: "white", minHeight: "100vh", padding: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "16px 0" }}>
                <Typography variant="h6" sx={{ color: "white" }}>
                    Inventory Management
                </Typography>
                <Select
                    value={selectedStore}
                    onChange={(e) => setSelectedStore(e.target.value)}
                    sx={{ backgroundColor: "#fff", minWidth: 200 }}
                >
                    {stores.map((store) => (
                        <MenuItem key={store.id} value={store.id.toString()}>
                            {store.name}
                        </MenuItem>
                    ))}
                </Select>
                <Button variant="outlined" onClick={() => setIsDialogOpen(true)} sx={{ color: "white", borderColor: "white" }}>
                    Add Inventory Item
                </Button>
            </div>

            <Dialog open={isDialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
                <DialogTitle>Add Inventory Item</DialogTitle>
                <DialogContent>
                    <Select
                        fullWidth
                        value={form.storeId}
                        onChange={(e) => setForm({ ...form, storeId: e.target.value })}
                        displayEmpty
                        sx={{ mb: 2 }}
                    >
                        <MenuItem value="" disabled>
                            Select Store
                        </MenuItem>
                        {stores.map((store) => (
                            <MenuItem key={store.id} value={store.id.toString()}>
                                {store.name}
                            </MenuItem>
                        ))}
                    </Select>

                    <Select
                        fullWidth
                        value={form.productId}
                        onChange={(e) => setForm({ ...form, productId: e.target.value })}
                        displayEmpty
                        sx={{ mb: 2 }}
                    >
                        <MenuItem value="" disabled>
                            Select Product
                        </MenuItem>
                        {products.map((prod) => (
                            <MenuItem key={prod.id} value={prod.id.toString()}>
                                {prod.name} ({prod.sku})
                            </MenuItem>
                        ))}
                    </Select>

                    <TextField
                        label="Quantity"
                        type="number"
                        fullWidth
                        value={form.quantity}
                        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Price"
                        type="number"
                        fullWidth
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Location in Store"
                        fullWidth
                        value={form.locationWithinStore}
                        onChange={(e) => setForm({ ...form, locationWithinStore: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Reorder Level"
                        type="number"
                        fullWidth
                        value={form.reorderLevel}
                        onChange={(e) => setForm({ ...form, reorderLevel: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Reorder Quantity"
                        type="number"
                        fullWidth
                        value={form.reorderQuantity}
                        onChange={(e) => setForm({ ...form, reorderQuantity: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} sx={{ color: "black" }}>
                        Cancel
                    </Button>
                    <Button onClick={handleAddInventory} variant="contained" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            <Paper style={{ padding: 16, backgroundColor: "#333" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: "white" }}>Product</TableCell>
                            <TableCell style={{ color: "white" }}>Quantity</TableCell>
                            <TableCell style={{ color: "white" }}>Price</TableCell>
                            <TableCell style={{ color: "white" }}>Reorder Level</TableCell>
                            <TableCell style={{ color: "white" }}>Reorder Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {inventory.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell style={{ color: "white" }}>{item.product?.name}</TableCell>
                                <TableCell style={{ color: "white" }}>{item.quantity}</TableCell>
                                <TableCell style={{ color: "white" }}>{item}</TableCell>
                                <TableCell style={{ color: "white" }}>{item.reorderLevel}</TableCell>
                                <TableCell style={{ color: "white" }}>{item.reorderQuantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}
