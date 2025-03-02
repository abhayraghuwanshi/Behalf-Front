import React from 'react';
import './FloatingMenu.css';

function FloatingMenu({ selected, onMenuSelect }) {
    const handleSelection = (menu) => {
        onMenuSelect(menu);
    };

    return (
        <div className="floating-menu">
            <button
                className={selected === 'store' ? 'active' : ''}
                onClick={() => handleSelection('store')}
            >
                Store
            </button>
            <button
                className={selected === 'orderlist' ? 'active' : ''}
                onClick={() => handleSelection('orderlist')}
            >
                Cart
            </button>
            <button
                className={selected === 'myorders' ? 'active' : ''}
                onClick={() => handleSelection('myorders')}
            >
                My Orders
            </button>
        </div>
    );
}

export default FloatingMenu;
