import axios from "axios";
import { BACKEND_API_URL } from '../env';

const API_BASE_URL = `${BACKEND_API_URL}/api/ratings`;  // update your backend URL

const ratingService = {
    submitRating: async (ratingData) => {
        try {
            const response = await axios.post(API_BASE_URL, ratingData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // you can add more APIs later like getRatings, updateRating, etc.
};

export default ratingService;
