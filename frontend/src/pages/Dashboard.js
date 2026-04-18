import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [isStarting, setIsStarting] = useState(false);

  const handleStartCase = () => {
    setIsStarting(true);
    navigate('/case');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-hero">
        <div className="hero-icon">🏥</div>
        <h2>Welcome to MedCrime AI</h2>
        <p>Test your diagnostic skills by analyzing patient cases and identifying medical conditions.</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-value">0</div>
          <div className="stat-label">Cases Solved</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">0%</div>
          <div className="stat-label">Accuracy</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">0</div>
          <div className="stat-label">Current Streak</div>
        </div>
      </div>

      <div className="dashboard-actions">
        <button 
          className="primary start-btn" 
          onClick={handleStartCase}
          disabled={isStarting}
        >
          {isStarting ? 'Loading...' : 'Start New Case'}
        </button>
        <p className="action-hint">
          Analyze patient symptoms, chat with an AI assistant, and make your diagnosis.
        </p>
      </div>

      <div className="dashboard-info card">
        <div className="card-header">
          <h2>How to Play</h2>
        </div>
        <ul className="info-list">
          <li>📋 Review the patient case details and symptoms</li>
          <li>💬 Chat with the AI assistant to gather more information</li>
          <li>🔍 Submit your diagnosis before the time runs out</li>
          <li>📊 See your score and compare with the correct answer</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
