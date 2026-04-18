import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ResultPage.css';

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { diagnosis, correctDiagnosis, score, isCorrect } = location.state || {};

  const handlePlayAgain = () => {
    navigate('/');
  };

  const handleNewCase = () => {
    navigate('/case');
  };

  return (
    <div className="result-page">
      <div className="result-card card">
        <div className={`result-icon ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? '✓' : '✗'}
        </div>
        
        <h2 className="result-title">
          {isCorrect ? 'Correct Diagnosis!' : 'Incorrect Diagnosis'}
        </h2>
        
        <div className="score-display">
          <div className="score-value">{score || 0}</div>
          <div className="score-label">Points Earned</div>
        </div>

        <div className="result-comparison">
          <div className="result-item your-answer">
            <div className="result-item-label">Your Diagnosis</div>
            <div className="result-item-value">{diagnosis || 'No diagnosis submitted'}</div>
          </div>
          
          <div className="result-divider">VS</div>
          
          <div className="result-item correct-answer">
            <div className="result-item-label">Correct Answer</div>
            <div className="result-item-value">{correctDiagnosis || 'Hypothyroidism'}</div>
          </div>
        </div>

        <div className={`result-message ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect 
            ? 'Excellent work! Your diagnostic skills are impressive.'
            : 'Keep practicing! Review the symptoms and try again.'}
        </div>

        <div className="result-actions">
          <button className="primary" onClick={handleNewCase}>
            Try Another Case
          </button>
          <button className="secondary" onClick={handlePlayAgain}>
            Back to Dashboard
          </button>
        </div>
      </div>

      <div className="feedback-card card">
        <div className="card-header">
          <h2>Case Summary</h2>
        </div>
        <div className="feedback-content">
          <p>
            The patient presented with classic symptoms of <strong>{correctDiagnosis || 'Hypothyroidism'}</strong>, 
            including fatigue, weight gain, cold intolerance, and depression. These symptoms, combined with 
            the decreased heart rate (bradycardia) of 58 bpm, strongly pointed to an underactive thyroid gland.
          </p>
          <div className="key-findings">
            <h3>Key Findings:</h3>
            <ul>
              <li>Fatigue and depression suggest metabolic dysfunction</li>
              <li>Weight gain and cold intolerance indicate thyroid involvement</li>
              <li>Bradycardia (HR 58) is consistent with hypothyroidism</li>
              <li>Dry skin and hair loss support thyroid disorder diagnosis</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
