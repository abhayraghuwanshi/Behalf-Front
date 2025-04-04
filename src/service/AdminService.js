import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api"; // Adjust URL as needed

const AdminService = {
    fetchStores: async (setStores, country = "") => {
        try {
            const response = await axios.get(`${API_BASE_URL}/stores/fetch`, { params: { country } });
            setStores(response.data);
        } catch (error) {
            console.error("Error fetching stores:", error);
        }
    },

    addStore: async (storeData) => {
        try {
            await axios.post(`${API_BASE_URL}/stores`, storeData);
        } catch (error) {
            console.error("Error adding store:", error);
        }
    },

    fetchUsers: async (setUsers) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users`);
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    },

    assignUserRole: async (userId, role) => {
        try {
            await axios.put(`${API_BASE_URL}/users/${userId}/role`, { role });
        } catch (error) {
            console.error("Error assigning user role:", error);
        }
    },

    fetchInventory: async (storeId, setInventory) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/inventory/${storeId}`);
            setInventory(response.data);
        } catch (error) {
            console.error("Error fetching inventory:", error);
        }
    },

    addInventoryItem: async (storeId, sku, quantity, price) => {
        try {
            await axios.post(`${API_BASE_URL}/inventory`, { storeId, sku, quantity, price });
        } catch (error) {
            console.error("Error adding inventory item:", error);
        }
    },

    updateInventory: async (itemId, updatedData) => {
        try {
            await axios.put(`${API_BASE_URL}/inventory/${itemId}`, updatedData);
        } catch (error) {
            console.error("Error updating inventory:", error);
        }
    },

    deleteInventory: async (itemId) => {
        try {
            await axios.delete(`${API_BASE_URL}/inventory/${itemId}`);
        } catch (error) {
            console.error("Error deleting inventory:", error);
        }
    },
};

export default AdminService;
