import React, { useState, useEffect } from 'react';

function TemplateSelectionPage({ ideaData, onTemplateSelect }) {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customizations, setCustomizations] = useState('');

  useEffect(() => {
    // Fetch templates based on ideaData
    fetchTemplates(ideaData);
  }, [ideaData]);

  const fetchTemplates = async (ideaData) => {
    // TODO: Replace with actual API call
    const mockTemplates = [
      { id: 1, name: 'E-commerce App', description: 'A template for online stores' },
      { id: 2, name: 'Social Media App', description: 'A template for social networking' },
      { id: 3, name: 'Productivity App', description: 'A template for task management' },
    ];
    setTemplates(mockTemplates);
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleCustomizationChange = (e) => {
    setCustomizations(e.target.value);
  };

  const handleSubmit = () => {
    onTemplateSelect({ template: selectedTemplate, customizations });
  };

  return (
    <div className="template-selection-page">
      <h2>Select a Template</h2>
      <div className="templates-list">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`template-item ${selectedTemplate === template ? 'selected' : ''}`}
            onClick={() => handleTemplateSelect(template)}
          >
            <h3>{template.name}</h3>
            <p>{template.description}</p>
          </div>
        ))}
      </div>
      {selectedTemplate && (
        <div className="template-customization">
          <h3>Customize Your Template</h3>
          <textarea
            value={customizations}
            onChange={handleCustomizationChange}
            placeholder="Describe any customizations you'd like for this template..."
            rows={5}
          />
        </div>
      )}
      <button onClick={handleSubmit} disabled={!selectedTemplate}>
        Generate App
      </button>
    </div>
  );
}

export default TemplateSelectionPage;