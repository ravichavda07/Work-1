import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import LoadingSpinner from '../components/LoadingSpinner';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // EmailJS configuration - Replace with your actual service details
      const serviceId = 'YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
      const templateId = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID
      const publicKey = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS public key
      
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          to_name: 'RealEstate Pro Team',
        },
        publicKey
      );
      
      setIsSubmitted(true);
    } catch (error) {
      setSubmitError('Failed to send message. Please try again or contact us directly.');
    }
    
    // Reset form
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setIsSubmitted(false);
      setSubmitError('');
    }, 3000);
    
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+91 9929990877',
      description: 'Mon-Fri from 8am to 6pm'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'contact@realestatepro.com',
      description: 'We\'ll respond within 24 hours'
    },
    {
      icon: MapPin,
      title: 'Office',
      details: '123 Business Ave, Suite 100',
      description: 'Rajkot - 360005'
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-600' },
    { icon: Linkedin, href: '#', color: 'hover:text-blue-700' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12">
      <div className="container-responsive">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="heading-responsive font-bold text-gray-800 mb-4 animate-slide-up">Contact Us</h1>
          <p className="subheading-responsive text-gray-600 max-w-3xl mx-auto animate-slide-up" style={{animationDelay: '0.2s'}}>
            Get in touch with us. We're here to help you find your perfect property.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Contact Information */}
          <div className="animate-slide-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">Get In Touch</h2>
            
            <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-12">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="bg-gradient-to-br from-teal-100 to-teal-200 p-3 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                    <info.icon className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">{info.title}</h3>
                    <p className="text-gray-700 font-medium mb-1 text-responsive">{info.details}</p>
                    <p className="text-gray-600 text-sm sm:text-base">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`bg-white p-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 text-gray-600 ${social.color}`}
                  >
                    <social.icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-12">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Business Hours</h3>
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-semibold text-gray-800">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-semibold text-gray-800">9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-semibold text-gray-800">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 animate-slide-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">Send us a Message</h2>
            
            {isSubmitted ? (
              <div className="text-center py-8 animate-bounce-in">
                <div className="bg-gradient-to-br from-green-100 to-green-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Message Sent!</h3>
                <p className="text-gray-600 text-responsive">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                      placeholder="How can we help?"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    placeholder="Tell us about your property needs..."
                  />
                </div>

                {submitError && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-teal-600 text-white py-3 sm:py-4 px-6 rounded-lg font-semibold hover:bg-teal-700 disabled:opacity-50 transition-all duration-300 flex items-center justify-center btn-hover-glow shadow-lg"
                >
                  {isSubmitting ? (
                    <LoadingSpinner size="sm" className="mr-2" />
                  ) : (
                    <Send className="h-5 w-5 mr-2" />
                  )}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;