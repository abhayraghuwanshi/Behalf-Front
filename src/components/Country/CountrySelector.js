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
            style={{ marginTop: '0px', backgroundColor: 'transparent', height: '40px' }} // Adjust height and margin
            select
            value={selectedCountry}
            onChange={handleCountryChange}
            label={label}
            sx={{
                ...inputStyles,
                '& .MuiSelect-select': {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px', // Add spacing between flag and text
                    height: '40px', // Match height with other elements
                    padding: '0 12px', // Consistent padding
                },
                '& .MuiSvgIcon-root': {
                    fontSize: '20px', // Adjust flag icon size
                },
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
                        gap: '8px', // Add spacing between flag and text
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
