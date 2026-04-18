import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatBox from '../components/ChatBox';
import SymptomsPanel from '../components/SymptomsPanel';
import DiagnosisForm from '../components/DiagnosisForm';
import { startNewCase } from '../services/api';
import './CaseScreen.css';

const mockCase = {
  id: 'case-001',
  patient: {
    name: 'Sarah Johnson',
    age: 34,
    gender: 'Female',
    occupation: 'Accountant',
  },
  chiefComplaint: 'Persistent fatigue and weight gain over the past 3 months',
  symptoms: [
    'Fatigue',
    'Weight gain',
    'Cold intolerance',
    'Constipation',
    'Dry skin',
    'Hair loss',
    'Depression',
  ],
  medicalHistory: 'No significant medical history. No current medications.',
  vitalSigns: {
    heartRate: 58,
    bloodPressure: '110/70',
    temperature: 97.8,
    weight: 165,
  },
};

function CaseScreen() {
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const loadCase = async () => {
      try {
        const data = await startNewCase();
        setCaseData(data);
      } catch (error) {
        console.error('Error loading case:', error);
        setCaseData(mockCase);
      } finally {
        setLoading(false);
      }
    };
    loadCase();
  }, []);

  const handleDiagnosisSubmit = (diagnosis) => {
    const correctDiagnosis = 'Hypothyroidism';
    const isCorrect = diagnosis.toLowerCase().includes('hypothyroid');
    const baseScore = isCorrect ? 100 : 0;
    const timeBonus = Math.floor(Math.random() * 20);
    setScore(baseScore + timeBonus);
    navigate('/result', { state: { diagnosis, correctDiagnosis, score: baseScore + timeBonus, isCorrect } });
  };

  if (loading) {
    return (
      <div className="case-screen loading">
        <div className="loader">Loading case...</div>
      </div>
    );
  }

  const displayCase = caseData || mockCase;

  return (
    <div className="case-screen">
      <div className="case-header">
        <div className="case-id">Case #{displayCase.id || '001'}</div>
        <h2>Patient Case Analysis</h2>
      </div>

      <div className="case-content">
        <div className="case-sidebar">
          <div className="patient-info card">
            <div className="card-header">
              <h2>Patient Information</h2>
            </div>
            <div className="patient-details">
              <div className="detail-row">
                <span className="detail-label">Name:</span>
                <span className="detail-value">{displayCase.patient.name}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Age:</span>
                <span className="detail-value">{displayCase.patient.age} years</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Gender:</span>
                <span className="detail-value">{displayCase.patient.gender}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Occupation:</span>
                <span className="detail-value">{displayCase.patient.occupation}</span>
              </div>
            </div>
          </div>

          <div className="chief-complaint card">
            <div className="card-header">
              <h2>Chief Complaint</h2>
            </div>
            <p>{displayCase.chiefComplaint}</p>
          </div>

          <SymptomsPanel symptoms={displayCase.symptoms} />
        </div>

        <div className="case-main">
          <div className="chat-section">
            <ChatBox caseId={displayCase.id} />
          </div>

          <div className="diagnosis-section">
            <DiagnosisForm onSubmit={handleDiagnosisSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaseScreen;
