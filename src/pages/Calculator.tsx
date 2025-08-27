import React from 'react';
import { motion } from 'framer-motion';

const Calculator = () => {
  return (
    <div className="min-h-screen bg-slate-900 pt-20">
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Addiction Calculator
            </h1>
            <p className="text-gray-300 text-base sm:text-lg font-medium">
              Assess your risk level and get tailored recommendations.
            </p>
          </motion.div>

          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 sm:p-8 text-gray-300">
            <p className="font-medium text-sm sm:text-base">
              This tool is coming soon. In the meantime, explore our programs to begin your recovery journey.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Calculator;