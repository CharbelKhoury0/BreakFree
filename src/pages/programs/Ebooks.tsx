import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Download, BookOpen, Star, Clock, Users, Filter, Search } from 'lucide-react';

const Ebooks = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Books', count: 24 },
    { id: 'foundations', name: 'Recovery Foundations', count: 8 },
    { id: 'relationships', name: 'Relationships', count: 6 },
    { id: 'mindset', name: 'Mindset & Psychology', count: 5 },
    { id: 'practical', name: 'Practical Tools', count: 5 }
  ];

  const ebooks = [
    {
      id: 1,
      title: "The Complete Recovery Blueprint",
      author: "BreakFree Team",
      category: 'foundations',
      description: "A comprehensive 90-day guide to building unbreakable recovery habits and mindset.",
      pages: 156,
      readTime: "4-6 hours",
      rating: 4.9,
      downloads: 2847,
      price: "Free",
      featured: true,
      coverImage: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20minimalist%20book%20cover%20design%20with%20title%20The%20Complete%20Recovery%20Blueprint%20dark%20blue%20and%20white%20colors%20professional%20clean%20typography&image_size=portrait_4_3",
      topics: ["Habit Formation", "Mindset Shifts", "Daily Routines", "Crisis Management"]
    },
    {
      id: 2,
      title: "Rebuilding Trust: A Man's Guide",
      author: "Dr. Michael Stevens",
      category: 'relationships',
      description: "Practical strategies for rebuilding relationships damaged by addiction.",
      pages: 89,
      readTime: "2-3 hours",
      rating: 4.7,
      downloads: 1923,
      price: "$19.99",
      featured: false,
      coverImage: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20book%20cover%20design%20Rebuilding%20Trust%20A%20Mans%20Guide%20warm%20colors%20relationship%20theme%20modern%20typography&image_size=portrait_4_3",
      topics: ["Communication", "Accountability", "Forgiveness", "Boundaries"]
    },
    {
      id: 3,
      title: "The Warrior Mindset",
      author: "James Rodriguez",
      category: 'mindset',
      description: "Developing mental toughness and resilience in recovery.",
      pages: 134,
      readTime: "3-4 hours",
      rating: 4.8,
      downloads: 2156,
      price: "$24.99",
      featured: true,
      coverImage: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=powerful%20book%20cover%20design%20The%20Warrior%20Mindset%20dark%20colors%20strength%20theme%20bold%20typography%20masculine&image_size=portrait_4_3",
      topics: ["Mental Strength", "Discipline", "Goal Setting", "Overcoming Fear"]
    },
    {
      id: 4,
      title: "Daily Recovery Toolkit",
      author: "BreakFree Team",
      category: 'practical',
      description: "Essential daily practices, exercises, and emergency protocols.",
      pages: 67,
      readTime: "1-2 hours",
      rating: 4.6,
      downloads: 3421,
      price: "Free",
      featured: false,
      coverImage: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=clean%20modern%20book%20cover%20Daily%20Recovery%20Toolkit%20tools%20theme%20blue%20and%20gray%20colors%20practical%20design&image_size=portrait_4_3",
      topics: ["Morning Routines", "Trigger Management", "Emergency Plans", "Progress Tracking"]
    },
    {
      id: 5,
      title: "Understanding Addiction Science",
      author: "Dr. Sarah Chen",
      category: 'foundations',
      description: "The neuroscience behind addiction and recovery in plain language.",
      pages: 112,
      readTime: "3 hours",
      rating: 4.5,
      downloads: 1654,
      price: "$16.99",
      featured: false,
      coverImage: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=scientific%20book%20cover%20Understanding%20Addiction%20Science%20brain%20neuroscience%20theme%20professional%20medical%20design&image_size=portrait_4_3",
      topics: ["Brain Chemistry", "Neuroplasticity", "Recovery Science", "Evidence-Based Methods"]
    },
    {
      id: 6,
      title: "Financial Recovery Guide",
      author: "Robert Kim",
      category: 'practical',
      description: "Rebuilding financial stability and planning for the future.",
      pages: 98,
      readTime: "2-3 hours",
      rating: 4.4,
      downloads: 1287,
      price: "$21.99",
      featured: false,
      coverImage: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20book%20cover%20Financial%20Recovery%20Guide%20money%20finance%20theme%20green%20and%20blue%20colors%20business%20style&image_size=portrait_4_3",
      topics: ["Budgeting", "Debt Recovery", "Investment Basics", "Career Planning"]
    }
  ];

  const filteredEbooks = ebooks.filter(ebook => {
    const matchesCategory = selectedCategory === 'all' || ebook.category === selectedCategory;
    const matchesSearch = ebook.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ebook.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ebook.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredEbooks = ebooks.filter(ebook => ebook.featured);

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
              Recovery Library
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              Evidence-based ebooks, guides, and resources to support every stage of your recovery journey.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            <div className="text-center">
              <div className="text-4xl font-black text-white mb-2">24+</div>
              <div className="text-gray-300 font-medium">Expert-Written Books</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-white mb-2">15K+</div>
              <div className="text-gray-300 font-medium">Total Downloads</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-white mb-2">4.7★</div>
              <div className="text-gray-300 font-medium">Average Rating</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Books */}
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
              Featured Books
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              Our most popular and highly-rated recovery resources.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredEbooks.map((ebook, index) => (
              <motion.div
                key={ebook.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-950 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={ebook.coverImage}
                      alt={ebook.title}
                      className="w-32 h-40 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-black text-white mb-2 tracking-tight">{ebook.title}</h3>
                        <p className="text-gray-400 font-medium">by {ebook.author}</p>
                      </div>
                      <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-bold">
                        Featured
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-4 leading-relaxed font-medium">{ebook.description}</p>
                    
                    <div className="flex items-center space-x-4 mb-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{ebook.pages} pages</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{ebook.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span>{ebook.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {ebook.topics.slice(0, 3).map((topic, topicIndex) => (
                        <span key={topicIndex} className="bg-white/5 text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
                          {topic}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-white font-bold text-xl">{ebook.price}</span>
                      <button className="inline-flex items-center space-x-2 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 border border-white/10">
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Library Browser */}
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
              Browse Library
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              Find the perfect resource for your current recovery needs.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <div className="flex flex-col lg:flex-row gap-6 mb-12">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search books, authors, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/20 font-medium"
                />
              </div>
            </div>
            
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'bg-slate-900 text-gray-300 border border-white/10 hover:bg-white/5'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEbooks.map((ebook, index) => (
              <motion.div
                key={ebook.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-900 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-colors group"
              >
                <div className="text-center mb-4">
                  <img
                    src={ebook.coverImage}
                    alt={ebook.title}
                    className="w-24 h-32 object-cover rounded-lg mx-auto mb-4 group-hover:scale-105 transition-transform duration-300"
                  />
                  <h3 className="text-lg font-bold text-white mb-1">{ebook.title}</h3>
                  <p className="text-gray-400 text-sm font-medium">by {ebook.author}</p>
                </div>
                
                <p className="text-gray-300 text-sm mb-4 leading-relaxed font-medium">{ebook.description}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <BookOpen className="w-3 h-3" />
                    <span>{ebook.pages}p</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{ebook.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400" />
                    <span>{ebook.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Download className="w-3 h-3" />
                    <span>{ebook.downloads}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {ebook.topics.slice(0, 2).map((topic, topicIndex) => (
                    <span key={topicIndex} className="bg-white/5 text-gray-400 px-2 py-1 rounded text-xs font-medium">
                      {topic}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold">{ebook.price}</span>
                  <button className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 border border-white/10 text-sm">
                    Download
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership CTA */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Get Unlimited Access
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto font-medium">
              Join our community to access all premium ebooks, exclusive content, and new releases.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                to="/programs/community"
                className="inline-flex items-center space-x-2 border border-white/15 hover:border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
              >
                <span>Join Community</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/free-ebook"
                className="inline-flex items-center space-x-2 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
              >
                <span>Get Free Guide</span>
                <Download className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Ebooks;