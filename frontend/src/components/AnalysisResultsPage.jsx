function AnalysisResultsPage({ ideaData }) {
  const { ideaDescription, appName, category, analysis } = ideaData;
  
  console.log('Received ideaData:', ideaData);
  console.log('Analysis object:', analysis);

  return (
    <div className="analysis-results-page">
      <h2>Analysis Results for {appName}</h2>
      <div className="result-section">
        <h3>App Idea</h3>
        <p>{ideaDescription}</p>
      </div>
      <div className="result-section">
        <h3>Category</h3>
        <p>{category}</p>
      </div>
      <div className="result-section">
        <h3>Analysis Scores</h3>
        <ul>
          <li>Market Potential: {analysis?.marketPotential ?? 'N/A'}/10</li>
          <li>Technical Complexity: {analysis?.technicalComplexity ?? 'N/A'}/10</li>
          <li>Uniqueness: {analysis?.uniqueness ?? 'N/A'}/10</li>
          <li>Overall Score: {analysis?.overallScore ?? 'N/A'}/10</li>
        </ul>
      </div>
      <div className="result-section">
        <h3>Detailed Analysis</h3>
        <p>{analysis?.analysis ?? 'No detailed analysis available.'}</p>
      </div>
      <button>Move to Template Selection</button>
    </div>
  );
}

export default AnalysisResultsPage;