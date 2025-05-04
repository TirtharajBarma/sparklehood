import React from 'react';
import { IncidentProvider } from './context/IncidentContext';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <IncidentProvider>
      <Dashboard />
    </IncidentProvider>
  );
}

export default App;