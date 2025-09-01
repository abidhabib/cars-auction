// src/hooks/useApi.js
import { useState, useEffect } from 'react';
import api from '../services/api';

// Generic API hook
export const useApi = (apiMethod, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiMethod();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return { data, loading, error, refetch: fetchData };
};

// Feature-specific hooks
export const useProfile = () => useApi(() => api.profile.get(), []);

export const useCars = (params = {}) => 
  useApi(() => api.cars.list(params), [JSON.stringify(params)]);

export const useAuctions = (params = {}) => 
  useApi(() => api.auctions.list(params), [JSON.stringify(params)]);

export const useDashboardStats = () => 
  useApi(() => api.dashboard.stats(), []);