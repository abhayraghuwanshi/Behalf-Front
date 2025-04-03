import axios from 'axios';
import { BACKEND_API_URL } from '../env';

const ProductService = {
    getProducts: async (country) => {
        let url = `${BACKEND_API_URL}/api/stores/fetch?country=${country}`;

        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.log('Failed to fetch products');
        }
    },
};

export default ProductService;
