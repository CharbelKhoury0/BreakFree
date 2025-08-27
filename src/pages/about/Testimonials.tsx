import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Quote } from 'lucide-react';
import TestimonialCarousel from '../../components/TestimonialCarousel';

const Testimonials = () => {
  const detailedTestimonials = [
    {
      id: 1,
      name: "Marcus R.",
      age: "34",
      location: "Denver, CO",
      program: "1-on-1 Mentorship",
      sobrietyTime: "18 months",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      quote: "BreakFree gave me the structure I was missing. No fluff, no excuses—just a clear path forward.",
      fullStory: "I tried traditional recovery programs, but they felt too soft for my personality. BreakFree's approach matched my drive for results. The daily check-ins and measurable goals kept me accountable when motivation wasn't enough. Now I'm 18 months clean and building the business I always dreamed of.",
      results: ["18 months sober", "Started new business", "Rebuilt family relationships", "Lost 30 pounds"]
    },
    {
      id: 2,
      name: "David K.",
      age: "29",
      location: "Austin, TX",
      program: "Community + Tools",
      sobrietyTime: "2 years",
      image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg",
      quote: "The community aspect changed everything. Having men who understood the struggle made all the difference.",
      fullStory: "I was skeptical about online recovery communities, but the BreakFree group became my lifeline. These guys don't sugarcoat anything—they call you out when you need it and celebrate your wins. The tools and tracking systems helped me see patterns I never noticed before.",
      results: ["2 years sober", "Promoted at work", "Married my girlfriend", "Completed marathon"]
    },
    {
      id: 3,
      name: "James M.",
      age: "42",
      location: "Phoenix, AZ",
      program: "Recovery Sessions",
      sobrietyTime: "14 months",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
      quote: "Finally, a program that treats addiction like the serious problem it is, not a character flaw.",
      fullStory: "At 42, I thought it was too late to change. The BreakFree sessions showed me that recovery is about building systems, not willpower. The evidence-based approach and practical strategies gave me tools that actually work in real-world situations.",
      results: ["14 months sober", "Reconciled with ex-wife", "Coaching little league", "Debt-free"]
    }
  ];

  const stats = [
    { number: "500+", label: "Men Helped" },
    { number: "87%", label: "Success Rate" },
    { number: "2.3 years", label: "Average Sobriety" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <div className="bg-slate-950 min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Success Stories
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              Real men. Real results. Real transformation through discipline and accountability.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-black text-white mb-2">{stat.number}</div>
                <div className="text-gray-400 font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Carousel */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              What Our Members Say
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              Unfiltered feedback from men who chose discipline over comfort.
            </p>
          </motion.div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* Detailed Stories */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Detailed Success Stories
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              Deep dives into transformation journeys and the specific strategies that worked.
            </p>
          </motion.div>

          <div className="space-y-16">
            {detailedTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-slate-900 rounded-2xl p-8 border border-white/10"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Profile */}
                  <div className="lg:col-span-1">
                    <div className="flex flex-col items-center text-center">
                      <div 
                        className="w-24 h-24 bg-slate-800 rounded-full bg-cover bg-center mb-4 border border-white/10"
                        style={{ backgroundImage: `url(${testimonial.image})` }}
                      />
                      <h3 className="text-xl font-black text-white mb-2">{testimonial.name}</h3>
                      <p className="text-gray-400 font-medium mb-1">{testimonial.age} • {testimonial.location}</p>
                      <p className="text-gray-400 font-medium mb-4">{testimonial.program}</p>
                      
                      <div className="bg-slate-950 rounded-lg p-4 w-full">
                        <div className="text-2xl font-black text-white mb-1">{testimonial.sobrietyTime}</div>
                        <div className="text-gray-400 text-sm font-medium">Sober</div>
                      </div>
                    </div>
                  </div>

                  {/* Story */}
                  <div className="lg:col-span-2">
                    <div className="mb-6">
                      <Quote className="w-8 h-8 text-white/20 mb-4" />
                      <blockquote className="text-xl font-bold text-white mb-4 italic">
                        "{testimonial.quote}"
                      </blockquote>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed font-medium mb-6">
                      {testimonial.fullStory}
                    </p>
                    
                    <div>
                      <h4 className="text-white font-bold mb-3">Key Results:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {testimonial.results.map((result, resultIndex) => (
                          <div key={resultIndex} className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-white/60" />
                            <span className="text-gray-300 font-medium text-sm">{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Ready to write your success story?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto font-medium">
              Join hundreds of men who chose discipline over comfort and built the life they wanted.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                to="/calculator"
                className="inline-flex items-center space-x-2 border border-white/15 hover:border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
              >
                <span>Start Assessment</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/programs/mentorship"
                className="inline-flex items-center space-x-2 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
              >
                <span>View Programs</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;