import React, { useEffect, useState } from 'react';
import AdminService from '../../service/AdminService';
import AdminPanel from '../admin/AdminPanel';
import { useCountry } from '../navbar/CountryProvider';
import { useAuth } from '../SignIn/AuthContext'; // Assuming AuthContext provides userId
import CartCheckout from './CartCheckout';
import FloatingMenu from './FloatingMenu';
import MyOrders from './MyOrders';
import ProductList from './ProductList';

function QuestStore() {
    const [selected, setSelected] = useState('store');
    const { selectedCountry, setSelectedCountry } = useCountry();
    const { userId } = useAuth(); // Get userId from AuthContext
    const [isAdmin, setIsAdmin] = useState(false);

    // Initialize cart from local storage (if available)
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Check if the user is an admin or manager when the component mounts
    useEffect(() => {
        const checkAdminStatus = async () => {
            if (userId) {
                try {
                    const result = await AdminService.isAdminOrManager(userId);
                    setIsAdmin(result);
                } catch (error) {
                    console.error("Error checking admin status:", error);
                }
            }
        };
        checkAdminStatus();
    }, [isAdmin, userId]);

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
            case 'admin':
                return <AdminPanel />; // Placeholder for admin panel
            default:
                return <ProductList cart={cart} onAddOrUpdateCart={handleAddOrUpdateCart} />;
        }
    };

    return (
        <div style={{ marginTop: '60px' }}>
            <div>{renderContent()}</div>
            <FloatingMenu selected={selected} onMenuSelect={setSelected} isAdmin={true} />
        </div>
    );
}

export default QuestStore;
