import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator as CalcIcon, ArrowRight, Check, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Calculator = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      text: "How often do you view pornographic content?",
      options: [
        { text: "Never or rarely", value: 0 },
        { text: "Once a week or less", value: 1 },
        { text: "2-3 times per week", value: 2 },
        { text: "Daily", value: 3 },
        { text: "Multiple times per day", value: 4 }
      ]
    },
    {
      text: "How much time do you typically spend viewing content in one session?",
      options: [
        { text: "Less than 15 minutes", value: 0 },
        { text: "15-30 minutes", value: 1 },
        { text: "30-60 minutes", value: 2 },
        { text: "1-2 hours", value: 3 },
        { text: "More than 2 hours", value: 4 }
      ]
    },
    {
      text: "How often have you tried to stop or reduce your viewing habits?",
      options: [
        { text: "Never thought about it", value: 0 },
        { text: "Considered it but never tried", value: 1 },
        { text: "Tried once or twice", value: 2 },
        { text: "Multiple attempts", value: 3 },
        { text: "Constant struggle", value: 4 }
      ]
    },
    {
      text: "How has this affected your relationships or social life?",
      options: [
        { text: "No impact", value: 0 },
        { text: "Minor concerns", value: 1 },
        { text: "Some relationship issues", value: 2 },
        { text: "Significant problems", value: 3 },
        { text: "Severe relationship damage", value: 4 }
      ]
    },
    {
      text: "How do you feel after viewing content?",
      options: [
        { text: "Normal/neutral", value: 0 },
        { text: "Slightly guilty", value: 1 },
        { text: "Guilty and regretful", value: 2 },
        { text: "Ashamed and depressed", value: 3 },
        { text: "Extremely distressed", value: 4 }
      ]
    },
    {
      text: "Has viewing interfered with work, school, or responsibilities?",
      options: [
        { text: "Never", value: 0 },
        { text: "Rarely", value: 1 },
        { text: "Occasionally", value: 2 },
        { text: "Frequently", value: 3 },
        { text: "Very often", value: 4 }
      ]
    }
  ];

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateResults = () => {
    const totalScore = answers.reduce((sum, answer) => sum + answer, 0);
    const maxScore = questions.length * 4;
    const percentage = (totalScore / maxScore) * 100;

    if (percentage <= 25) {
      return {
        level: 'Low Risk',
        color: 'text-green-400',
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-400/30',
        description: 'Your responses suggest minimal risk. Consider our educational resources to maintain healthy habits.',
        recommendations: [
          'Continue maintaining healthy boundaries',
          'Consider our free educational resources',
          'Join our community for ongoing support'
        ],
        programs: ['community', 'ebooks']
      };
    } else if (percentage <= 50) {
      return {
        level: 'Moderate Risk',
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/10',
        borderColor: 'border-yellow-400/30',
        description: 'Your responses indicate some concerning patterns. Early intervention could be very helpful.',
        recommendations: [
          'Consider professional guidance',
          'Join our supportive community',
          'Start with our recovery tools and resources'
        ],
        programs: ['community', 'sessions', 'tools']
      };
    } else if (percentage <= 75) {
      return {
        level: 'High Risk',
        color: 'text-red-400',
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-400/30',
        description: 'Your responses suggest significant challenges that would benefit from professional support.',
        recommendations: [
          'Seek professional counseling',
          'Consider intensive support programs',
          'Connect with others in recovery'
        ],
        programs: ['mentorship', 'sessions', 'community']
      };
    } else {
      return {
        level: 'Severe Risk',
        color: 'text-red-500',
        bgColor: 'bg-red-600/10',
        borderColor: 'border-red-500/30',
        description: 'Your responses indicate serious concerns that require immediate professional attention.',
        recommendations: [
          'Seek immediate professional help',
          'Consider intensive 1-on-1 mentorship',
          'Get comprehensive support and accountability'
        ],
        programs: ['mentorship', 'sessions']
      };
    }
  };

  const resetCalculator = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  const results = showResults ? calculateResults() : null;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-slate-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CalcIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Addiction Assessment
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Take this confidential assessment to understand your situation and get personalized recommendations.
          </p>
        </motion.div>

        {!showResults ? (
          <div className="bg-slate-800 rounded-2xl p-8 md:p-12">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-amber-400 to-red-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Question */}
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                {questions[currentQuestion].text}
              </h2>

              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(option.value)}
                    className="w-full bg-slate-700 hover:bg-slate-600 border border-slate-600 hover:border-amber-400/50 rounded-xl p-4 text-left transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white text-lg">{option.text}</span>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-amber-400 transition-colors" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`${results?.bgColor} border ${results?.borderColor} rounded-2xl p-8 md:p-12`}
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className={`w-10 h-10 ${results?.color}`} />
              </div>
              <h2 className={`text-3xl md:text-4xl font-bold ${results?.color} mb-4`}>
                {results?.level}
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                {results?.description}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-slate-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Check className="w-6 h-6 text-green-400 mr-2" />
                  Recommendations
                </h3>
                <ul className="space-y-2">
                  {results?.recommendations.map((rec, index) => (
                    <li key={index} className="text-gray-300 flex items-start">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Suggested Programs</h3>
                <div className="space-y-3">
                  {results?.programs.map((programId, index) => {
                    const program = {
                      mentorship: { name: '1-on-1 Mentorship', path: '/programs/mentorship' },
                      community: { name: 'Community Support', path: '/programs/community' },
                      sessions: { name: 'Recovery Sessions', path: '/programs/sessions' },
                      tools: { name: 'Recovery Tools', path: '/programs/tools' },
                      ebooks: { name: 'Educational Resources', path: '/programs/ebooks' }
                    }[programId];
                    
                    return (
                      <Link
                        key={index}
                        to={program?.path || '/'}
                        className="block bg-slate-700 hover:bg-slate-600 rounded-lg p-3 transition-colors group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-white">{program?.name}</span>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-amber-400 transition-colors" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                to="/programs/mentorship"
                className="bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Get Started Today
              </Link>
              <button
                onClick={resetCalculator}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Take Assessment Again
              </button>
            </div>
          </motion.div>
        )}

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-500 max-w-3xl mx-auto">
            This assessment is for informational purposes only and does not constitute medical or professional advice. 
            If you're experiencing severe addiction symptoms or mental health concerns, please seek immediate professional help.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Calculator;