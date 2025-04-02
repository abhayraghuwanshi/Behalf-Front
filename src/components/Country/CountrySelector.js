import { MenuItem, TextField } from '@mui/material';
import React from 'react';
import { useCountries } from 'use-react-countries';

const CountrySelector = ({ selectedCountry, handleCountryChange, inputStyles, label }) => {
    const { countries } = useCountries();

    // Limit to specific countries
    const allowedCountries = ['India', 'Vietnam', "United States"];
    const filteredCountries = countries.filter((country) => allowedCountries.includes(country.name));

    return (
        <TextField
            style={{ marginTop: '10px', backgroundColor: 'transparent' }}
            fullWidth
            select
            value={selectedCountry}
            onChange={handleCountryChange}
            label={label}
            sx={inputStyles}
            SelectProps={{
                MenuProps: {
                    PaperProps: {
                        style: {
                            backgroundColor: 'grey',
                            color: 'white',
                        },
                    },
                },
            }}
        >
            {filteredCountries.map((country) => (
                <MenuItem key={country.name} value={country.name} style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={country.flags.png}
                        alt={country.name}
                        style={{ width: 24, height: 16, marginRight: 10, borderRadius: '2px', objectFit: 'cover' }}
                    />
                    {country.name}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default CountrySelector;
