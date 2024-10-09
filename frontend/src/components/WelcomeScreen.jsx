import React, { useEffect, useState } from 'react';
import './WelcomeScreen.css';

function WelcomeScreen({ onStart }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`welcome-screen ${isVisible ? 'visible' : ''}`}>
      <h1 className="welcome-title">
        <i className="fas fa-rocket rocket-icon"></i> Welcome to EarlyStage MVP Builder
      </h1>
      <p className="welcome-subtitle">Turn your app idea into reality in minutes!</p>
      <button onClick={onStart} className="start-button">
        <i className="fas fa-play"></i> Start Your MVP Journey
      </button>
    </div>
  );
}

export default WelcomeScreen;