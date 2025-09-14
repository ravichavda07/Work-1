import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  rent?: number;
  type: 'sale' | 'rent';
  propertyType: 'house' | 'apartment' | 'villa' | 'studio' | 'office';
  area: number; // in sq ft
  bedrooms: number;
  bathrooms: number;
  images: string[];
  address: string;
  city: string;
  state: string;
  zipCode: string;
  amenities: string[];
  yearBuilt?: number;
  parking?: number;
  featured: boolean;
  createdAt: string;
}

interface PropertyContextType {
  properties: Property[];
  addProperty: (property: Omit<Property, 'id' | 'createdAt'>) => void;
  updateProperty: (id: string, property: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  getProperty: (id: string) => Property | undefined;
  searchProperties: (filters: PropertyFilters) => Property[];
}

export interface PropertyFilters {
  type?: 'sale' | 'rent';
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  bedrooms?: number;
  bathrooms?: number;
  city?: string;
  state?: string;
}

const PropertyContext = createContext<PropertyContextType | null>(null);

export const useProperties = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
};

// Sample properties data
const initialProperties: Property[] = [
  {
    id: '1',
    title: 'Luxury Modern Villa',
    description: 'Beautiful 4-bedroom villa with stunning views and modern amenities.',
    price: 1250000,
    type: 'sale',
    propertyType: 'villa',
    area: 3500,
    bedrooms: 4,
    bathrooms: 3,
    images: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    address: '123 Luxury Lane',
    city: 'Beverly Hills',
    state: 'California',
    zipCode: '90210',
    amenities: ['Swimming Pool', 'Gym', 'Garden', 'Garage', 'Security System'],
    yearBuilt: 2020,
    parking: 2,
    featured: true,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Downtown Apartment',
    description: 'Spacious 2-bedroom apartment in the heart of downtown.',
    price: 3500,
    rent: 3500,
    type: 'rent',
    propertyType: 'apartment',
    area: 1200,
    bedrooms: 2,
    bathrooms: 2,
    images: [
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2724750/pexels-photo-2724750.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    address: '456 Urban Street',
    city: 'New York',
    state: 'New York',
    zipCode: '10001',
    amenities: ['Concierge', 'Gym', 'Rooftop Terrace'],
    yearBuilt: 2018,
    parking: 1,
    featured: false,
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    title: 'Suburban Family House',
    description: 'Perfect family home with large backyard and quiet neighborhood.',
    price: 650000,
    type: 'sale',
    propertyType: 'house',
    area: 2200,
    bedrooms: 3,
    bathrooms: 2,
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    address: '789 Family Drive',
    city: 'Austin',
    state: 'Texas',
    zipCode: '73301',
    amenities: ['Backyard', 'Garage', 'Fireplace'],
    yearBuilt: 2015,
    parking: 2,
    featured: true,
    createdAt: '2024-01-25'
  },
  {
    id: '4',
    title: 'Modern Studio Apartment',
    description: 'Stylish studio apartment with contemporary design and city views.',
    price: 2200,
    type: 'rent',
    propertyType: 'studio',
    area: 650,
    bedrooms: 1,
    bathrooms: 1,
    images: [
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2724750/pexels-photo-2724750.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    address: '321 Modern Ave',
    city: 'San Francisco',
    state: 'California',
    zipCode: '94102',
    amenities: ['City View', 'Modern Kitchen', 'High-Speed Internet'],
    yearBuilt: 2021,
    parking: 0,
    featured: false,
    createdAt: '2024-01-28'
  },
  {
    id: '5',
    title: 'Executive Office Space',
    description: 'Premium office space in business district with modern amenities.',
    price: 850000,
    type: 'sale',
    propertyType: 'office',
    area: 1800,
    bedrooms: 0,
    bathrooms: 2,
    images: [
      '/api/placeholder/800/600?text=Office+Space+1',
      '/api/placeholder/800/600?text=Office+Space+2',
      '/api/placeholder/800/600?text=Office+Space+3'
    ],
    address: '555 Business Blvd',
    city: 'Chicago',
    state: 'Illinois',
    zipCode: '60601',
    amenities: ['Conference Room', 'Reception Area', 'Parking', 'Security'],
    yearBuilt: 2019,
    parking: 3,
    featured: true,
    createdAt: '2024-01-30'
  }
];

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const savedProperties = localStorage.getItem('properties');
    if (savedProperties) {
      setProperties(JSON.parse(savedProperties));
    } else {
      setProperties(initialProperties);
      localStorage.setItem('properties', JSON.stringify(initialProperties));
    }
  }, []);

  const addProperty = (property: Omit<Property, 'id' | 'createdAt'>) => {
    const newProperty: Property = {
      ...property,
      id: `property-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    const updatedProperties = [...properties, newProperty];
    setProperties(updatedProperties);
    localStorage.setItem('properties', JSON.stringify(updatedProperties));
  };

  const updateProperty = (id: string, updatedProperty: Partial<Property>) => {
    const updatedProperties = properties.map(p => 
      p.id === id ? { ...p, ...updatedProperty } : p
    );
    setProperties(updatedProperties);
    localStorage.setItem('properties', JSON.stringify(updatedProperties));
  };

  const deleteProperty = (id: string) => {
    const updatedProperties = properties.filter(p => p.id !== id);
    setProperties(updatedProperties);
    localStorage.setItem('properties', JSON.stringify(updatedProperties));
  };

  const getProperty = (id: string) => {
    return properties.find(p => p.id === id);
  };

  const searchProperties = (filters: PropertyFilters) => {
    return properties.filter(property => {
      if (filters.type && property.type !== filters.type) return false;
      if (filters.propertyType && property.propertyType !== filters.propertyType) return false;
      if (filters.minPrice && property.price < filters.minPrice) return false;
      if (filters.maxPrice && property.price > filters.maxPrice) return false;
      if (filters.minArea && property.area < filters.minArea) return false;
      if (filters.maxArea && property.area > filters.maxArea) return false;
      if (filters.bedrooms && property.bedrooms < filters.bedrooms) return false;
      if (filters.bathrooms && property.bathrooms < filters.bathrooms) return false;
      if (filters.city && !property.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
      if (filters.state && !property.state.toLowerCase().includes(filters.state.toLowerCase())) return false;
      return true;
    });
  };

  return (
    <PropertyContext.Provider value={{
      properties,
      addProperty,
      updateProperty,
      deleteProperty,
      getProperty,
      searchProperties
    }}>
      {children}
    </PropertyContext.Provider>
  );
};