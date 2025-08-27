import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Heart, Shield, Users, Phone, Mail } from 'lucide-react';

const Disclaimer = () => {
  const disclaimerSections = [
    {
      id: 'medical',
      title: 'Medical Disclaimer',
      icon: Heart,
      content: [
        {
          subtitle: 'Not Medical Treatment',
          text: 'BreakFree services, including our programs, assessments, and resources, are not medical treatment and should not be considered a substitute for professional medical care, psychiatric treatment, therapy, or emergency medical services.'
        },
        {
          subtitle: 'Professional Medical Advice',
          text: 'The information provided through our services is for educational and support purposes only. Always seek the advice of qualified healthcare professionals regarding any medical condition, mental health concern, or treatment decision.'
        },
        {
          subtitle: 'Emergency Situations',
          text: 'If you are experiencing a medical emergency, having thoughts of self-harm or suicide, or are in immediate danger, please contact emergency services immediately (911 in the US) or go to your nearest emergency room. Do not rely on our services for emergency assistance.'
        },
        {
          subtitle: 'Individual Results',
          text: 'Recovery outcomes vary significantly between individuals. Our programs and resources may not be suitable for everyone, and we cannot guarantee specific results or recovery success.'
        }
      ]
    },
    {
      id: 'professional',
      title: 'Professional Services Disclaimer',
      icon: Users,
      content: [
        {
          subtitle: 'Coaching vs. Therapy',
          text: 'Our recovery coaching and mentorship services are distinct from licensed therapy or counseling. While our coaches may have professional training and certifications, they are not providing medical or psychiatric treatment.'
        },
        {
          subtitle: 'Scope of Services',
          text: 'Our services focus on education, support, accountability, and skill-building for addiction recovery. We do not diagnose, treat, or cure any medical or psychiatric conditions.'
        },
        {
          subtitle: 'Licensed Professionals',
          text: 'When we provide access to licensed professionals (therapists, counselors, etc.), they operate within their scope of practice and licensing requirements. Their services are separate from our general coaching and support programs.'
        }
      ]
    },
    {
      id: 'information',
      title: 'Information Accuracy Disclaimer',
      icon: Shield,
      content: [
        {
          subtitle: 'Educational Content',
          text: 'All information provided through our services is for educational purposes only. While we strive to provide accurate and up-to-date information, we make no warranties about the completeness, accuracy, or reliability of this information.'
        },
        {
          subtitle: 'Third-Party Content',
          text: 'Our services may include content from third-party sources. We do not endorse or take responsibility for the accuracy of third-party content, and such content does not necessarily reflect our views or recommendations.'
        },
        {
          subtitle: 'Regular Updates',
          text: 'We regularly update our content and resources, but information may become outdated. Always verify important information with current, authoritative sources.'
        }
      ]
    },
    {
      id: 'limitations',
      title: 'Service Limitations',
      icon: AlertTriangle,
      content: [
        {
          subtitle: 'Availability',
          text: 'Our services may not be available 24/7, and we cannot guarantee uninterrupted access to our platform or immediate response to communications.'
        },
        {
          subtitle: 'Technical Issues',
          text: 'We are not responsible for technical difficulties, internet connectivity issues, or other factors beyond our control that may affect your access to or use of our services.'
        },
        {
          subtitle: 'Geographic Limitations',
          text: 'Some services may not be available in all geographic locations due to licensing requirements, legal restrictions, or other factors.'
        },
        {
          subtitle: 'Age Requirements',
          text: 'Our services are designed for adults (18 years and older). Minors should not use our services without appropriate parental consent and supervision.'
        }
      ]
    }
  ];

  const emergencyContacts = [
    {
      title: 'Emergency Services',
      number: '911',
      description: 'For immediate medical emergencies'
    },
    {
      title: 'Suicide & Crisis Lifeline',
      number: '988',
      description: '24/7 crisis support and suicide prevention'
    },
    {
      title: 'SAMHSA Helpline',
      number: '1-800-662-4357',
      description: 'Substance abuse treatment referrals'
    },
    {
      title: 'Crisis Text Line',
      number: 'Text HOME to 741741',
      description: '24/7 crisis support via text'
    }
  ];

  return (
    <div className="bg-slate-950 min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="w-20 h-20 bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Disclaimer
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              Important information about the limitations and scope of BreakFree services. Please read carefully before using our platform.
            </p>
            <div className="mt-8 text-gray-400 font-medium">
              <p>Last updated: January 2024</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Critical Warning */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-red-500/20 text-red-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-white mb-4 tracking-tight">Critical Warning</h2>
                <p className="text-gray-300 leading-relaxed font-medium mb-6">
                  <strong>If you are experiencing a medical emergency, having thoughts of self-harm or suicide, or are in immediate danger, DO NOT use this website for help.</strong>
                </p>
                <p className="text-gray-300 leading-relaxed font-medium mb-6">
                  Instead, immediately contact emergency services or go to your nearest emergency room. Our services are not designed for crisis intervention or emergency situations.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-950 rounded-lg p-4 border border-white/10">
                    <h3 className="text-white font-bold mb-2 flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>Emergency Services</span>
                    </h3>
                    <p className="text-gray-300 text-sm font-medium">Call 911 immediately</p>
                  </div>
                  <div className="bg-slate-950 rounded-lg p-4 border border-white/10">
                    <h3 className="text-white font-bold mb-2 flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>Crisis Lifeline</span>
                    </h3>
                    <p className="text-gray-300 text-sm font-medium">Call or text 988</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Disclaimer Sections */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {disclaimerSections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-900 rounded-2xl p-8 border border-white/10"
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-tight">{section.title}</h2>
                  </div>
                  
                  <div className="space-y-6">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        <h3 className="text-xl font-bold text-white mb-3">{item.subtitle}</h3>
                        <p className="text-gray-300 leading-relaxed font-medium">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Emergency Resources */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-white mb-6 tracking-tight">Emergency Resources</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              If you need immediate help, please contact one of these emergency resources instead of using our platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {emergencyContacts.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-950 rounded-xl p-6 border border-white/10 hover:border-red-500/20 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-500/20 text-red-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{contact.title}</h3>
                    <p className="text-2xl font-black text-red-400 mb-2">{contact.number}</p>
                    <p className="text-gray-300 font-medium">{contact.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Liability and Responsibility */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-3xl font-black text-white mb-6 tracking-tight">Limitation of Liability</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Use at Your Own Risk</h3>
                <p className="text-gray-300 leading-relaxed font-medium">
                  You acknowledge that your use of BreakFree services is at your own risk. We provide our services "as is" without any warranties, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Personal Responsibility</h3>
                <p className="text-gray-300 leading-relaxed font-medium">
                  You are solely responsible for your recovery decisions, actions, and outcomes. While we provide support and resources, the ultimate responsibility for your health, safety, and recovery lies with you and your healthcare providers.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-white mb-3">No Guarantee of Results</h3>
                <p className="text-gray-300 leading-relaxed font-medium">
                  We make no guarantees about the effectiveness of our programs or the likelihood of achieving specific recovery outcomes. Individual results vary, and success depends on many factors beyond our control.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-black text-white mb-8 tracking-tight">Questions About This Disclaimer?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto font-medium">
              If you have questions about this disclaimer or need clarification about our services, please contact us.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="bg-slate-950 rounded-xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-white font-bold mb-2">Email Support</h3>
                <p className="text-gray-300 font-medium">support@breakfree.com</p>
              </div>
              
              <div className="bg-slate-950 rounded-xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-white font-bold mb-2">Phone Support</h3>
                <p className="text-gray-300 font-medium">(555) 123-4567</p>
              </div>
            </div>
            
            <div className="mt-8 text-gray-400 font-medium">
              <p><strong>Remember:</strong> For emergencies, always contact 911 or emergency services first.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Disclaimer;