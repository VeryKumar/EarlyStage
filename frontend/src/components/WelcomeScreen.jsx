import React, { useState } from 'react';
import './WelcomeScreen.css';

function WelcomeScreen({ onStart }) {


  return (
    <div className={"welcome-screen"}>
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