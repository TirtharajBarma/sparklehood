import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Incident, Severity } from '../types';
import { incidents as initialIncidents } from '../data/incidents';

type SortOrder = 'newest' | 'oldest';
type FilterType = 'All' | Severity;

interface IncidentContextType {
  incidents: Incident[];
  filteredIncidents: Incident[];
  filterType: FilterType;
  sortOrder: SortOrder;
  setFilterType: (filter: FilterType) => void;
  setSortOrder: (order: SortOrder) => void;
  addIncident: (incident: Omit<Incident, 'id' | 'reported_at'>) => void;
}

const IncidentContext = createContext<IncidentContextType | undefined>(undefined);

export const useIncidents = () => {
  const context = useContext(IncidentContext);
  if (!context) {
    throw new Error('useIncidents must be used within an IncidentProvider');
  }
  return context;
};

interface IncidentProviderProps {
  children: ReactNode;
}

export const IncidentProvider: React.FC<IncidentProviderProps> = ({ children }) => {
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [filterType, setFilterType] = useState<FilterType>('All');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');

  const addIncident = (incidentData: Omit<Incident, 'id' | 'reported_at'>) => {
    const newIncident: Incident = {
      ...incidentData,
      id: Math.max(0, ...incidents.map(i => i.id)) + 1,
      reported_at: new Date().toISOString()
    };
    
    setIncidents(prev => [...prev, newIncident]);
  };

  const filteredIncidents = incidents
    .filter(incident => filterType === 'All' || incident.severity === filterType)
    .sort((a, b) => {
      const dateA = new Date(a.reported_at).getTime();
      const dateB = new Date(b.reported_at).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  return (
    <IncidentContext.Provider
      value={{
        incidents,
        filteredIncidents,
        filterType,
        sortOrder,
        setFilterType,
        setSortOrder,
        addIncident
      }}
    >
      {children}
    </IncidentContext.Provider>
  );
};