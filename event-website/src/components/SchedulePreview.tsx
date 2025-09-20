'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface Session {
  time: string;
  title: string;
  speaker: string;
  description: string;
}

const sampleSessions: Session[] = [
  {
    time: "09:00 AM",
    title: "The Future of AI in Digital Innovation",
    speaker: "Dr. Sarah Chen",
    description: "Exploring how artificial intelligence will reshape our digital landscape over the next decade."
  },
  {
    time: "10:30 AM",
    title: "Building Scalable Web Applications",
    speaker: "Marcus Rodriguez",
    description: "Best practices for creating web applications that can handle millions of users."
  },
  {
    time: "02:00 PM",
    title: "Blockchain Beyond Cryptocurrency",
    speaker: "Elena Volkov",
    description: "Real-world applications of blockchain technology in various industries."
  },
  {
    time: "03:30 PM",
    title: "UX Design for the Metaverse",
    speaker: "James Liu",
    description: "Design principles for creating immersive experiences in virtual worlds."
  }
];

export default function SchedulePreview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider mb-4 block">
            What's Happening
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Event Schedule
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join us for an exciting lineup of talks, workshops, and networking opportunities.
          </p>
        </motion.div>

        {/* Session Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {sampleSessions.map((session, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-start space-x-4">
                {/* Time */}
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-2 rounded-lg font-bold text-sm">
                    {session.time}
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {session.title}
                  </h3>
                  <p className="text-purple-600 font-semibold mb-2">
                    {session.speaker}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {session.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/schedule"
            className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            See Full Schedule
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}