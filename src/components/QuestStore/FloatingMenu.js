import React, { useEffect } from 'react';
import { useMenu } from '../../context/MenuContext';
import './FloatingMenu.css';

function FloatingMenu({ onMenuSelect }) {
    const { selectedMenu, setSelectedMenu, isAdminOrManager } = useMenu();

    const handleSelection = (menu) => {
        setSelectedMenu(menu);
        onMenuSelect(menu);
    };

    useEffect(() => {
        onMenuSelect(selectedMenu);
    }, [selectedMenu, onMenuSelect]);

    return (
        <div className="floating-menu">
            <button
                className={selectedMenu === 'store' ? 'active' : ''}
                onClick={() => handleSelection('store')}
            >
                Store
            </button>
            <button
                className={selectedMenu === 'orderlist' ? 'active' : ''}
                onClick={() => handleSelection('orderlist')}
            >
                Cart
            </button>
            <button
                className={selectedMenu === 'myorders' ? 'active' : ''}
                onClick={() => handleSelection('myorders')}
            >
                My Orders
            </button>
            {isAdminOrManager && (
                <button
                    className={selectedMenu === 'admin' ? 'active' : ''}
                    onClick={() => handleSelection('admin')}
                >
                    Admin
                </button>
            )}
        </div>
    );
}

export default FloatingMenu;
