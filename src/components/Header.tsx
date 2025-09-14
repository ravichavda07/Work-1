import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.tsx';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="container-responsive">
        <div className="flex justify-between items-center py-3 sm:py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-2 sm:p-3 rounded-xl group-hover:scale-105 transition-all duration-300 shadow-lg">
              <Home className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <span className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Renter Home
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg transition-all duration-200 font-medium ${
                isActive('/') ? 'bg-teal-100 text-teal-700' : 'text-gray-700 hover:text-teal-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/properties"
              className={`px-3 py-2 rounded-lg transition-all duration-200 font-medium ${
                isActive('/properties') ? 'bg-teal-100 text-teal-700' : 'text-gray-700 hover:text-teal-600'
              }`}
            >
              Properties
            </Link>
            <Link
              to="/contact"
              className={`px-3 py-2 rounded-lg transition-all duration-200 font-medium ${
                isActive('/contact') ? 'bg-teal-100 text-teal-700' : 'text-gray-700 hover:text-teal-600'
              }`}
            >
              Contact
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className={`px-3 py-2 rounded-lg transition-all duration-200 font-medium ${
                      isActive('/admin') ? 'bg-orange-100 text-orange-700' : 'text-orange-600 hover:text-orange-700'
                    }`}
                  >
                    Admin
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 px-4 py-2 bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200 transition-all duration-200 font-medium"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden xl:inline">{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden xl:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-teal-600 border border-teal-600 rounded-lg hover:bg-teal-50 transition-all duration-200 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-200 font-medium shadow-md"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 animate-slide-up">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/properties"
                className="px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Properties
              </Link>
              <Link
                to="/contact"
                className="px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              
              {user ? (
                <>
                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="px-3 py-3 rounded-lg text-orange-600 hover:bg-orange-50 font-medium transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Admin
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    className="px-3 py-3 rounded-lg text-teal-600 hover:bg-teal-50 font-medium transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="px-3 py-3 text-left rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-3 py-3 rounded-lg text-teal-600 hover:bg-teal-50 font-medium transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-3 py-3 rounded-lg bg-teal-600 text-white hover:bg-teal-700 font-medium transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;