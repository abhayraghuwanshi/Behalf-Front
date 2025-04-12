// services/productService.js
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/products";

export const getProducts = async () => {
    try {
        const response = await axios.get(BASE_URL, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status !== 200) {
            throw new Error("Failed to fetch products");
        }
        return response.data;
    } catch (err) {
        console.error("Failed to fetch products:", err);
        return []; // Fallback value
    }
};

export const getProduct = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (err) {
        console.error("Failed to fetch product:", err);
        return null;
    }
};

export const createProduct = async ({ name, sku, description, images }) => {
    try {
        const formData = new FormData();

        const productBlob = new Blob(
            [JSON.stringify({ name, sku, description })],
            { type: "application/json" }
        );
        formData.append("product", productBlob);

        if (images && images.length > 0) {
            images.forEach((img) => formData.append("images", img));
        }

        const response = await axios.post(BASE_URL, formData, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (err) {
        console.error("Failed to create product:", err);
        return null;
    }
};


export const updateProduct = async (id, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, data, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        return response.data;
    } catch (err) {
        console.error("Failed to update product:", err);
        return null;
    }
};

export const deleteProduct = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return true;
    } catch (err) {
        console.error("Failed to delete product:", err);
        return false;
    }
};

