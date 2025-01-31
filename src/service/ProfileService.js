import axios from "axios";
import { BACKEND_API_URL } from "../env";

const API_URL = `${BACKEND_API_URL}/api/user`;

class ProfileService {

    async fetchUser() {
        const response = await axios.get(`${API_URL}/me`, {
            withCredentials: true, // Important: needed for cookies
            headers: {
                'Accept': 'application/json'
            }
        });
        return response.data; // Only return the relevant data
    }

    async fetchUserByEmail(ids) {
        const response = await axios.post(`${API_URL}/info`, ids, {
            withCredentials: true, // Important: needed for cookies
            headers: {
                'Accept': 'application/json'
            }
        });
        return response; // Only return the relevant data
    }
}



export default new ProfileService();
