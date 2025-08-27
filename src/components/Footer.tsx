import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm">BF</span>
              </div>
              <span className="text-white font-black text-xl tracking-tight">BreakFree</span>
            </div>
            <p className="text-gray-400 font-medium">
              Helping men overcome addiction and rebuild their lives with proven strategies and community support.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-white font-bold mb-4">Programs</h3>
            <ul className="space-y-2">
              <li><Link to="/programs/mentorship" className="hover:text-amber-400 transition-colors font-medium">1-on-1 Mentorship</Link></li>
              <li><Link to="/programs/community" className="hover:text-amber-400 transition-colors font-medium">Community</Link></li>
              <li><Link to="/programs/sessions" className="hover:text-amber-400 transition-colors font-medium">Recovery Sessions</Link></li>
              <li><Link to="/programs/ebooks" className="hover:text-amber-400 transition-colors font-medium">Ebooks</Link></li>
              <li><Link to="/programs/tools" className="hover:text-amber-400 transition-colors font-medium">Tools</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/calculator" className="hover:text-amber-400 transition-colors font-medium">Addiction Calculator</Link></li>
              <li><Link to="/free-ebook" className="hover:text-amber-400 transition-colors font-medium">Free Ebook</Link></li>
              <li><Link to="/blog" className="hover:text-amber-400 transition-colors font-medium">Blog</Link></li>
              <li><Link to="/about/testimonials" className="hover:text-amber-400 transition-colors font-medium">Success Stories</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span className="font-medium">support@breakfree.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="font-medium">1-800-BREAKFREE</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="font-medium">Available Worldwide</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm font-medium">
            © {currentYear} BreakFree. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
            <Link to="/privacy" className="text-gray-400 hover:text-amber-400 text-sm transition-colors font-medium">
              Privacy Policy
            </Link>
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
            <Link to="/terms" className="text-gray-400 hover:text-amber-400 text-sm transition-colors font-medium">
              Terms of Service
            </Link>
            </Link>
            <Link to="/disclaimer" className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
            <Link to="/disclaimer" className="text-gray-400 hover:text-amber-400 text-sm transition-colors font-medium">
              Disclaimer
            </Link>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;