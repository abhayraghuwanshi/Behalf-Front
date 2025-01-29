import { createContext, useContext, useEffect, useState } from "react";
import ProfileService from "../../service/ProfileService"; // Ensure correct path

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await ProfileService.fetchUser();
                setUser(response); // Store user info in state
            } catch (error) {
                console.error("No user logged in");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []); // Fetch only once

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
