import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Calendar, Trophy, Shield, Star, Check, ArrowRight } from 'lucide-react';

const Community = () => {
  const features = [
    {
      icon: MessageSquare,
      title: 'Private community',
      description: 'Exclusive, moderated space for men committed to recovery'
    },
    {
      icon: Calendar,
      title: 'Weekly group calls',
      description: 'Regular check-ins for support and accountability'
    },
    {
      icon: Users,
      title: 'Accountability partners',
      description: 'Get matched for mutual support and consistency'
    },
    {
      icon: Trophy,
      title: 'Monthly challenges',
      description: 'Build strong habits with structured challenges'
    },
    {
      icon: Shield,
      title: 'Confidential',
      description: 'Judgment-free, strictly moderated and private'
    }
  ];

  const benefits = [
    'Connect with men facing similar challenges',
    '24/7 community support and encouragement',
    'Share victories and setbacks openly',
    'Learn from others\' experiences',
    'Build lasting friendships and bonds',
    'Access to exclusive resources and tools',
    'Participate in group challenges and activities',
    'Get support during difficult moments'
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
                Community
              </h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed font-medium">
                Brotherhood. Accountability. Progress.
              </p>
              <div className="flex items-center space-x-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-black text-white">150+</div>
                  <div className="text-gray-400 text-sm font-semibold">Active Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-white">24/7</div>
                  <div className="text-gray-400 text-sm font-semibold">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-white">100%</div>
                  <div className="text-gray-400 text-sm font-semibold">Confidential</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="border border-white/15 hover:border-white/30 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300">
                  Join community
                </button>
                <Link
                  to="/free-ebook"
                  className="border border-white/15 hover:border-white/30 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 text-center"
                >
                  Get free guide
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square bg-slate-900 rounded-2xl overflow-hidden border border-white/10">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: 'url(https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg)'
                  }}
                />
                <div className="absolute inset-0 bg-slate-950/40" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white font-black text-xl mb-2">Strong together</h3>
                  <p className="text-gray-300 font-medium">Find brotherhood and support in recovery</p>
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
              Features
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              What you can expect inside the community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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

      {/* Benefits Section */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">
                Why community matters
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed font-medium">
                Recovery is easier when you\'re not alone.
              </p>
              <div className="grid grid-cols-1 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <Check className="w-6 h-6 text-white flex-shrink-0" />
                    <span className="text-gray-300 font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-slate-900 rounded-2xl p-8 border border-white/10"
            >
              <h3 className="text-2xl font-black text-white mb-6 tracking-tight">What members say</h3>
              <div className="space-y-6">
                <div className="bg-slate-950 rounded-lg p-6 border border-white/10">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-white" />
                    ))}
                  </div>
                  <blockquote className="text-gray-300 italic mb-4 font-medium">
                    "The community gave me the strength I never knew I had. Having other men who understood made all the difference."
                  </blockquote>
                  <cite className="text-white font-bold not-italic">- James L.</cite>
                </div>
                
                <div className="bg-slate-950 rounded-lg p-6 border border-white/10">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-white" />
                    ))}
                  </div>
                  <blockquote className="text-gray-300 italic mb-4 font-medium">
                    "I found accountability partners who became genuine friends. We support each other through everything."
                  </blockquote>
                  <cite className="text-white font-bold not-italic">- Robert M.</cite>
                </div>
              </div>
            </motion.div>
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
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Join today
            </h2>
            <p className="text-lg text-gray-300 mb-12 font-medium">
              Full access to a supportive community of men in recovery.
            </p>
          </motion.div>

          <div className="bg-slate-950 rounded-2xl p-8 md:p-12 border border-white/15">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight">Community membership</h3>
              <div className="flex items-center justify-center mb-4">
                <span className="text-5xl font-black text-white">$97</span>
                <span className="text-gray-400 text-lg ml-2">/month</span>
              </div>
              <p className="text-gray-300 font-medium">Everything you need to stay accountable</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="text-white font-bold mb-4">Features</h4>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-white mr-3" />
                    <span className="font-medium">Private community access</span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-white mr-3" />
                    <span className="font-medium">Weekly group calls</span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-white mr-3" />
                    <span className="font-medium">Accountability partners</span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-white mr-3" />
                    <span className="font-medium">Monthly challenges</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Inclusions</h4>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-white mr-3" />
                    <span className="font-medium">Resource library access</span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-white mr-3" />
                    <span className="font-medium">Monthly expert Q&A</span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-white mr-3" />
                    <span className="font-medium">Progress tracking tools</span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-white mr-3" />
                    <span className="font-medium">24/7 community support</span>
                  </li>
                </ul>
              </div>
            </div>

            <button className="w-full border border-white/15 hover;border-white/30 text-white py-4 rounded-lg font-bold text-lg transition-all duration-300">
              Join the community
            </button>
            
            <p className="text-gray-500 text-sm mt-4 font-medium">
              7-day free trial • Cancel anytime • No commitment
            </p>
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
              Join the community or start with the free guide.
            </p>
            <button className="border border-white/15 hover:border-white/30 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 inline-flex items-center space-x-2">
              <span>Start free trial</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Community;