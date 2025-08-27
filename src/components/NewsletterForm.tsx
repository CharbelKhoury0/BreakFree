import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { mailerLiteService } from '../services/mailerlite';

interface NewsletterFormProps {
  source?: string;
  placeholder?: string;
  buttonText?: string;
  className?: string;
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({
  source = 'newsletter',
  placeholder = 'Enter your email',
  buttonText = 'Subscribe',
  className = ''
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    
    try {
      const result = await mailerLiteService.subscribeToNewsletter(email, source);
      
      if (result.success) {
        setStatus('success');
        setMessage('Successfully subscribed! Check your email for confirmation.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(result.message);
      }
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 5000);
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-green-500/10 border border-green-500/20 rounded-lg p-6 text-center ${className}`}
      >
        <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
        <h3 className="text-white font-bold text-lg mb-2">You're subscribed!</h3>
        <p className="text-gray-300 font-medium">{message}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            disabled={status === 'loading'}
            className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/20 font-medium disabled:opacity-50"
            required
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading' || !email}
          className="border border-white/15 hover:border-white/30 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 whitespace-nowrap"
        >
          {status === 'loading' ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              <span>Subscribing...</span>
            </>
          ) : (
            <span>{buttonText}</span>
          )}
        </button>
      </div>
      
      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-red-400 text-sm"
        >
          <AlertCircle className="w-4 h-4" />
          <span>{message}</span>
        </motion.div>
      )}
      
      <p className="text-gray-400 text-sm font-medium">
        No spam. Unsubscribe anytime. Your privacy is protected.
      </p>
    </form>
  );
};

export default NewsletterForm;