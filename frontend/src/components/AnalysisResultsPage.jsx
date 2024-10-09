import React, { useState } from 'react';

const ScoreItem = ({ label, value }) => {
  const getScoreColor = (score) => {
    if (score >= 8) return 'score-high';
    if (score >= 4) return 'score-medium';
    return 'score-low';
  };

  return (
    <div className="score-item">
      <span className="score-label">{label}:</span>
      <span className={`score-value ${getScoreColor(value)}`}>
        {value ?? 'N/A'}/10
      </span>
    </div>
  );
};

function AnalysisResultsPage({ ideaData, onNext }) {
  const { ideaDescription, appName, category, analysis } = ideaData;
  const [suggestedFeatures, setSuggestedFeatures] = useState(analysis?.suggestedFeatures || []);
  const [prioritizedFeatures, setPrioritizedFeatures] = useState([]);

  const handleFeaturePrioritization = (feature) => {
    if (prioritizedFeatures.includes(feature)) {
      setPrioritizedFeatures(prioritizedFeatures.filter(f => f !== feature));
    } else {
      setPrioritizedFeatures([...prioritizedFeatures, feature]);
    }
  };

  const handleNext = () => {
    onNext({ ...ideaData, prioritizedFeatures });
  };

  return (
    <div className="analysis-results-page">
      <h2>Analysis Results for {appName}</h2>
      <div className="result-section">
        <h3>Category</h3>
        <p>{category}</p>
      </div>
      <div className="result-section">
        <h3>App Description</h3>
        <p>{ideaDescription}</p>
      </div>
      <div className="result-section">
        <h3>Analysis Scores</h3>
        <div className="analysis-scores">
          <ScoreItem label="Market Potential" value={analysis?.marketPotential} />
          <ScoreItem label="Technical Complexity" value={analysis?.technicalComplexity} />
          <ScoreItem label="Uniqueness" value={analysis?.uniqueness} />
          <ScoreItem label="Overall Score" value={analysis?.overallScore} />
        </div>
      </div>
      <div className="result-section">
        <h3>Detailed Analysis</h3>
        <p>{analysis?.analysis ?? 'No detailed analysis available.'}</p>
      </div>

      <div className="result-section">
        <h3>Suggested Core Features</h3>
        <p>Select features to prioritize them for your MVP:</p>
        <div className="feature-list">
          {suggestedFeatures.map((feature, index) => (
            <div key={index} className="feature-item">
              <label>
                <input
                  type="checkbox"
                  checked={prioritizedFeatures.includes(feature)}
                  onChange={() => handleFeaturePrioritization(feature)}
                />
                <span className="feature-name">{feature}</span>
              </label>
              {prioritizedFeatures.includes(feature) && (
                <span className="priority-badge">
                  Priority {prioritizedFeatures.indexOf(feature) + 1}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleNext}>Continue to Template Selection</button>
    </div>
  );
}

export default AnalysisResultsPage;