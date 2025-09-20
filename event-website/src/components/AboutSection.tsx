'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAboutData } from '@/hooks/useContent';

export default function AboutSection() {
  const about = useAboutData();

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {about.image.type === 'placeholder' ? (
                <div className="bg-gradient-to-br from-purple-600 to-blue-600 h-96 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <div className="w-24 h-24 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-4xl">{about.image.placeholder.icon}</span>
                    </div>
                    <p className="text-lg font-semibold">{about.image.placeholder.text}</p>
                  </div>
                </div>
              ) : (
                <img src={about.image.placeholder.text} alt={about.title} className="h-96 w-full object-cover" />
              )}
            </div>
            {about.image.decorativeElements?.map((el, idx) => (
              <div key={idx} className={`absolute ${el.position} w-20 h-20 rounded-full opacity-50`} style={{ backgroundColor: el.color }}></div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider mb-4 block">
              {about.eyebrow}
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {about.title}
            </h2>

            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              {about.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href={about.cta.href}
                className="inline-flex items-center bg-primary text-neutral-light px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                {about.cta.text}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}