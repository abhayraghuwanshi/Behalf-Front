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
import { useEffect, useState } from "react";
import * as ProductService from "../../service/AdminProductService";
import AdminService from "../../service/AdminService";
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
        <Grid container justifyContent="center">
            <Grid item xs={12} md={10} lg={9}>
                <div style={{ padding: "16px", minHeight: "100vh" }}>
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
                                    border: "1px solid white",
                                    borderRadius: "4px",
                                    '.MuiSelect-icon': { color: 'white' }
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

                    <Dialog open={isDialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm"
                        PaperProps={{ style: { backgroundColor: "#111", color: "white" } }}>
                        <DialogTitle sx={{ color: "white" }}>Add Inventory Item</DialogTitle>
                        <DialogContent>
                            <Select
                                fullWidth
                                value={form.storeId}
                                onChange={(e) => setForm({ ...form, storeId: e.target.value })}
                                displayEmpty
                                sx={{ mb: 2, backgroundColor: '#222', color: 'white' }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            backgroundColor: "#222",
                                            color: "white",
                                        },
                                    },
                                }}
                            >
                                <MenuItem value="" disabled sx={{ color: 'white', backgroundColor: '#222' }}>
                                    Select Store
                                </MenuItem>
                                {stores.map((store) => (
                                    <MenuItem key={store.id} value={store.id.toString()} sx={{ color: 'white', backgroundColor: '#222' }}>
                                        {store.name}
                                    </MenuItem>
                                ))}
                            </Select>

                            <Select
                                fullWidth
                                value={form.productId}
                                onChange={(e) => setForm({ ...form, productId: e.target.value })}
                                displayEmpty
                                sx={{ mb: 2, backgroundColor: '#222', color: 'white' }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            backgroundColor: "#222",
                                            color: "white",
                                        },
                                    },
                                }}
                            >
                                <MenuItem value="" disabled sx={{ color: 'white', backgroundColor: '#222' }}>
                                    Select Product
                                </MenuItem>
                                {products.map((prod) => (
                                    <MenuItem key={prod.id} value={prod.id.toString()} sx={{ color: 'white', backgroundColor: '#222' }}>
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
                                InputProps={{ style: { color: "white", border: "1px solid white", borderRadius: "4px" } }}
                                InputLabelProps={{ style: { color: "white" } }}
                            />
                            <TextField
                                label="Price"
                                type="number"
                                fullWidth
                                value={form.price}
                                onChange={(e) => setForm({ ...form, price: e.target.value })}
                                sx={{ mb: 2 }}
                                InputProps={{ style: { color: "white", border: "1px solid white", borderRadius: "4px" } }}
                                InputLabelProps={{ style: { color: "white" } }}
                            />
                            <TextField
                                label="Location in Store"
                                fullWidth
                                value={form.locationWithinStore}
                                onChange={(e) => setForm({ ...form, locationWithinStore: e.target.value })}
                                sx={{ mb: 2 }}
                                InputProps={{ style: { color: "white", border: "1px solid white", borderRadius: "4px" } }}
                                InputLabelProps={{ style: { color: "white" } }}
                            />
                            <TextField
                                label="Reorder Level"
                                type="number"
                                fullWidth
                                value={form.reorderLevel}
                                onChange={(e) => setForm({ ...form, reorderLevel: e.target.value })}
                                sx={{ mb: 2 }}
                                InputProps={{ style: { color: "white", border: "1px solid white", borderRadius: "4px" } }}
                                InputLabelProps={{ style: { color: "white" } }}
                            />
                            <TextField
                                label="Reorder Quantity"
                                type="number"
                                fullWidth
                                value={form.reorderQuantity}
                                onChange={(e) => setForm({ ...form, reorderQuantity: e.target.value })}
                                sx={{ mb: 2 }}
                                InputProps={{ style: { color: "white", border: "1px solid white", borderRadius: "4px" } }}
                                InputLabelProps={{ style: { color: "white" } }}
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

                    <Paper style={{ padding: 16, backgroundColor: "#111" }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ color: "white" }}>Product</TableCell>
                                    <TableCell sx={{ color: "white" }}>Quantity</TableCell>
                                    <TableCell sx={{ color: "white" }}>Price</TableCell>
                                    <TableCell sx={{ color: "white" }}>Reorder Level</TableCell>
                                    <TableCell sx={{ color: "white" }}>Reorder Quantity</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {inventory.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell sx={{ color: "white" }}>{item.product?.name}</TableCell>
                                        <TableCell sx={{ color: "white" }}>{item.quantity}</TableCell>
                                        <TableCell sx={{ color: "white" }}>{item.price}</TableCell>
                                        <TableCell sx={{ color: "white" }}>{item.reorderLevel}</TableCell>
                                        <TableCell sx={{ color: "white" }}>{item.reorderQuantity}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            </Grid>
        </Grid>
    );
}
