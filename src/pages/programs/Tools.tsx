import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calculator, Calendar, Target, Brain, Heart, Shield, Clock, Users, Download, ExternalLink } from 'lucide-react';

const Tools = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Tools', icon: Target },
    { id: 'assessment', name: 'Assessment', icon: Calculator },
    { id: 'tracking', name: 'Progress Tracking', icon: Calendar },
    { id: 'mindset', name: 'Mindset', icon: Brain },
    { id: 'wellness', name: 'Wellness', icon: Heart },
    { id: 'emergency', name: 'Crisis Support', icon: Shield }
  ];

  const tools = [
    {
      id: 1,
      title: "Addiction Assessment Calculator",
      category: 'assessment',
      description: "Comprehensive assessment tool to evaluate your current situation and create a personalized recovery plan.",
      features: ["Instant results", "Personalized recommendations", "Progress baseline", "Resource matching"],
      type: "Interactive Tool",
      duration: "10-15 minutes",
      users: "5,847",
      rating: 4.9,
      price: "Free",
      link: "/calculator",
      external: false,
      icon: Calculator,
      color: "bg-blue-500/20 text-blue-400"
    },
    {
      id: 2,
      title: "Daily Recovery Tracker",
      category: 'tracking',
      description: "Track your daily habits, mood, triggers, and victories to maintain accountability and see progress.",
      features: ["Habit tracking", "Mood logging", "Trigger identification", "Progress visualization"],
      type: "Mobile App",
      duration: "5 minutes daily",
      users: "3,421",
      rating: 4.7,
      price: "Free",
      link: "#",
      external: true,
      icon: Calendar,
      color: "bg-green-500/20 text-green-400"
    },
    {
      id: 3,
      title: "Urge Surfing Guide",
      category: 'mindset',
      description: "Interactive guide to help you navigate cravings and urges using proven psychological techniques.",
      features: ["Breathing exercises", "Mindfulness techniques", "Distraction strategies", "Emergency protocols"],
      type: "Interactive Guide",
      duration: "15-20 minutes",
      users: "2,156",
      rating: 4.8,
      price: "Free",
      link: "#",
      external: false,
      icon: Brain,
      color: "bg-purple-500/20 text-purple-400"
    },
    {
      id: 4,
      title: "Wellness Planner",
      category: 'wellness',
      description: "Comprehensive wellness planning tool covering physical health, nutrition, exercise, and sleep.",
      features: ["Meal planning", "Workout schedules", "Sleep tracking", "Health goals"],
      type: "Planning Tool",
      duration: "30 minutes setup",
      users: "1,834",
      rating: 4.6,
      price: "$9.99",
      link: "#",
      external: true,
      icon: Heart,
      color: "bg-red-500/20 text-red-400"
    },
    {
      id: 5,
      title: "Crisis Support Hotline",
      category: 'emergency',
      description: "24/7 access to trained counselors and immediate crisis intervention resources.",
      features: ["24/7 availability", "Licensed counselors", "Text & call support", "Resource referrals"],
      type: "Support Service",
      duration: "Available 24/7",
      users: "892",
      rating: 4.9,
      price: "Free",
      link: "tel:1-800-662-4357",
      external: true,
      icon: Shield,
      color: "bg-orange-500/20 text-orange-400"
    },
    {
      id: 6,
      title: "Relapse Prevention Planner",
      category: 'tracking',
      description: "Create and maintain a comprehensive relapse prevention plan with triggers, strategies, and support contacts.",
      features: ["Trigger mapping", "Coping strategies", "Support network", "Emergency contacts"],
      type: "Planning Tool",
      duration: "45-60 minutes",
      users: "2,743",
      rating: 4.8,
      price: "Free",
      link: "#",
      external: false,
      icon: Target,
      color: "bg-indigo-500/20 text-indigo-400"
    },
    {
      id: 7,
      title: "Meditation & Mindfulness App",
      category: 'mindset',
      description: "Guided meditations, breathing exercises, and mindfulness practices specifically for recovery.",
      features: ["Guided meditations", "Breathing exercises", "Progress tracking", "Offline access"],
      type: "Mobile App",
      duration: "5-30 minutes",
      users: "4,567",
      rating: 4.7,
      price: "$4.99/month",
      link: "#",
      external: true,
      icon: Brain,
      color: "bg-teal-500/20 text-teal-400"
    },
    {
      id: 8,
      title: "Accountability Partner Matcher",
      category: 'tracking',
      description: "Connect with other men in recovery for mutual accountability and support.",
      features: ["Profile matching", "Goal alignment", "Check-in reminders", "Progress sharing"],
      type: "Community Tool",
      duration: "Ongoing",
      users: "1,923",
      rating: 4.5,
      price: "Free",
      link: "/programs/community",
      external: false,
      icon: Users,
      color: "bg-yellow-500/20 text-yellow-400"
    }
  ];

  const filteredTools = activeCategory === 'all' 
    ? tools 
    : tools.filter(tool => tool.category === activeCategory);

  const featuredTools = tools.filter(tool => tool.rating >= 4.8);

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
              Recovery Tools
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              Practical tools, apps, and resources to support your daily recovery journey and long-term success.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16"
          >
            <div className="text-center">
              <div className="text-3xl font-black text-white mb-2">15+</div>
              <div className="text-gray-300 font-medium">Recovery Tools</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-white mb-2">20K+</div>
              <div className="text-gray-300 font-medium">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-white mb-2">4.7★</div>
              <div className="text-gray-300 font-medium">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-white mb-2">24/7</div>
              <div className="text-gray-300 font-medium">Support Access</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Most Popular Tools
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              Our highest-rated tools used by thousands of men in recovery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTools.slice(0, 3).map((tool, index) => {
              const IconComponent = tool.icon;
              return (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-950 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-colors group"
                >
                  <div className={`w-14 h-14 ${tool.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-7 h-7" />
                  </div>
                  
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-black text-white mb-2 tracking-tight">{tool.title}</h3>
                      <span className="bg-slate-900 text-gray-300 px-3 py-1 rounded-full text-xs font-bold">
                        {tool.type}
                      </span>
                    </div>
                    <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs font-bold">
                      ★ {tool.rating}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed font-medium">{tool.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {tool.features.slice(0, 3).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
                        <span className="text-gray-400 text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{tool.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{tool.users}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold text-lg">{tool.price}</span>
                    <Link
                      to={tool.link}
                      className="inline-flex items-center space-x-2 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 border border-white/10"
                    >
                      <span>Use Tool</span>
                      {tool.external ? <ExternalLink className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tool Categories */}
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
              Browse by Category
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              Find tools that match your specific recovery needs and goals.
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'bg-slate-900 text-gray-300 border border-white/10 hover:bg-white/5'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTools.map((tool, index) => {
              const IconComponent = tool.icon;
              return (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-900 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-white">{tool.title}</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-400 text-sm font-bold">★ {tool.rating}</span>
                          <span className="text-white font-bold">{tool.price}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-4 leading-relaxed font-medium">{tool.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{tool.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-3 h-3" />
                            <span>{tool.users} users</span>
                          </div>
                        </div>
                        
                        <Link
                          to={tool.link}
                          className="inline-flex items-center space-x-1 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 border border-white/10 text-sm"
                        >
                          <span>Use Tool</span>
                          {tool.external ? <ExternalLink className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mobile App CTA */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-slate-950 rounded-2xl p-8 md:p-12 border border-white/10 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">
              Get the BreakFree Mobile App
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto font-medium">
              Access all recovery tools, track your progress, and get support wherever you are.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Calculator className="w-6 h-6" />
                </div>
                <h3 className="text-white font-bold mb-1">All Tools</h3>
                <p className="text-gray-400 text-sm">Complete toolkit in your pocket</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-white font-bold mb-1">Progress Sync</h3>
                <p className="text-gray-400 text-sm">Seamless tracking across devices</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500/20 text-orange-400 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-white font-bold mb-1">Crisis Support</h3>
                <p className="text-gray-400 text-sm">Instant access to help</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button className="inline-flex items-center space-x-2 border border-white/15 hover:border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300">
                <Download className="w-5 h-5" />
                <span>Download App</span>
              </button>
              <Link
                to="/calculator"
                className="inline-flex items-center space-x-2 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
              >
                <span>Try Web Tools</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Tools;