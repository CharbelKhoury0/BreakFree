import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../data/testimonials';
import type { Testimonial } from '../types';

const AUTO_ADVANCE_MS = 6000;

const TestimonialCard = ({ item }: { item: Testimonial }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      className="bg-slate-900 border border-white/10 rounded-2xl p-8 mx-auto max-w-3xl"
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">
          {item.name?.[0] ?? 'U'}
        </div>
        <div className="space-y-2">
          <p className="text-gray-200 leading-relaxed font-medium">“{item.quote}”</p>
          <div className="text-sm text-gray-400 font-semibold">
            <span>{item.name}</span>
            {item.age ? <span> · {item.age}</span> : null}
            {item.recovery_time ? <span> · {item.recovery_time}</span> : null}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialCarousel = () => {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [total]);

  const goPrev = () => setIndex((prev) => (prev - 1 + total) % total);
  const goNext = () => setIndex((prev) => (prev + 1) % total);

  const current = testimonials[index];

  return (
    <div className="relative">
      <div className="overflow-hidden py-2">
        <AnimatePresence mode="wait">
          <TestimonialCard key={current.id} item={current} />
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          aria-label="Previous testimonial"
          onClick={goPrev}
          className="p-2 rounded-lg border border-white/15 text-gray-300 hover:text-white hover:border-white/30 bg-transparent"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          {testimonials.map((t, i) => (
            <span
              key={t.id}
              className={`h-1.5 w-1.5 rounded-full ${i === index ? 'bg-white' : 'bg-white/30'}`}
            />
          ))}
        </div>
        <button
          aria-label="Next testimonial"
          onClick={goNext}
          className="p-2 rounded-lg border border-white/15 text-gray-300 hover:text-white hover:border-white/30 bg-transparent"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TestimonialCarousel;