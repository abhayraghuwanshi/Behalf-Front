import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
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
import { useCountry } from "../navbar/CountryProvider";

const BASE_URL = "http://localhost:8080/api";

export default function InventoryManagement() {
    const [stores, setStores] = useState([]);
    const [products, setProducts] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [selectedStore, setSelectedStore] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { selectedCountry } = useCountry();

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
            const data = await AdminService.fetchStores(selectedCountry);
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
        <Grid container justifyContent="center" style={{ color: "white", minHeight: "100vh" }}>
            <Grid item xs={9} style={{ padding: "0 12px" }}>
                <Grid container spacing={1.5}>
                    <Grid item xs={12}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "16px 0" }}>
                            <Typography variant="h6" sx={{ color: "white" }}>
                                Inventory Management
                            </Typography>
                            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                <Button variant="outlined" onClick={() => setIsDialogOpen(true)} sx={{ color: "white", borderColor: "white", height: 40 }}>
                                    Add Inventory Item
                                </Button>
                                <Select
                                    value={selectedStore}
                                    onChange={(e) => setSelectedStore(e.target.value)}
                                    sx={{
                                        backgroundColor: "black",
                                        color: "white",
                                        minWidth: 200,
                                        height: 40,
                                        border: "1px solid white", // Add border
                                        borderRadius: "4px",
                                    }}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                backgroundColor: "black",
                                                color: "white",
                                            },
                                        },
                                    }}
                                >
                                    {stores.map((store) => (
                                        <MenuItem key={store.id} value={store.id.toString()} sx={{ backgroundColor: "black", color: "white" }}>
                                            {store.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
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
                    </Grid>

                    <Grid item xs={12}>
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
                                            <TableCell style={{ color: "white" }}>{item.price}</TableCell>
                                            <TableCell style={{ color: "white" }}>{item.reorderLevel}</TableCell>
                                            <TableCell style={{ color: "white" }}>{item.reorderQuantity}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
