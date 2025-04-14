import React, { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CartService from '../service/CartService';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [sessionId] = useState(() => {
        const existing = localStorage.getItem('sessionId');
        if (existing) return existing;
        const newSessionId = uuidv4();
        localStorage.setItem('sessionId', newSessionId);
        return newSessionId;
    });

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
            loadCart();
        }
    }, [sessionId]);

    const addOrUpdateCart = async (product, quantity) => {
        try {
            const payload = {
                sessionId,
                productId: product.productId,
                storeId: product.storeId,
                quantity,
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

            const updatedCart = await CartService.getCart(sessionId);
            setCart(updatedCart.items || []);
        } catch (error) {
            console.error("Error modifying cart:", error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addOrUpdateCart }}>
            {children}
        </CartContext.Provider>
    );
};
