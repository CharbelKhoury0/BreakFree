import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Shield, Users, Target, BookOpen, Wrench, Award, TrendingUp, Heart } from 'lucide-react';
import Hero from '../components/Hero';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { programs } from '../data/programs';

const Home = () => {
  const getIcon = (iconName: string) => {
    const icons = {
      '👥': Users,
      '🤝': Users,
      '🎯': Target,
      '📚': BookOpen,
      '🛠️': Wrench
    };
    return icons[iconName as keyof typeof icons] || Users;
  };

  return (
    <div className="bg-slate-950">
      <Hero />

      {/* Video Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                A disciplined path to recovery
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed font-medium">
                Our approach is direct and practical. Structure, accountability, and a community that holds the line.
              </p>
              <Link
                to="/about/story"
                className="inline-flex items-center space-x-2 text-white hover:text-gray-200 font-bold text-lg"
              >
                <span>Learn more</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-video bg-slate-800 rounded-2xl overflow-hidden group cursor-pointer border border-white/10">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: 'url(https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg)'
                  }}
                />
                <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform border border-white/20">
                    <Play className="w-7 h-7 text-white ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg">Our approach</h3>
                  <p className="text-gray-300 text-sm font-medium">What to expect from day one</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Programs built to perform
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              Choose the structure that fits your pace. Every path is clear, focused, and accountable.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => {
              const IconComponent = getIcon(program.icon);
              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-900 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-colors"
                >
                  <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{program.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed font-medium">{program.description}</p>
                  
                  <div className="space-y-2 mb-8">
                    {program.features.slice(0, 3).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-white/30 rounded-full" />
                        <span className="text-gray-400 text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    {program.price && (
                      <span className="text-white font-bold text-lg">{program.price}</span>
                    )}
                    <Link
                      to={program.path}
                      className="inline-flex items-center space-x-2 text-white hover:text-gray-200 transition-colors font-semibold"
                    >
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
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
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              Men who chose discipline—and changed their lives.
            </p>
          </motion.div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* Authority Section */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Proven. Confidential. Built for men.
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              Evidence-based methods, professional guidance, and a culture of accountability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-slate-900 rounded-2xl p-8 text-center border border-white/10"
            >
              <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-white font-black text-xl mb-2">Certified</h3>
              <p className="text-gray-400 font-medium">Licensed addiction counselors and therapists</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-900 rounded-2xl p-8 text-center border border-white/10"
            >
              <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-white font-black text-xl mb-2">Proven</h3>
              <p className="text-gray-400 font-medium">87% success rate with evidence-based methods</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-slate-900 rounded-2xl p-8 text-center border border-white/10"
            >
              <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-white font-black text-xl mb-2">Confidential</h3>
              <p className="text-gray-400 font-medium">Private, secure, and discreet</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-slate-900 rounded-2xl p-8 text-center border border-white/10"
            >
              <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-white font-black text-xl mb-2">Supportive</h3>
              <p className="text-gray-400 font-medium">Firm, respectful, and consistent</p>
            </motion.div>
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
              Start with a quick assessment. Get a plan. Execute.
            </p>
            <Link
              to="/calculator"
              className="inline-flex items-center space-x-2 border border-white/15 hover:border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
            >
              <span>Start assessment</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;