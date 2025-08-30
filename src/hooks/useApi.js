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
  return useApi('/dashboard/stats');
};

export const useAuctions = (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const endpoint = `/auctions${queryString ? `?${queryString}` : ''}`;
  return useApi(endpoint);
};