import React from 'react';
import { motion } from 'framer-motion';
import { FileText, AlertTriangle, Shield, Users, Gavel, Clock } from 'lucide-react';

// TypeScript interfaces for better type safety
interface ContentItem {
  subtitle?: string;
  text?: string;
  list?: string[];
}

interface Section {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  content: ContentItem[];
}

const Terms = () => {
  const sections: Section[] = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: FileText,
      content: [
        {
          text: 'By accessing and using BreakFree services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'
        },
        {
          text: 'These Terms of Service constitute a legally binding agreement between you and BreakFree. Your use of our services is also governed by our Privacy Policy, which is incorporated by reference into these Terms.'
        }
      ]
    },
    {
      id: 'services',
      title: 'Description of Services',
      icon: Users,
      content: [
        {
          subtitle: 'Recovery Programs',
          text: 'BreakFree provides addiction recovery programs, including but not limited to one-on-one mentorship, group sessions, community support, educational resources, and assessment tools.'
        },
        {
          subtitle: 'Digital Platform',
          text: 'Our services are delivered through our website, mobile applications, and other digital platforms. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time.'
        },
        {
          subtitle: 'Professional Support',
          text: 'Our services include access to licensed professionals and certified recovery coaches. However, our services are not a substitute for professional medical or psychiatric treatment.'
        }
      ]
    },
    {
      id: 'user-responsibilities',
      title: 'User Responsibilities',
      icon: Shield,
      content: [
        {
          subtitle: 'Accurate Information',
          text: 'You agree to provide accurate, current, and complete information when creating your account and participating in our programs.'
        },
        {
          subtitle: 'Account Security',
          text: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.'
        },
        {
          subtitle: 'Appropriate Use',
          text: 'You agree to use our services only for lawful purposes and in accordance with these Terms. You will not use our services to harm others or interfere with the recovery of other participants.'
        },
        {
          subtitle: 'Community Guidelines',
          text: 'When participating in group sessions or community features, you agree to treat all participants with respect and maintain confidentiality of shared information.'
        }
      ]
    },
    {
      id: 'prohibited-conduct',
      title: 'Prohibited Conduct',
      icon: AlertTriangle,
      content: [
        {
          text: 'You may not use our services to engage in any of the following prohibited activities:'
        },
        {
          list: [
            'Sharing or promoting illegal substances or activities',
            'Harassing, threatening, or intimidating other users',
            'Sharing personal information of other participants without consent',
            'Attempting to circumvent security measures or access unauthorized areas',
            'Using our services for commercial purposes without authorization',
            'Providing false or misleading information about your identity or recovery status',
            'Disrupting group sessions or community discussions',
            'Violating any applicable laws or regulations'
          ]
        }
      ]
    },
    {
      id: 'medical-disclaimer',
      title: 'Medical Disclaimer',
      icon: AlertTriangle,
      content: [
        {
          subtitle: 'Not Medical Treatment',
          text: 'BreakFree services are not medical treatment and should not be considered a substitute for professional medical care, psychiatric treatment, or emergency services.'
        },
        {
          subtitle: 'Emergency Situations',
          text: 'If you are experiencing a medical emergency or having thoughts of self-harm, please contact emergency services immediately (911 in the US) or go to your nearest emergency room.'
        },
        {
          subtitle: 'Professional Consultation',
          text: 'We strongly encourage you to consult with qualified healthcare professionals regarding your recovery and any medical or psychiatric conditions.'
        }
      ]
    },
    {
      id: 'payment-terms',
      title: 'Payment Terms',
      icon: Gavel,
      content: [
        {
          subtitle: 'Fees and Billing',
          text: 'Certain services require payment of fees. All fees are non-refundable unless otherwise specified. You agree to pay all applicable fees and charges.'
        },
        {
          subtitle: 'Subscription Services',
          text: 'For subscription-based services, you will be billed on a recurring basis. You may cancel your subscription at any time, but cancellation will not result in a refund of fees already paid.'
        },
        {
          subtitle: 'Price Changes',
          text: 'We reserve the right to change our fees at any time. We will provide advance notice of any fee changes for existing subscribers.'
        }
      ]
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property',
      icon: Shield,
      content: [
        {
          subtitle: 'Our Content',
          text: 'All content provided through BreakFree services, including text, graphics, logos, images, and software, is the property of BreakFree or its licensors and is protected by copyright and other intellectual property laws.'
        },
        {
          subtitle: 'User Content',
          text: 'You retain ownership of any content you submit to our services. However, by submitting content, you grant us a license to use, modify, and display such content in connection with our services.'
        },
        {
          subtitle: 'Restrictions',
          text: 'You may not copy, modify, distribute, or create derivative works based on our content without our express written permission.'
        }
      ]
    },
    {
      id: 'limitation-liability',
      title: 'Limitation of Liability',
      icon: Gavel,
      content: [
        {
          text: 'To the fullest extent permitted by law, BreakFree shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or other intangible losses.'
        },
        {
          text: 'Our total liability to you for any claims arising from or related to these Terms or our services shall not exceed the amount you have paid to us in the twelve months preceding the claim.'
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
              <FileText className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              These terms govern your use of BreakFree services and establish the rights and responsibilities of all users.
            </p>
            <div className="mt-8 text-gray-400 font-medium">
              <p>Last updated: January 2024</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-8"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-orange-500/20 text-orange-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white mb-4 tracking-tight">Important Notice</h2>
                <p className="text-gray-300 leading-relaxed font-medium mb-4">
                  BreakFree services are designed to support your recovery journey but are not a substitute for professional medical treatment. If you are experiencing a medical emergency or crisis, please contact emergency services immediately.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-950 rounded-lg p-4 border border-white/10">
                    <h3 className="text-white font-bold mb-2">Emergency Services</h3>
                    <p className="text-gray-300 text-sm font-medium">Call 911 (US) or your local emergency number</p>
                  </div>
                  <div className="bg-slate-950 rounded-lg p-4 border border-white/10">
                    <h3 className="text-white font-bold mb-2">Crisis Hotline</h3>
                    <p className="text-gray-300 text-sm font-medium">988 Suicide & Crisis Lifeline (US)</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Terms Sections */}
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
                    {section.content.map((item: ContentItem, itemIndex: number) => (
                      <div key={`content-${section.id}-${itemIndex}`} className="space-y-3">
                        {item.subtitle && (
                          <h3 className="text-xl font-bold text-white mb-3">{item.subtitle}</h3>
                        )}
                        {item.text && (
                          <p className="text-gray-300 leading-relaxed font-medium">{item.text}</p>
                        )}
                        {item.list && item.list.length > 0 && (
                          <ul className="space-y-2 mt-4">
                            {item.list.map((listItem: string, listIndex: number) => (
                              <li key={`list-${section.id}-${itemIndex}-${listIndex}`} className="flex items-start space-x-2">
                                <div className="w-1.5 h-1.5 bg-white/40 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-300 font-medium">{listItem}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Termination and Changes */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-slate-950 rounded-2xl p-8 border border-white/10"
            >
              <div className="w-12 h-12 bg-red-500/20 text-red-400 rounded-lg flex items-center justify-center mb-6">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight">Termination</h3>
              <p className="text-gray-300 leading-relaxed font-medium mb-4">
                We may terminate or suspend your access to our services immediately, without prior notice, if you breach these Terms or engage in prohibited conduct.
              </p>
              <p className="text-gray-300 leading-relaxed font-medium">
                You may terminate your account at any time by contacting us or using the account deletion feature in your profile settings.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-950 rounded-2xl p-8 border border-white/10"
            >
              <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight">Changes to Terms</h3>
              <p className="text-gray-300 leading-relaxed font-medium mb-4">
                We reserve the right to modify these Terms at any time. We will notify users of significant changes via email or through our platform.
              </p>
              <p className="text-gray-300 leading-relaxed font-medium">
                Your continued use of our services after changes become effective constitutes acceptance of the new Terms.
              </p>
            </motion.div>
          </div>
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
            <h2 className="text-4xl font-black text-white mb-8 tracking-tight">Questions About These Terms?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto font-medium">
              If you have any questions about these Terms of Service, please contact our legal team.
            </p>
            
            <div className="bg-slate-900 rounded-2xl p-8 border border-white/10 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-white mb-4">Legal Contact Information</h3>
              <div className="space-y-3 text-gray-300">
                <p className="font-medium">Email: legal@breakfree.com</p>
                <p className="font-medium">Phone: (555) 123-4567</p>
                <p className="font-medium">Address: 123 Recovery Street, Suite 100, City, State 12345</p>
              </div>
            </div>
            
            <div className="mt-8 text-gray-400 font-medium">
              <p>We will respond to all legal inquiries within 5 business days.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Terms;