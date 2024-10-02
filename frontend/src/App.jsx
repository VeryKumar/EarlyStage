import { useState } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import IdeaInputPage from './components/IdeaInputPage'
import AnalysisResultsPage from './components/AnalysisResultsPage'

function App() {
  const [currentStep, setCurrentStep] = useState('welcome')
  const [ideaData, setIdeaData] = useState(null)

  const handleStartJourney = () => {
    setCurrentStep('ideaInput')
  }

  const handleIdeaSubmit = (data) => {
    setIdeaData(data)
    setCurrentStep('analysisResults')
  }

  return (
    <div className="App">
      {currentStep === 'welcome' && <WelcomeScreen onStart={handleStartJourney} />}
      {currentStep === 'ideaInput' && <IdeaInputPage onSubmit={handleIdeaSubmit} />}
      {currentStep === 'analysisResults' && <AnalysisResultsPage ideaData={ideaData} />}
    </div>
  )
}

export default App