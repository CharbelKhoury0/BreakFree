import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, User, Eye, Edit, Trash2, Plus } from 'lucide-react';
import { BlogService } from '../../services/blogService';
import { useAuth } from '../../hooks/useAuth';
import type { BlogWithAuthor, PaginatedResponse } from '../../types/database';

interface BlogListProps {
  showActions?: boolean;
  onEdit?: (blog: BlogWithAuthor) => void;
  onDelete?: (blog: BlogWithAuthor) => void;
  onCreate?: () => void;
}

export const BlogList: React.FC<BlogListProps> = ({ 
  showActions = false, 
  onEdit, 
  onDelete, 
  onCreate 
}) => {
  const [blogs, setBlogs] = useState<PaginatedResponse<BlogWithAuthor> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPublishedOnly, setShowPublishedOnly] = useState(!showActions);

  const { user, isAdmin } = useAuth();

  const loadBlogs = async (page = 1) => {
    setLoading(true);
    setError(null);

    try {
      let result;
      if (showActions && user) {
        // Load user's own blogs or all blogs if admin
        if (isAdmin) {
          result = await BlogService.getBlogs(page, 10, {
            published: showPublishedOnly ? true : undefined,
            search: searchTerm || undefined,
            tags: selectedTags.length > 0 ? selectedTags : undefined
          });
        } else {
          result = await BlogService.getUserBlogs(page, 10);
        }
      } else {
        // Load published blogs for public view
        result = await BlogService.getPublishedBlogs(
          page, 
          10, 
          searchTerm || undefined, 
          selectedTags.length > 0 ? selectedTags : undefined
        );
      }

      if (result.error) {
        setError(result.error.message || 'Failed to load blogs');
      } else {
        setBlogs(result.data);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    }

    setLoading(false);
  };

  const loadTags = async () => {
    const { data: tags } = await BlogService.getAllTags();
    if (tags) {
      setAvailableTags(tags);
    }
  };

  useEffect(() => {
    loadBlogs(currentPage);
  }, [currentPage, searchTerm, selectedTags, showPublishedOnly, user, isAdmin]);

  useEffect(() => {
    loadTags();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
    setCurrentPage(1);
  };

  const handleDelete = async (blog: BlogWithAuthor) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      const { error } = await BlogService.deleteBlog(blog.id);
      if (error) {
        alert('Failed to delete blog: ' + error.message);
      } else {
        loadBlogs(currentPage);
        onDelete?.(blog);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading && !blogs) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black text-white tracking-tight">
          {showActions ? 'Manage Blogs' : 'Blog Posts'}
        </h2>
        {showActions && onCreate && (
          <button
            onClick={onCreate}
            className="inline-flex items-center space-x-2 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 border border-white/10 hover:border-white/20"
          >
            <Plus className="w-4 h-4" />
            <span>New Post</span>
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-slate-900 rounded-xl p-6 border border-white/10">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/20 font-medium"
              />
            </div>
          </div>

          {/* Published Filter (for admin/author view) */}
          {showActions && (
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={showPublishedOnly ? 'published' : 'all'}
                onChange={(e) => setShowPublishedOnly(e.target.value === 'published')}
                className="bg-slate-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/20"
              >
                <option value="all">All Posts</option>
                <option value="published">Published Only</option>
              </select>
            </div>
          )}
        </div>

        {/* Tags */}
        {availableTags.length > 0 && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {availableTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-white/20 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
          {error}
        </div>
      )}

      {/* Blog List */}
      {blogs && (
        <div className="space-y-4">
          {blogs.data.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold text-gray-400 mb-2">No blogs found</h3>
              <p className="text-gray-500 font-medium">
                {searchTerm || selectedTags.length > 0 
                  ? 'Try adjusting your search or filters'
                  : showActions 
                    ? 'Create your first blog post'
                    : 'Check back later for new content'
                }
              </p>
            </div>
          ) : (
            blogs.data.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-900 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-xl font-bold text-white">{blog.title}</h3>
                      {!blog.published && (
                        <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs font-bold">
                          Draft
                        </span>
                      )}
                    </div>
                    
                    {blog.excerpt && (
                      <p className="text-gray-300 mb-4 leading-relaxed font-medium">
                        {blog.excerpt}
                      </p>
                    )}
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{blog.profiles.full_name || blog.profiles.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(blog.created_at)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{blog.view_count} views</span>
                      </div>
                    </div>
                    
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {blog.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="bg-white/5 text-gray-300 px-2 py-1 rounded text-xs font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {showActions && (user?.id === blog.author_id || isAdmin) && (
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => onEdit?.(blog)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(blog)}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}

          {/* Pagination */}
          {blogs.totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 pt-6">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={!blogs.hasPreviousPage}
                className="px-4 py-2 bg-slate-800 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
              >
                Previous
              </button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: blogs.totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                      page === currentPage
                        ? 'bg-white/10 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(blogs.totalPages, prev + 1))}
                disabled={!blogs.hasNextPage}
                className="px-4 py-2 bg-slate-800 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};