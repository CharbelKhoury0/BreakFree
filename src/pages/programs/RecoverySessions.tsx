import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Users, Target, CheckCircle, Calendar, Video, MessageSquare } from 'lucide-react';

const RecoverySessions = () => {
  const sessionTypes = [
    {
      id: 1,
      title: "Group Recovery Sessions",
      duration: "90 minutes",
      frequency: "Weekly",
      maxParticipants: "8-12 men",
      price: "$75/session",
      description: "Structured group sessions focused on accountability, skill-building, and peer support.",
      features: [
        "Evidence-based curriculum",
        "Peer accountability partners",
        "Weekly progress tracking",
        "Homework assignments",
        "Crisis support access"
      ],
      icon: Users
    },
    {
      id: 2,
      title: "Intensive Workshops",
      duration: "3 hours",
      frequency: "Monthly",
      maxParticipants: "15-20 men",
      price: "$150/workshop",
      description: "Deep-dive workshops on specific recovery topics and advanced strategies.",
      features: [
        "Expert-led presentations",
        "Interactive exercises",
        "Take-home resources",
        "Networking opportunities",
        "Follow-up materials"
      ],
      icon: Target
    },
    {
      id: 3,
      title: "Crisis Intervention",
      duration: "60 minutes",
      frequency: "As needed",
      maxParticipants: "1-3 men",
      price: "$100/session",
      description: "Immediate support for men experiencing relapse risk or crisis situations.",
      features: [
        "24/7 availability",
        "Licensed counselor led",
        "Safety planning",
        "Resource connection",
        "Follow-up support"
      ],
      icon: Clock
    }
  ];

  const upcomingSessions = [
    {
      title: "Building Unbreakable Habits",
      date: "Monday, Jan 15",
      time: "7:00 PM EST",
      type: "Group Session",
      spotsLeft: 3
    },
    {
      title: "Stress Management for Men",
      date: "Wednesday, Jan 17",
      time: "8:00 PM EST",
      type: "Workshop",
      spotsLeft: 7
    },
    {
      title: "Relationship Recovery",
      date: "Friday, Jan 19",
      time: "7:30 PM EST",
      type: "Group Session",
      spotsLeft: 5
    },
    {
      title: "Advanced Relapse Prevention",
      date: "Saturday, Jan 20",
      time: "10:00 AM EST",
      type: "Intensive Workshop",
      spotsLeft: 12
    }
  ];

  const testimonials = [
    {
      name: "Robert K.",
      quote: "The group sessions gave me the accountability I needed. These guys don't let you slide—they call you out with respect and support you through the tough moments.",
      program: "Group Recovery Sessions",
      sobriety: "14 months"
    },
    {
      name: "Michael D.",
      quote: "The intensive workshops are game-changers. Three hours of focused work on specific issues that I could immediately apply to my daily life.",
      program: "Intensive Workshops",
      sobriety: "8 months"
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
              Recovery Sessions
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              Structured, evidence-based group sessions designed to build lasting recovery through accountability and peer support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Session Types */}
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
              Session Options
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              Choose the format that fits your schedule and recovery needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {sessionTypes.map((session, index) => {
              const IconComponent = session.icon;
              return (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-950 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-colors"
                >
                  <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{session.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed font-medium">{session.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 font-medium">Duration:</span>
                      <span className="text-white font-semibold">{session.duration}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 font-medium">Frequency:</span>
                      <span className="text-white font-semibold">{session.frequency}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 font-medium">Group Size:</span>
                      <span className="text-white font-semibold">{session.maxParticipants}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-8">
                    {session.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300 text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold text-xl">{session.price}</span>
                    <Link
                      to="/calculator"
                      className="inline-flex items-center space-x-2 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 border border-white/10"
                    >
                      <span>Book Session</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Sessions */}
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
              Upcoming Sessions
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              Join our next scheduled sessions. Limited spots available to maintain group effectiveness.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingSessions.map((session, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-900 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{session.title}</h3>
                    <div className="flex items-center space-x-4 text-gray-400 text-sm font-medium">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{session.time}</span>
                      </div>
                    </div>
                  </div>
                  <span className="bg-slate-950 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {session.type}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 font-medium">
                    {session.spotsLeft} spots remaining
                  </span>
                  <button className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 border border-white/10">
                    Reserve Spot
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
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
              How Sessions Work
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              Our structured approach ensures every session delivers measurable progress.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-black text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Assessment</h3>
              <p className="text-gray-300 font-medium">
                Quick intake to match you with the right session type and group.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Join Session</h3>
              <p className="text-gray-300 font-medium">
                Secure video sessions with licensed facilitators and peer support.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Practice</h3>
              <p className="text-gray-300 font-medium">
                Apply session learnings with structured homework and accountability.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Follow-up</h3>
              <p className="text-gray-300 font-medium">
                Check-ins between sessions and access to crisis support when needed.
              </p>
            </motion.div>
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
              What Participants Say
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              Real feedback from men who've experienced our recovery sessions.
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
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-bold">{testimonial.name}</div>
                    <div className="text-gray-400 font-medium text-sm">{testimonial.program}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold text-sm">{testimonial.sobriety}</div>
                    <div className="text-gray-400 text-xs">sober</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Ready to join a session?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto font-medium">
              Start with our assessment to find the right session format for your recovery goals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                to="/calculator"
                className="inline-flex items-center space-x-2 border border-white/15 hover:border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
              >
                <span>Start Assessment</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/programs/community"
                className="inline-flex items-center space-x-2 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
              >
                <span>View Community</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default RecoverySessions;