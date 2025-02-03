import axios from 'axios';
import { BACKEND_API_URL } from '../env';

const API_URL = `${BACKEND_API_URL}/api/quests`;

class PostService {
  async getPosts() {
    return axios.get(API_URL + "/fetch", {
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    });

  }


  async createPost(post) {
    return axios.post(API_URL + "/create", post, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',  // Add this to avoid issues
      },
      withCredentials: true,  // Ensure credentials (cookies/tokens) are sent
    });
  }


  async agreePost(postAgreement) {
    return await axios.post(API_URL + "/agreement", postAgreement, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    });
  }

  async updatePost(postAgreement) {
    return await axios.post(API_URL + "/update", postAgreement, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    });
  }





}

export default new PostService();
