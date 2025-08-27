import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Calendar, Clock, User, ArrowRight, Filter } from 'lucide-react';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Recovery Tips', 'Success Stories', 'Mental Health', 'Relationships', 'Lifestyle'];

  const blogPosts = [
    {
      id: 1,
      title: 'Breaking the Cycle: 5 Proven Strategies to Overcome Addiction',
      excerpt: 'Discover evidence-based techniques that have helped thousands of men break free from pornography addiction and reclaim their lives.',
      category: 'Recovery Tips',
      date: '2024-01-15',
      readTime: '8 min read',
      author: 'Dr. Michael Thompson',
      image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg',
      featured: true
    },
    {
      id: 2,
      title: 'From Shame to Strength: John\'s 12-Month Recovery Journey',
      excerpt: 'Follow John\'s transformation from rock bottom to 12 months of freedom, including the challenges and breakthroughs along the way.',
      category: 'Success Stories',
      date: '2024-01-12',
      readTime: '6 min read',
      author: 'Recovery Team',
      image: 'https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg'
    },
    {
      id: 3,
      title: 'The Science Behind Addiction: Understanding Your Brain',
      excerpt: 'Learn how addiction affects the brain and why understanding the neuroscience can help you develop more effective recovery strategies.',
      category: 'Mental Health',
      date: '2024-01-10',
      readTime: '10 min read',
      author: 'Dr. Sarah Wilson',
      image: 'https://images.pexels.com/photos/3825572/pexels-photo-3825572.jpeg'
    },
    {
      id: 4,
      title: 'Rebuilding Trust: Healing Relationships After Addiction',
      excerpt: 'Practical advice for rebuilding trust with your partner and family members as you work through recovery.',
      category: 'Relationships',
      date: '2024-01-08',
      readTime: '7 min read',
      author: 'Maria Rodriguez, LMFT',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg'
    },
    {
      id: 5,
      title: '30-Day Challenge: Building Healthy Daily Habits',
      excerpt: 'A comprehensive guide to replacing destructive habits with positive ones through our proven 30-day challenge framework.',
      category: 'Lifestyle',
      date: '2024-01-05',
      readTime: '5 min read',
      author: 'Recovery Team',
      image: 'https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg'
    },
    {
      id: 6,
      title: 'Dealing with Triggers: A Complete Guide',
      excerpt: 'Identify, understand, and overcome the triggers that lead to relapse with this comprehensive guide to trigger management.',
      category: 'Recovery Tips',
      date: '2024-01-03',
      readTime: '9 min read',
      author: 'Dr. Michael Thompson',
      image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg'
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured || selectedCategory !== 'All' || searchTerm);

  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      {/* Header */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Insights
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              Clear guidance, practical tools, and field-tested lessons for recovery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-800 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20"
              />
            </div>

            {/* Categories */}
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-white/10 text-white'
                        : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && selectedCategory === 'All' && !searchTerm && (
        <section className="py-12 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-slate-900 rounded-2xl overflow-hidden border border-white/10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-video lg:aspect-square">
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${featuredPost.image})` }}
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="inline-block text-white/80 px-3 py-1 rounded-full text-xs font-semibold mb-4 border border-white/15 w-fit">
                    Featured
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight tracking-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-300 text-lg mb-6 leading-relaxed font-medium">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4 text-gray-400">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span className="text-sm">{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{new Date(featuredPost.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{featuredPost.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <Link
                    to={`/blog/${featuredPost.id}`}
                    className="inline-flex items-center space-x-2 text-white hover:text-gray-200 font-bold"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-12 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-900 rounded-2xl overflow-hidden border border-white/10"
              >
                <div className="aspect-video overflow-hidden">
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${post.image})` }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold border border-white/15 text-white/80">
                      {post.category}
                    </span>
                    <div className="flex items-center space-x-2 text-gray-500 text-xs">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-black text-white mb-3 leading-tight tracking-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed font-medium">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-400 text-xs">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400 text-xs">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center space-x-2 text-white font-semibold text-sm mt-4"
                  >
                    <span>Read more</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-black text-gray-400 mb-4">No articles found</h3>
              <p className="text-gray-500 mb-8 font-medium">Try adjusting your search terms or category filters.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="border border-white/15 hover:border-white/30 text-white px-6 py-3 rounded-lg font-bold transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Stay sharp
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto font-medium">
              Get concise insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-white/10 bg-slate-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <button className="border border-white/15 hover:border-white/30 text-white px-6 py-3 rounded-lg font-bold transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-white/60 text-sm mt-4 font-medium">
              No spam. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;