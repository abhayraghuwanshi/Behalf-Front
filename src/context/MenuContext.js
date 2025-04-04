import React, { createContext, useContext, useEffect, useState } from 'react';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [selectedMenu, setSelectedMenu] = useState(() => {
        return localStorage.getItem('selectedMenu') || 'store';
    });

    const [adminTab, setAdminTab] = useState(() => {
        return parseInt(localStorage.getItem('activeAdminTab'), 10) || 0;
    });

    useEffect(() => {
        localStorage.setItem('selectedMenu', selectedMenu);
    }, [selectedMenu]);

    useEffect(() => {
        localStorage.setItem('activeAdminTab', adminTab);
    }, [adminTab]);

    return (
        <MenuContext.Provider value={{ selectedMenu, setSelectedMenu, adminTab, setAdminTab }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = () => useContext(MenuContext);