import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '../components/SignIn/AuthContext'; // Import authentication context
import ProfileService from '../service/ProfileService'; // Import ProfileService

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const { user } = useAuth(); // Get authentication status
    const [selectedMenu, setSelectedMenu] = useState(() => {
        return localStorage.getItem('selectedMenu') || 'store';
    });

    const [adminTab, setAdminTab] = useState(() => {
        return parseInt(localStorage.getItem('activeAdminTab'), 10) || 0;
    });

    const [isAdminOrManager, setIsAdminOrManager] = useState(false); // Track if the user is admin or manager

    useEffect(() => {
        // Fetch admin/manager status when user changes
        const fetchAdminStatus = async () => {
            if (user?.id) {
                try {
                    const result = await ProfileService.checkIfAdminOrManager(user.id);
                    setIsAdminOrManager(result);
                } catch (error) {
                    console.error("Failed to fetch admin/manager status:", error);
                    setIsAdminOrManager(false);
                }
            } else {
                setIsAdminOrManager(false);
            }
        };

        fetchAdminStatus();
    }, [user]);

    useEffect(() => {
        // Reset selectedMenu to "store" if the user is not an admin or manager
        if (!isAdminOrManager && selectedMenu === 'admin') {
            setSelectedMenu('store');
        }
    }, [isAdminOrManager, selectedMenu]);

    useEffect(() => {
        localStorage.setItem('selectedMenu', selectedMenu);
    }, [selectedMenu]);

    useEffect(() => {
        localStorage.setItem('activeAdminTab', adminTab);
    }, [adminTab]);

    return (
        <MenuContext.Provider value={{ selectedMenu, setSelectedMenu, adminTab, setAdminTab, isAdminOrManager }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = () => useContext(MenuContext);