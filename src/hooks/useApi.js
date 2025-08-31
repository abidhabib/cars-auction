// src/hooks/useApi.js
import { useState, useEffect } from 'react';
import api from '../services/api';

export const useApi = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await api.request(endpoint, options);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (endpoint) {
      fetchData();
    }
  }, [endpoint]);

  return { data, loading, error };
};

// Specific hooks for common operations
export const useCars = (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const endpoint = `/cars${queryString ? `?${queryString}` : ''}`;
  return useApi(endpoint);
};

export const useDashboardStats = () => {
  // For now, return mock data since we're using dummy data
  const mockData = {
    stats: [
      { id: 1, name: 'Active Auctions', value: 24, change: '+12%' },
      { id: 2, name: 'Total Sales', value: 234500, change: '+8.2%' },
      { id: 3, name: 'Active Bidders', value: 156, change: '+5.4%' },
      { id: 4, name: 'Average Bid', value: 12400, change: '-2.3%' },
    ],
    recentAuctions: [],
    upcomingDeliveries: []
  };

  return {
    data: mockData,
    loading: false,
    error: null
  };
};

export const useAuctions = (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const endpoint = `/auctions${queryString ? `?${queryString}` : ''}`;
  return useApi(endpoint);
};