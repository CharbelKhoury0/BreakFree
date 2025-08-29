import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import NewsletterForm from './NewsletterForm';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm">BF</span>
              </div>
              <span className="text-white font-black text-xl tracking-tight">BreakFree</span>
            </div>
            <p className="text-gray-400 font-medium">
              Practical recovery for men. Structure, accountability, results.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-white font-bold mb-4">Programs</h3>
            <ul className="space-y-2">
              <li><Link to="/programs/mentorship" className="hover:text-white transition-colors font-medium">1-on-1 Mentorship</Link></li>
              <li><Link to="/programs/community" className="hover:text-white transition-colors font-medium">Community</Link></li>
              <li><Link to="/programs/sessions" className="hover:text-white transition-colors font-medium">Recovery Sessions</Link></li>
              <li><Link to="/programs/ebooks" className="hover:text-white transition-colors font-medium">Ebooks</Link></li>
              <li><Link to="/programs/tools" className="hover:text-white transition-colors font-medium">Tools</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/calculator" className="hover:text-white transition-colors font-medium">Assessment</Link></li>
              <li><Link to="/free-ebook" className="hover:text-white transition-colors font-medium">Free Guide</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors font-medium">Blog</Link></li>
              <li><Link to="/about/testimonials" className="hover:text-white transition-colors font-medium">Success Stories</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-sm text-gray-300">support@breakfree.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-sm text-gray-300">1-800-BREAKFREE</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-sm text-gray-300">Available Worldwide</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
         <div className="border-t border-white/5 mt-8 pt-8">
           <div className="text-center mb-6">
             <h3 className="text-white text-lg font-bold mb-4">Subscribe to our newsletter</h3>
             <div className="max-w-md mx-auto">
               <NewsletterForm 
                 source="footer_newsletter" 
                 placeholder="Your email address"
                 buttonText="Subscribe ✈"
                 className="newsletter-simple"
               />
             </div>
           </div>
         </div>

        {/* Bottom Section */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm font-medium">
            © {currentYear} BreakFree. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors font-medium">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors font-medium">
              Terms of Service
            </Link>
            <Link to="/disclaimer" className="text-gray-400 hover:text-white text-sm transition-colors font-medium">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;