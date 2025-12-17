// buyer-app/src/utils/auth.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
axios.defaults.baseURL = API_URL;

const authService = {
  setAuthToken: (token) => {
    if (token) {
      localStorage.setItem('buyer_token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('buyer_token');
      delete axios.defaults.headers.common['Authorization'];
    }
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('buyer_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  login: async (email, password) => {
    try {
      if (email === 'buyer@test.com' && password === 'password123') {
        const user = {
          id: 2,
          name: 'Test Buyer',
          email: email,
          role: 'buyer'
        };
        const token = 'buyer-jwt-token';
        
        authService.setAuthToken(token);
        localStorage.setItem('buyer_user', JSON.stringify(user));
        
        return { token, user };
      } else {
        throw new Error('Invalid credentials. Use buyer@test.com/password123');
      }
    } catch (error) {
      throw error.message || 'Login failed';
    }
  },

  register: async (userData) => {
    try {
      const { name, email, password } = userData;
      
      // Mock registration
      const user = {
        id: Date.now(),
        name,
        email,
        role: 'buyer'  // Always buyer in buyer-app
      };
      const token = `buyer-token-${user.id}`;
      
      authService.setAuthToken(token);
      localStorage.setItem('buyer_user', JSON.stringify(user));
      
      return { token, user };
    } catch (error) {
      throw error.message || 'Registration failed';
    }
  },

  logout: () => {
    localStorage.removeItem('buyer_token');
    localStorage.removeItem('buyer_user');
    delete axios.defaults.headers.common['Authorization'];
  },

  isAuthenticated: () => {
    return localStorage.getItem('buyer_token') !== null;
  }
};

const token = localStorage.getItem('buyer_token');
if (token) {
  authService.setAuthToken(token);
}

export default authService;