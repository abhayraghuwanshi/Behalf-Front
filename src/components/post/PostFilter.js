import { Box, Grid, MenuItem, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // Corrected import
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
        <Box sx={{ padding: 2, border: 1, margin: 2 }}>
            <h3>Filters</h3>
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
                    />
                </Grid>

                {/* Post Date */}
                <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Post Date"
                            value={dateFilter ? dayjs(dateFilter) : null}
                            onChange={(newValue) => setDateFilter(newValue ? newValue.toISOString() : "")}
                            renderInput={(params) => <TextField {...params} fullWidth />}
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
