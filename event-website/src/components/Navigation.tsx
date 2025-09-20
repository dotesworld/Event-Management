'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/schedule', label: 'Schedule' },
    { href: '/speakers', label: 'Speakers' },
    { href: '/sponsors', label: 'Sponsors' },
    { href: '/venue', label: 'Venue' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className={`text-2xl font-bold ${
              scrolled ? 'text-gray-900' : 'text-white'
            }`}>
              Dotes World 2025
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div
                key={item.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={item.href}
                  className={`relative transition-all duration-200 hover:text-purple-600 ${
                    scrolled ? 'text-gray-700' : 'text-white'
                  } ${
                    pathname === item.href ? 'text-purple-600' : ''
                  } group`}
                >
                  {item.label}
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: pathname === item.href ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              </motion.div>
            ))}
            {user ? (
              <div className="flex items-center space-x-3">
                <span className={`${scrolled ? 'text-gray-700' : 'text-white'} text-sm`}>Hi, {user.name}</span>
                <button
                  onClick={logout}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full font-semibold hover:bg-gray-300 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transform transition-all duration-200"
                >
                  Register
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className={`z-50 relative p-2 rounded-lg transition-colors duration-200 ${
                scrolled ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={isOpen ? "open" : "closed"}
                variants={{
                  open: { rotate: 180 },
                  closed: { rotate: 0 }
                }}
                transition={{ duration: 0.2 }}
              >
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  variants={{
                    open: { opacity: 1, pathLength: 1 },
                    closed: { opacity: 1, pathLength: 1 }
                  }}
                  transition={{ duration: 0.2 }}
                />
              </motion.svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-40 md:hidden"
          >
            <div className="pt-24 pb-8 px-8">
              <motion.div 
                className="flex flex-col space-y-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {navItems.map((item) => (
                  <motion.div
                    key={item.href}
                    variants={{
                      hidden: { x: 50, opacity: 0 },
                      visible: { x: 0, opacity: 1 },
                    }}
                    whileHover={{ x: 10 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-gray-700 hover:text-purple-600 text-xl font-medium transition-all duration-200 block py-2 ${
                        pathname === item.href ? 'text-purple-600 border-l-4 border-purple-600 pl-4' : ''
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                {user ? (
                  <button
                    onClick={() => { logout(); setIsOpen(false); }}
                    className="bg-gray-200 text-gray-800 px-8 py-4 rounded-full font-semibold text-center hover:bg-gray-300 transition-colors block text-lg"
                  >
                    Logout
                  </button>
                ) : (
                  <motion.div
                    variants={{
                      hidden: { x: 50, opacity: 0 },
                      visible: { x: 0, opacity: 1 },
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="pt-4"
                  >
                    <Link
                      href="/register"
                      onClick={() => setIsOpen(false)}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-center hover:shadow-lg hover:shadow-purple-500/25 transform transition-all duration-200 block text-lg"
                    >
                      Register Now
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </nav>
  );
}