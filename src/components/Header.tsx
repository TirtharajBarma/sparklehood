import React from 'react';
import { ShieldAlert } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-emerald-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center">
          <ShieldAlert className="h-8 w-8 mr-3 text-emerald-200" />
          <div>
            <h1 className="text-2xl font-bold">AI Safety Incident Dashboard</h1>
            <p className="text-emerald-200 mt-1">Monitor and manage AI safety incidents</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;