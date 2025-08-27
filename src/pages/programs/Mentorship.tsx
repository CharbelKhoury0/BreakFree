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
      description: 'Advanced strategies and tools to prevent setbacks and maintain progress'
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
    <div className="min-h-screen bg-slate-900 pt-20">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                1-on-1 <span className="bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">Mentorship</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Get personalized guidance and support from certified recovery specialists. Our mentorship program provides the individual attention and accountability you need to break free from addiction.
              </p>
              <div className="flex items-center space-x-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400">97%</div>
                  <div className="text-gray-400 text-sm">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400">200+</div>
                  <div className="text-gray-400 text-sm">Men Helped</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400">24/7</div>
                  <div className="text-gray-400 text-sm">Support</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                  Schedule Consultation
                </button>
                <Link
                  to="/calculator"
                  className="border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 text-center"
                >
                  Take Assessment First
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-video bg-slate-800 rounded-2xl overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: 'url(https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg)'
                  }}
                />
                <div className="absolute inset-0 bg-slate-900/40" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white font-bold text-xl mb-2">Personal Recovery Journey</h3>
                  <p className="text-gray-200">See how our 1-on-1 mentorship transforms lives</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What's Included
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our comprehensive mentorship program provides everything you need for lasting recovery.
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
                className="bg-slate-900 rounded-2xl p-8 border border-slate-700 hover:border-amber-500 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-red-700 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Investment in Your Freedom
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Professional, personalized recovery support that fits your budget.
            </p>
          </motion.div>

          <div className="bg-slate-800 rounded-2xl p-8 md:p-12 border-2 border-amber-400/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-400 to-red-500 text-white px-4 py-1 text-sm font-semibold">
              Most Popular
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Complete Mentorship Program</h3>
              <div className="flex items-center justify-center mb-4">
                <span className="text-5xl font-bold text-amber-400">$297</span>
                <span className="text-gray-400 text-lg ml-2">/month</span>
              </div>
              <p className="text-gray-300">Everything you need for lasting recovery</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="text-white font-semibold mb-4">What's Included:</h4>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-400 mr-3" />
                    Weekly 1-hour sessions
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-400 mr-3" />
                    24/7 text support
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-400 mr-3" />
                    Personalized recovery plan
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-400 mr-3" />
                    Progress tracking tools
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Bonus Features:</h4>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-400 mr-3" />
                    Community access
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-400 mr-3" />
                    Resource library
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-400 mr-3" />
                    Emergency protocols
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-400 mr-3" />
                    Family support guidance
                  </li>
                </ul>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-amber-600 to-red-700 hover:from-amber-700 hover:to-red-800 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105">
              Start Your Journey Today
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-gray-300">
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
                className="bg-slate-900 rounded-2xl p-8 border border-slate-700"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-300 text-lg mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <cite className="text-amber-400 font-semibold not-italic">{testimonial.name}</cite>
                  <p className="text-gray-500 text-sm">{testimonial.recovery}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-red-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Recovery?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Schedule a free consultation to see if our mentorship program is right for you. No commitment, just an honest conversation about your path to freedom.
            </p>
            <button className="bg-white text-slate-900 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2">
              <span>Schedule Free Consultation</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Mentorship;