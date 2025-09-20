'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sponsors, exhibitors, sponsorTiers } from '@/lib/sponsors';

const SponsorsPage = () => {
  const [activeTab, setActiveTab] = useState<'sponsors' | 'exhibitors'>('sponsors');
  const [selectedSponsor, setSelectedSponsor] = useState<typeof sponsors[0] | null>(null);

  const groupedSponsors = sponsors.reduce((acc, sponsor) => {
    if (!acc[sponsor.tier]) {
      acc[sponsor.tier] = [];
    }
    acc[sponsor.tier].push(sponsor);
    return acc;
  }, {} as Record<string, typeof sponsors>);

  const sponsorshipPackages = [
    {
      tier: 'platinum',
      name: 'Platinum Package',
      price: '$25,000',
      benefits: [
        'Premium logo placement on all materials',
        '30-minute keynote speaking slot',
        'Dedicated booth space (20x20 ft)',
        '500 complimentary event tickets',
        'VIP networking dinner access',
        'Social media promotion (weekly)',
        'Email campaign inclusion (4x)',
        'Post-event attendee list'
      ],
      color: 'from-purple-600 to-purple-800',
      popular: true
    },
    {
      tier: 'gold',
      name: 'Gold Package',
      price: '$15,000',
      benefits: [
        'Logo placement on website and app',
        '15-minute speaking slot',
        'Dedicated booth space (15x15 ft)',
        '250 complimentary event tickets',
        'VIP networking lunch access',
        'Social media promotion (bi-weekly)',
        'Email campaign inclusion (2x)',
        'Post-event attendee list'
      ],
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      tier: 'silver',
      name: 'Silver Package',
      price: '$8,000',
      benefits: [
        'Logo placement on website',
        'Panel participation opportunity',
        'Shared booth space (10x10 ft)',
        '100 complimentary event tickets',
        'Networking breakfast access',
        'Social media promotion (monthly)',
        'Email campaign inclusion (1x)',
        'Post-event attendee list (partial)'
      ],
      color: 'from-gray-400 to-gray-500'
    },
    {
      tier: 'bronze',
      name: 'Bronze Package',
      price: '$3,500',
      benefits: [
        'Small logo placement',
        'Networking event access',
        'Shared booth space (5x5 ft)',
        '50 complimentary event tickets',
        'Social media mention',
        'Company description on website'
      ],
      color: 'from-orange-600 to-orange-700'
    }
  ];

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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold text-neutral-light mb-6"
            >
              Sponsors & Exhibitors
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl text-neutral-light/80 mb-8 max-w-3xl mx-auto"
            >
              Discover the innovative companies and organizations that make our event possible. 
              Connect with industry leaders, explore cutting-edge solutions, and build valuable partnerships.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#sponsorship-packages"
                className="px-8 py-3 bg-neutral-light text-primary font-semibold rounded-lg hover:bg-neutral-light/90 transition-colors duration-300"
              >
                Become a Sponsor
              </a>
              <a
                href="#exhibitor-info"
                className="px-8 py-3 border-2 border-neutral-light text-neutral-light font-semibold rounded-lg hover:bg-neutral-light hover:text-primary transition-colors duration-300"
              >
                Exhibit With Us
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="bg-gray-100 rounded-lg p-1 flex">
              <button
                onClick={() => setActiveTab('sponsors')}
                className={`px-6 py-3 rounded-md font-semibold transition-all duration-300 ${
                  activeTab === 'sponsors'
                    ? 'bg-primary text-neutral-light shadow-md'
                    : 'text-neutral-medium hover:text-primary'
                }`}
              >
                Sponsors
              </button>
              <button
                onClick={() => setActiveTab('exhibitors')}
                className={`px-6 py-3 rounded-md font-semibold transition-all duration-300 ${
                  activeTab === 'exhibitors'
                    ? 'bg-primary text-neutral-light shadow-md'
                    : 'text-neutral-medium hover:text-primary'
                }`}
              >
                Exhibitors
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Area */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            {activeTab === 'sponsors' ? (
              <motion.div
                key="sponsors"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={containerVariants}
                className="space-y-16"
              >
                {Object.entries(groupedSponsors).map(([tier, tierSponsors]) => (
                  <motion.div key={tier} variants={itemVariants}>
                    <div className="text-center mb-8">
                      <h2 className={`text-3xl font-bold mb-2 ${sponsorTiers[tier as keyof typeof sponsorTiers].textColor}`}>
                        {sponsorTiers[tier as keyof typeof sponsorTiers].name}
                      </h2>
                      <div className={`w-20 h-1 bg-gradient-to-r ${sponsorTiers[tier as keyof typeof sponsorTiers].color} mx-auto rounded-full`}></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {tierSponsors.map((sponsor) => (
                        <motion.div
                          key={sponsor.id}
                          variants={cardVariants}
                          whileHover="hover"
                          className="bg-neutral-light rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6"
                        >
                          <div className="text-center">
                          <img
                            src={sponsor.logo}
                            alt={`${sponsor.name} logo`}
                            className={`${sponsorTiers[tier as keyof typeof sponsorTiers].size} object-contain mx-auto mb-4`}
                          />
                          <h3 className="text-xl font-bold text-neutral-dark mb-2">{sponsor.name}</h3>
                          <span className="px-3 py-1 bg-primary text-neutral-light text-sm font-semibold rounded-full">
                            {sponsorTiers[tier as keyof typeof sponsorTiers].name}
                          </span>
                            <p className="text-neutral-medium mb-4">{sponsor.description}</p>
                            <div className="flex gap-2 justify-center">
                              <a
                                href={sponsor.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-primary text-neutral-light text-sm font-medium rounded-md hover:bg-primary/90 transition-colors duration-300"
                              >
                                Visit Website
                              </a>
                              <button
                                onClick={() => setSelectedSponsor(sponsor)}
                                className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors duration-300 text-sm"
                              >
                                Learn More
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="exhibitors"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants} className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Exhibitors</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Discover innovative companies showcasing cutting-edge technologies and solutions.
                    Visit their booths to learn more and connect with industry experts.
                  </p>
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {exhibitors.map((exhibitor) => (
                    <motion.div
                      key={exhibitor.id}
                      variants={cardVariants}
                      whileHover="hover"
                      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6"
                    >
                      <div className="text-center">
                        <img
                          src={exhibitor.logo}
                          alt={`${exhibitor.name} logo`}
                          className="h-20 object-contain mx-auto mb-4"
                        />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{exhibitor.name}</h3>
                        <div className="mb-2">
                          <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                            {exhibitor.category}
                          </span>
                        </div>
                        {exhibitor.boothNumber && (
                          <div className="mb-3">
                            <span className="inline-block bg-purple-100 text-purple-800 text-sm font-semibold px-3 py-1 rounded-full">
                              Booth {exhibitor.boothNumber}
                            </span>
                          </div>
                        )}
                        <p className="text-gray-600 mb-4">{exhibitor.description}</p>
                        <a
                          href={exhibitor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow duration-300 text-sm"
                        >
                          Visit Website
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Sponsorship Packages */}
      <section id="sponsorship-packages" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-12"
          >
            <motion.h2 variants={itemVariants} className="text-4xl font-bold text-neutral-dark mb-4">
              Sponsorship Packages
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-neutral-medium max-w-3xl mx-auto">
              Choose the perfect sponsorship package to maximize your brand exposure and connect with our audience.
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsorshipPackages.map((pkg) => (
              <motion.div
                key={pkg.tier}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                whileHover="hover"
                className={`relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ${pkg.popular ? 'ring-2 ring-purple-600' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-neutral-dark mb-2">{pkg.name}</h3>
                    <div className={`w-12 h-1 bg-gradient-to-r ${pkg.color} mx-auto rounded-full mb-4`}></div>
                    <div className="text-3xl font-bold text-primary">{pkg.price}</div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {pkg.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-secondary rounded-full mr-3 mt-1.5 flex-shrink-0"></span>
                        <span className="text-neutral-medium text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 bg-primary text-neutral-light font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-300`}>
                    Choose Package
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsor Detail Modal */}
      <AnimatePresence>
        {selectedSponsor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedSponsor(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedSponsor.logo}
                      alt={`${selectedSponsor.name} logo`}
                      className="h-16 object-contain"
                    />
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{selectedSponsor.name}</h3>
                      <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${sponsorTiers[selectedSponsor.tier as keyof typeof sponsorTiers].color} text-white`}>
                        {sponsorTiers[selectedSponsor.tier as keyof typeof sponsorTiers].name}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedSponsor(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-gray-700 mb-6">{selectedSponsor.description}</p>
                <div className="flex gap-4">
                  <a
                    href={selectedSponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow duration-300"
                  >
                    Visit Website
                  </a>
                  <button className="px-6 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors duration-300">
                    Contact Sponsor
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SponsorsPage;