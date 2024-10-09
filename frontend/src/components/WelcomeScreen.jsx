import React from 'react';
import { useSpring, animated } from 'react-spring';
import './WelcomeScreen.css';

function WelcomeScreen({ onStart }) {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  return (
    <animated.div style={fadeIn} className="welcome-screen">
      <h1 className="welcome-title">
        <i className="fas fa-rocket rocket-icon"></i> Welcome to EarlyStage MVP Builder
      </h1>
      <p className="welcome-subtitle">Turn your app idea into reality in minutes!</p>
      <button onClick={onStart} className="start-button">
        <i className="fas fa-play"></i> Start Your MVP Journey
      </button>
    </animated.div>
  );
}

export default WelcomeScreen;