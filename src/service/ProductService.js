import axios from 'axios';
import { BACKEND_API_URL } from '../env';

const ProductService = {
    getProducts: async (country) => {
        let url = `${BACKEND_API_URL}/api/product-view/by-country?country=${country}`;
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.log('Failed to fetch products');
        }
    },

    getOrders: async (status) => {
        const url = status
            ? `${BACKEND_API_URL}/api/store/orders?status=${status}`
            : `${BACKEND_API_URL}/api/store/orders`;
        try {
            const response = await axios.get(url, {
                wuthCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (err) {
            console.error('Failed to fetch orders:', err);
            return [];
        }

    },

    placeOrder: async (payload) => {
        try {
            const response = await axios.post(`${BACKEND_API_URL}/api/orders/place-from-cart`, null, {
                params: payload,
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (err) {
            console.error('Failed to place order:', err);
        }
    },

    getMyOrders: async (userId) => {
        try {
            const response = await axios.get(`${BACKEND_API_URL}/api/orders/user/${userId}`, {
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (err) {
            console.error('Failed to fetch user orders:', err);
        }
    },
};

export default ProductService;
