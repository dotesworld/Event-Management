'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface VenueAmenity {
  category: string;
  items: string[];
}

const venueAmenities: VenueAmenity[] = [
  {
    category: 'Technology',
    items: ['High-speed WiFi', 'AV Equipment', 'Live Streaming Setup', 'Recording Facilities']
  },
  {
    category: 'Comfort',
    items: ['Climate Control', 'Ergonomic Seating', 'Quiet Zones', 'Mother\'s Room']
  },
  {
    category: 'Accessibility',
    items: ['Wheelchair Access', 'Elevators', 'Accessible Restrooms', 'Sign Language Services']
  },
  {
    category: 'Services',
    items: ['Catering Services', 'Security', 'First Aid', 'Information Desk']
  }
];

const transportationOptions = [
  {
    type: 'Public Transit',
    icon: '🚇',
    details: 'Convention Center Station - 2 min walk',
    lines: ['Metro Line A', 'Bus Routes 15, 23, 45']
  },
  {
    type: 'Parking',
    icon: '🚗',
    details: 'On-site parking garage with 500 spaces',
    lines: ['$15/day', 'EV charging stations available']
  },
  {
    type: 'Airport',
    icon: '✈️',
    details: '25 minutes from International Airport',
    lines: ['Taxi: $35-45', 'Airport Shuttle: $12']
  },
  {
    type: 'Hotels',
    icon: '🏨',
    details: 'Partner hotels within walking distance',
    lines: ['Hilton Downtown', 'Marriott Convention', 'Hyatt Place']
  }
];

export default function VenuePage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'amenities' | 'transportation'>('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              Event{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Venue
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Discover the state-of-the-art Downtown Convention Center, your host for TechConnect 2024
            </motion.p>
          </div>

          {/* Venue Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="h-96 bg-gradient-to-br from-purple-400 to-blue-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">🏢</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Downtown Convention Center</h3>
                  <p className="text-lg opacity-90">123 Innovation Avenue, Downtown District</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-white rounded-lg px-4 py-2 shadow-lg">
                <p className="text-sm font-semibold text-gray-900">Capacity: 2,000+</p>
              </div>
            </div>
          </motion.div>

          {/* Navigation Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { key: 'overview', label: 'Overview' },
                { key: 'amenities', label: 'Amenities' },
                { key: 'transportation', label: 'Transportation' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === tab.key
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">About the Venue</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The Downtown Convention Center is a premier event venue featuring cutting-edge facilities
                    and technology. With over 50,000 square feet of flexible event space, it's the perfect
                    location for TechConnect 2024.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Located in the heart of the downtown district, the venue offers stunning city views,
                    modern amenities, and easy access to public transportation, hotels, and restaurants.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                      <span className="text-gray-700">50,000+ sq ft of event space</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                      <span className="text-gray-700">Multiple breakout rooms</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                      <span className="text-gray-700">State-of-the-art AV equipment</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                      <span className="text-gray-700">High-speed WiFi throughout</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                      <span className="text-gray-700">On-site catering facilities</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Amenities Tab */}
            {activeTab === 'amenities' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Venue Amenities</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  {venueAmenities.map((category, index) => (
                    <motion.div
                      key={category.category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6"
                    >
                      <h4 className="text-lg font-semibold text-purple-900 mb-4">{category.category}</h4>
                      <ul className="space-y-2">
                        {category.items.map((item, idx) => (
                          <li key={idx} className="flex items-center space-x-3">
                            <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Transportation Tab */}
            {activeTab === 'transportation' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Getting Here</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {transportationOptions.map((option, index) => (
                    <motion.div
                      key={option.type}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6"
                    >
                      <div className="flex items-center mb-4">
                        <span className="text-2xl mr-3">{option.icon}</span>
                        <h4 className="text-lg font-semibold text-blue-900">{option.type}</h4>
                      </div>
                      <p className="text-blue-800 font-medium mb-3">{option.details}</p>
                      <ul className="space-y-1">
                        {option.lines.map((line, idx) => (
                          <li key={idx} className="text-sm text-blue-700">
                            • {line}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Location Map</h3>
              <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">📍</span>
                  </div>
                  <p className="text-lg font-semibold mb-2">Interactive Map</p>
                  <p className="text-sm">123 Innovation Avenue, Downtown District</p>
                  <p className="text-xs mt-2">Coordinates: 40.7128° N, 74.0060° W</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12 text-center"
          >
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Join Us?</h3>
              <p className="text-lg mb-6 opacity-90">
                Experience the best event venue in the heart of downtown
              </p>
              <a
                href="/register"
                className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Register Now
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}