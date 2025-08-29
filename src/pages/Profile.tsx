import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Edit3, Save, X, AlertCircle, CheckCircle, Camera, Upload, Trash2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { imageService } from '../services/imageService';

export const Profile: React.FC = () => {
  const { user, profile, updateProfile, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    email: user?.email || ''
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [removingAvatar, setRemovingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    setIsEditing(true);
    setError(null);
    setSuccess(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      full_name: profile?.full_name || '',
      email: user?.email || ''
    });
    setAvatarFile(null);
    setAvatarPreview(null);
    setUploadingAvatar(false);
    setUploadProgress(0);
    setRemovingAvatar(false);
    setError(null);
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      let avatarUrl = profile?.avatar_url;

      // Handle avatar removal
      if (removingAvatar && user) {
        try {
          const result = await imageService.deleteProfilePicture(user.id);
          if (!result.success) {
            setError(`Failed to remove profile picture: ${result.error}`);
            setLoading(false);
            return;
          }
          avatarUrl = null;
        } catch (removeError) {
          setError(`Failed to remove profile picture: ${removeError instanceof Error ? removeError.message : 'Unknown error'}`);
          setLoading(false);
          return;
        }
      }
      // Upload avatar if a new file was selected
      else if (avatarFile && user) {
        setUploadingAvatar(true);
        setUploadProgress(0);
        try {
          const uploadResult = await imageService.uploadProfilePicture(
            avatarFile, 
            user.id, 
            undefined, 
            (progress) => setUploadProgress(progress)
          );
          avatarUrl = uploadResult.url;
        } catch (uploadError) {
          setError(`Failed to upload profile picture: ${uploadError instanceof Error ? uploadError.message : 'Unknown error'}`);
          setLoading(false);
          setUploadingAvatar(false);
          setUploadProgress(0);
          return;
        }
        setUploadingAvatar(false);
        setUploadProgress(0);
      }

      const updateData: any = {
        full_name: formData.full_name
      };
      
      // Always include avatar_url in update when removing or uploading
      if (removingAvatar) {
        updateData.avatar_url = null;
      } else if (avatarFile) {
        updateData.avatar_url = avatarUrl;
      }

      const { error } = await updateProfile(updateData);

      if (error) {
        setError(error.message || 'Failed to update profile');
      } else {
        setSuccess(true);
        setIsEditing(false);
        setAvatarFile(null);
        setAvatarPreview(null);
        setRemovingAvatar(false);
        // Reset file input after successful save
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    }

    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate the file
    const validationError = imageService.validateImage(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setAvatarFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setAvatarPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
    setError(null);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveAvatar = () => {
    setRemovingAvatar(true);
    setAvatarFile(null);
    setAvatarPreview(null);
    setError(null);
    setSuccess(false);
    // Reset the file input to clear any cached file selection
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-6">Please sign in to view your profile.</p>
          <button
            onClick={() => navigate('/auth')}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-slate-900 rounded-2xl p-8 border border-white/10"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <button
                  type="button"
                  onClick={isEditing ? handleAvatarClick : undefined}
                  disabled={!isEditing}
                  className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-white/10 flex items-center justify-center transition-all duration-200 ${
                    isEditing ? 'cursor-pointer hover:ring-2 hover:ring-white/30 hover:ring-offset-2 hover:ring-offset-slate-900' : 'cursor-default'
                  }`}
                >
                  {avatarPreview || profile?.avatar_url ? (
                    <img 
                      src={avatarPreview || profile?.avatar_url || ''} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  )}
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Camera className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
                {isEditing && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center border-2 border-slate-900">
                    <Camera className="w-3 h-3 text-white" />
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarSelect}
                  className="hidden"
                />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {profile?.full_name || 'User Profile'}
                </h1>
                <p className="text-gray-400 font-medium">
                  {isAdmin ? 'Administrator' : 'Member'}
                </p>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 w-full sm:w-auto"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 text-green-400 text-sm bg-green-500/10 border border-green-500/20 rounded-lg p-3 mb-6"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Profile updated successfully!</span>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-6"
            >
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Profile Information */}
          <div className="space-y-6">
            {/* Profile Picture Info */}
            {isEditing && avatarFile && (
              <div className="bg-slate-800/50 rounded-lg p-4 border border-white/10">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <div className="flex-1">
                    <p className="text-white font-medium">New profile picture selected</p>
                    <p className="text-gray-400 text-sm">{avatarFile.name}</p>
                    {uploadingAvatar && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                          <span>Uploading...</span>
                          <span>{Math.round(uploadProgress)}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {!uploadingAvatar && (
                  <p className="text-gray-400 text-xs mt-2">
                    Click "Save Changes" to update your profile picture
                  </p>
                )}
              </div>
            )}

            {/* Remove Avatar Option */}
            {isEditing && (profile?.avatar_url || avatarFile) && !removingAvatar && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Trash2 className="w-5 h-5 text-red-400" />
                    <div>
                      <p className="text-white font-medium">Remove Profile Picture</p>
                      <p className="text-gray-400 text-sm">This will remove your current profile picture</p>
                    </div>
                  </div>
                  <button
                    onClick={handleRemoveAvatar}
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            )}

            {/* Removing Avatar Confirmation */}
            {isEditing && removingAvatar && (
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-orange-400" />
                  <div>
                    <p className="text-white font-medium">Profile picture will be removed</p>
                    <p className="text-gray-400 text-sm">Click "Save Changes" to confirm removal</p>
                  </div>
                </div>
              </div>
            )}

            {/* Full Name */}
            <div>
              <label className="block text-white font-semibold mb-2">
                Full Name
              </label>
              {isEditing ? (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/20 font-medium"
                    placeholder="Enter your full name"
                  />
                </div>
              ) : (
                <div className="flex items-center space-x-3 p-3 bg-slate-800 rounded-lg">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="text-white font-medium">
                    {profile?.full_name || 'Not provided'}
                  </span>
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-white font-semibold mb-2">
                Email Address
              </label>
              <div className="flex items-center space-x-3 p-3 bg-slate-800 rounded-lg">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-white font-medium">{user.email}</span>
                <span className="text-xs text-gray-500 bg-slate-700 px-2 py-1 rounded">
                  Cannot be changed
                </span>
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-white font-semibold mb-2">
                Account Role
              </label>
              <div className="flex items-center space-x-3 p-3 bg-slate-800 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${
                  isAdmin ? 'bg-yellow-400' : 'bg-blue-400'
                }`} />
                <span className="text-white font-medium">
                  {isAdmin ? 'Administrator' : 'Member'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 mt-8 pt-6 border-t border-white/10">
              <button
                onClick={handleSave}
                disabled={loading || uploadingAvatar}
                className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto min-w-[140px]"
              >
                <Save className="w-4 h-4" />
                <span>
                  {uploadingAvatar 
                    ? `Uploading ${Math.round(uploadProgress)}%` 
                    : loading 
                    ? 'Saving...' 
                    : 'Save Changes'
                  }
                </span>
              </button>
              <button
                onClick={handleCancel}
                disabled={loading}
                className="flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 w-full sm:w-auto"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;