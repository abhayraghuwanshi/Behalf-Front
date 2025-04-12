// services/productService.js
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/products";

export const getProducts = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (err) {
        console.error("Failed to fetch products:", err);
        return []; // Fallback value
    }
};

export const getProduct = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (err) {
        console.error("Failed to fetch product:", err);
        return null;
    }
};

export const createProduct = async (data) => {
    try {
        const response = await axios.post(BASE_URL, data);
        return response.data;
    } catch (err) {
        console.error("Failed to create product:", err);
        return null;
    }
};

export const updateProduct = async (id, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, data);
        return response.data;
    } catch (err) {
        console.error("Failed to update product:", err);
        return null;
    }
};

export const deleteProduct = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
        return true;
    } catch (err) {
        console.error("Failed to delete product:", err);
        return false;
    }
};

