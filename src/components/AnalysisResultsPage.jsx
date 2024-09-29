function AnalysisResultsPage({ ideaData }) {
    // Mock analysis - in a real app, this would come from an API call
    const mockAnalysis = {
      summary: "An app for booking last-minute fitness classes",
      keyFeatures: ["Class search", "Booking system", "User profiles"],
      category: "Health & Fitness",
      userBase: "Busy professionals in urban areas",
    }
  
    return (
      <div className="analysis-results-page">
        <h2>Analysis Results</h2>
        <div className="result-section">
          <h3>Summary</h3>
          <p>{mockAnalysis.summary}</p>
        </div>
        <div className="result-section">
          <h3>Key Features</h3>
          <ul>
            {mockAnalysis.keyFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <div className="result-section">
          <h3>Suggested Category</h3>
          <p>{mockAnalysis.category}</p>
        </div>
        <div className="result-section">
          <h3>Potential User Base</h3>
          <p>{mockAnalysis.userBase}</p>
        </div>
        <button>Move to Template Selection</button>
      </div>
    )
  }
  
  export default AnalysisResultsPage