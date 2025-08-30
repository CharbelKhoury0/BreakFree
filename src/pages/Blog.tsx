import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, User, Clock, ArrowRight, Tag } from 'lucide-react';
import { BlogService } from '../services/blogService';
import type { BlogWithAuthor } from '../types/database';
import NewsletterForm from '../components/NewsletterForm';
import { scrollToTop } from '../utils/scrollToTop';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [blogs, setBlogs] = useState<BlogWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Clean up function - remove temporary localStorage flag
  const cleanupTempData = () => {
    localStorage.removeItem('secondBlogAdded');
  };

  // Call cleanup on component mount
  useEffect(() => {
    cleanupTempData();
  }, []);

  // Function to fetch blogs from Supabase
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await BlogService.getPublishedBlogs(1, 50); // Get up to 50 blogs
      
      if (result.error) {
        setError('Failed to load blog posts');
        console.error('Error fetching blogs:', result.error);
      } else if (result.data) {
        setBlogs(result.data.data);
        console.log('✅ Loaded blogs from Supabase:', result.data.data);
      }
    } catch (error) {
      setError('Failed to load blog posts');
      console.error('Unexpected error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  const categories = ['All', 'Recovery Tips', 'Success Stories', 'Mental Health', 'Relationships', 'Lifestyle'];

  // Helper function to calculate read time based on content length
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  // Helper function to extract category from tags
  const getCategoryFromTags = (tags: string[] | null) => {
    if (!tags || tags.length === 0) return 'General';
    // Return the first tag that matches our categories, or the first tag
    const matchingCategory = tags.find(tag => categories.includes(tag));
    return matchingCategory || tags[0];
  };

  // Filter blogs based on search and category
  const filteredPosts = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (blog.excerpt && blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    const blogCategory = getCategoryFromTags(blog.tags);
    const matchesCategory = selectedCategory === 'All' || blogCategory === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // For now, treat the first blog as featured (you can add a featured field to the database later)
  const featuredPost = filteredPosts.length > 0 ? {
    ...filteredPosts[0],
    category: getCategoryFromTags(filteredPosts[0].tags),
    date: filteredPosts[0].created_at,
    readTime: calculateReadTime(filteredPosts[0].content),
    author: filteredPosts[0].profiles?.full_name || filteredPosts[0].profiles?.email || 'Unknown Author',
    image: filteredPosts[0].featured_image || 'https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg',
    featured: true
  } : null;

  // Convert remaining blogs to the expected format
  const regularPosts = filteredPosts.slice(1).map(blog => ({
    ...blog,
    category: getCategoryFromTags(blog.tags),
    date: blog.created_at,
    readTime: calculateReadTime(blog.content),
    author: blog.profiles?.full_name || blog.profiles?.email || 'Unknown Author',
    image: blog.featured_image || 'https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg'
  }));

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
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
              Insights
            </h1>
            <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto font-medium">
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
                  <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black text-white mb-4 leading-tight tracking-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-300 text-sm sm:text-base lg:text-lg mb-6 leading-relaxed font-medium">
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
                    onClick={scrollToTop}
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
          {!loading && !error && regularPosts.length > 0 && (
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
                    
                    <h3 className="text-lg sm:text-xl font-black text-white mb-3 leading-tight tracking-tight">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-300 text-xs sm:text-sm mb-4 leading-relaxed font-medium">
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
                      onClick={scrollToTop}
                    >
                      <span>Read more</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {loading && (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <h3 className="text-xl font-black text-gray-400 mb-2">Loading articles...</h3>
              <p className="text-gray-500 font-medium">Please wait while we fetch the latest content.</p>
            </div>
          )}

          {error && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-black text-red-400 mb-4">Error loading articles</h3>
              <p className="text-gray-500 mb-8 font-medium">{error}</p>
              <button
                onClick={fetchBlogs}
                className="border border-white/15 hover:border-white/30 text-white px-6 py-3 rounded-lg font-bold transition-colors"
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !error && filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-black text-gray-400 mb-4">No articles found</h3>
              <p className="text-gray-500 mb-8 font-medium">
                {blogs.length === 0 
                  ? "No blog posts are available yet. Check back soon for new content!"
                  : "Try adjusting your search terms or category filters."
                }
              </p>
              {blogs.length > 0 && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="border border-white/15 hover:border-white/30 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                >
                  Clear filters
                </button>
              )}
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight">
              Stay sharp
            </h2>
            <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-2xl mx-auto font-medium">
              Get concise insights delivered to your inbox.
            </p>
            <div className="max-w-md mx-auto">
              <NewsletterForm 
                source="blog_newsletter"
                placeholder="Enter your email"
                buttonText="Subscribe"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;