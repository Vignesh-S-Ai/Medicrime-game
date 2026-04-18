import React from 'react';
import './SymptomsPanel.css';

function SymptomsPanel({ symptoms }) {
  return (
    <div className="symptoms-panel card">
      <div className="card-header">
        <h2>Symptoms</h2>
      </div>
      
      <div className="symptoms-list">
        {symptoms && symptoms.length > 0 ? (
          symptoms.map((symptom, index) => (
            <div key={index} className="symptom-item">
              <span className="symptom-bullet">●</span>
              <span className="symptom-text">{symptom}</span>
            </div>
          ))
        ) : (
          <p className="no-symptoms">No symptoms available</p>
        )}
      </div>
    </div>
  );
}

export default SymptomsPanel;
