import React, { useState } from 'react';
import './DiagnosisForm.css';

const commonDiagnoses = [
  'Hypothyroidism',
  'Hyperthyroidism',
  'Diabetes Type 1',
  'Diabetes Type 2',
  'Depression',
  'Anxiety Disorder',
  'Chronic Fatigue Syndrome',
  'Anemia',
  'Sleep Apnea',
  'Cushing\'s Syndrome',
  'Addison\'s Disease',
  'Other',
];

function DiagnosisForm({ onSubmit }) {
  const [diagnosis, setDiagnosis] = useState('');
  const [customDiagnosis, setCustomDiagnosis] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!diagnosis) return;

    setIsSubmitting(true);
    const finalDiagnosis = diagnosis === 'Other' ? customDiagnosis : diagnosis;
    
    setTimeout(() => {
      onSubmit(finalDiagnosis);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="diagnosis-form card">
      <div className="card-header">
        <h2>Submit Your Diagnosis</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="diagnosis">Select your diagnosis:</label>
          <select
            id="diagnosis"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            required
          >
            <option value="">-- Select a diagnosis --</option>
            {commonDiagnoses.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {diagnosis === 'Other' && (
          <div className="form-group">
            <label htmlFor="custom">Please specify:</label>
            <input
              type="text"
              id="custom"
              value={customDiagnosis}
              onChange={(e) => setCustomDiagnosis(e.target.value)}
              placeholder="Enter your diagnosis"
              required
            />
          </div>
        )}

        <div className="form-actions">
          <button 
            type="submit" 
            className="primary submit-btn"
            disabled={!diagnosis || (diagnosis === 'Other' && !customDiagnosis) || isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Diagnosis'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default DiagnosisForm;
