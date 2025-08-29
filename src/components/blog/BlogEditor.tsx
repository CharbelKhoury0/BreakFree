import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Eye, EyeOff, Loader, AlertCircle, CheckCircle, Tag, Image } from 'lucide-react';
import { BlogService } from '../../services/blogService';
import type { Blog, BlogInsert, BlogUpdate } from '../../types/database';

interface BlogEditorProps {
  blog?: Blog;
  onSave?: (blog: Blog) => void;
  onCancel?: () => void;
}

export const BlogEditor: React.FC<BlogEditorProps> = ({ blog, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<BlogInsert>>({
    title: '',
    content: '',
    excerpt: '',
    published: false,
    featured_image: '',
    tags: [],
    meta_title: '',
    meta_description: ''
  });
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        content: blog.content,
        excerpt: blog.excerpt || '',
        published: blog.published,
        featured_image: blog.featured_image || '',
        tags: blog.tags || [],
        meta_title: blog.meta_title || '',
        meta_description: blog.meta_description || ''
      });
    }
  }, [blog]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().toLowerCase();
      if (!formData.tags?.includes(newTag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...(prev.tags || []), newTag]
        }));
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      meta_title: title
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let result;
      if (blog) {
        // Update existing blog
        result = await BlogService.updateBlog(blog.id, formData as BlogUpdate);
      } else {
        // Create new blog
        result = await BlogService.createBlog(formData as Omit<BlogInsert, 'author_id'>);
      }

      if (result.error) {
        setError(result.error.message || 'Failed to save blog');
      } else if (result.data) {
        setSuccess(true);
        onSave?.(result.data);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    }

    setLoading(false);
  };

  const handleSaveDraft = async () => {
    const draftData = { ...formData, published: false };
    setFormData(draftData);
    
    // Trigger form submission with draft data
    const event = new Event('submit', { bubbles: true, cancelable: true });
    document.querySelector('form')?.dispatchEvent(event);
  };

  const handlePublish = async () => {
    const publishData = { ...formData, published: true };
    setFormData(publishData);
    
    // Trigger form submission with published data
    setTimeout(() => {
      const event = new Event('submit', { bubbles: true, cancelable: true });
      document.querySelector('form')?.dispatchEvent(event);
    }, 100);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-900 rounded-2xl border border-white/10 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-white tracking-tight">
              {blog ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h2>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setPreview(!preview)}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                {preview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span className="font-medium">{preview ? 'Edit' : 'Preview'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {preview ? (
            /* Preview Mode */
            <div className="prose prose-invert max-w-none">
              <h1 className="text-4xl font-black text-white mb-4">{formData.title}</h1>
              {formData.featured_image && (
                <img 
                  src={formData.featured_image} 
                  alt={formData.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}
              {formData.excerpt && (
                <p className="text-xl text-gray-300 mb-6 italic">{formData.excerpt}</p>
              )}
              <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                {formData.content}
              </div>
              {formData.tags && formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-white/10 text-white px-3 py-1 rounded-full text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Edit Mode */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-white font-semibold mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/20 font-medium disabled:opacity-50"
                  placeholder="Enter blog title"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label htmlFor="excerpt" className="block text-white font-semibold mb-2">
                  Excerpt
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  disabled={loading}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/20 font-medium disabled:opacity-50 resize-vertical"
                  placeholder="Brief description of the blog post"
                />
              </div>

              {/* Featured Image */}
              <div>
                <label htmlFor="featured_image" className="block text-white font-semibold mb-2">
                  Featured Image URL
                </label>
                <div className="relative">
                  <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    id="featured_image"
                    name="featured_image"
                    value={formData.featured_image}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/20 font-medium disabled:opacity-50"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              {/* Content */}
              <div>
                <label htmlFor="content" className="block text-white font-semibold mb-2">
                  Content *
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  rows={15}
                  className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/20 font-medium disabled:opacity-50 resize-vertical"
                  placeholder="Write your blog content here..."
                />
              </div>

              {/* Tags */}
              <div>
                <label htmlFor="tags" className="block text-white font-semibold mb-2">
                  Tags
                </label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/20 font-medium disabled:opacity-50"
                    placeholder="Type a tag and press Enter"
                  />
                </div>
                {formData.tags && formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-white/10 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2"
                      >
                        <span>#{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="text-gray-400 hover:text-white"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* SEO Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="meta_title" className="block text-white font-semibold mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    id="meta_title"
                    name="meta_title"
                    value={formData.meta_title}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/20 font-medium disabled:opacity-50"
                    placeholder="SEO title"
                  />
                </div>
                <div>
                  <label htmlFor="meta_description" className="block text-white font-semibold mb-2">
                    Meta Description
                  </label>
                  <input
                    type="text"
                    id="meta_description"
                    name="meta_description"
                    value={formData.meta_description}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/20 font-medium disabled:opacity-50"
                    placeholder="SEO description"
                  />
                </div>
              </div>

              {/* Error/Success Messages */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 text-green-400 text-sm bg-green-500/10 border border-green-500/20 rounded-lg p-3"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Blog saved successfully!</span>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <div className="flex items-center space-x-3">
                  {onCancel && (
                    <button
                      type="button"
                      onClick={onCancel}
                      disabled={loading}
                      className="px-6 py-3 text-gray-300 hover:text-white font-semibold transition-colors disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  )}
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    disabled={loading}
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Save Draft
                  </button>
                  
                  <button
                    type="button"
                    onClick={handlePublish}
                    disabled={loading}
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-lg transition-all duration-300 border border-white/10 hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>{blog?.published ? 'Update' : 'Publish'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};