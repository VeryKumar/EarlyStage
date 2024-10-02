import { useState } from 'react'

function IdeaInputPage({ onSubmit }) {
  const [ideaDescription, setIdeaDescription] = useState('')
  const [appName, setAppName] = useState('')
  const [category, setCategory] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // ... existing imports and component declaration ...

const handleSubmit = async (e) => {
  e.preventDefault()
  setIsLoading(true)

  console.log("All Vite env variables:", import.meta.env);
  console.log("API URL:", import.meta.env.VITE_API_URL);
    
    // ... rest of your component code ...

  // try {
  //   const response = await fetch('http://localhost:8000/analyze-idea', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ ideaDescription, appName, category }),
  //   })
  //   const analysisData = await response.json()
  //   onSubmit({ ideaDescription, appName, category, analysis: analysisData })
  // } catch (error) {
  //   console.error('Error analyzing idea:', error)
  // } finally {
  //   setIsLoading(false)
  // }
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/analyze-idea`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': window.location.origin,
      },
      body: JSON.stringify({ ideaDescription, appName, category }),
    })
    const rawText = await response.text()
    console.log("Raw response from backend:", rawText)
    const analysisData = JSON.parse(rawText)
    onSubmit({ ideaDescription, appName, category, analysis: analysisData })
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
      <label htmlFor="appName">App Name:</label>
        <input
          id="appName"
          value={appName}
          onChange={(e) => setAppName(e.target.value)}
          placeholder="Enter your app name..."
        />

        <label htmlFor="category">Category:</label>
        <input
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter your app category..."
        />
      <label htmlFor="ideaDescription">Idea Description:</label>
        <textarea
          id="ideaDescription"
          value={ideaDescription}
          onChange={(e) => setIdeaDescription(e.target.value)}
          rows={5}
          placeholder="Enter your app idea description here..."
        />
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