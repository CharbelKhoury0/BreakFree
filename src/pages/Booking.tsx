import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Shield, CheckCircle } from 'lucide-react';
import { InlineWidget } from 'react-calendly';
import { CALENDLY_CONFIG } from '../config/calendly';

const Booking: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">


          {/* Hero Content */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-2xl mb-6">
                <Calendar className="w-8 h-8 text-blue-400" />
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                Schedule Your
                <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Consultation
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Take the first step towards breaking free from pornography addiction. 
                Book a personalized consultation to discuss your journey and goals.
              </p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
            >
              <div className="flex items-center justify-center space-x-3 text-gray-300">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-green-400" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">30-60 Minutes</div>
                  <div className="text-sm text-gray-400">Comprehensive session</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-3 text-gray-300">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">1-on-1 Session</div>
                  <div className="text-sm text-gray-400">Personalized guidance</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-3 text-gray-300">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">100% Confidential</div>
                  <div className="text-sm text-gray-400">Safe & private space</div>
                </div>
              </div>
            </motion.div>

            {/* What to Expect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 max-w-4xl mx-auto mb-12"
            >
              <h3 className="text-2xl font-bold text-white mb-6">What to Expect</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white mb-1">Assessment & Goal Setting</div>
                    <div className="text-gray-400 text-sm">We'll discuss your current situation and define clear recovery goals</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white mb-1">Personalized Strategy</div>
                    <div className="text-gray-400 text-sm">Receive a tailored plan based on your specific needs and challenges</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white mb-1">Resource Recommendations</div>
                    <div className="text-gray-400 text-sm">Get access to tools, programs, and resources that fit your journey</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white mb-1">Next Steps Planning</div>
                    <div className="text-gray-400 text-sm">Leave with a clear action plan and ongoing support options</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Calendly Widget Section */}
      <section className="py-12 px-4">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-[700px] border border-slate-700/30 rounded-lg overflow-hidden"
          >
            <InlineWidget
              url={CALENDLY_CONFIG.url}
              styles={{
                height: '700px',
                width: '100%'
              }}
              prefill={CALENDLY_CONFIG.prefill}
              utm={{
                utmCampaign: 'booking-page',
                utmSource: 'breakfree-website',
                utmMedium: 'website',
                utmContent: 'booking-page'
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-white mb-6">Need Help Scheduling?</h3>
            <p className="text-gray-300 mb-8 text-lg">
              If you're having trouble with the booking system or have questions about the consultation, 
              feel free to reach out to us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition-colors duration-300"
              >
                Return to Home
              </Link>
              <Link
                to="/about/story"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/20 hover:border-white/40 text-white rounded-lg font-semibold transition-colors duration-300"
              >
                Learn More About Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Booking;