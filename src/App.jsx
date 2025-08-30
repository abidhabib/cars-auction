// src/App.jsx
import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import SplashScreen from './components/common/SplashScreen';
import Home from './pages/Home';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onSplashComplete={() => setShowSplash(false)} />;
  }

  return (
    <AuthProvider>
      <LanguageProvider>
        <div className="App">
          <Home />
        </div>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;