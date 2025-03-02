import { DialogTitle, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import React, { useState } from "react";

const TravelRequestForm = ({ open, handleClose, handleSubmit }) => {
    const [formData, setFormData] = useState({
        fromLocation: "",
        toLocation: "",
        travelDate: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitForm = () => {
        handleSubmit(formData); // Pass data to `handleTravelCreation`
        handleClose(); // Close the dialog
    };

    return (
        <Dialog open={open} onClose={handleClose} sx={{ '& .MuiPaper-root': { backgroundColor: 'black', color: 'white' } }}>
            <DialogTitle sx={{ color: 'white' }}>Create Travel Request</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="From Location"
                    name="fromLocation"
                    value={formData.fromLocation}
                    onChange={handleChange}
                    margin="dense"
                    InputProps={{ sx: { color: "white" } }}
                    InputLabelProps={{ sx: { color: "white" } }}
                    sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "white" }, "&:hover fieldset": { borderColor: "blue" } } }} />
                <TextField
                    fullWidth
                    label="To Location"
                    name="toLocation"
                    value={formData.toLocation}
                    onChange={handleChange}
                    margin="dense"
                    InputProps={{ sx: { color: "white" } }}
                    InputLabelProps={{ sx: { color: "white" } }}
                    sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "white" }, "&:hover fieldset": { borderColor: "blue" } } }} />
                <TextField
                    fullWidth
                    type="date"
                    label="Travel Date"
                    name="travelDate"
                    value={formData.travelDate}
                    onChange={handleChange}
                    margin="dense"
                    InputProps={{ sx: { color: "white" } }}
                    sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "white" }, "&:hover fieldset": { borderColor: "blue" } } }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary" sx={{ color: 'white' }}>Cancel</Button>
                <Button onClick={submitForm} color="primary" sx={{ color: 'white' }}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default TravelRequestForm;
