'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface Speaker {
  name: string;
  role: string;
  expertise: string;
  image: string;
}

const speakers: Speaker[] = [
  {
    name: "Dr. Sarah Chen",
    role: "Chief AI Officer",
    expertise: "Artificial Intelligence & Machine Learning",
    image: "/api/placeholder/150/150"
  },
  {
    name: "Marcus Rodriguez",
    role: "Senior Software Architect",
    expertise: "Scalable Systems & Cloud Architecture",
    image: "/api/placeholder/150/150"
  },
  {
    name: "Elena Volkov",
    role: "Blockchain Lead",
    expertise: "Distributed Systems & Web3",
    image: "/api/placeholder/150/150"
  },
  {
    name: "James Liu",
    role: "UX Design Director",
    expertise: "Metaverse & Immersive Experiences",
    image: "/api/placeholder/150/150"
  },
  {
    name: "Priya Sharma",
    role: "Data Science Manager",
    expertise: "Big Data & Analytics",
    image: "/api/placeholder/150/150"
  },
  {
    name: "David Kim",
    role: "Cybersecurity Expert",
    expertise: "Digital Security & Privacy",
    image: "/api/placeholder/150/150"
  }
];

export default function SpeakersPreview() {
  return (
    <section className="py-20 bg-neutral-dark text-neutral-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider mb-4 block">
            Meet the Experts
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured Speakers
          </h2>
          <p className="text-xl text-neutral-medium max-w-2xl mx-auto">
            Learn from industry leaders and pioneers who are shaping the future of technology.
          </p>
        </motion.div>

        {/* Speakers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {speakers.map((speaker, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-neutral-medium rounded-2xl p-6 text-center hover:bg-neutral-medium/80 transition-all duration-300 group"
            >
              {/* Speaker Photo */}
              <div className="relative mb-4 inline-block">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-12 h-12 text-neutral-light" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                {/* Hover effect ring */}
                <div className="absolute inset-0 rounded-full border-2 border-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110"></div>
              </div>

              {/* Speaker Info */}
              <h3 className="text-xl font-bold text-neutral-light mb-2">
                {speaker.name}
              </h3>
              <p className="text-secondary font-semibold mb-3">
                {speaker.role}
              </p>
              <p className="text-neutral-medium text-sm leading-relaxed">
                {speaker.expertise}
              </p>
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
            href="/speakers"
            className="inline-flex items-center bg-primary text-neutral-light px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            See All Speakers
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}