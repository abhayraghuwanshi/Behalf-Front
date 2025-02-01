import { Box, Grid, MenuItem, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import React from "react";

const FilterControls = ({
    minPrice,
    maxPrice,
    dateFilter,
    categoryFilter,
    setMinPrice,
    setMaxPrice,
    setDateFilter,
    setCategoryFilter,
    dropDownOptions
}) => {
    return (
        <Box sx={{ padding: 2, border: 1, margin: 2, color: 'white', borderColor: "white" }}>
            <h3 style={{ color: "white" }}>Filters</h3>
            <Grid container spacing={2}>
                {/* Min Price */}
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Min Price"
                        type="number"
                        fullWidth
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                        variant="outlined"
                        InputProps={{ sx: { color: "white" } }}
                        InputLabelProps={{ sx: { color: "white" } }}
                        sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "white" } } }}
                    />
                </Grid>

                {/* Max Price */}
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Max Price"
                        type="number"
                        fullWidth
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        variant="outlined"
                        InputProps={{ sx: { color: "white" } }}
                        InputLabelProps={{ sx: { color: "white" } }}
                        sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "white" } } }}
                    />
                </Grid>

                {/* Post Date */}
                <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Post Date"
                            value={dateFilter ? dayjs(dateFilter) : null}
                            onChange={(newValue) => setDateFilter(newValue ? newValue.toISOString() : "")}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    InputProps: { sx: { color: "white" } },
                                    InputLabelProps: { sx: { color: "white" } },
                                    sx: {
                                        "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "white" } },
                                        "& .MuiSvgIcon-root": { color: "white" }, // Calendar icon color
                                    },
                                },
                            }}
                        />
                    </LocalizationProvider>
                </Grid>


                {/* Category */}
                <Grid item xs={12} sm={6}>
                    <TextField
                        select
                        label="Category"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        fullWidth
                        variant="outlined"
                        InputProps={{ sx: { color: "white" } }}
                        InputLabelProps={{ sx: { color: "white" } }}
                        sx={{
                            "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "white" } },
                            "& .MuiSvgIcon-root": { color: "white" }, // Dropdown arrow color
                        }}
                    >
                        <MenuItem value="">All Categories</MenuItem>
                        {dropDownOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>
        </Box>
    );
};

export default FilterControls;
