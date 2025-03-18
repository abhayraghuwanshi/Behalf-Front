import React, { createContext, useContext, useEffect, useState } from 'react';
import COUNTRIES from '../navbar/Country';


// Create context
const CountryContext = createContext();


// Country provider component
export function CountryProvider({ children }) {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Detection logic (same as above)
        const detectCountry = async () => {
            try {

                // Fallback to IP detection
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();
                if (data.country && COUNTRIES.some(c => c.code === data.country)) {
                    setSelectedCountry(data.country);
                } else {
                    setSelectedCountry('US');
                }
            } catch (error) {
                setSelectedCountry('US');
            } finally {
                setLoading(false);
            }
        };

        detectCountry();
    }, []);

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
