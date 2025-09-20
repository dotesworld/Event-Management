'use client';

import ScheduleTimeline from '@/components/ScheduleTimeline';
import { motion } from 'framer-motion';

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
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
                Schedule
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600"
            >
              Your complete guide to TechConnect 2024 sessions and activities
            </motion.p>
          </div>

          {/* Date Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <div className="flex flex-wrap justify-center gap-4">
              {['Day 1', 'Day 2', 'Day 3'].map((day, index) => (
                <button
                  key={day}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    index === 0
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {day}
                  <div className="text-xs opacity-75 mt-1">
                    {index === 0 ? 'March 15' : index === 1 ? 'March 16' : 'March 17'}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Types</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-sm">🎤</span>
                  <span className="text-sm text-gray-700">Keynote</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm">🔧</span>
                  <span className="text-sm text-gray-700">Workshop</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-sm">👥</span>
                  <span className="text-sm text-gray-700">Panel</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-sm">🤝</span>
                  <span className="text-sm text-gray-700">Networking</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Day 1 Schedule - March 15, 2024
            </h2>
            <ScheduleTimeline />
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="bg-secondary rounded-2xl p-8 text-neutral-light">
              <h3 className="text-2xl font-bold mb-4">Ready to Join Us?</h3>
              <p className="text-lg mb-6 opacity-90">
                Don't miss out on this incredible opportunity to learn and network
              </p>
              <a
                href="/register"
                className="inline-block bg-neutral-light text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-neutral-light/90 transition-colors"
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