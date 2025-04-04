import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Paper,
    Select,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tabs,
    TextField,
    Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminService from "../../service/AdminService"; // Adjust the import path as necessary

export default function AdminPanel() {
    const [stores, setStores] = useState([]);
    const [users, setUsers] = useState([]);
    const [storeName, setStoreName] = useState("");
    const [selectedStore, setSelectedStore] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [role, setRole] = useState("USER");
    const [inventory, setInventory] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [newSku, setNewSku] = useState("");
    const [newQuantity, setNewQuantity] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [activeTab, setActiveTab] = useState(0);
    const [storeAddress, setStoreAddress] = useState("");
    const [storeCity, setStoreCity] = useState("");
    const [storeState, setStoreState] = useState("");
    const [storeZipCode, setStoreZipCode] = useState("");
    const [storeCountry, setStoreCountry] = useState("");
    const [storePhoneNumber, setStorePhoneNumber] = useState("");
    const [storeEmail, setStoreEmail] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        AdminService.fetchStores(setStores);
        AdminService.fetchUsers(setUsers);
    }, []);

    const addStore = async () => {
        const storeData = {
            name: storeName,
            address: storeAddress,
            city: storeCity,
            state: storeState,
            zipCode: storeZipCode,
            country: storeCountry,
            phoneNumber: storePhoneNumber,
            email: storeEmail,
        };
        await AdminService.addStore(storeData);
        AdminService.fetchStores(setStores);
        setStoreName("");
        setStoreAddress("");
        setStoreCity("");
        setStoreState("");
        setStoreZipCode("");
        setStoreCountry("");
        setStorePhoneNumber("");
        setStoreEmail("");
    };

    const assignUserRole = async () => {
        await AdminService.assignUserRole(selectedUser, role);
        AdminService.fetchUsers(setUsers);
    };

    const fetchInventory = async (storeId) => {
        AdminService.fetchInventory(storeId, setInventory);
    };

    const updateInventory = async (itemId, updatedData) => {
        await AdminService.updateInventory(itemId, updatedData);
        fetchInventory(selectedStore);
    };

    const deleteInventory = async (itemId) => {
        await AdminService.deleteInventory(itemId);
        fetchInventory(selectedStore);
    };

    const addInventoryItem = async () => {
        if (!selectedStore) return;
        await AdminService.addInventoryItem(selectedStore, newSku, newQuantity, newPrice);
        fetchInventory(selectedStore);
        setNewSku("");
        setNewQuantity("");
        setNewPrice("");
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleDialogOpen = () => {
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    return (
        <div style={{ padding: "24px", backgroundColor: "black", color: "white", minHeight: "100vh" }}>
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                textColor="inherit"
                indicatorColor="primary"
                sx={{ color: "white" }}
            >
                <Tab label="Admin Store" sx={{ color: "white" }} />
                <Tab label="Add Users" sx={{ color: "white" }} />
                <Tab label="Inventory Management" sx={{ color: "white" }} />
            </Tabs>

            <Box hidden={activeTab !== 0}>
                <Typography variant="h6" sx={{ color: "white", marginTop: "16px" }}>Admin Store</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDialogOpen}
                    style={{ marginTop: "12px" }}
                >
                    Create Store
                </Button>

                {/* Dialog for creating a store */}
                <Dialog open={isDialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
                    <DialogTitle>Create Store</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Store Name"
                            variant="outlined"
                            fullWidth
                            value={storeName}
                            onChange={(e) => setStoreName(e.target.value)}
                            InputLabelProps={{ style: { color: "#aaa" } }}
                            InputProps={{ style: { color: "#fff", backgroundColor: "#222" } }}
                            style={{ marginBottom: "12px" }}
                        />
                        <TextField
                            label="Address"
                            variant="outlined"
                            fullWidth
                            value={storeAddress}
                            onChange={(e) => setStoreAddress(e.target.value)}
                            InputLabelProps={{ style: { color: "#aaa" } }}
                            InputProps={{ style: { color: "#fff", backgroundColor: "#222" } }}
                            style={{ marginBottom: "12px" }}
                        />
                        <TextField
                            label="City"
                            variant="outlined"
                            fullWidth
                            value={storeCity}
                            onChange={(e) => setStoreCity(e.target.value)}
                            InputLabelProps={{ style: { color: "#aaa" } }}
                            InputProps={{ style: { color: "#fff", backgroundColor: "#222" } }}
                            style={{ marginBottom: "12px" }}
                        />
                        <TextField
                            label="State"
                            variant="outlined"
                            fullWidth
                            value={storeState}
                            onChange={(e) => setStoreState(e.target.value)}
                            InputLabelProps={{ style: { color: "#aaa" } }}
                            InputProps={{ style: { color: "#fff", backgroundColor: "#222" } }}
                            style={{ marginBottom: "12px" }}
                        />
                        <TextField
                            label="Zip Code"
                            variant="outlined"
                            fullWidth
                            value={storeZipCode}
                            onChange={(e) => setStoreZipCode(e.target.value)}
                            InputLabelProps={{ style: { color: "#aaa" } }}
                            InputProps={{ style: { color: "#fff", backgroundColor: "#222" } }}
                            style={{ marginBottom: "12px" }}
                        />
                        <TextField
                            label="Country"
                            variant="outlined"
                            fullWidth
                            value={storeCountry}
                            onChange={(e) => setStoreCountry(e.target.value)}
                            InputLabelProps={{ style: { color: "#aaa" } }}
                            InputProps={{ style: { color: "#fff", backgroundColor: "#222" } }}
                            style={{ marginBottom: "12px" }}
                        />
                        <TextField
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            value={storePhoneNumber}
                            onChange={(e) => setStorePhoneNumber(e.target.value)}
                            InputLabelProps={{ style: { color: "#aaa" } }}
                            InputProps={{ style: { color: "#fff", backgroundColor: "#222" } }}
                            style={{ marginBottom: "12px" }}
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={storeEmail}
                            onChange={(e) => setStoreEmail(e.target.value)}
                            InputLabelProps={{ style: { color: "#aaa" } }}
                            InputProps={{ style: { color: "#fff", backgroundColor: "#222" } }}
                            style={{ marginBottom: "12px" }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose} color="secondary">
                            Close
                        </Button>
                        <Button
                            onClick={() => {
                                addStore();
                                handleDialogClose();
                            }}
                            color="primary"
                            variant="contained"
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Table to display available stores */}
                <Paper style={{ padding: "16px", backgroundColor: "#333", marginTop: "16px" }}>
                    <Typography variant="h6" sx={{ color: "white", marginBottom: "12px" }}>Available Stores</Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ color: "white" }}>Name</TableCell>
                                <TableCell style={{ color: "white" }}>Address</TableCell>
                                <TableCell style={{ color: "white" }}>City</TableCell>
                                <TableCell style={{ color: "white" }}>State</TableCell>
                                <TableCell style={{ color: "white" }}>Zip Code</TableCell>
                                <TableCell style={{ color: "white" }}>Country</TableCell>
                                <TableCell style={{ color: "white" }}>Phone</TableCell>
                                <TableCell style={{ color: "white" }}>Email</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stores.map((store) => (
                                <TableRow key={store.id}>
                                    <TableCell style={{ color: "white" }}>{store.name}</TableCell>
                                    <TableCell style={{ color: "white" }}>{store.address}</TableCell>
                                    <TableCell style={{ color: "white" }}>{store.city}</TableCell>
                                    <TableCell style={{ color: "white" }}>{store.state}</TableCell>
                                    <TableCell style={{ color: "white" }}>{store.zipCode}</TableCell>
                                    <TableCell style={{ color: "white" }}>{store.country}</TableCell>
                                    <TableCell style={{ color: "white" }}>{store.phoneNumber}</TableCell>
                                    <TableCell style={{ color: "white" }}>{store.email}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Box>

            <Box hidden={activeTab !== 1}>
                <Typography variant="h6" sx={{ color: "white", marginTop: "16px" }}>Add Users</Typography>
                {/* User Management */}
                <div>
                    <h3 style={{ fontSize: "20px", fontWeight: "600", color: "white" }}>Manage Users</h3>
                    <Select
                        fullWidth
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                        style={{ backgroundColor: "#222", color: "#fff" }}
                    >
                        {users.map((user) => (
                            <MenuItem key={user.id} value={user.id} style={{ backgroundColor: "#333", color: "#fff" }}>
                                {user.email}
                            </MenuItem>
                        ))}
                    </Select>
                    <Select
                        fullWidth
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        style={{ backgroundColor: "#222", color: "#fff", marginTop: "12px" }}
                    >
                        <MenuItem value="ADMIN">Admin</MenuItem>
                        <MenuItem value="MANAGER">Manager</MenuItem>
                        <MenuItem value="USER">User</MenuItem>
                    </Select>
                    <Button variant="contained" color="primary" onClick={assignUserRole} style={{ marginTop: "12px" }}>
                        Assign Role
                    </Button>
                </div>
            </Box>

            <Box hidden={activeTab !== 2}>
                <Typography variant="h6" sx={{ color: "white", marginTop: "16px" }}>Inventory Management</Typography>
                {/* Inventory Management */}
                <Select
                    fullWidth
                    value={selectedStore}
                    onChange={(e) => { setSelectedStore(e.target.value); fetchInventory(e.target.value); }}
                    style={{ backgroundColor: "#222", color: "#fff" }}
                >
                    {stores.map((store) => (
                        <MenuItem key={store.id} value={store.id} style={{ backgroundColor: "#333", color: "#fff" }}>
                            {store.name}
                        </MenuItem>
                    ))}
                </Select>

                <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
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

                <Paper style={{ padding: "16px", backgroundColor: "#333", marginTop: "16px" }}>
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
                                    <TableCell>{editingItem === item.id ? <TextField defaultValue={item.sku} onChange={(e) => item.sku = e.target.value} /> : item.sku}</TableCell>
                                    <TableCell>{editingItem === item.id ? <TextField defaultValue={item.quantity} onChange={(e) => item.quantity = e.target.value} /> : item.quantity}</TableCell>
                                    <TableCell>{editingItem === item.id ? <TextField defaultValue={item.price} onChange={(e) => item.price = e.target.value} /> : item.price}</TableCell>
                                    <TableCell>
                                        {editingItem === item.id ? (
                                            <Button variant="contained" color="primary" onClick={() => { updateInventory(item.id, item); setEditingItem(null); }}>Save</Button>
                                        ) : (
                                            <>
                                                <Button variant="outlined" color="primary" onClick={() => setEditingItem(item.id)}>Edit</Button>
                                                <Button variant="contained" color="secondary" onClick={() => deleteInventory(item.id)} style={{ marginLeft: "8px" }}>Delete</Button>
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Box>
        </div>
    );
}
