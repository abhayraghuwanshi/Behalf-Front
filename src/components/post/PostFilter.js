import { Box, Grid, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import React from "react";

const FilterControls = ({
    minPrice,
    maxPrice,
    dateFilter,
    searchTerm,
    setMinPrice,
    setMaxPrice,
    setDateFilter,
    setSearchTerm,
}) => {
    return (
        <Box >
            <Grid container spacing={2}>
                {/* Search Term */}
                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Search"
                        type="text"
                        fullWidth
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        variant="outlined"
                        InputProps={{ sx: { color: "white" } }}
                        InputLabelProps={{ sx: { color: "white" } }}
                        sx={{ backgroundColor: "#1E1E1E", }}
                    />
                </Grid>

                {/* Min Price */}
                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Min Price"
                        type="number"
                        fullWidth
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                        variant="outlined"
                        InputProps={{ sx: { color: "white" } }}
                        InputLabelProps={{ sx: { color: "white" } }}
                        sx={{ backgroundColor: "#1E1E1E", }}
                    />
                </Grid>

                {/* Max Price */}
                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Max Price"
                        type="number"
                        fullWidth
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        variant="outlined"
                        InputProps={{ sx: { color: "white" } }}
                        InputLabelProps={{ sx: { color: "white" } }}
                        sx={{ backgroundColor: "#1E1E1E", }}
                    />
                </Grid>

                {/* Post Date */}
                <Grid item xs={12} sm={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Post Date"
                            value={dateFilter ? dayjs(dateFilter) : null}
                            onChange={(newValue) => setDateFilter(newValue ? newValue.toISOString() : "")}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    InputProps: { sx: { color: "#edebeb" } },
                                    InputLabelProps: { sx: { color: "#edebeb" } },
                                    sx: {
                                        "& .MuiSvgIcon-root": { color: "#edebeb" }, // Calendar icon color
                                        backgroundColor: "#1E1E1E",
                                    },

                                },
                            }}


                        />
                    </LocalizationProvider>
                </Grid>

            </Grid>
        </Box >
    );
};

export default FilterControls;
