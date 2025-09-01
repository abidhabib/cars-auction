// src/mock/index.js
import { CONFIG } from '../config';
import { mockCars } from './data/cars';
import { mockAuctions } from './data/auctions';
import { mockProfile } from './data/profile';
import { mockDashboardStats } from './data/dashboard';

// Utility to simulate API delay
export const mockDelay = (ms = CONFIG.API.MOCK_DELAY) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Mock API service
export const mockApi = {
  cars: {
    list: async (params = {}) => {
      await mockDelay();
      // Simulate pagination/search if needed
      return mockCars;
    },
    get: async (id) => {
      await mockDelay();
      return mockCars.find(car => car.id === parseInt(id)) || null;
    }
  },
  
  auctions: {
    list: async (params = {}) => {
      await mockDelay();
      return mockAuctions;
    },
    get: async (id) => {
      await mockDelay();
      return mockAuctions.find(auction => auction.id === parseInt(id)) || null;
    },
    placeBid: async (id, bidData) => {
      await mockDelay();
      // Simulate bid placement
      return { success: true, message: 'Bid placed successfully' };
    }
  },
  
  profile: {
    get: async () => {
      await mockDelay();
      return mockProfile;
    },
    update: async (data) => {
      await mockDelay();
      return { ...mockProfile, ...data };
    }
  },
  
  dashboard: {
    stats: async () => {
      await mockDelay();
      return mockDashboardStats;
    }
  }
};