import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Users, Target, DollarSign, CheckCircle, Gift, Loader, AlertCircle } from 'lucide-react';
import { mailerLiteService } from '../../services/mailerlite';

const Donations = () => {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorName, setDonorName] = useState('');
  const [emailOptIn, setEmailOptIn] = useState(true);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const donationAmounts = [25, 50, 100, 250, 500];

  const impactAreas = [
    {
      icon: Users,
      title: "Scholarship Program",
      description: "Provide free access to recovery programs for men who cannot afford treatment.",
      impact: "$100 sponsors one month of community access for someone in need."
    },
    {
      icon: Target,
      title: "Research & Development",
      description: "Fund research into men's addiction recovery and develop new evidence-based tools.",
      impact: "$250 supports one month of research into addiction recovery methods."
    },
    {
      icon: Heart,
      title: "Crisis Support",
      description: "24/7 emergency support for men in crisis situations or relapse prevention.",
      impact: "$50 provides crisis support for one person during a critical moment."
    }
  ];

  const testimonials = [
    {
      name: "Anonymous Recipient",
      quote: "The scholarship program saved my life. I couldn't afford treatment, but BreakFree gave me a chance when I had nowhere else to turn.",
      program: "Scholarship Recipient"
    },
    {
      name: "Michael T.",
      quote: "Knowing that my donation helps other men break free from addiction gives my own recovery deeper meaning and purpose.",
      program: "Monthly Donor"
    }
  ];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(0);
  };

  const getCurrentAmount = () => {
    return customAmount ? parseFloat(customAmount) : selectedAmount;
  };

  const handleDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!donorEmail || !donorName || getCurrentAmount() <= 0) {
      setStatus('error');
      setMessage('Please fill in all required fields and select a donation amount');
      return;
    }

    setStatus('loading');
    
    try {
      // Subscribe to donor updates if opted in
      if (emailOptIn) {
        await mailerLiteService.subscribeWithInterest({
          email: donorEmail,
          name: donorName,
          interest: 'donor_updates',
          source: 'donation_form'
        });
      }
      
      // Here you would integrate with your payment processor (Stripe, PayPal, etc.)
      // For now, we'll simulate the donation process
      
      setStatus('success');
      setMessage(`Thank you for your ${donationType} donation of $${getCurrentAmount()}!`);
      
      // Reset form
      setDonorEmail('');
      setDonorName('');
      setSelectedAmount(50);
      setCustomAmount('');
      
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
              Support Recovery
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              Help us provide life-changing recovery programs to men who need them most.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">
              Our Mission
            </h2>
            
            <div className="bg-slate-950 rounded-2xl p-8 border border-white/10 mb-8">
              <p className="text-lg text-gray-300 leading-relaxed font-medium mb-6">
                Every man deserves access to effective addiction recovery, regardless of his financial situation. 
                Your donation directly funds scholarships, research, and crisis support for men who are ready to change their lives.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed font-medium">
                We believe that recovery should be accessible, evidence-based, and designed specifically for men's unique challenges. 
                Your support makes this vision a reality.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Areas */}
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
              Where Your Donation Goes
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              100% of donations go directly to program funding. Administrative costs are covered separately.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactAreas.map((area, index) => {
              const IconComponent = area.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-900 rounded-2xl p-8 border border-white/10"
                >
                  <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{area.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed font-medium">{area.description}</p>
                  
                  <div className="bg-slate-950 rounded-lg p-4">
                    <p className="text-gray-400 text-sm font-medium">{area.impact}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Make a Donation
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              Choose your donation amount and frequency. Every contribution makes a difference.
            </p>
          </motion.div>

          <div className="bg-slate-950 rounded-2xl p-8 border border-white/10">
            <form onSubmit={handleDonation}>
            {/* Donation Type */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Donation Type</h3>
              <div className="flex space-x-4">
                <button
                  onClick={() => setDonationType('one-time')}
                  className={`px-6 py-3 rounded-lg font-bold transition-all ${
                    donationType === 'one-time'
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'bg-slate-800 text-gray-400 border border-white/5 hover:bg-slate-700'
                  }`}
                >
                  One-time
                </button>
                <button
                  onClick={() => setDonationType('monthly')}
                  className={`px-6 py-3 rounded-lg font-bold transition-all ${
                    donationType === 'monthly'
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'bg-slate-800 text-gray-400 border border-white/5 hover:bg-slate-700'
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>

            {/* Amount Selection */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Select Amount</h3>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-4">
                {donationAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleAmountSelect(amount)}
                    className={`p-4 rounded-lg font-bold transition-all ${
                      selectedAmount === amount
                        ? 'bg-white/10 text-white border border-white/20'
                        : 'bg-slate-800 text-gray-400 border border-white/5 hover:bg-slate-700'
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  placeholder="Custom amount"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="flex-1 bg-slate-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-white/20 focus:outline-none"
                />
              </div>
            </div>

            {/* Impact Preview */}
            {getCurrentAmount() > 0 && (
              <div className="mb-8 bg-slate-900 rounded-lg p-6 border border-white/10">
                <h4 className="text-lg font-bold text-white mb-3">Your Impact</h4>
                <div className="space-y-2">
                  {getCurrentAmount() >= 25 && (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300 text-sm font-medium">Provides crisis support resources</span>
                    </div>
                  )}
                  {getCurrentAmount() >= 50 && (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300 text-sm font-medium">Funds emergency intervention support</span>
                    </div>
                  )}
                  {getCurrentAmount() >= 100 && (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300 text-sm font-medium">Sponsors community access for someone in need</span>
                    </div>
                  )}
                  {getCurrentAmount() >= 250 && (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300 text-sm font-medium">Supports research and program development</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Donor Information */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Donor Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="donorName" className="block text-white font-semibold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="donorName"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    disabled={status === 'loading'}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/20 font-medium disabled:opacity-50"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="donorEmail" className="block text-white font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="donorEmail"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    disabled={status === 'loading'}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/20 font-medium disabled:opacity-50"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={emailOptIn}
                    onChange={(e) => setEmailOptIn(e.target.checked)}
                    disabled={status === 'loading'}
                    className="w-4 h-4 text-white bg-slate-800 border-white/20 rounded focus:ring-white/20"
                  />
                  <span className="text-gray-300 font-medium text-sm">
                    Send me updates about how my donation is making an impact
                  </span>
                </label>
              </div>
            </div>

            {/* Donate Button */}
            <button 
              type="submit"
              disabled={status === 'loading' || getCurrentAmount() <= 0}
              className="w-full bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 border border-white/10 hover:border-white/20 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Gift className="w-5 h-5" />
                  <span>
                    Donate ${getCurrentAmount() || '0'} {donationType === 'monthly' ? '/month' : ''}
                  </span>
                </>
              )}
            </button>
            
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 text-red-400 text-sm mt-4"
              >
                <AlertCircle className="w-4 h-4" />
                <span>{message}</span>
              </motion.div>
            )}
            
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 text-green-400 text-sm mt-4"
              >
                <CheckCircle className="w-4 h-4" />
                <span>{message}</span>
              </motion.div>
            )}
            
            <p className="text-gray-400 text-sm text-center mt-4 font-medium">
              Secure donation processing. Tax-deductible receipt provided via email.
            </p>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Donor Impact Stories
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              Hear from those who have given and received support through our programs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-900 rounded-2xl p-8 border border-white/10"
              >
                <blockquote className="text-lg text-gray-300 leading-relaxed font-medium mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <div className="text-white font-bold">{testimonial.name}</div>
                  <div className="text-gray-400 font-medium text-sm">{testimonial.program}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Ways to Help */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">
              Other Ways to Help
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-950 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Share Our Mission</h3>
                <p className="text-gray-300 font-medium mb-4">
                  Help us reach more men who need recovery support by sharing BreakFree with your network.
                </p>
                <Link
                  to="/about/testimonials"
                  className="inline-flex items-center space-x-2 text-white hover:text-gray-200 font-semibold"
                >
                  <span>View success stories</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="bg-slate-950 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Corporate Partnerships</h3>
                <p className="text-gray-300 font-medium mb-4">
                  Partner with us to provide employee assistance programs and workplace recovery support.
                </p>
                <a
                  href="mailto:partnerships@breakfree.com"
                  className="inline-flex items-center space-x-2 text-white hover:text-gray-200 font-semibold"
                >
                  <span>Contact us</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <p className="text-gray-400 font-medium">
              BreakFree is a 501(c)(3) nonprofit organization. All donations are tax-deductible to the full extent allowed by law.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Donations;