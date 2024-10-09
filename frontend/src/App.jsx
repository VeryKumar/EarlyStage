import { useState } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import IdeaInputPage from './components/IdeaInputPage'
import AnalysisResultsPage from './components/AnalysisResultsPage'
import TemplateSelectionPage from './components/TemplateSelectionPage'

function App() {
  const [currentStep, setCurrentStep] = useState('welcome')
  const [ideaData, setIdeaData] = useState(null)
  const [templateData, setTemplateData] = useState(null)

  const handleStartJourney = () => {
    setCurrentStep('ideaInput')
  }

  const handleIdeaSubmit = (data) => {
    setIdeaData(data)
    setCurrentStep('analysisResults')
  }

  const handleMoveToTemplateSelection = () => {
    setCurrentStep('templateSelection')
  }

  const handleTemplateSelect = (data) => {
    setTemplateData(data)
    setCurrentStep('finalResult') // You'll need to create this step
  }

  return (
    <div className="App">
      {currentStep === 'welcome' && <WelcomeScreen onStart={handleStartJourney} />}
      {currentStep === 'ideaInput' && <IdeaInputPage onSubmit={handleIdeaSubmit} />}
      {currentStep === 'analysisResults' && <AnalysisResultsPage ideaData={ideaData} onNext={handleMoveToTemplateSelection} />}
      {currentStep === 'templateSelection' && <TemplateSelectionPage ideaData={ideaData} onTemplateSelect={handleTemplateSelect} />}
      {/* TODO: Add FinalResultPage component */}
    </div>
  )
}

export default App