import {
    Button,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    TextField
} from "@mui/material";
import React, { useState } from "react";


const TravelRequestPage = () => {
    const [open, setOpen] = useState(false);
    const [requests, setRequests] = useState([
        { category: "traveler", fromLocation: "Montreal", toLocation: "India", travelDate: "2025-03-01", price: "300" },
        { category: "seeker", fromLocation: "India", toLocation: "Montreal", travelDate: "2025-04-15", price: "250" },
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
        <div style={{ minHeight: '100vh', padding: '10px', marginRight: '20px', marginLeft: '20px', marginTop: '100px' }}>

            <div style={{ display: 'flex ', justifyContent: 'space-between' }}>
                <TextField
                    select
                    fullWidth
                    label="Filter by Category"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    margin="dense"
                    sx={{
                        '& .MuiInputLabel-root': { color: 'white' },
                        '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, color: 'white' },
                        '& .MuiSvgIcon-root': { color: 'white' },
                    }}
                >
                    <MenuItem value="all" sx={{
                        color: 'white', // Set text color to white
                        backgroundColor: 'black', // Set background color to black
                        '&:hover': {
                            backgroundColor: '#333', // Darker background on hover
                        },
                    }}>All</MenuItem>
                    <MenuItem value="traveler" sx={{
                        color: 'white', // Set text color to white
                        backgroundColor: 'black', // Set background color to black
                        '&:hover': {
                            backgroundColor: '#333', // Darker background on hover
                        },
                    }}>Traveler</MenuItem>
                    <MenuItem value="seeker" sx={{
                        color: 'white', // Set text color to white
                        backgroundColor: 'black', // Set background color to black
                        '&:hover': {
                            backgroundColor: '#333', // Darker background on hover
                        },
                    }}>Seeker</MenuItem>
                </TextField>
                <TextField
                    fullWidth
                    type="date"
                    label="Filter by Date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                    sx={{
                        '& .MuiInputLabel-root': { color: 'white' },
                        '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, color: 'white' },
                    }}
                />
            </div>

            <List>
                {filteredRequests.map((request, index) => (
                    <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
                        <ListItemText
                            primary={`${request.category} from ${request.fromLocation} to ${request.toLocation}`}
                            secondary={`Date: ${request.travelDate}, Price: $${request.price}`}
                            primaryTypographyProps={{ color: "white" }}
                            secondaryTypographyProps={{ color: "white" }} // Fix for black secondary text
                        />
                        <Button
                            variant="outlined"
                            sx={{
                                color: "white",
                                borderColor: "white",
                                "&:hover": { borderColor: "gray" },
                            }}
                            onClick={() => setOpen(true)}
                        >
                            Interested
                        </Button>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default TravelRequestPage;