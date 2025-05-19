// services/discountService.js
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/discounts";

export const getDiscounts = async () => {
    try {
        const response = await axios.get(BASE_URL, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (err) {
        console.error("Failed to fetch discounts:", err);
        return [];
    }
};

export const getDiscount = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (err) {
        console.error("Failed to fetch discount:", err);
        return [];
    }
};

export const createDiscount = async (data) => {
    try {
        const response = await axios.post(BASE_URL, data, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (err) {
        console.error("Failed to create discount:", err);
        return null;
    }
};

export const updateDiscount = async (id, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, data, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (err) {
        console.error("Failed to update discount:", err);
        return null;
    }
};

export const deleteDiscount = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return true;
    } catch (err) {
        console.error("Failed to delete discount:", err);
        return false;
    }
};

