import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AdminService from '../../service/AdminService';
import CartService from '../../service/CartService';
import AdminPanel from '../admin/AdminPanel';
import { useCountry } from '../navbar/CountryProvider';
import { useAuth } from '../SignIn/AuthContext';
import FloatingMenu from './FloatingMenu';
import MyOrders from './MyOrders';
import CartCheckout from './StoreCartCheckout';
import ProductList from './StoreProductList';

function QuestStore() {
    const [selected, setSelected] = useState('store');
    const { selectedCountry } = useCountry();
    const { userId } = useAuth();
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);

    // Session ID fallback for guest users
    const [sessionId] = useState(() => {
        const existing = localStorage.getItem('sessionId');
        if (existing) return existing;
        const newSessionId = uuidv4();
        localStorage.setItem('sessionId', newSessionId);
        return newSessionId;
    });

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
    }, [userId]);

    // Load cart from backend
    useEffect(() => {
        const loadCart = async () => {
            try {
                const cartData = await CartService.getCart(sessionId);
                setCart(cartData.items || []);
            } catch (error) {
                console.error("Failed to load cart:", error);
            }
        };

        if (sessionId) {
            loadCart(); // Ensure this runs only when sessionId is available
        }
    }, [sessionId]); // Dependency array ensures this runs only when sessionId changes

    // Add or update cart item using backend
    const handleAddOrUpdateCart = async (product, quantity) => {
        try {
            const payload = {
                sessionId,
                productId: product.productId, // Ensure productId is correctly mapped
                storeId: product.storeId,     // Ensure storeId is correctly mapped
                quantity                      // Ensure quantity is passed correctly
            };

            if (quantity <= 0) {
                await CartService.removeItem(payload.sessionId, payload.productId);
            } else {
                const existing = cart.find(item => item.productId === product.productId);
                if (existing) {
                    await CartService.updateItem(payload.sessionId, payload.productId, payload.storeId, payload.quantity);
                } else {
                    await CartService.addItem(payload.sessionId, payload.productId, payload.storeId, payload.quantity);
                }
            }

            // Reload cart after change
            const updatedCart = await CartService.getCart(sessionId);
            setCart(updatedCart.items || []);
        } catch (error) {
            console.error("Error modifying cart:", error);
        }
    };

    const renderContent = () => {
        switch (selected) {
            case 'store':
                return <ProductList cart={cart} onAddOrUpdateCart={handleAddOrUpdateCart} selectedCountry={selectedCountry} />;
            case 'orderlist':
                return <CartCheckout cart={cart} onAddOrUpdateCart={handleAddOrUpdateCart} selectedCountry={selectedCountry} />;
            case 'myorders':
                return <MyOrders />;
            case 'admin':
                return <AdminPanel />;
            default:
                return <ProductList cart={cart} onAddOrUpdateCart={handleAddOrUpdateCart} />;
        }
    };

    return (
        <div style={{ marginTop: '60px' }}>
            <div>{renderContent()}</div>
            <FloatingMenu selected={selected} onMenuSelect={setSelected} isAdmin={isAdmin} cart={cart} />
        </div>
    );
}

export default QuestStore;
