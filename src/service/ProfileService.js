import axios from "axios";


class ProfileService {

    async fetchUser() {
        const response = await axios.get('http://localhost:8080/api/user/me', {
            withCredentials: true, // Important: needed for cookies
            headers: {
                'Accept': 'application/json'
            }
        });
        return response.data; // Only return the relevant data
    }
}



export default new ProfileService();
