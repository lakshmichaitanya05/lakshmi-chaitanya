import React from 'react';
import './App.css';
import JobApplicationForm from './components/JobApplicationForm';

function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: 'center', color: '#1e2d3b', marginBottom: '30px' }}>
        Welcome to the Job Portal
      </h1>
      <JobApplicationForm />
    </div>
  );
}

export default App;
