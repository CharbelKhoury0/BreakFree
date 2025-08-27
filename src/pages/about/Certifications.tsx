import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Award, BookOpen, Users, Shield, CheckCircle, ExternalLink } from 'lucide-react';

const Certifications = () => {
  const certifications = [
    {
      id: 1,
      title: "Certified Addiction Counselor (CAC)",
      organization: "National Association for Addiction Professionals",
      year: "2019",
      description: "Comprehensive training in addiction counseling, evidence-based treatment methods, and ethical practice standards.",
      credentialId: "CAC-2019-7842",
      icon: Award,
      status: "Active"
    },
    {
      id: 2,
      title: "Licensed Clinical Social Worker (LCSW)",
      organization: "State Board of Social Work Examiners",
      year: "2020",
      description: "Advanced clinical training in mental health treatment, therapy techniques, and client assessment.",
      credentialId: "LCSW-2020-3456",
      icon: Users,
      status: "Active"
    },
    {
      id: 3,
      title: "Cognitive Behavioral Therapy Specialist",
      organization: "Beck Institute for Cognitive Behavior Therapy",
      year: "2021",
      description: "Specialized training in CBT techniques for addiction treatment and relapse prevention.",
      credentialId: "CBT-SPEC-2021-1289",
      icon: BookOpen,
      status: "Active"
    },
    {
      id: 4,
      title: "Trauma-Informed Care Certification",
      organization: "International Society for Traumatic Stress Studies",
      year: "2022",
      description: "Advanced understanding of trauma's role in addiction and evidence-based trauma treatment approaches.",
      credentialId: "TIC-2022-5671",
      icon: Shield,
      status: "Active"
    }
  ];

  const continuingEducation = [
    {
      title: "Motivational Interviewing Advanced Training",
      hours: "40 hours",
      year: "2023",
      provider: "Motivational Interviewing Network of Trainers"
    },
    {
      title: "Men's Mental Health Specialization",
      hours: "32 hours",
      year: "2023",
      provider: "American Psychological Association"
    },
    {
      title: "Digital Therapy Platforms Certification",
      hours: "24 hours",
      year: "2023",
      provider: "Telehealth Certification Institute"
    },
    {
      title: "Addiction Neuroscience Update",
      hours: "16 hours",
      year: "2024",
      provider: "National Institute on Drug Abuse"
    }
  ];

  const memberships = [
    {
      organization: "National Association for Addiction Professionals (NAADAC)",
      role: "Professional Member",
      since: "2019"
    },
    {
      organization: "International Association of Marriage and Family Counselors",
      role: "Clinical Member",
      since: "2020"
    },
    {
      organization: "American Society of Addiction Medicine (ASAM)",
      role: "Associate Member",
      since: "2021"
    }
  ];

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
              Credentials & Training
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              Evidence-based expertise backed by rigorous training and ongoing professional development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Professional Certifications */}
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
              Professional Certifications
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              Licensed and certified to provide addiction counseling and mental health services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => {
              const IconComponent = cert.icon;
              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-950 rounded-2xl p-8 border border-white/10"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-black text-white tracking-tight">{cert.title}</h3>
                        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold">
                          {cert.status}
                        </span>
                      </div>
                      
                      <p className="text-gray-400 font-medium mb-3">{cert.organization}</p>
                      <p className="text-gray-300 leading-relaxed font-medium mb-4">{cert.description}</p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400 font-medium">Issued: {cert.year}</span>
                        <span className="text-gray-500 font-mono text-xs">{cert.credentialId}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Continuing Education */}
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
              Continuing Education
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              Staying current with the latest research and treatment methodologies in addiction recovery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {continuingEducation.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-900 rounded-xl p-6 border border-white/10"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <h3 className="text-lg font-bold text-white">{course.title}</h3>
                </div>
                
                <p className="text-gray-400 font-medium mb-2">{course.provider}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300 font-medium">{course.hours}</span>
                  <span className="text-gray-400">{course.year}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Memberships */}
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
              Professional Memberships
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              Active participation in professional organizations and commitment to ethical standards.
            </p>
          </motion.div>

          <div className="space-y-6">
            {memberships.map((membership, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-950 rounded-xl p-6 border border-white/10"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{membership.organization}</h3>
                    <p className="text-gray-400 font-medium">{membership.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-300 font-medium">Since {membership.since}</p>
                    <ExternalLink className="w-4 h-4 text-gray-500 ml-auto mt-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ethics & Standards */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">
              Commitment to Excellence
            </h2>
            
            <div className="bg-slate-900 rounded-2xl p-8 border border-white/10 mb-8">
              <p className="text-lg text-gray-300 leading-relaxed font-medium mb-6">
                All credentials are maintained through ongoing continuing education requirements and 
                adherence to strict ethical guidelines established by professional licensing boards.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed font-medium mb-6">
                BreakFree operates under the supervision and guidance of licensed mental health professionals, 
                ensuring that all services meet the highest standards of care and professional practice.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed font-medium">
                Client confidentiality, informed consent, and evidence-based treatment approaches 
                are the foundation of every interaction and program offered.
              </p>
            </div>

            <Link
              to="/programs/mentorship"
              className="inline-flex items-center space-x-2 border border-white/15 hover:border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
            >
              <span>Work with a licensed professional</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Certifications;