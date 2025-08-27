import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Target, Users, Heart } from 'lucide-react';

const MyStory = () => {
  return (
    <div className="bg-slate-950 min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              My Story
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              From addiction to freedom. From chaos to discipline. From isolation to purpose.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="relative">
                <div 
                  className="aspect-square bg-slate-800 rounded-2xl bg-cover bg-center border border-white/10"
                  style={{
                    backgroundImage: 'url(https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg)'
                  }}
                />
                <div className="absolute inset-0 bg-slate-900/20 rounded-2xl" />
              </div>
            </motion.div>

            {/* Story Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              <h2 className="text-3xl font-black text-white mb-6 tracking-tight">
                The Breaking Point
              </h2>
              
              <p className="text-gray-300 leading-relaxed font-medium">
                I was 28 when I realized I had lost control. What started as occasional use had become a daily necessity. 
                My relationships were failing, my career was stagnating, and I was living a double life that was eating me alive.
              </p>
              
              <p className="text-gray-300 leading-relaxed font-medium">
                The moment of clarity came during what should have been a celebration—my promotion at work. 
                Instead of feeling proud, I felt empty. I knew that no external achievement would fill the void I was trying to escape.
              </p>
              
              <p className="text-gray-300 leading-relaxed font-medium">
                That night, I made a decision that changed everything. I chose discipline over comfort, 
                accountability over secrecy, and structure over chaos.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Journey */}
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
              The Path to Freedom
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              Recovery isn't about perfection. It's about building systems that work when motivation fails.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-slate-900 rounded-2xl p-8 border border-white/10"
            >
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-black text-white mb-4 tracking-tight">Structure</h3>
              <p className="text-gray-300 font-medium">
                Built daily routines that eliminated decision fatigue and created predictable success patterns.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-900 rounded-2xl p-8 border border-white/10"
            >
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-black text-white mb-4 tracking-tight">Community</h3>
              <p className="text-gray-300 font-medium">
                Connected with men who understood the struggle and held me accountable to my commitments.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-slate-900 rounded-2xl p-8 border border-white/10"
            >
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <Award className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-black text-white mb-4 tracking-tight">Education</h3>
              <p className="text-gray-300 font-medium">
                Studied addiction science, psychology, and evidence-based recovery methods to understand the why behind the how.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-slate-900 rounded-2xl p-8 border border-white/10"
            >
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-black text-white mb-4 tracking-tight">Purpose</h3>
              <p className="text-gray-300 font-medium">
                Discovered that helping other men break free gave my recovery deeper meaning and sustainable motivation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">
              Why BreakFree Exists
            </h2>
            
            <div className="bg-slate-950 rounded-2xl p-8 border border-white/10 mb-8">
              <p className="text-lg text-gray-300 leading-relaxed font-medium mb-6">
                "Recovery programs felt too soft, too forgiving, too focused on feelings instead of results. 
                I needed something that matched my drive for excellence in other areas of life."
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed font-medium mb-6">
                BreakFree was born from the gap I experienced—the need for a recovery approach that respects 
                men's desire for structure, measurable progress, and practical solutions.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed font-medium">
                This isn't about shame or judgment. It's about building the life you actually want, 
                with the discipline and support to make it sustainable.
              </p>
            </div>

            <Link
              to="/programs/mentorship"
              className="inline-flex items-center space-x-2 border border-white/15 hover:border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
            >
              <span>Work with me</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MyStory;