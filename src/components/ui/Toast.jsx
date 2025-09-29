// src/components/ui/Toast.jsx
import React from 'react';

const Toast = ({ message, type, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white font-medium max-w-xs ${
      type === 'error' ? 'bg-red-600' : 'bg-green-600'
    }`}>
      {message}
      <button onClick={onClose} className="ml-3 text-white hover:text-gray-200">×</button>
    </div>
  );
};

export default Toast;