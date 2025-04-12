import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api"; // Adjust URL as needed

const AdminService = {
    fetchStores: async (setStores, country = "") => {
        try {
            const response = await axios.get(`${API_BASE_URL}/stores/fetch`, { params: { country }, withCredentials: true });
            setStores(response.data);
        } catch (error) {
            console.error("Error fetching stores:", error);
            setStores([]); // Set to empty array in case of error
        }
    },

    addStore: async (storeData) => {
        try {
            await axios.post(`${API_BASE_URL}/stores`, storeData, {
                withCredentials: true,

            });
        } catch (error) {
            console.error("Error adding store:", error);
        }
    },

    fetchUsers: async (setUsers) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users`, {
                withCredentials: true,
                headers: {
                    "Accept": "application/json",
                },
            });
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    },

    assignUserRole: async (userId, role) => {
        try {
            await axios.post(`${API_BASE_URL}/admin/users/assign-role`, { 'role': role, 'userId': userId }, {
                withCredentials: true,
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            });
        } catch (error) {
            console.error("Error assigning user role:", error);
        }
    },

    searchUsers: async (query) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/user/search?query=${encodeURIComponent(query)}`, {
                withCredentials: true,
                headers: {
                    "Accept": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error searching users:", error);
            return []; // Return an empty array in case of error
        }
    },

    getUsersByRole: async (role) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/admin/users/role/${role}`, {
                withCredentials: true,
                headers: {
                    "Accept": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching users with role ${role}:`, error);
            return []; // Return empty array to avoid crash on frontend
        }
    },

    fetchInventory: async (setInventory) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/inventory`, {
                withCredentials: true,
                headers: {
                    "Accept": "application/json",
                },
            });
            setInventory(response.data);
        } catch (error) {
            console.error("Error fetching inventory:", error);
        }
    },

    addInventoryItem: async (payload) => {
        try {
            await axios.post(`${API_BASE_URL}/inventory`, payload, {
                withCredentials: true,
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            });
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
