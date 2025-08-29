import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, Settings, BarChart3, Plus, Edit } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const { user, profile, isAdmin } = useAuth();
  const navigate = useNavigate();

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-6">You don't have permission to access this page.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const dashboardCards = [
    {
      title: 'Manage Blogs',
      description: 'Create, edit, and manage blog posts',
      icon: FileText,
      path: '/admin/blogs',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'User Management',
      description: 'Manage user accounts and permissions',
      icon: Users,
      path: '#',
      color: 'from-green-500 to-green-600',
      comingSoon: true
    },
    {
      title: 'Analytics',
      description: 'View site statistics and user engagement',
      icon: BarChart3,
      path: '#',
      color: 'from-purple-500 to-purple-600',
      comingSoon: true
    },
    {
      title: 'Settings',
      description: 'Configure site settings and preferences',
      icon: Settings,
      path: '#',
      color: 'from-orange-500 to-orange-600',
      comingSoon: true
    }
  ];

  const quickActions = [
    {
      title: 'Create New Blog Post',
      icon: Plus,
      action: () => navigate('/admin/blogs'),
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Edit Profile',
      icon: Edit,
      action: () => navigate('/profile/edit'),
      color: 'bg-green-500 hover:bg-green-600'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-400 text-base sm:text-lg">
                Welcome back, {profile?.full_name || user.email}
              </p>
            </div>
            <div className="flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-4 py-2 w-fit">
              <div className="w-3 h-3 bg-yellow-400 rounded-full" />
              <span className="text-yellow-400 font-medium">Administrator</span>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.action}
                  className={`${action.color} text-white p-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center sm:justify-start space-x-3`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm sm:text-base">{action.title}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Dashboard Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Management Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dashboardCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="group relative"
                >
                  <div
                    className={`bg-slate-900 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:border-white/20 ${
                      card.comingSoon ? 'cursor-not-allowed opacity-75' : 'cursor-pointer hover:transform hover:scale-105'
                    }`}
                    onClick={() => {
                      if (!card.comingSoon && card.path !== '#') {
                        navigate(card.path);
                      }
                    }}
                  >
                    {/* Icon with gradient background */}
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {card.description}
                    </p>

                    {/* Coming Soon Badge */}
                    {card.comingSoon && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-slate-700 text-gray-300 text-xs px-2 py-1 rounded-full font-medium">
                          Coming Soon
                        </span>
                      </div>
                    )}

                    {/* Hover Effect */}
                    {!card.comingSoon && (
                      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-black text-white mb-2">∞</div>
                <div className="text-gray-400 font-medium">Total Blog Posts</div>
                <div className="text-xs text-gray-500 mt-1">Analytics coming soon</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-white mb-2">∞</div>
                <div className="text-gray-400 font-medium">Total Users</div>
                <div className="text-xs text-gray-500 mt-1">Analytics coming soon</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-white mb-2">∞</div>
                <div className="text-gray-400 font-medium">Page Views</div>
                <div className="text-xs text-gray-500 mt-1">Analytics coming soon</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;