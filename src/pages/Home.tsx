import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Shield, Award, Users } from 'lucide-react';
import { useProperties } from '../contexts/PropertyContext';
import PropertyCard from '../components/PropertyCard';

const Home: React.FC = () => {
  const { properties } = useProperties();
  const featuredProperties = properties.filter(p => p.featured).slice(0, 3);

  const stats = [
    { icon: Users, label: 'Happy Clients', value: '2+' },
    { icon: Award, label: 'Properties Sold', value: '1+' },
    { icon: Shield, label: 'Years Experience', value: '2+' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-600 via-blue-600 to-purple-700 text-white py-16 sm:py-20 lg:py-24 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-10 rounded-full animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white opacity-5 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white opacity-5 rounded-full animate-pulse-slow"></div>
        </div>
        
        <div className="container-responsive relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-slide-up">
              Find Your
              <span className="gradient-text-animated block sm:inline">
                {' '}Dream Home{' '}
              </span>
              Today
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 opacity-90 leading-relaxed max-w-3xl mx-auto animate-slide-up" style={{animationDelay: '0.2s'}}>
              Discover the perfect property with our comprehensive real estate platform. 
              Buy, rent, or invest in your future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{animationDelay: '0.4s'}}>
              <Link
                to="/properties"
                className="bg-white text-teal-600 button-responsive rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 btn-hover-glow flex items-center justify-center shadow-lg"
              >
                <Search className="mr-2 h-5 w-5" />
                Browse Properties
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white button-responsive rounded-xl font-semibold hover:bg-white hover:text-teal-600 transition-all duration-300 hover:scale-105 flex items-center justify-center"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-responsive">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group animate-bounce-in" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="bg-gradient-to-br from-teal-100 to-teal-200 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <stat.icon className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">{stat.value}</h3>
                <p className="text-gray-600 text-responsive">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h2 className="heading-responsive font-bold text-gray-800 mb-4 animate-slide-up">Featured Properties</h2>
            <p className="subheading-responsive text-gray-600 max-w-3xl mx-auto animate-slide-up" style={{animationDelay: '0.2s'}}>
              Discover our hand-picked selection of properties
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/properties"
              className="inline-flex items-center bg-teal-600 text-white button-responsive rounded-xl font-semibold hover:bg-teal-700 transition-all duration-300 hover:scale-105 btn-hover-glow shadow-lg"
            >
              View All Properties
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="heading-responsive font-bold text-gray-800 mb-4 animate-slide-up">Why Choose Renter home</h2>
            <p className="subheading-responsive text-gray-600 max-w-3xl mx-auto animate-slide-up" style={{animationDelay: '0.2s'}}>
              We provide comprehensive real estate services with unmatched expertise
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-teal-500 to-blue-600 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg animate-float">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Advanced Search</h3>
              <p className="text-gray-600 leading-relaxed text-responsive">
                Find your perfect property with our powerful search and filtering system
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg animate-float" style={{animationDelay: '1s'}}>
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Trusted Service</h3>
              <p className="text-gray-600 leading-relaxed text-responsive">
                2+ years of experience with number of satisfied customers
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg animate-float" style={{animationDelay: '2s'}}>
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Expert Team</h3>
              <p className="text-gray-600 leading-relaxed text-responsive">
                Professional real estate agents ready to help you every step of the way
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;