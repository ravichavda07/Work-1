import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Bed, Bath, Square, Car, ChevronLeft, ChevronRight, X, Heart, Share2 } from 'lucide-react';
import { useProperties } from '../contexts/PropertyContext';

const PropertyDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProperty } = useProperties();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const property = getProperty(id!);

  if (!property) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
        <div className="container-responsive">
          <div className="text-center py-20 animate-bounce-in">
            <div className="bg-gradient-to-br from-gray-200 to-gray-300 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Property Not Found</h1>
            <p className="text-gray-600 mb-8">The property you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => navigate('/properties')}
              className="bg-teal-600 text-white px-8 py-4 rounded-xl hover:bg-teal-700 transition-all duration-300 hover:scale-105 shadow-lg font-semibold"
            >
              Back to Properties
            </button>
          </div>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const openImageModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsImageModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-6 sm:py-8">
      <div className="container-responsive">
        {/* Back Button */}
        <button
          onClick={() => navigate('/properties')}
          className="flex items-center text-teal-600 hover:text-teal-700 mb-6 transition-all duration-200 hover:scale-105 font-medium"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Properties
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-scale-in">
          {/* Image Gallery */}
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px]">
            <img
              src={property.images[currentImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
              onClick={() => openImageModal(currentImageIndex)}
            />
            
            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 sm:p-3 rounded-full hover:bg-opacity-70 transition-all duration-200 hover:scale-110"
                >
                  <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 sm:p-3 rounded-full hover:bg-opacity-70 transition-all duration-200 hover:scale-110"
                >
                  <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-black bg-opacity-50 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
              {currentImageIndex + 1} / {property.images.length}
            </div>

            {/* Property Type Badge */}
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-teal-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full font-semibold capitalize text-xs sm:text-sm">
              {property.type}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex space-x-2">
              <button className="bg-white bg-opacity-90 text-gray-700 p-2 rounded-full hover:bg-opacity-100 transition-all duration-200 hover:scale-110 shadow-md">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <button className="bg-white bg-opacity-90 text-gray-700 p-2 rounded-full hover:bg-opacity-100 transition-all duration-200 hover:scale-110 shadow-md">
                <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>

          {/* Image Thumbnails */}
          {property.images.length > 1 && (
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-2">
                {property.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${property.title} ${index + 1}`}
                    className={`w-16 h-12 sm:w-20 sm:h-16 object-cover rounded-lg cursor-pointer transition-all duration-200 flex-shrink-0 ${
                      index === currentImageIndex
                        ? 'ring-2 ring-teal-500 opacity-100'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Property Details */}
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              {/* Left Column */}
              <div className="lg:col-span-2">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 animate-slide-up">{property.title}</h1>
                
                <div className="flex items-center text-gray-600 mb-6 animate-slide-up" style={{animationDelay: '0.1s'}}>
                  <MapPin className="h-5 w-5 mr-2" />
                  <span className="text-sm sm:text-base lg:text-lg">{property.address}, {property.city}, {property.state} {property.zipCode}</span>
                </div>

                <div className="mb-6 sm:mb-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-teal-600">
                    ₹{formatPrice(property.price)}
                  </span>
                  {property.type === 'rent' && (
                    <span className="text-gray-600 text-lg sm:text-xl">/month</span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8 animate-slide-up" style={{animationDelay: '0.3s'}}>
                  <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                    <Bed className="h-6 w-6 sm:h-8 sm:w-8 text-teal-600 mx-auto mb-2" />
                    <div className="text-xl sm:text-2xl font-bold text-gray-800">{property.bedrooms}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                    <Bath className="h-6 w-6 sm:h-8 sm:w-8 text-teal-600 mx-auto mb-2" />
                    <div className="text-xl sm:text-2xl font-bold text-gray-800">{property.bathrooms}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Bathrooms</div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                    <Square className="h-6 w-6 sm:h-8 sm:w-8 text-teal-600 mx-auto mb-2" />
                    <div className="text-xl sm:text-2xl font-bold text-gray-800">{property.area}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Sq Ft</div>
                  </div>
                  {property.parking && (
                    <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                      <Car className="h-6 w-6 sm:h-8 sm:w-8 text-teal-600 mx-auto mb-2" />
                      <div className="text-xl sm:text-2xl font-bold text-gray-800">{property.parking}</div>
                      <div className="text-xs sm:text-sm text-gray-600">Parking</div>
                    </div>
                  )}
                </div>

                <div className="mb-6 sm:mb-8 animate-slide-up" style={{animationDelay: '0.4s'}}>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Description</h2>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{property.description}</p>
                </div>

                {property.amenities && property.amenities.length > 0 && (
                  <div className="mb-6 sm:mb-8 animate-slide-up" style={{animationDelay: '0.5s'}}>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Amenities</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {property.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                          <span className="text-gray-600 text-sm sm:text-base">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 sm:p-6 lg:p-8 sticky top-8 shadow-lg animate-slide-up" style={{animationDelay: '0.6s'}}>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Property Information</h3>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm sm:text-base">Property Type:</span>
                      <span className="font-semibold text-gray-800 capitalize text-sm sm:text-base">{property.propertyType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm sm:text-base">Listing Type:</span>
                      <span className="font-semibold text-gray-800 capitalize text-sm sm:text-base">For {property.type}</span>
                    </div>
                    {property.yearBuilt && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 text-sm sm:text-base">Year Built:</span>
                        <span className="font-semibold text-gray-800 text-sm sm:text-base">{property.yearBuilt}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm sm:text-base">Listed:</span>
                      <span className="font-semibold text-gray-800 text-sm sm:text-base">{property.createdAt}</span>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                    <h4 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">Contact Agent</h4>
                    <div className="space-y-3">
                      <button className="w-full bg-teal-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-teal-700 transition-all duration-300 hover:scale-105 shadow-md text-sm sm:text-base font-semibold">
                        Call Now
                      </button>
                      <button className="w-full bg-white text-teal-600 border-2 border-teal-600 py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-teal-50 transition-all duration-300 hover:scale-105 shadow-md text-sm sm:text-base font-semibold">
                        Send Message
                      </button>
                      <button className="w-full bg-gray-200 text-gray-700 py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-gray-300 transition-all duration-300 hover:scale-105 shadow-md text-sm sm:text-base font-semibold">
                        Schedule Tour
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full animate-scale-in">
            <img
              src={property.images[currentImageIndex]}
              alt={property.title}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            
            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 sm:p-3 rounded-full hover:bg-opacity-70 transition-all duration-200 hover:scale-110"
                >
                  <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 sm:p-3 rounded-full hover:bg-opacity-70 transition-all duration-200 hover:scale-110"
                >
                  <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
                </button>
              </>
            )}
            
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-200 hover:scale-110"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;