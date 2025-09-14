import React, { useState, useEffect } from 'react';
import { useProperties, type PropertyFilters } from '../contexts/PropertyContext';
import PropertyCard from '../components/PropertyCard';
import SearchFilter from '../components/SearchFilter';
import LoadingSpinner from '../components/LoadingSpinner';

const Properties: React.FC = () => {
  const { properties, searchProperties } = useProperties();
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for better UX
    setTimeout(() => {
      setFilteredProperties(properties);
      setIsLoading(false);
    }, 500);
  }, [properties]);

  const handleFilter = (filters: PropertyFilters) => {
    setIsLoading(true);
    setTimeout(() => {
      const filtered = searchProperties(filters);
      setFilteredProperties(filtered);
      setIsLoading(false);
    }, 300);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <LoadingSpinner size="lg" />
            <p className="text-gray-600 mt-4">Loading properties...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-6 sm:py-8">
      <div className="container-responsive">
        {/* Page Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="heading-responsive font-bold text-gray-800 mb-4 animate-slide-up">All Properties</h1>
          <p className="subheading-responsive text-gray-600 animate-slide-up" style={{animationDelay: '0.2s'}}>
            Browse our complete collection of properties for sale and rent
          </p>
        </div>

        {/* Search Filter */}
        <SearchFilter onFilter={handleFilter} className="mb-6 sm:mb-8" />

        {/* Results Count */}
        <div className="mb-4 sm:mb-6">
          <p className="text-gray-600 text-sm sm:text-base animate-fade-in">
            Showing {filteredProperties.length} of {properties.length} properties
          </p>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-12 sm:py-16 animate-bounce-in">
            <div className="bg-gradient-to-br from-gray-200 to-gray-300 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mb-2">No Properties Found</h3>
            <p className="text-gray-600 mb-6 text-responsive">
              Try adjusting your search filters to find more properties
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                className="animate-scale-in"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;