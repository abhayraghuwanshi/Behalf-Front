// src/service/PriceService.js
import axios from 'axios';
import { BACKEND_API_URL } from '../env';

const API_URL = `${BACKEND_API_URL}/api/product-prices`;

const axiosConfig = {
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
};

export const getPrices = async () => {
    try {
        const res = await axios.get(API_URL, axiosConfig);
        return res.data;
    } catch (err) {
        console.error("Failed to fetch prices:", err);
        return [];
    }
};

export const createPrice = async (payload) => {
    try {
        const res = await axios.post(API_URL, payload, axiosConfig);
        return res.data;
    } catch (err) {
        console.error("Failed to create price:", err);
        throw err;
    }
};

export const updatePrice = async (id, payload) => {
    try {
        const res = await axios.put(`${API_URL}/${id}`, payload, axiosConfig);
        return res.data;
    } catch (err) {
        console.error("Failed to update price:", err);
        throw err;
    }
};

export const deletePrice = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`, axiosConfig);
    } catch (err) {
        console.error("Failed to delete price:", err);
        throw err;
    }
};

export const getPriceById = async (id) => {
    try {
        const res = await axios.get(`${API_URL}/${id}`, axiosConfig);
        return res.data;
    } catch (err) {
        console.error("Failed to fetch price by id:", err);
        return null;
    }
};
