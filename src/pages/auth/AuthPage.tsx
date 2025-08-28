import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LoginForm } from '../../components/auth/LoginForm';
import { SignUpForm } from '../../components/auth/SignUpForm';

export const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-screen bg-slate-950 pt-20 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-black text-white mb-4 tracking-tight">
            {mode === 'login' ? 'Welcome Back' : 'Join BreakFree'}
          </h1>
          <p className="text-gray-300 font-medium">
            {mode === 'login' 
              ? 'Sign in to access your account and continue your recovery journey'
              : 'Create your account to start your recovery journey'
            }
          </p>
        </motion.div>

        {mode === 'login' ? (
          <LoginForm
            onSwitchToSignUp={() => setMode('signup')}
          />
        ) : (
          <SignUpForm
            onSwitchToLogin={() => setMode('login')}
          />
        )}
      </div>
    </div>
  );
};