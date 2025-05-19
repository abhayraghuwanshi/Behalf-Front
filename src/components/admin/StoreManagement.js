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
import { useEffect, useState } from "react";
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
        <Grid container justifyContent="center">
            <Grid item xs={12} md={10} lg={9}>
                <div style={{ padding: "16px", minHeight: "100vh" }}>
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

                    <Dialog open={isDialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm"
                        PaperProps={{ style: { backgroundColor: "#111", color: "white" } }}>
                        <DialogTitle sx={{ color: "white" }}>Create Store</DialogTitle>
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
                                            InputProps={{ style: { color: "white", border: "1px solid white", borderRadius: "4px" } }}
                                            InputLabelProps={{ style: { color: "white" } }}
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

                    <Paper style={{ padding: "16px", backgroundColor: "#111" }}>
                        <Typography variant="h6" sx={{ color: "white", marginBottom: "12px" }}>Available Stores</Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ color: "white" }}>Name</TableCell>
                                    <TableCell sx={{ color: "white" }}>Address</TableCell>
                                    <TableCell sx={{ color: "white" }}>City</TableCell>
                                    <TableCell sx={{ color: "white" }}>State</TableCell>
                                    <TableCell sx={{ color: "white" }}>Zip Code</TableCell>
                                    <TableCell sx={{ color: "white" }}>Country</TableCell>
                                    <TableCell sx={{ color: "white" }}>Phone</TableCell>
                                    <TableCell sx={{ color: "white" }}>Email</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {stores.map((store, index) => (
                                    <TableRow key={store.id || index}>
                                        <TableCell sx={{ color: "white" }}>{store.name}</TableCell>
                                        <TableCell sx={{ color: "white" }}>{store.address}</TableCell>
                                        <TableCell sx={{ color: "white" }}>{store.city}</TableCell>
                                        <TableCell sx={{ color: "white" }}>{store.state}</TableCell>
                                        <TableCell sx={{ color: "white" }}>{store.zipCode}</TableCell>
                                        <TableCell sx={{ color: "white" }}>{store.country}</TableCell>
                                        <TableCell sx={{ color: "white" }}>{store.phoneNumber}</TableCell>
                                        <TableCell sx={{ color: "white" }}>{store.email}</TableCell>
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
