import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminService from "../../service/AdminService";

export default function StoreManagement() {
    const [stores, setStores] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [storeName, setStoreName] = useState("");
    const [storeAddress, setStoreAddress] = useState("");
    const [storeCity, setStoreCity] = useState("");
    const [storeState, setStoreState] = useState("");
    const [storeZipCode, setStoreZipCode] = useState("");
    const [storeCountry, setStoreCountry] = useState("");
    const [storePhoneNumber, setStorePhoneNumber] = useState("");
    const [storeEmail, setStoreEmail] = useState("");

    useEffect(() => {
        AdminService.fetchStores(setStores);
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
        handleDialogClose();
    };

    const handleDialogOpen = () => {
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setStoreName("");
        setStoreAddress("");
        setStoreCity("");
        setStoreState("");
        setStoreZipCode("");
        setStoreCountry("");
        setStorePhoneNumber("");
        setStoreEmail("");
    };

    return (
        <div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px", marginBottom: "16px" }}>
                <Typography variant="h6" sx={{ color: "white" }}>Admin Store</Typography>

                <Button
                    variant="outlined"
                    sx={{ color: "white", borderColor: "white", "&:hover": { borderColor: "gray", backgroundColor: 'gray', color: 'white' } }}
                    onClick={handleDialogOpen}
                >
                    Create Store
                </Button>
            </div>

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
                        style={{ marginBottom: "12px" }}
                    />
                    <TextField
                        label="Address"
                        variant="outlined"
                        fullWidth
                        value={storeAddress}
                        onChange={(e) => setStoreAddress(e.target.value)}
                        style={{ marginBottom: "12px" }}
                    />
                    <TextField
                        label="City"
                        variant="outlined"
                        fullWidth
                        value={storeCity}
                        onChange={(e) => setStoreCity(e.target.value)}
                        style={{ marginBottom: "12px" }}
                    />
                    <TextField
                        label="State"
                        variant="outlined"
                        fullWidth
                        value={storeState}
                        onChange={(e) => setStoreState(e.target.value)}
                        style={{ marginBottom: "12px" }}
                    />
                    <TextField
                        label="Zip Code"
                        variant="outlined"
                        fullWidth
                        value={storeZipCode}
                        onChange={(e) => setStoreZipCode(e.target.value)}
                        style={{ marginBottom: "12px" }}
                    />
                    <TextField
                        label="Country"
                        variant="outlined"
                        fullWidth
                        value={storeCountry}
                        onChange={(e) => setStoreCountry(e.target.value)}
                        style={{ marginBottom: "12px" }}
                    />
                    <TextField
                        label="Phone Number"
                        variant="outlined"
                        fullWidth
                        value={storePhoneNumber}
                        onChange={(e) => setStorePhoneNumber(e.target.value)}
                        style={{ marginBottom: "12px" }}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={storeEmail}
                        onChange={(e) => setStoreEmail(e.target.value)}
                        style={{ marginBottom: "12px" }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="secondary">
                        Close
                    </Button>
                    <Button onClick={addStore} color="primary" variant="contained">
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
        </div>
    );
}
