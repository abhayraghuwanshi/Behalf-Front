import { MenuItem, TextField } from '@mui/material';
import React from 'react';
import { useCountries } from 'use-react-countries';

const CountrySelector = ({ selectedCountry, handleCountryChange, inputStyles, label }) => {
    const { countries } = useCountries();

    const allowedCountries = ['India', 'Vietnam', 'United States'];
    const filteredCountries = countries.filter((country) => allowedCountries.includes(country.name));

    return (
        <TextField
            select
            value={selectedCountry}
            onChange={handleCountryChange}
            label={label}
            size="small" // Ensures compact consistent height
            sx={{
                minWidth: '140px',
                height: '40px',
                '& .MuiInputBase-root': {
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                    color: 'white',
                },
                '& .MuiSelect-select': {
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 12px',
                    height: '40px',
                },
                '& .MuiSvgIcon-root': {
                    fontSize: '20px',
                },
                ...inputStyles,
            }}
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
                <MenuItem
                    key={country.name}
                    value={country.name}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    <img
                        src={country.flags.png}
                        alt={country.name}
                        style={{
                            width: 24,
                            height: 16,
                            marginRight: 10,
                            borderRadius: '2px',
                            objectFit: 'cover',
                        }}
                    />
                    {country.name}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default CountrySelector;
