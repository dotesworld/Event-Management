'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { sponsors, sponsorTiers } from '@/lib/sponsors';

const SponsorsSection = () => {
  const groupedSponsors = sponsors.reduce((acc, sponsor) => {
    if (!acc[sponsor.tier]) {
      acc[sponsor.tier] = [];
    }
    acc[sponsor.tier].push(sponsor);
    return acc;
  }, {} as Record<string, typeof sponsors>);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Our Sponsors & Partners
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            We're proud to partner with industry leaders who make this event possible. 
            Their support enables us to bring you the best content and networking opportunities.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link
              href="/sponsors"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              View All Sponsors
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        <div className="space-y-16">
          {Object.entries(groupedSponsors).map(([tier, tierSponsors]) => (
            <motion.div
              key={tier}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="text-center"
            >
              <motion.h3
                variants={itemVariants}
                className={`text-2xl font-bold mb-8 ${sponsorTiers[tier as keyof typeof sponsorTiers].textColor}`}
              >
                {sponsorTiers[tier as keyof typeof sponsorTiers].name}
              </motion.h3>
              
              <motion.div
                variants={containerVariants}
                className="flex flex-wrap justify-center items-center gap-8"
              >
                {tierSponsors.map((sponsor) => (
                  <motion.div
                    key={sponsor.id}
                    variants={logoVariants}
                    whileHover="hover"
                    className="group"
                  >
                    <a
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      <img
                        src={sponsor.logo}
                        alt={`${sponsor.name} logo`}
                        className={`${sponsorTiers[tier as keyof typeof sponsorTiers].size} object-contain`}
                      />
                      <div className="mt-2 text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {sponsor.description}
                      </div>
                    </a>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-8 max-w-2xl mx-auto">
            <h4 className="text-2xl font-bold text-gray-900 mb-4">
              Become a Sponsor
            </h4>
            <p className="text-gray-700 mb-6">
              Join our growing list of partners and showcase your brand to thousands of industry professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sponsors#sponsorship-packages"
                className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-300"
              >
                View Packages
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SponsorsSection;