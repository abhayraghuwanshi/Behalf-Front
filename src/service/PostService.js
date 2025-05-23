import axios from 'axios';
import { BACKEND_API_URL } from '../env';

const API_URL = `${BACKEND_API_URL}/api/quests`;

class PostService {
  async getPosts(params = {}) {
    return axios.get(`${BACKEND_API_URL}/public/api/quests/fetch`, {
      params, // Include country or other parameters
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
      },
    });
  }

  async createPost(post) {

    return axios.post(API_URL + "/create", post,
      {
        withCredentials: true,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',  // Add this to avoid issues
        },
      });
  }


  async agreePost(postAgreement) {
    return await axios.post(`${BACKEND_API_URL}/api/quests/agreement`, postAgreement, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    });
  }

  async updatePost(postAgreement) {
    console.log(postAgreement);
    return await axios.post(`${BACKEND_API_URL}/api/quests/update/` + postAgreement?.questId, postAgreement, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    });
  }

  async getPostById(postId) {
    try {
      const response = await axios.get(`${BACKEND_API_URL}/public/api/quests/detail?postId=${postId}`, { withCredentials: true });
      return response.data;

    } catch (error) {
      console.error(" failed:", error);
    }
  }

  async getSimilarPosts(postId) {

    try {
      const response = await axios.get(`${BACKEND_API_URL}/public/api/quests/recommend?questId=${postId}`,
        { withCredentials: true });
      return response.data;

    } catch (error) {
      console.error("Logout failed:", error);
    }

  }
}

export default new PostService();
