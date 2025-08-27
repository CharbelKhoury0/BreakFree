import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, UserCheck, Mail, Phone } from 'lucide-react';

const Privacy = () => {
  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: Eye,
      content: [
        {
          subtitle: 'Personal Information',
          text: 'We collect information you provide directly to us, such as when you create an account, subscribe to our services, participate in our programs, or contact us for support. This may include your name, email address, phone number, and recovery-related information you choose to share.'
        },
        {
          subtitle: 'Usage Information',
          text: 'We automatically collect certain information about your use of our services, including your IP address, browser type, operating system, pages viewed, and the dates and times of your visits.'
        },
        {
          subtitle: 'Health Information',
          text: 'With your explicit consent, we may collect health-related information relevant to your recovery journey, including assessment results, progress tracking data, and program participation records.'
        }
      ]
    },
    {
      id: 'information-use',
      title: 'How We Use Your Information',
      icon: UserCheck,
      content: [
        {
          subtitle: 'Service Provision',
          text: 'We use your information to provide, maintain, and improve our recovery programs, assessments, and support services.'
        },
        {
          subtitle: 'Communication',
          text: 'We may use your contact information to send you program updates, educational content, and important service announcements.'
        },
        {
          subtitle: 'Personalization',
          text: 'We use your information to personalize your experience and provide tailored recovery resources and recommendations.'
        },
        {
          subtitle: 'Safety and Security',
          text: 'We may use your information to protect the safety and security of our users and to prevent fraud or abuse of our services.'
        }
      ]
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing',
      icon: Lock,
      content: [
        {
          subtitle: 'No Sale of Personal Data',
          text: 'We do not sell, trade, or otherwise transfer your personal information to third parties for commercial purposes.'
        },
        {
          subtitle: 'Service Providers',
          text: 'We may share your information with trusted service providers who assist us in operating our website and providing our services, subject to strict confidentiality agreements.'
        },
        {
          subtitle: 'Legal Requirements',
          text: 'We may disclose your information if required by law, court order, or government regulation, or if we believe disclosure is necessary to protect our rights or the safety of our users.'
        },
        {
          subtitle: 'Emergency Situations',
          text: 'In cases where we believe there is an imminent threat to your safety or the safety of others, we may share relevant information with appropriate authorities or emergency services.'
        }
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: Shield,
      content: [
        {
          subtitle: 'Security Measures',
          text: 'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.'
        },
        {
          subtitle: 'Encryption',
          text: 'All sensitive data is encrypted both in transit and at rest using industry-standard encryption protocols.'
        },
        {
          subtitle: 'Access Controls',
          text: 'Access to your personal information is restricted to authorized personnel who need the information to perform their job functions.'
        },
        {
          subtitle: 'Regular Audits',
          text: 'We regularly review and update our security practices to ensure the ongoing protection of your information.'
        }
      ]
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
            <div className="w-20 h-20 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              Your privacy and confidentiality are fundamental to our mission. This policy explains how we collect, use, and protect your personal information.
            </p>
            <div className="mt-8 text-gray-400 font-medium">
              <p>Last updated: January 2024</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Privacy Commitment */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-slate-950 rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-3xl font-black text-white mb-6 tracking-tight">Our Privacy Commitment</h2>
            <p className="text-gray-300 leading-relaxed font-medium mb-6">
              At BreakFree, we understand that privacy is especially important when dealing with sensitive topics like addiction recovery. We are committed to maintaining the highest standards of confidentiality and data protection.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-white font-bold mb-2">Secure</h3>
                <p className="text-gray-400 text-sm">Industry-standard encryption and security measures</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-white font-bold mb-2">Protected</h3>
                <p className="text-gray-400 text-sm">Your data is never sold or shared for profit</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="text-white font-bold mb-2">Controlled</h3>
                <p className="text-gray-400 text-sm">You control what information you share</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Privacy Sections */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {sections.map((section, index) => {
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

      {/* Your Rights */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black text-white mb-8 tracking-tight text-center">Your Rights</h2>
            <div className="bg-slate-950 rounded-2xl p-8 border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Access and Control</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-white/40 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="font-medium">Request access to your personal information</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-white/40 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="font-medium">Update or correct your information</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-white/40 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="font-medium">Request deletion of your data</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-white/40 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="font-medium">Opt-out of communications</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Data Portability</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-white/40 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="font-medium">Export your data in a portable format</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-white/40 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="font-medium">Transfer data to another service</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-white/40 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="font-medium">Restrict processing of your data</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-white/40 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="font-medium">Object to certain data uses</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-black text-white mb-8 tracking-tight">Questions About Privacy?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto font-medium">
              If you have any questions about this Privacy Policy or how we handle your information, please don't hesitate to contact us.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="bg-slate-900 rounded-xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-white font-bold mb-2">Email Us</h3>
                <p className="text-gray-300 font-medium">privacy@breakfree.com</p>
              </div>
              
              <div className="bg-slate-900 rounded-xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-white font-bold mb-2">Call Us</h3>
                <p className="text-gray-300 font-medium">(555) 123-4567</p>
              </div>
            </div>
            
            <div className="mt-8 text-gray-400 font-medium">
              <p>We will respond to all privacy-related inquiries within 30 days.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;