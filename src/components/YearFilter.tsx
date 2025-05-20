import React from 'react';
import { Filter } from 'lucide-react';

interface YearFilterProps {
  years: number[];
  selectedYear: number | null;
  onYearSelect: (year: number | null) => void;
}

const YearFilter: React.FC<YearFilterProps> = ({ years, selectedYear, onYearSelect }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-6 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center text-gray-700">
        <Filter size={18} className="mr-2" />
        <span className="font-medium">Filter by Year:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onYearSelect(null)}
          className={`px-3 py-1 rounded-full text-sm transition-colors ${
            selectedYear === null
              ? 'bg-emerald-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          All Years
        </button>
        {years.map(year => (
          <button
            key={year}
            onClick={() => onYearSelect(year)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              selectedYear === year
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
};

export default YearFilter;