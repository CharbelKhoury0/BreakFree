import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const menuItems = [
    {
      title: 'Home',
      path: '/'
    },
    {
      title: 'Programs',
      path: '#',
      dropdown: [
        { title: '1-on-1 Mentorship', path: '/programs/mentorship' },
        { title: 'Community', path: '/programs/community' },
        { title: 'Recovery Sessions', path: '/programs/sessions' },
        { title: 'Ebooks', path: '/programs/ebooks' },
        { title: 'Tools', path: '/programs/tools' }
      ]
    },
    {
      title: 'Resources',
      path: '#',
      dropdown: [
        { title: 'Addiction Calculator', path: '/calculator' },
        { title: 'Free Ebook', path: '/free-ebook' },
        { title: 'Blog', path: '/blog' }
      ]
    },
    {
      title: 'About',
      path: '#',
      dropdown: [
        { title: 'My Story', path: '/about/story' },
        { title: 'Testimonials', path: '/about/testimonials' },
        { title: 'Certifications', path: '/about/certifications' },
        { title: 'Donations', path: '/about/donations' }
      ]
    }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BF</span>
            </div>
            <span className="text-white font-bold text-xl">BreakFree</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.path === '#' ? (
                  <button className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors">
                    <span>{item.title}</span>
                    {item.dropdown && <ChevronDown className="w-4 h-4" />}
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.title}
                  </Link>
                )}

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.title && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-slate-800 rounded-lg shadow-xl border border-slate-700 py-2"
                    >
                      {item.dropdown.map((dropdownItem, dropdownIndex) => (
                        <Link
                          key={dropdownIndex}
                          to={dropdownItem.path}
                          className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-700 transition-colors"
                        >
                          {dropdownItem.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              to="/calculator"
              className="bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Take the Calculator
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 border-t border-slate-700"
          >
            <div className="px-4 py-4 space-y-4">
              {menuItems.map((item, index) => (
                <div key={index}>
                  {item.path === '#' ? (
                    <div>
                      <button
                        onClick={() => setActiveDropdown(
                          activeDropdown === item.title ? null : item.title
                        )}
                        className="flex items-center justify-between w-full text-gray-300 hover:text-white"
                      >
                        <span>{item.title}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${
                          activeDropdown === item.title ? 'rotate-180' : ''
                        }`} />
                      </button>
                      {activeDropdown === item.title && item.dropdown && (
                        <div className="mt-2 ml-4 space-y-2">
                          {item.dropdown.map((dropdownItem, dropdownIndex) => (
                            <Link
                              key={dropdownIndex}
                              to={dropdownItem.path}
                              className="block text-gray-400 hover:text-white"
                            >
                              {dropdownItem.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className="block text-gray-300 hover:text-white"
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                to="/calculator"
                className="block w-full bg-gradient-to-r from-amber-500 to-red-500 text-white px-4 py-2 rounded-lg font-semibold text-center"
              >
                Take the Calculator
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;