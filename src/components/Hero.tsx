import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calculator, Download } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg)'
          }}
        />
        <div className="absolute inset-0 bg-slate-950/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 sm:mb-8 leading-tight tracking-tight">
            Focused. Accountable. Free.
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            A clear path to quit addiction. Built for men who value structure, discipline, and real results.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-4 mb-10 sm:mb-12 md:mb-16">
            <Link
              to="/calculator"
              className="group bg-white/5 hover:bg-white/10 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3 border border-white/10 w-full sm:w-auto min-h-[48px] sm:min-h-[56px]"
            >
              <Calculator className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Start Assessment</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/free-ebook"
              className="group bg-transparent border border-white/15 hover:border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3 w-full sm:w-auto min-h-[48px] sm:min-h-[56px]"
            >
              <Download className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Free Guide</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 sm:mb-2">500+</div>
              <div className="text-gray-400 font-semibold text-xs sm:text-sm md:text-base">Men Helped</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 sm:mb-2">87%</div>
              <div className="text-gray-400 font-semibold text-xs sm:text-sm md:text-base">Success Rate</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center col-span-2 sm:col-span-1"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 sm:mb-2">24/7</div>
              <div className="text-gray-400 font-semibold text-xs sm:text-sm md:text-base">Support</div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;