import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import { useProperties, type Property } from '../contexts/PropertyContext';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const Admin: React.FC = () => {
  const { user } = useAuth();
  const { properties, addProperty, updateProperty, deleteProperty } = useProperties();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    type: 'sale' as 'sale' | 'rent',
    propertyType: 'house' as Property['propertyType'],
    area: '',
    bedrooms: '',
    bathrooms: '',
    images: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    amenities: '',
    yearBuilt: '',
    parking: '',
    featured: false
  });

  // Redirect if not admin
  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
          <p className="text-gray-600">You must be an admin to access this page.</p>
        </div>
      </div>
    );
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      type: 'sale',
      propertyType: 'house',
      area: '',
      bedrooms: '',
      bathrooms: '',
      images: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      amenities: '',
      yearBuilt: '',
      parking: '',
      featured: false
    });
    setEditingProperty(null);
  };

  const openModal = (property?: Property) => {
    if (property) {
      setEditingProperty(property);
      setFormData({
        title: property.title,
        description: property.description,
        price: property.price.toString(),
        type: property.type,
        propertyType: property.propertyType,
        area: property.area.toString(),
        bedrooms: property.bedrooms.toString(),
        bathrooms: property.bathrooms.toString(),
        images: property.images.join(', '),
        address: property.address,
        city: property.city,
        state: property.state,
        zipCode: property.zipCode,
        amenities: property.amenities.join(', '),
        yearBuilt: property.yearBuilt?.toString() || '',
        parking: property.parking?.toString() || '',
        featured: property.featured
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const propertyData = {
      title: formData.title,
      description: formData.description,
      price: Number(formData.price),
      type: formData.type,
      propertyType: formData.propertyType,
      area: Number(formData.area),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      images: formData.images.split(',').map(img => img.trim()).filter(img => img),
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      amenities: formData.amenities.split(',').map(amenity => amenity.trim()).filter(amenity => amenity),
      yearBuilt: formData.yearBuilt ? Number(formData.yearBuilt) : undefined,
      parking: formData.parking ? Number(formData.parking) : undefined,
      featured: formData.featured
    };

    if (editingProperty) {
      updateProperty(editingProperty.id, propertyData);
    } else {
      addProperty(propertyData);
    }

    setIsLoading(false);
    closeModal();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      deleteProperty(id);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage properties and listings</p>
            </div>
            <button
              onClick={() => openModal()}
              className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors duration-200 flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Property
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Properties</h3>
            <p className="text-3xl font-bold text-teal-600">{properties.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">For Sale</h3>
            <p className="text-3xl font-bold text-blue-600">
              {properties.filter(p => p.type === 'sale').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">For Rent</h3>
            <p className="text-3xl font-bold text-orange-600">
              {properties.filter(p => p.type === 'rent').length}
            </p>
          </div>
        </div>

        {/* Properties Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">All Properties</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {properties.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-12 w-16 rounded-lg object-cover mr-4"
                          src={property.images[0]}
                          alt={property.title}
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{property.title}</div>
                          <div className="text-sm text-gray-500 capitalize">{property.propertyType}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{property.city}</div>
                      <div className="text-sm text-gray-500">{property.state}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ₹{formatPrice(property.price)}
                        {property.type === 'rent' && <span className="text-gray-500">/mo</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${
                        property.type === 'sale'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {property.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => window.open(`/property/${property.id}`, '_blank')}
                          className="text-teal-600 hover:text-teal-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => openModal(property)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(property.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Property Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingProperty ? 'Edit Property' : 'Add New Property'}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (₹) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      required
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Listing Type *
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="sale">For Sale</option>
                      <option value="rent">For Rent</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Type *
                    </label>
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="villa">Villa</option>
                      <option value="studio">Studio</option>
                      <option value="office">Office</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Area (sqft) *
                    </label>
                    <input
                      type="number"
                      name="area"
                      required
                      value={formData.area}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bedrooms *
                    </label>
                    <input
                      type="number"
                      name="bedrooms"
                      required
                      value={formData.bedrooms}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bathrooms *
                    </label>
                    <input
                      type="number"
                      name="bathrooms"
                      required
                      value={formData.bathrooms}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Year Built
                    </label>
                    <input
                      type="number"
                      name="yearBuilt"
                      value={formData.yearBuilt}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parking Spots
                    </label>
                    <input
                      type="number"
                      name="parking"
                      value={formData.parking}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Zip Code *
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      required
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URLs (comma separated) *
                  </label>
                  <textarea
                    name="images"
                    required
                    rows={3}
                    value={formData.images}
                    onChange={handleInputChange}
                    placeholder="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg, https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use high-quality image URLs from Pexels, Unsplash, or other sources. Separate multiple URLs with commas.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amenities (comma separated)
                  </label>
                  <textarea
                    name="amenities"
                    rows={2}
                    value={formData.amenities}
                    onChange={handleInputChange}
                    placeholder="Swimming Pool, Gym, Garden, Parking"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                  />
                  <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                    Featured Property
                  </label>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200 disabled:opacity-50 flex items-center"
                  >
                    {isLoading ? (
                      <LoadingSpinner size="sm" className="mr-2" />
                    ) : null}
                    {editingProperty ? 'Update Property' : 'Add Property'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;