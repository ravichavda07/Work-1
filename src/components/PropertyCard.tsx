import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Star } from 'lucide-react';
import type { Property } from '../contexts/PropertyContext';

interface PropertyCardProps {
  property: Property;
  className?: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, className = '' }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden card-hover-intense animate-scale-in ${className}`}>
      <div className="relative">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-48 sm:h-56 lg:h-64 object-cover transition-transform duration-500 hover:scale-110"
        />
        {property.featured && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold flex items-center shadow-lg animate-pulse">
            <Star className="h-4 w-4 mr-1 fill-current" />
            Featured
          </div>
        )}
        <div className="absolute top-3 right-3 bg-teal-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold capitalize shadow-lg">
          {property.type}
        </div>
      </div>
      
      <div className="p-4 sm:p-6">
        <div className="mb-2">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 hover:text-teal-600 transition-colors duration-200 line-clamp-2">
            <Link to={`/property/${property.id}`}>
              {property.title}
            </Link>
          </h3>
          <div className="flex items-center text-gray-600 text-xs sm:text-sm mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{property.city}, {property.state}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-3">
          {property.description}
        </p>
        
        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            <span>{property.area} sqft</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl sm:text-2xl font-bold text-teal-600">
              ₹{formatPrice(property.price)}
            </span>
            {property.type === 'rent' && (
              <span className="text-gray-600 text-xs sm:text-sm">/month</span>
            )}
          </div>
          <Link
            to={`/property/${property.id}`}
            className="bg-teal-600 text-white px-4 py-2 sm:px-6 rounded-lg hover:bg-teal-700 transition-all duration-300 hover:scale-105 text-sm sm:text-base shadow-md"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;