import React from 'react';
import { useIncidents } from '../context/IncidentContext';
import IncidentCard from './IncidentCard';

const IncidentList: React.FC = () => {
  const { filteredIncidents } = useIncidents();

  if (filteredIncidents.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <p className="text-gray-500">No incidents found matching the current filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredIncidents.map((incident) => (
        <IncidentCard key={incident.id} incident={incident} />
      ))}
    </div>
  );
};

export default IncidentList;