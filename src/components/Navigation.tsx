import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, User, Home, Users, BookOpen, Calculator, Gift, Heart, Award, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { usePageTransition } from '../hooks/usePageTransition';
import { scrollToTop } from '../utils/scrollToTop';
import PageTransitionLoader from './PageTransitionLoader';

// Type definitions
interface DropdownItem {
  title: string;
  path: string;
  onClick?: () => void;
}

interface MenuItem {
  title: string;
  path: string;
  icon?: React.ComponentType<{ className?: string }>;
  dropdown?: DropdownItem[];
}

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { user, profile, signOut, updateProfile, isAdmin } = useAuth();
  const { isLoading, startTransition } = usePageTransition();

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

  // Enhanced navigation handler with loading state and scroll to top
  const handleNavigation = (path: string, onClick?: () => void) => {
    return (e: React.MouseEvent) => {
      e.preventDefault();
      
      // Execute any custom onClick handler first
      if (onClick) {
        onClick();
      }
      
      // Close mobile menu and dropdowns
      setIsOpen(false);
      setActiveDropdown(null);
      
      // Start loading transition
      startTransition();
      
      // Navigate with minimal delay to show loading
      setTimeout(() => {
        navigate(path);
        // Scroll to top after navigation
        setTimeout(() => {
          scrollToTop();
        }, 50);
      }, 100);
    };
  };

  const menuItems: MenuItem[] = [
    {
      title: 'Home',
      path: '/',
      icon: Home
    },
    {
      title: 'Programs',
      path: '#',
      icon: Users,
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
      icon: BookOpen,
      dropdown: [
        { title: 'Addiction Calculator', path: '/calculator' },
        { title: 'Free Ebook', path: '/free-ebook' },
        { title: 'Blog', path: '/blog' }
      ]
    }
  ];

  const handleSignOut = async () => {
    try {
      // Clear UI state immediately for better UX
      setIsOpen(false);
      setActiveDropdown(null);
      
      // Call signOut - useAuth will handle state clearing and redirect
      await signOut();
    } catch (error) {
      console.error('Sign out failed:', error);
      // Clear UI state even on error
      setIsOpen(false);
      setActiveDropdown(null);
    }
  };

  const authMenuItems: MenuItem[] = [
    {
      title: 'About',
      path: '#',
      icon: Heart,
      dropdown: [
        { title: 'My Story', path: '/about/story' },
        { title: 'Testimonials', path: '/about/testimonials' },
        { title: 'Certifications', path: '/about/certifications' },
        { title: 'Donations', path: '/about/donations' }
      ]
    }
  ];

  return (
    <>
      <PageTransitionLoader isLoading={isLoading} />
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-950/90 backdrop-blur-sm border-b border-white/5' : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ml-3">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2" onClick={handleNavigation('/')}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm sm:text-base">BF</span>
            </div>
            <span className="text-white font-black text-xl sm:text-2xl tracking-tight">BreakFree</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {[...menuItems, ...authMenuItems].map((item, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.path === '#' ? (
                  <button className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors">
                    <span className="font-semibold">{item.title}</span>
                    {item.dropdown && <ChevronDown className="w-4 h-4" />}
                  </button>
                ) : (
                  <a
                    href={item.path}
                    className="text-gray-300 hover:text-white transition-colors font-semibold"
                    onClick={handleNavigation(item.path)}
                  >
                    {item.title}
                  </a>
                )}

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.title && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-slate-900/95 rounded-lg shadow-xl border border-white/10 py-2"
                    >
                      {item.dropdown.map((dropdownItem, dropdownIndex) => (
                        <a
                          key={dropdownIndex}
                          href={dropdownItem.path || '#'}
                          className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-medium"
                          onClick={handleNavigation(dropdownItem.path || '#', dropdownItem.onClick)}
                        >
                          {dropdownItem.title}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Profile Icon / CTA Button */}
          <div className="hidden md:block">
            {user ? (
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('profile')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300">
                  {profile?.avatar_url ? (
                    <img 
                      src={profile.avatar_url} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-white" />
                  )}
                </button>
                
                {/* Profile Dropdown */}
                <AnimatePresence>
                  {activeDropdown === 'profile' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 w-56 bg-slate-900/95 rounded-lg shadow-xl border border-white/10 py-2"
                    >
                      <div className="px-4 py-2 border-b border-white/10">
                        <p className="text-white font-semibold text-sm">
                          {profile?.full_name || user.email}
                        </p>
                        <p className="text-gray-400 text-xs">
                          Member
                        </p>
                      </div>
                      <a
                        href="/profile"
                        className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-medium"
                        onClick={handleNavigation('/profile')}
                      >
                        View Profile
                      </a>
                      {isAdmin && (
                        <a
                          href="https://breakfree-blog-admin-no1o.bolt.host/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-medium"
                        >
                          Admin Dashboard
                        </a>
                      )}
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-medium"
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <a
                href="/auth"
                className="border border-white/15 hover:border-white/30 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 min-h-[44px] flex items-center"
                onClick={handleNavigation('/auth')}
              >
                Sign In
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/15 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 shadow-md mr-1"
            aria-label="Toggle mobile menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="md:hidden fixed inset-0 top-16 sm:top-20 z-40 bg-gradient-to-br from-slate-950/98 via-slate-900/96 to-slate-950/98 backdrop-blur-xl border-t border-white/10 shadow-2xl overflow-hidden"
          >
            <div className="h-full overflow-y-auto relative">
              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
              </div>
              <div className="relative px-6 py-8 space-y-8 min-h-full">
              {[...menuItems, ...authMenuItems].map((item, index) => (
                <div key={index}>
                  {item.path === '#' ? (
                    <div>
                      <button
                        onClick={() => setActiveDropdown(
                          activeDropdown === item.title ? null : item.title
                        )}
                        className="flex items-center justify-between w-full text-gray-200 hover:text-white font-bold text-lg py-4 px-4 rounded-xl hover:bg-white/5 transition-all duration-300 group min-h-[56px]"
                      >
                        <div className="flex items-center space-x-3">
                          {item.icon && <item.icon className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors" />}
                          <span className="tracking-wide">{item.title}</span>
                        </div>
                        <ChevronDown className={`w-5 h-5 transition-all duration-300 group-hover:scale-110 ${
                          activeDropdown === item.title ? 'rotate-180 text-blue-400' : 'text-gray-400'
                        }`} />
                      </button>
                      {activeDropdown === item.title && item.dropdown && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="mt-2 ml-2 space-y-2 bg-white/5 rounded-xl p-3 border border-white/10"
                        >
                          {item.dropdown.map((dropdownItem, dropdownIndex) => (
                            <a
                              key={dropdownIndex}
                              href={dropdownItem.path || '#'}
                              className="block text-gray-300 hover:text-white font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-300 text-base min-h-[48px] flex items-center"
                              onClick={handleNavigation(dropdownItem.path || '#', dropdownItem.onClick)}
                            >
                              {dropdownItem.title}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={item.path}
                      className="text-gray-200 hover:text-white font-bold text-lg py-4 px-4 rounded-xl hover:bg-white/5 transition-all duration-300 min-h-[56px] flex items-center space-x-3 group"
                      onClick={handleNavigation(item.path)}
                    >
                      {item.icon && <item.icon className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors" />}
                      <span className="tracking-wide">{item.title}</span>
                    </a>
                  )}
                </div>
              ))}
              <div className="pt-6 mt-6">
                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6"></div>
                {user ? (
                  <div>
                    {/* Mobile Profile Section */}
                    <div className="mb-6 p-6 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-2xl border border-white/10 shadow-xl backdrop-blur-sm">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="relative">
                          <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full overflow-hidden flex items-center justify-center border-2 border-white/20 shadow-lg">
                            {profile?.avatar_url ? (
                              <img 
                                src={profile.avatar_url} 
                                alt="Profile" 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <User className="w-7 h-7 text-white" />
                            )}
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 shadow-sm"></div>
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-bold text-base leading-tight">
                            {profile?.full_name || user.email}
                          </p>
                          <p className="text-blue-300 text-sm font-medium mt-1">
                            Premium Member
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <a
                          href="/profile"
                          className="flex items-center text-gray-200 hover:text-white font-medium py-3 px-4 rounded-xl hover:bg-white/10 transition-all duration-300 text-base min-h-[48px] group"
                          onClick={handleNavigation('/profile')}
                        >
                          <User className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-400 transition-colors" />
                          View Profile
                        </a>
                        {isAdmin && (
                          <a
                            href="https://breakfree-blog-admin-no1o.bolt.host/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-gray-200 hover:text-white font-medium py-3 px-4 rounded-xl hover:bg-white/10 transition-all duration-300 text-base min-h-[48px] group"
                          >
                            <div className="w-5 h-5 mr-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded text-white flex items-center justify-center text-xs font-bold group-hover:scale-110 transition-transform">A</div>
                            Admin Dashboard
                          </a>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full bg-gradient-to-r from-red-600/20 to-red-500/20 hover:from-red-600/30 hover:to-red-500/30 border border-red-500/30 hover:border-red-400/50 text-white px-6 py-4 rounded-xl font-bold text-center min-h-[56px] flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 group"
                    >
                      <span className="group-hover:scale-105 transition-transform">Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <a
                    href="/auth"
                    className="block w-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-blue-500/30 hover:border-blue-400/50 text-white px-6 py-4 rounded-xl font-bold text-center min-h-[56px] flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group"
                    onClick={handleNavigation('/auth')}
                  >
                    <span className="group-hover:scale-105 transition-transform">Sign In</span>
                  </a>
                )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    </>
  );
};

export default Navigation;