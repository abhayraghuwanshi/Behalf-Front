import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCountries } from 'use-react-countries';

// Create context
const CountryContext = createContext();

// Country provider component
export function CountryProvider({ children }) {
    const [selectedCountry, setSelectedCountry] = useState('India'); // Default to US
    const [loading, setLoading] = useState(true);
    const { countries } = useCountries();

    useEffect(() => {
        const detectCountry = async () => {
            try {
                const response = await fetch('https://ipapi.co/json/');
                if (!response.ok) throw new Error('Failed to fetch country data');

                const data = await response.json();
                console.log('Detected Country Data:', data);

                const countryName = data?.country_name;

                if (countryName) {
                    // Validate using country name
                    const isValidCountry = countries.some((c) => c.name.toLowerCase() === countryName.toLowerCase());
                    if (isValidCountry) {
                        setSelectedCountry(countryName);
                    } else {
                        console.warn('Invalid country detected, falling back to US');
                        setSelectedCountry('United States'); // Fallback to the name instead of code
                    }
                }
            } catch (error) {
                console.error('Error detecting country:', error);
                setSelectedCountry('India'); // Fallback on error
            } finally {
                setLoading(false);
            }
        };

        // Only run if countries are loaded
        if (countries.length > 0) {
            detectCountry();
        }
    }, [countries]);

    return (
        <CountryContext.Provider value={{ selectedCountry, setSelectedCountry, loading }}>
            {children}
        </CountryContext.Provider>
    );
}

// Custom hook to use the country context
export function useCountry() {
    return useContext(CountryContext);
}
