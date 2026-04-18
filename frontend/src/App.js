import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CaseScreen from './pages/CaseScreen';
import ResultPage from './pages/ResultPage';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>MedCrime AI</h1>
        <p>Medical Diagnosis Game</p>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/case" element={<CaseScreen />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
