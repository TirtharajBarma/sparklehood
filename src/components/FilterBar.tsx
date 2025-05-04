import React from 'react';
import { FilterIcon, SortAsc, SortDesc } from 'lucide-react';
import { useIncidents } from '../context/IncidentContext';

const FilterBar: React.FC = () => {
  const { filterType, setFilterType, sortOrder, setSortOrder } = useIncidents();

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center">
          <FilterIcon className="h-5 w-5 text-gray-400 mr-2" />
          <span className="text-sm font-medium text-gray-700 mr-3">Filter by severity:</span>
          <div className="flex flex-wrap gap-2">
            {['All', 'Low', 'Medium', 'High'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type as any)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  filterType === type
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center">
          {sortOrder === 'newest' ? (
            <SortDesc className="h-5 w-5 text-gray-400 mr-2" />
          ) : (
            <SortAsc className="h-5 w-5 text-gray-400 mr-2" />
          )}
          <span className="text-sm font-medium text-gray-700 mr-3">Sort by:</span>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
            className="block pl-3 pr-10 py-1.5 text-sm border-gray-300 rounded-md bg-white border focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;