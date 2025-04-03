import React, { useEffect, useState } from 'react';
import { useCountry } from '../navbar/CountryProvider';
import CartCheckout from './CartCheckout';
import FloatingMenu from './FloatingMenu';
import MyOrders from './MyOrders';
import ProductList from './ProductList';

function QuestStore() {
    const [selected, setSelected] = useState('store');
    const { selectedCountry, setSelectedCountry } = useCountry();
    // Initialize cart from local storage (if available)
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Update local storage whenever the cart changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Function to add or update product in the cart
    const handleAddOrUpdateCart = (product, quantity) => {
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            const updatedCart = cart
                .map(item => item.id === product.id ? { ...item, quantity } : item)
                .filter(item => item.quantity > 0);
            setCart(updatedCart);
        } else {
            setCart([...cart, { ...product, quantity }]);
        }
    };

    const renderContent = () => {
        switch (selected) {
            case 'store':
                return <ProductList cart={cart} onAddOrUpdateCart={handleAddOrUpdateCart} selectedCountry={selectedCountry} />;
            case 'orderlist':
                return <CartCheckout cart={cart} onAddOrUpdateCart={handleAddOrUpdateCart} />;
            case 'myorders':
                return <MyOrders />;
            default:
                return <ProductList cart={cart} onAddOrUpdateCart={handleAddOrUpdateCart} />;
        }
    };

    return (
        <div style={{ marginTop: '60px' }}>
            <div>{renderContent()}</div>
            <FloatingMenu selected={selected} onMenuSelect={setSelected} />
        </div>
    );
}

export default QuestStore;
