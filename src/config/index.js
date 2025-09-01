// src/config/index.js
// Use import.meta.env for Vite instead of process.env
export const CONFIG = {
  API: {
    BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    TIMEOUT: 10000,
    MOCK_DELAY: 800
  },
  APP: {
    NAME: 'AutoAuction',
    VERSION: '1.0.0'
  },
  FEATURES: {
    USE_MOCK_DATA: import.meta.env.VITE_USE_MOCK_DATA === 'true' || true
  }
};