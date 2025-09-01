// src/services/api.js
import { CONFIG } from '../config';
import { mockApi } from '../mock';

class ApiService {
  constructor() {
    this.baseURL = CONFIG.API.BASE_URL;
    this.token = localStorage.getItem('authToken');
    this.useMock = CONFIG.FEATURES.USE_MOCK_DATA;
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  // Generic request method (for real APIs later)
  async request(endpoint, options = {}) {
    if (this.useMock) {
      // This will be replaced with real fetch when USE_MOCK_DATA = false
      throw new Error('Mock mode: Use specific methods instead');
    }
    
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { 'Authorization': `Bearer ${this.token}` })
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Pre-defined methods - switch between mock and real easily
  auth = {
    login: async (credentials) => {
      if (this.useMock) {
        await new Promise(resolve => setTimeout(resolve, CONFIG.API.MOCK_DELAY));
        // Mock login validation
        if (credentials.email === 'user@example.com' && credentials.password === 'password123') {
          return { 
            user: { id: 1, email: credentials.email, firstName: 'Jhon', lastName: 'Doe' },
            token: 'mock-jwt-token'
          };
        }
        throw new Error('Invalid credentials');
      }
      return this.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      });
    },
    
    register: async (userData) => {
      if (this.useMock) {
        await new Promise(resolve => setTimeout(resolve, CONFIG.API.MOCK_DELAY));
        return { 
          user: { ...userData, id: Date.now() },
          token: 'mock-jwt-token'
        };
      }
      return this.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
      });
    }
  };

  profile = {
    get: async () => {
      if (this.useMock) return mockApi.profile.get();
      return this.request('/profile');
    },
    
    update: async (data) => {
      if (this.useMock) return mockApi.profile.update(data);
      return this.request('/profile', {
        method: 'PUT',
        body: JSON.stringify(data)
      });
    }
  };

  cars = {
    list: async (params = {}) => {
      if (this.useMock) return mockApi.cars.list(params);
      const queryString = new URLSearchParams(params).toString();
      return this.request(`/cars${queryString ? `?${queryString}` : ''}`);
    },
    
    get: async (id) => {
      if (this.useMock) return mockApi.cars.get(id);
      return this.request(`/cars/${id}`);
    }
  };

  auctions = {
    list: async (params = {}) => {
      if (this.useMock) return mockApi.auctions.list(params);
      const queryString = new URLSearchParams(params).toString();
      return this.request(`/auctions${queryString ? `?${queryString}` : ''}`);
    },
    
    get: async (id) => {
      if (this.useMock) return mockApi.auctions.get(id);
      return this.request(`/auctions/${id}`);
    },
    
    placeBid: async (id, bidData) => {
      if (this.useMock) return mockApi.auctions.placeBid(id, bidData);
      return this.request(`/auctions/${id}/bids`, {
        method: 'POST',
        body: JSON.stringify(bidData)
      });
    }
  };

  dashboard = {
    stats: async () => {
      if (this.useMock) return mockApi.dashboard.stats();
      return this.request('/dashboard/stats');
    }
  };
}

export default new ApiService();