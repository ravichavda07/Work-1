import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import type { PropertyFilters } from '../contexts/PropertyContext';

interface SearchFilterProps {
  onFilter: (filters: PropertyFilters) => void;
  className?: string;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onFilter, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<PropertyFilters>({});

  const handleFilterChange = (key: keyof PropertyFilters, value: any) => {
    const newFilters = { ...filters, [key]: value === '' ? undefined : value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFilter({});
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg p-4 sm:p-6 animate-slide-up ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-teal-600" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-800">Search Properties</h3>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-1 text-teal-600 hover:text-teal-700 transition-all duration-200 hover:scale-105"
        >
          <Filter className="h-4 w-4" />
          <span className="text-xs sm:text-sm">{isExpanded ? 'Less Filters' : 'More Filters'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
        {/* Property Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
          <select
            value={filters.propertyType || ''}
            onChange={(e) => handleFilterChange('propertyType', e.target.value)}
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">All Types</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="studio">Studio</option>
            <option value="office">Office</option>
          </select>
        </div>

        {/* Sale/Rent */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <select
            value={filters.type || ''}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">For Sale & Rent</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
          <input
            type="text"
            value={filters.city || ''}
            onChange={(e) => handleFilterChange('city', e.target.value)}
            placeholder="Enter city name"
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
          <input
            type="text"
            value={filters.state || ''}
            onChange={(e) => handleFilterChange('state', e.target.value)}
            placeholder="Enter state name"
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 pt-4 border-t border-gray-200 animate-slide-up">
          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Min Price ($)</label>
            <input
              type="number"
              value={filters.minPrice || ''}
              onChange={(e) => handleFilterChange('minPrice', Number(e.target.value))}
              placeholder="Min price (₹)"
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Price (₹)</label>
            <input
              type="number"
              value={filters.maxPrice || ''}
              onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
              placeholder="Max price (₹)"
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Area Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Min Area (sqft)</label>
            <input
              type="number"
              value={filters.minArea || ''}
              onChange={(e) => handleFilterChange('minArea', Number(e.target.value))}
              placeholder="Min area"
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Area (sqft)</label>
            <input
              type="number"
              value={filters.maxArea || ''}
              onChange={(e) => handleFilterChange('maxArea', Number(e.target.value))}
              placeholder="Max area"
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Bedrooms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Min Bedrooms</label>
            <select
              value={filters.bedrooms || ''}
              onChange={(e) => handleFilterChange('bedrooms', Number(e.target.value))}
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>

          {/* Bathrooms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Min Bathrooms</label>
            <select
              value={filters.bathrooms || ''}
              onChange={(e) => handleFilterChange('bathrooms', Number(e.target.value))}
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={clearFilters}
          className="px-4 sm:px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:scale-105 text-sm sm:text-base"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;