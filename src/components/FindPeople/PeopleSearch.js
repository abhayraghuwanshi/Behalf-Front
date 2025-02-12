import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    TextField,
} from "@mui/material";
import React, { useState } from "react";

const TravelRequestForm = ({ open, handleClose, handleSubmit }) => {
    const [formData, setFormData] = useState({
        category: "traveler",
        fromLocation: "",
        toLocation: "",
        travelDate: "",
        price: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = () => {
        handleSubmit(formData);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create Travel Request</DialogTitle>
            <DialogContent>
                <TextField
                    select
                    fullWidth
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    margin="dense"
                >
                    <MenuItem value="traveler">I am traveling</MenuItem>
                    <MenuItem value="seeker">I need someone traveling</MenuItem>
                </TextField>
                <TextField
                    fullWidth
                    label="From Location (Lat,Lng)"
                    name="fromLocation"
                    value={formData.fromLocation}
                    onChange={handleChange}
                    margin="dense"
                />
                <TextField
                    fullWidth
                    label="To Location (Lat,Lng)"
                    name="toLocation"
                    value={formData.toLocation}
                    onChange={handleChange}
                    margin="dense"
                />
                <TextField
                    fullWidth
                    type="date"
                    label="Travel Date"
                    name="travelDate"
                    value={formData.travelDate}
                    onChange={handleChange}
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    fullWidth
                    type="number"
                    label="Price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    margin="dense"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={onSubmit} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const TravelRequestPage = () => {
    const [open, setOpen] = useState(false);
    const [requests, setRequests] = useState([
        { category: "traveler", fromLocation: "40.7128,-74.0060", toLocation: "34.0522,-118.2437", travelDate: "2025-03-01", price: "300" },
        { category: "seeker", fromLocation: "37.7749,-122.4194", toLocation: "41.8781,-87.6298", travelDate: "2025-04-15", price: "250" },
    ]);
    const [filterCategory, setFilterCategory] = useState("all");
    const [filterDate, setFilterDate] = useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = (data) => {
        setRequests([...requests, data]);
    };

    const parseCoordinates = (location) => {
        const [lat, lng] = location.split(",").map(Number);
        return [lat, lng];
    };

    const filteredRequests = requests.filter((request) => {
        return (
            (filterCategory === "all" || request.category === filterCategory) &&
            (filterDate === "" || request.travelDate === filterDate)
        );
    });

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Create Travel Request
            </Button>
            <TravelRequestForm open={open} handleClose={handleClose} handleSubmit={handleSubmit} />

            <div>
                <TextField sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "white" } } }}
                    select
                    fullWidth
                    label="Filter by Category"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    margin="dense"
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="traveler">Traveler</MenuItem>
                    <MenuItem value="seeker">Seeker</MenuItem>
                </TextField>
                <TextField sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "white" } } }}
                    fullWidth
                    type="date"
                    label="Filter by Date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                />

            </div>


            <List>
                {filteredRequests.map((request, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={`${request.category} from ${request.fromLocation} to ${request.toLocation}`} secondary={`Date: ${request.travelDate}, Price: $${request.price}`} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default TravelRequestPage;
