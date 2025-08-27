import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Download, BookOpen, CheckCircle, Star, Users, Clock, Shield, Target, Brain } from 'lucide-react';

const FreeEbook = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    recoveryStage: '',
    primaryChallenge: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };

  const ebookFeatures = [
    {
      icon: Target,
      title: "90-Day Action Plan",
      description: "Step-by-step roadmap with daily actions and weekly milestones"
    },
    {
      icon: Brain,
      title: "Mindset Transformation",
      description: "Proven psychological techniques to rewire your thinking patterns"
    },
    {
      icon: Shield,
      title: "Crisis Management",
      description: "Emergency protocols and strategies for high-risk situations"
    },
    {
      icon: Users,
      title: "Accountability System",
      description: "Framework for building and maintaining support networks"
    }
  ];

  const testimonials = [
    {
      name: "Marcus T.",
      quote: "This guide gave me the structure I was missing. The 90-day plan is realistic and actually works.",
      sobriety: "6 months",
      rating: 5
    },
    {
      name: "David R.",
      quote: "Finally, a recovery resource written specifically for men. No fluff, just practical strategies.",
      sobriety: "1 year",
      rating: 5
    },
    {
      name: "Alex M.",
      quote: "The crisis management section literally saved my recovery. I keep it on my phone at all times.",
      sobriety: "8 months",
      rating: 5
    }
  ];

  const chapters = [
    {
      number: 1,
      title: "Understanding Your Why",
      description: "Discover your core motivations and build unshakeable commitment"
    },
    {
      number: 2,
      title: "The 90-Day Blueprint",
      description: "Your complete roadmap with daily actions and weekly check-ins"
    },
    {
      number: 3,
      title: "Rewiring Your Mind",
      description: "Practical neuroscience techniques for lasting behavioral change"
    },
    {
      number: 4,
      title: "Building Your Support System",
      description: "How to find, build, and maintain accountability relationships"
    },
    {
      number: 5,
      title: "Crisis Management Protocol",
      description: "Emergency strategies for high-risk situations and urges"
    },
    {
      number: 6,
      title: "Long-term Success Strategies",
      description: "Maintaining progress and continuing growth beyond 90 days"
    }
  ];

  if (isSubmitted) {
    return (
      <div className="bg-slate-950 min-h-screen pt-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto px-4 text-center"
        >
          <div className="bg-slate-900 rounded-2xl p-12 border border-white/10">
            <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-black text-white mb-6 tracking-tight">
              Check Your Email!
            </h1>
            <p className="text-lg text-gray-300 mb-8 font-medium">
              We've sent "The Complete Recovery Blueprint" to <strong>{formData.email}</strong>. 
              Check your inbox (and spam folder) for your free download link.
            </p>
            <div className="space-y-3 sm:space-y-4">
              <Link
                to="/calculator"
                className="inline-flex items-center space-x-2 border border-white/15 hover:border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 w-full justify-center min-h-[48px]"
              >
                <span>Take Recovery Assessment</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/programs/community"
                className="inline-flex items-center space-x-2 bg-white/5 hover:bg-white/10 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 w-full justify-center min-h-[48px]"
              >
                <span>Join Our Community</span>
                <Users className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-bold inline-block mb-6">
                FREE DOWNLOAD
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 sm:mb-6 tracking-tight">
                The Complete Recovery Blueprint
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 font-medium leading-relaxed">
                A comprehensive 90-day guide specifically designed for men ready to break free from addiction and build lasting recovery.
              </p>
              
              <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-black text-white mb-1 sm:mb-2">156</div>
                  <div className="text-gray-300 font-medium text-sm sm:text-base">Pages</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-black text-white mb-1 sm:mb-2">4.9★</div>
                  <div className="text-gray-300 font-medium text-sm sm:text-base">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-black text-white mb-1 sm:mb-2">12K+</div>
                  <div className="text-gray-300 font-medium text-sm sm:text-base">Downloads</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-black text-white mb-1 sm:mb-2">90</div>
                  <div className="text-gray-300 font-medium text-sm sm:text-base">Day Plan</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-gray-300">
                <div className="flex items-center space-x-1">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">4-6 hour read</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-medium">PDF format</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-slate-900 rounded-2xl p-6 sm:p-8 border border-white/10"
            >
              <div className="text-center mb-6 sm:mb-8">
                <img
                  src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20ebook%20cover%20design%20The%20Complete%20Recovery%20Blueprint%20dark%20blue%20and%20white%20colors%20masculine%20recovery%20theme%20clean%20typography&image_size=portrait_4_3"
                  alt="The Complete Recovery Blueprint"
                  className="w-32 xs:w-36 sm:w-40 md:w-48 h-40 xs:h-44 sm:h-52 md:h-64 object-cover rounded-lg mx-auto shadow-2xl"
                />
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="firstName" className="block text-white font-semibold mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 sm:py-4 bg-slate-950 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/20 font-medium min-h-[48px] text-base"
                    placeholder="Enter your first name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-white font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 sm:py-4 bg-slate-950 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/20 font-medium min-h-[48px] text-base"
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div>
                  <label htmlFor="recoveryStage" className="block text-white font-semibold mb-2">
                    Recovery Stage
                  </label>
                  <select
                    id="recoveryStage"
                    name="recoveryStage"
                    value={formData.recoveryStage}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 sm:py-4 bg-slate-950 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/20 font-medium min-h-[48px] text-base"
                  >
                    <option value="">Select your stage</option>
                    <option value="considering">Considering recovery</option>
                    <option value="early">Early recovery (0-90 days)</option>
                    <option value="established">Established recovery (3+ months)</option>
                    <option value="long-term">Long-term recovery (1+ years)</option>
                    <option value="relapse">Recovering from relapse</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="primaryChallenge" className="block text-white font-semibold mb-2">
                    Primary Challenge
                  </label>
                  <select
                    id="primaryChallenge"
                    name="primaryChallenge"
                    value={formData.primaryChallenge}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 sm:py-4 bg-slate-950 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/20 font-medium min-h-[48px] text-base"
                  >
                    <option value="">Select your main challenge</option>
                    <option value="motivation">Staying motivated</option>
                    <option value="triggers">Managing triggers</option>
                    <option value="relationships">Relationship issues</option>
                    <option value="accountability">Lack of accountability</option>
                    <option value="structure">Need for structure</option>
                    <option value="support">Finding support</option>
                  </select>
                </div>
                
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center space-x-2 border border-white/15 hover:border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 min-h-[48px]"
                >
                  <Download className="w-5 h-5" />
                  <span>Get Free Blueprint</span>
                </button>
                
                <p className="text-gray-400 text-sm text-center font-medium">
                  No spam. Unsubscribe anytime. Your privacy is protected.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              What's Inside
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              Everything you need to build a strong foundation for lasting recovery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ebookFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-950 rounded-xl p-8 border border-white/10"
                >
                  <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed font-medium">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Chapter Breakdown */}
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
              Chapter Breakdown
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              Six comprehensive chapters covering every aspect of successful recovery.
            </p>
          </motion.div>

          <div className="space-y-6">
            {chapters.map((chapter, index) => (
              <motion.div
                key={chapter.number}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-900 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-black text-lg">{chapter.number}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{chapter.title}</h3>
                    <p className="text-gray-300 font-medium">{chapter.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              What Men Are Saying
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              Real feedback from men who've used this blueprint to transform their lives.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-950 rounded-xl p-6 border border-white/10"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-300 leading-relaxed font-medium mb-4 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center justify-between">
                  <div className="text-white font-bold">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm font-medium">{testimonial.sobriety} sober</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Ready to Start Your Recovery?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto font-medium">
              Download your free blueprint and take the first step toward lasting freedom.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href="#download-form"
                className="inline-flex items-center space-x-2 border border-white/15 hover:border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Download className="w-5 h-5" />
                <span>Get Free Blueprint</span>
              </a>
              <Link
                to="/calculator"
                className="inline-flex items-center space-x-2 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
              >
                <span>Take Assessment</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FreeEbook;