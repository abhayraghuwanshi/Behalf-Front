import axios from 'axios';
import { BACKEND_API_URL } from '../env';

const ProductService = {
    getProducts: async (name, price) => {
        let url = `${BACKEND_API_URL}/api/store/products`;
        const params = {};
        if (name) params.name = name;
        if (price) params.price = price;

        try {
            const response = await axios.get(url, { params });
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch products');
        }
    },
};

export default ProductService;
