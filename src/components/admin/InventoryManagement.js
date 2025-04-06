import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminService from "../../service/AdminService";

export default function InventoryManagement() {
    const [selectedStore, setSelectedStore] = useState(null);
    const [inventory, setInventory] = useState([]);
    const [newSku, setNewSku] = useState("");
    const [newQuantity, setNewQuantity] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newStore, setNewStore] = useState("");
    const [stores, setStores] = useState([]);
    const [newImages, setNewImages] = useState([]);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [storesResponse, inventoryResponse] = await Promise.all([
                    AdminService.fetchStores(setStores),
                    AdminService.fetchInventory(setInventory),
                ]);

            } catch (error) {
                console.error("Error fetching initial data:", error);
            }
        };

        fetchInitialData();
    }, []);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setNewImages((prevImages) => [...prevImages, ...files]);
    };

    const removeImage = (index) => {
        setNewImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const addInventoryItem = async () => {
        if (!newStore || !newSku || !newQuantity || !newPrice || newImages.length === 0) {
            alert("Please fill in all fields and upload at least one image before submitting.");
            return;
        }

        try {
            const storeObject = stores.find((store) => store.id === parseInt(newStore, 10));
            const formData = new FormData();
            formData.append("store", JSON.stringify(storeObject));
            formData.append("sku", newSku);
            formData.append("quantity", newQuantity);
            formData.append("price", newPrice);
            newImages.forEach((image, index) => {
                formData.append(`images[${index}]`, image);
            });

            console.log("Payload for adding inventory item:", formData);

            await AdminService.addInventoryItem(formData);
            handleDialogClose();
        } catch (error) {
            console.error("Error adding inventory item:", error);
            alert("Failed to add inventory item. Please try again.");
        }
    };

    const handleDialogOpen = () => {
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setNewSku("");
        setNewQuantity("");
        setNewPrice("");
        setNewImages([]);
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px", marginBottom: "16px" }}>
                <Typography variant="h6" sx={{ color: "white" }}>Inventory Management</Typography>

                <Button
                    variant="outlined"
                    sx={{ color: "white", borderColor: "white", "&:hover": { borderColor: "gray", backgroundColor: 'gray', color: 'white' } }}
                    onClick={handleDialogOpen}
                >
                    Add Inventory Item
                </Button>
            </div>

            {/* Dialog for adding inventory item */}
            <Dialog open={isDialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
                <DialogTitle>Add Inventory Item</DialogTitle>
                <DialogContent>
                    <Select
                        fullWidth
                        value={newStore}
                        onChange={(e) => setNewStore(e.target.value)}
                        style={{ backgroundColor: "#222", color: "#fff", marginBottom: "12px" }}
                        native
                    >
                        <option value="" disabled>
                            Select a Store
                        </option>
                        {stores.map((store) => (
                            <option key={store.id} value={store.id} style={{ backgroundColor: "#222", color: "#fff" }}>
                                {store.name}
                            </option>
                        ))}
                    </Select>
                    <TextField
                        label="SKU"
                        variant="outlined"
                        fullWidth
                        value={newSku}
                        onChange={(e) => setNewSku(e.target.value)}
                        style={{ marginBottom: "12px" }}
                    />
                    <TextField
                        label="Quantity"
                        variant="outlined"
                        fullWidth
                        value={newQuantity}
                        onChange={(e) => setNewQuantity(e.target.value)}
                        style={{ marginBottom: "12px" }}
                    />
                    <TextField
                        label="Price"
                        variant="outlined"
                        fullWidth
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        style={{ marginBottom: "12px" }}
                    />
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ marginBottom: "12px" }}
                    />
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
                        {newImages.map((image, index) => (
                            <div key={index} style={{ position: "relative" }}>
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Preview ${index}`}
                                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                />
                                <Button
                                    size="small"
                                    color="secondary"
                                    onClick={() => removeImage(index)}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                        minWidth: "24px",
                                        padding: "4px",
                                    }}
                                >
                                    X
                                </Button>
                            </div>
                        ))}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="secondary">
                        Close
                    </Button>
                    <Button onClick={addInventoryItem} color="primary" variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            <Paper style={{ padding: "16px", backgroundColor: "#333" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: "white" }}>Store</TableCell>
                            <TableCell style={{ color: "white" }}>SKU</TableCell>
                            <TableCell style={{ color: "white" }}>Quantity</TableCell>
                            <TableCell style={{ color: "white" }}>Price</TableCell>
                            <TableCell style={{ color: "white" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {inventory.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>helo</TableCell>
                                <TableCell>{item.sku}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.price}</TableCell>
                                <TableCell>
                                    {/* Add edit/delete buttons */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}
