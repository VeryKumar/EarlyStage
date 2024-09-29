import { useState } from 'react'

function IdeaInputPage({ onSubmit }) {
  const [ideaDescription, setIdeaDescription] = useState('')
  const [appName, setAppName] = useState('')
  const [category, setCategory] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:8000/analyze-idea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ideaDescription, appName, category }),
      })
      const data = await response.json()
      setAnalysis(data)
      onSubmit({ ideaDescription, appName, category, analysis: data })
    } catch (error) {
      console.error('Error analyzing idea:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="idea-input-page">
      <h2>Describe Your App Idea</h2>
      <form onSubmit={handleSubmit}>
        {/* ... existing form fields ... */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Analyzing...' : 'Analyze My Idea'}
        </button>
      </form>
      {analysis && (
        <div className="analysis-results">
          <h3>Analysis Results</h3>
          <p>Market Potential: {analysis.marketPotential}/10</p>
          <p>Technical Complexity: {analysis.technicalComplexity}/10</p>
          <p>Uniqueness: {analysis.uniqueness}/10</p>
          <p>Overall Score: {analysis.overallScore}/10</p>
          <h4>Analysis:</h4>
          <p>{analysis.analysis}</p>
        </div>
      )}
    </div>
  )
}

export default IdeaInputPage