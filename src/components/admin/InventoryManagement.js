import { Button, Paper, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import AdminService from "../../service/AdminService";

export default function InventoryManagement() {
    const [selectedStore, setSelectedStore] = useState(null);
    const [inventory, setInventory] = useState([]);
    const [newSku, setNewSku] = useState("");
    const [newQuantity, setNewQuantity] = useState("");
    const [newPrice, setNewPrice] = useState("");

    const fetchInventory = async (storeId) => {
        AdminService.fetchInventory(storeId, setInventory);
    };

    const addInventoryItem = async () => {
        if (!selectedStore) return;
        await AdminService.addInventoryItem(selectedStore, newSku, newQuantity, newPrice);
        fetchInventory(selectedStore);
        setNewSku("");
        setNewQuantity("");
        setNewPrice("");
    };

    return (
        <div>
            <Typography variant="h6" sx={{ color: "white", marginTop: "16px" }}>Inventory Management</Typography>
            <Select
                fullWidth
                value={selectedStore}
                onChange={(e) => { setSelectedStore(e.target.value); fetchInventory(e.target.value); }}
                style={{ backgroundColor: "#222", color: "#fff", marginBottom: "12px" }}
            >
                {/* Replace with actual store options */}
            </Select>

            <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
                <TextField
                    label="SKU"
                    value={newSku}
                    onChange={(e) => setNewSku(e.target.value)}
                    InputProps={{ style: { color: "#fff", backgroundColor: "#222" } }}
                />
                <TextField
                    label="Quantity"
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(e.target.value)}
                    InputProps={{ style: { color: "#fff", backgroundColor: "#222" } }}
                />
                <TextField
                    label="Price"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    InputProps={{ style: { color: "#fff", backgroundColor: "#222" } }}
                />
                <Button variant="contained" color="primary" onClick={addInventoryItem}>
                    Add Item
                </Button>
            </div>

            <Paper style={{ padding: "16px", backgroundColor: "#333" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: "white" }}>SKU</TableCell>
                            <TableCell style={{ color: "white" }}>Quantity</TableCell>
                            <TableCell style={{ color: "white" }}>Price</TableCell>
                            <TableCell style={{ color: "white" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {inventory.map((item) => (
                            <TableRow key={item.id}>
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
