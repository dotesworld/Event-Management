"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  expertise: string[];
  social: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

const speakers: Speaker[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    title: "Chief Technology Officer",
    company: "InnovateTech Solutions",
    bio: "Dr. Johnson is a renowned technology leader with over 15 years of experience in AI and machine learning. She has led groundbreaking research in neural networks and has authored numerous papers on artificial intelligence.",
    expertise: [
      "Artificial Intelligence",
      "Machine Learning",
      "Neural Networks",
      "Tech Leadership",
    ],
    social: {
      linkedin: "#",
      twitter: "#",
      website: "#",
    },
  },
  {
    id: "2",
    name: "Prof. Michael Chen",
    title: "Professor of Computer Science",
    company: "Stanford University",
    bio: "Professor Chen specializes in distributed systems and cloud computing. His research has contributed significantly to the development of scalable infrastructure solutions for modern applications.",
    expertise: [
      "Distributed Systems",
      "Cloud Computing",
      "Scalable Architecture",
      "Research",
    ],
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: "3",
    name: "Alex Rodriguez",
    title: "Blockchain Architect",
    company: "CryptoInnovate",
    bio: "Alex is a blockchain expert who has designed and implemented numerous decentralized applications. He is passionate about the potential of blockchain technology to transform industries.",
    expertise: ["Blockchain", "Cryptocurrency", "Smart Contracts", "DeFi"],
    social: {
      linkedin: "#",
      website: "#",
    },
  },
  {
    id: "4",
    name: "Jane Smith",
    title: "VP of Engineering",
    company: "TechGiant Corp",
    bio: "Jane leads engineering teams at one of the world's largest tech companies. She is a strong advocate for diversity in technology and has mentored hundreds of women in tech.",
    expertise: [
      "Engineering Management",
      "Team Leadership",
      "Diversity in Tech",
      "Software Development",
    ],
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: "5",
    name: "Lisa Wang",
    title: "Product Strategy Director",
    company: "ProductInnovate",
    bio: "Lisa has over 12 years of experience in product management and strategy. She has successfully launched multiple products that have reached millions of users worldwide.",
    expertise: [
      "Product Strategy",
      "User Experience",
      "Market Analysis",
      "Product Launch",
    ],
    social: {
      linkedin: "#",
      website: "#",
    },
  },
  {
    id: "7",
    name: "Lisa Wang",
    title: "Product Strategy Director",
    company: "ProductInnovate",
    bio: "Lisa has over 12 years of experience in product management and strategy. She has successfully launched multiple products that have reached millions of users worldwide.",
    expertise: [
      "Product Strategy",
      "User Experience",
      "Market Analysis",
      "Product Launch",
    ],
    social: {
      linkedin: "#",
      website: "#",
    },
  },
  {
    id: "8",
    name: "Lisa Wang",
    title: "Product Strategy Director",
    company: "ProductInnovate",
    bio: "Lisa has over 12 years of experience in product management and strategy. She has successfully launched multiple products that have reached millions of users worldwide.",
    expertise: [
      "Product Strategy",
      "User Experience",
      "Market Analysis",
      "Product Launch",
    ],
    social: {
      linkedin: "#",
      website: "#",
    },
  },
  {
    id: "6",
    name: "Maria Garcia",
    title: "Cybersecurity Expert",
    company: "SecureNet Systems",
    bio: "Maria is a cybersecurity specialist with expertise in threat detection and prevention. She has helped numerous organizations strengthen their security posture.",
    expertise: [
      "Cybersecurity",
      "Threat Detection",
      "Risk Management",
      "Security Architecture",
    ],
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
];

export default function SpeakersGrid() {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-white mb-4">
          Meet Our <span className="text-primary">Speakers</span>
        </h1>
        <p className="text-xl text-neutral-medium max-w-3xl mx-auto">
          Learn from industry leaders, innovators, and experts who are shaping
          the future of technology
        </p>
      </motion.div>

      {/* Speakers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 mb-16">
        {speakers.map((speaker, index) => (
          <motion.div
            key={speaker.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-neutral-light rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedSpeaker(speaker)}
          >
            {/* Speaker Avatar */}
            <div className="h-48 bg-primary flex items-center justify-center">
              <div className="w-24 h-24 bg-neutral-light rounded-full flex items-center justify-center text-3xl font-bold text-primary">
                {speaker.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            </div>

            {/* Speaker Info */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-neutral-dark mb-2">
                {speaker.name}
              </h3>
              <p className="text-primary font-semibold mb-1">{speaker.title}</p>
              <p className="text-neutral-medium text-sm mb-4">
                {speaker.company}
              </p>

              {/* Expertise Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {speaker.expertise.slice(0, 3).map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
                {speaker.expertise.length > 3 && (
                  <span className="px-2 py-1 bg-neutral-medium/20 text-neutral-medium text-xs rounded-full">
                    +{speaker.expertise.length - 3}
                  </span>
                )}
              </div>

              {/* Social Links */}
              <div className="flex space-x-3">
                {speaker.social.linkedin && (
                  <a
                    href={speaker.social.linkedin}
                    className="w-8 h-8 bg-primary text-neutral-light rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}
                {speaker.social.twitter && (
                  <a
                    href={speaker.social.twitter}
                    className="w-8 h-8 bg-secondary text-neutral-light rounded-full flex items-center justify-center hover:bg-secondary/90 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                )}
                {speaker.social.website && (
                  <a
                    href={speaker.social.website}
                    className="w-8 h-8 bg-neutral-medium text-neutral-light rounded-full flex items-center justify-center hover:bg-neutral-medium/90 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Speaker Modal */}
      {selectedSpeaker && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedSpeaker(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-neutral-dark mb-2">
                  {selectedSpeaker.name}
                </h2>
                <p className="text-xl text-primary font-semibold">
                  {selectedSpeaker.title}
                </p>
                <p className="text-neutral-medium">{selectedSpeaker.company}</p>
              </div>
              <button
                onClick={() => setSelectedSpeaker(null)}
                className="text-neutral-medium hover:text-neutral-dark text-2xl"
              >
                ×
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-neutral-dark mb-3">
                About
              </h3>
              <p className="text-neutral-medium leading-relaxed">
                {selectedSpeaker.bio}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-neutral-dark mb-3">
                Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedSpeaker.expertise.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              {selectedSpeaker.social.linkedin && (
                <a
                  href={selectedSpeaker.social.linkedin}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary text-neutral-light rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
              )}
              {selectedSpeaker.social.twitter && (
                <a
                  href={selectedSpeaker.social.twitter}
                  className="flex items-center space-x-2 px-4 py-2 bg-secondary text-neutral-light rounded-lg hover:bg-secondary/90 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                  <span>Twitter</span>
                </a>
              )}
              {selectedSpeaker.social.website && (
                <a
                  href={selectedSpeaker.social.website}
                  className="flex items-center space-x-2 px-4 py-2 bg-neutral-medium text-neutral-light rounded-lg hover:bg-neutral-medium/90 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                  <span>Website</span>
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
