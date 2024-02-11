import axios from 'axios';

const api = axios.create({
  baseURL: 'https://hacker-news2-o.onrender.com', // Your Node.js server URL
});

export default api;