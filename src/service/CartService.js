import axios from 'axios';
import { BACKEND_API_URL } from '../env'; // Uncomment this line if you are using env.js

const API_BASE = BACKEND_API_URL + '/api/cart';

const CartService = {
    getCart: async (sessionId) => {
        const response = await axios.get(API_BASE, {
            params: { sessionId }
        });
        return response.data;
    },

    addItem: async (sessionId, productId, storeId, quantity) => {
        await axios.post(`${API_BASE}/add`, {
            sessionId,
            productId,
            storeId,
            quantity
        });
    },

    updateItem: async (sessionId, productId, storeId, quantity) => {
        await axios.put(`${API_BASE}/update`, {
            sessionId, // Ensure sessionId is passed correctly
            productId, // Ensure productId is passed correctly
            storeId,   // Ensure storeId is passed correctly
            quantity   // Ensure quantity is passed correctly
        });
    },

    removeItem: async (sessionId, productId) => {
        await axios.delete(`${API_BASE}/remove/${productId}`, {
            params: { sessionId }
        });
    },

    clearCart: async (sessionId) => {
        await axios.delete(`${API_BASE}/clear`, {
            params: { sessionId }
        });
    }
};

export default CartService;
