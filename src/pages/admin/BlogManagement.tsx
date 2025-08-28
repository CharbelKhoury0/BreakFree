import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { BlogEditor } from '../../components/blog/BlogEditor';
import { BlogList } from '../../components/blog/BlogList';
import { useAuth } from '../../hooks/useAuth';
import type { BlogWithAuthor } from '../../types/database';

export const BlogManagement: React.FC = () => {
  const [currentView, setCurrentView] = useState<'list' | 'create' | 'edit'>('list');
  const [editingBlog, setEditingBlog] = useState<BlogWithAuthor | null>(null);
  const { user, isAdmin } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Authentication Required</h2>
          <p className="text-gray-300">Please sign in to manage blogs.</p>
        </div>
      </div>
    );
  }

  const handleCreate = () => {
    setEditingBlog(null);
    setCurrentView('create');
  };

  const handleEdit = (blog: BlogWithAuthor) => {
    setEditingBlog(blog);
    setCurrentView('edit');
  };

  const handleSave = () => {
    setCurrentView('list');
    setEditingBlog(null);
  };

  const handleCancel = () => {
    setCurrentView('list');
    setEditingBlog(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {currentView === 'list' ? (
          <BlogList
            showActions={true}
            onCreate={handleCreate}
            onEdit={handleEdit}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <button
                onClick={handleCancel}
                className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Blog List</span>
              </button>
            </div>
            
            <BlogEditor
              blog={editingBlog || undefined}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};