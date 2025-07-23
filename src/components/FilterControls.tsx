import React from 'react';
import { SortBy, SortOrder, FilterBy } from '../types/wifi';
import { ChevronDown, Filter, ArrowUpDown } from 'lucide-react';

interface FilterControlsProps {
  sortBy: SortBy;
  sortOrder: SortOrder;
  filterBy: FilterBy;
  onSortChange: (sortBy: SortBy, sortOrder: SortOrder) => void;
  onFilterChange: (filterBy: FilterBy) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  sortBy,
  sortOrder,
  filterBy,
  onSortChange,
  onFilterChange
}) => {
  const sortOptions = [
    { value: 'rssi', label: 'Signal Strength' },
    { value: 'ssid', label: 'Network Name' },
    { value: 'channel', label: 'Channel' },
    { value: 'encryption', label: 'Encryption' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Networks' },
    { value: 'secure', label: 'Secure Only' },
    { value: 'open', label: 'Open Networks' },
    { value: 'wpa2', label: 'WPA2 Only' },
    { value: 'wpa3', label: 'WPA3 Only' }
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex items-center space-x-2">
        <ArrowUpDown className="w-5 h-5 text-gray-500" />
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Sort by:
        </label>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortBy, sortOrder)}
            className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
        <button
          onClick={() => onSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc')}
          className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <Filter className="w-5 h-5 text-gray-500" />
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Filter:
        </label>
        <div className="relative">
          <select
            value={filterBy}
            onChange={(e) => onFilterChange(e.target.value as FilterBy)}
            className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default FilterControls;