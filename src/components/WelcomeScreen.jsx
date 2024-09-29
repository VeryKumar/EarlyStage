function WelcomeScreen({ onStart }) {
    return (
      <div className="welcome-screen">
        <h1>Welcome to EarlyStage MVP Builder</h1>
        <p>Turn your app idea into reality in minutes!</p>
        <button onClick={onStart}>Start Your MVP Journey</button>
      </div>
    )
  }
  
  export default WelcomeScreen