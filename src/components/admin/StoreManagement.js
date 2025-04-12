import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
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
import { useCountry } from "../navbar/CountryProvider";

export default function StoreManagement() {
    const [stores, setStores] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { selectedCountry } = useCountry();
    const [form, setForm] = useState({
        name: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        phoneNumber: "",
        email: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            await fetchStores();
        };
        fetchData();
    }, [selectedCountry]);

    const fetchStores = async () => {
        try {
            const response = await AdminService.fetchStores(selectedCountry);
            console.log("Fetched stores:", response.data); // ✅ log the response
            setStores(response || []);
        } catch (error) {
            console.error("Failed to fetch stores:", error);
        }
    };

    const addStore = async () => {
        const {
            name,
            address,
            city,
            state,
            zipCode,
            country,
            phoneNumber,
            email,
        } = form;

        if (!name || !address) {
            alert("Store name and address are required.");
            return;
        }

        try {
            await AdminService.addStore(form);
            const res = await AdminService.fetchStores();
            setStores(res.data || []);
            handleDialogClose();
        } catch (error) {
            console.error("Failed to add store:", error);
        }
    };

    const handleDialogOpen = () => {
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setForm({
            name: "",
            address: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
            phoneNumber: "",
            email: "",
        });
    };

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px", marginBottom: "16px" }}>
                <Typography variant="h6" sx={{ color: "white" }}>Admin Store</Typography>
                <Button
                    variant="outlined"
                    sx={{
                        color: "white",
                        borderColor: "white",
                        "&:hover": { borderColor: "gray", backgroundColor: 'gray', color: 'white' }
                    }}
                    onClick={handleDialogOpen}
                >
                    Create Store
                </Button>
            </div>

            <Dialog open={isDialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
                <DialogTitle>Create Store</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        {[
                            ["name", "Store Name"],
                            ["address", "Address"],
                            ["city", "City"],
                            ["state", "State"],
                            ["zipCode", "Zip Code"],
                            ["country", "Country"],
                            ["phoneNumber", "Phone Number"],
                            ["email", "Email"],
                        ].map(([key, label]) => (
                            <Grid item xs={12} key={key}>
                                <TextField
                                    label={label}
                                    variant="outlined"
                                    fullWidth
                                    value={form[key]}
                                    onChange={handleChange(key)}
                                />
                            </Grid>
                        ))}
                    </Grid>
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
                        {stores.map((store, index) => (
                            <TableRow key={store.id || index}>
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
