import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import SeverityBadge from './SeverityBadge';
import { Incident } from '../types';

interface IncidentCardProps {
  incident: Incident;
}

const IncidentCard: React.FC<IncidentCardProps> = ({ incident }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 ${
        isExpanded ? 'ring-2 ring-indigo-200' : 'hover:shadow-md'
      }`}
    >
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between">
          <h3 className="text-lg font-medium text-gray-900 mb-2 sm:mb-0">{incident.title}</h3>
          <div className="flex items-center space-x-3">
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formatDate(incident.reported_at)}</span>
            </div>
            <SeverityBadge severity={incident.severity} />
          </div>
        </div>
        
        <div className={`mt-4 ${isExpanded ? 'block' : 'hidden'}`}>
          <p className="text-gray-700 leading-relaxed">{incident.description}</p>
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" />
              Hide Details
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              View Details
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default IncidentCard;