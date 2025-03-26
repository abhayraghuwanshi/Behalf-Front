import axios from 'axios';

import { BACKEND_API_URL } from '../env.js';



class ImageService {
    /**
     * Create an image service instance
     * @param {Object} [options={}] - Configuration options
     * @param {string} [options.baseUrl=''] - Base URL for image fetching
     * @param {number} [options.timeout=10000] - Request timeout in milliseconds
     * @param {Object} [options.headers={}] - Additional headers to send with requests
     */
    constructor(options = {}) {
        this.baseUrl = options.baseUrl || 'https://your-api-domain.com/';
        this.timeout = options.timeout || 10000; // 10 seconds default
        this.headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };
    }

    /**
     * Fetch image by its unique identifier
     * @param {string} imagePath - The path in the format "bucketName/fileName"
     * @returns {Promise<string>} Promise resolving to image data URL
     */
    async fetchImage(imagePath) {
        try {
            const response = await axios.get(`${this.baseUrl}/${imagePath}`, {
                timeout: this.timeout,
                headers: this.headers,
                responseType: 'blob' // Important for handling image data
            });

            // Convert blob to data URL
            return URL.createObjectURL(response.data);
        } catch (error) {
            console.error('Image fetch error:', error);
            throw new Error(`Failed to fetch image: ${imagePath}`);
        }
    }

    /**
     * Prefetch multiple images for improved performance
     * @param {string[]} imageIds - Array of image identifiers
     * @returns {Promise<Object>} Promise resolving to map of image IDs to data URLs
     */
    async prefetchImages(imageIds) {
        const fetchPromises = imageIds.map(async (imageId) => {
            try {
                const imageUrl = await this.fetchImage(imageId);
                return { [imageId]: imageUrl };
            } catch {
                return { [imageId]: null };
            }
        });

        const results = await Promise.all(fetchPromises);
        return Object.assign({}, ...results);
    }

    /**
     * Release memory for a previously fetched image
     * @param {string} imageUrl - Data URL to revoke
     */
    releaseImage(imageUrl) {
        URL.revokeObjectURL(imageUrl);
    }
}

// Example usage
const imageService = new ImageService({
    baseUrl: BACKEND_API_URL + '/api/v1/document',
    timeout: 15000
});

export default imageService;