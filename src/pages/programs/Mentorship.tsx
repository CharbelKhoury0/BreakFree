import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Calendar, MessageCircle, Target, Shield, ArrowRight, Check, Star } from 'lucide-react';

const Mentorship = () => {
  const features = [
    {
      icon: User,
      title: 'Personal Coach',
      description: 'One-on-one sessions with a certified addiction recovery specialist'
    },
    {
      icon: Calendar,
      title: 'Weekly Sessions',
      description: 'Consistent 60-minute sessions tailored to your schedule and needs'
    },
    {
      icon: MessageCircle,
      title: '24/7 Text Support',
      description: 'Round-the-clock text support for accountability and crisis situations'
    },
    {
      icon: Target,
      title: 'Personalized Plan',
      description: 'Custom recovery strategy designed specifically for your situation'
    },
    {
      icon: Shield,
      title: 'Relapse Prevention',
      description: 'Strategies and tools to prevent setbacks and maintain progress'
    }
  ];

  const testimonials = [
    {
      name: 'Michael R.',
      quote: 'Having a personal mentor changed everything. The accountability and guidance I received was exactly what I needed.',
      recovery: '10 months clean'
    },
    {
      name: 'David K.',
      quote: 'The personalized approach made all the difference. My mentor understood my specific struggles and helped me overcome them.',
      recovery: '1 year clean'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
                1-on-1 Mentorship
              </h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed font-medium">
                Direct guidance. Clear structure. Real accountability.
              </p>
              <div className="flex items-center space-x-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-black text-white">97%</div>
                  <div className="text-gray-400 text-sm font-semibold">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-white">200+</div>
                  <div className="text-gray-400 text-sm font-semibold">Men Helped</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-white">24/7</div>
                  <div className="text-gray-400 text-sm font-semibold">Support</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="border border-white/15 hover:border-white/30 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300">
                  Schedule Consultation
                </button>
                <Link
                  to="/calculator"
                  className="border border-white/15 hover:border-white/30 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 text-center"
                >
                  Take Assessment
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden border border-white/10">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: 'url(https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg)'
                  }}
                />
                <div className="absolute inset-0 bg-slate-950/40" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white font-black text-xl mb-2">Personal recovery journey</h3>
                  <p className="text-gray-300 font-medium">What to expect from 1-on-1 mentorship</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
              What's included
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              The essentials for lasting recovery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-950 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-black text-white mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed font-medium">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Investment
            </h2>
            <p className="text-lg text-gray-300 mb-12 font-medium">
              Professional, personalized support.
            </p>
          </motion.div>

          <div className="bg-slate-900 rounded-2xl p-8 md:p-12 border border-white/15 relative overflow-hidden">
            <div className="absolute top-0 right-0 text-white/80 px-4 py-1 text-sm font-bold border border-white/20 rounded-bl-lg">
              Most popular
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight">Complete Mentorship Program</h3>
              <div className="flex items-center justify-center mb-4">
                <span className="text-5xl font-black text-white">$297</span>
                <span className="text-gray-400 text-lg ml-2">/month</span>
              </div>
              <p className="text-gray-300 font-medium">Everything you need for lasting recovery</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="text-white font-bold mb-4">What's included</h4>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-white mr-3" />
                    <span className="font-medium">Weekly 1-hour sessions</span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-white mr-3" />
                    <span className="font-medium">24/7 text support</span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-white mr-3" />
                    <span className="font-medium">Personalized recovery plan</span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-white mr-3" />
                    <span className="font-medium">Progress tracking tools</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Bonus features</h4>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-white mr-3" />
                    <span className="font-medium">Community access</span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-white mr-3" />
                    <span className="font-medium">Resource library</span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-white mr-3" />
                    <span className="font-medium">Emergency protocols</span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-white mr-3" />
                    <span className="font-medium">Family support guidance</span>
                  </li>
                </ul>
              </div>
            </div>

            <button className="w-full border border-white/15 hover:border-white/30 text-white py-4 rounded-lg font-bold text-lg transition-all duration-300">
              Start your journey
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
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
              Success stories
            </h2>
            <p className="text-lg text-gray-300 font-medium">
              Real results from men who chose mentorship
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-slate-950 rounded-2xl p-8 border border-white/10"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-white" />
                  ))}
                </div>
                <blockquote className="text-gray-300 text-lg mb-6 italic font-medium">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <cite className="text-white font-bold not-italic">{testimonial.name}</cite>
                  <p className="text-gray-500 text-sm font-medium">{testimonial.recovery}</p>
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
              Ready to get to work?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto font-medium">
              Book a consultation or start with the assessment.
            </p>
            <button className="border border-white/15 hover:border-white/30 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 inline-flex items-center space-x-2">
              <span>Schedule consultation</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Mentorship;