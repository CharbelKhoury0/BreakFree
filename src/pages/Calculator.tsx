import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Calculator as CalculatorIcon, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';
import { scrollToTop } from '../utils/scrollToTop';

// Types
interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'scale' | 'yes-no';
  options?: string[];
  scaleMin?: number;
  scaleMax?: number;
  scaleLabels?: string[];
  weight: number;
}

interface Answer {
  questionId: string;
  value: number;
  text?: string;
}

interface AssessmentResult {
  score: number;
  level: 'mild' | 'moderate' | 'severe';
  title: string;
  description: string;
  recommendations: string[];
  programs: string[];
}

// Assessment Questions Data
const assessmentQuestions: Question[] = [
  {
    id: 'frequency',
    text: 'How often do you engage in the addictive behavior?',
    type: 'multiple-choice',
    options: [
      'Rarely or never',
      'Once a week or less',
      '2-3 times per week',
      '4-6 times per week',
      'Daily or multiple times daily'
    ],
    weight: 3
  },
  {
    id: 'control',
    text: 'How difficult is it for you to control or stop the behavior?',
    type: 'scale',
    scaleMin: 1,
    scaleMax: 10,
    scaleLabels: ['Very easy to control', 'Impossible to control'],
    weight: 4
  },
  {
    id: 'impact-work',
    text: 'Has this behavior negatively impacted your work or school performance?',
    type: 'multiple-choice',
    options: [
      'Not at all',
      'Slightly',
      'Moderately',
      'Significantly',
      'Severely'
    ],
    weight: 3
  },
  {
    id: 'impact-relationships',
    text: 'Has this behavior affected your relationships with family or friends?',
    type: 'multiple-choice',
    options: [
      'Not at all',
      'Slightly',
      'Moderately',
      'Significantly',
      'Severely'
    ],
    weight: 3
  },
  {
    id: 'time-spent',
    text: 'How much time do you spend thinking about or engaging in this behavior daily?',
    type: 'multiple-choice',
    options: [
      'Less than 30 minutes',
      '30 minutes to 1 hour',
      '1-3 hours',
      '3-6 hours',
      'More than 6 hours'
    ],
    weight: 2
  },
  {
    id: 'withdrawal',
    text: 'Do you experience anxiety, irritability, or distress when unable to engage in the behavior?',
    type: 'yes-no',
    weight: 3
  },
  {
    id: 'tolerance',
    text: 'Do you need to engage in the behavior more frequently or intensely to feel satisfied?',
    type: 'yes-no',
    weight: 3
  },
  {
    id: 'attempts',
    text: 'How many times have you tried to stop or reduce this behavior?',
    type: 'multiple-choice',
    options: [
      'Never tried',
      '1-2 times',
      '3-5 times',
      '6-10 times',
      'More than 10 times'
    ],
    weight: 2
  },
  {
    id: 'consequences',
    text: 'Have you continued the behavior despite knowing it causes problems?',
    type: 'yes-no',
    weight: 4
  },
  {
    id: 'secrecy',
    text: 'Do you hide or lie about your engagement in this behavior?',
    type: 'yes-no',
    weight: 2
  }
];

// Scoring Logic
const calculateResults = (answers: Answer[]): AssessmentResult => {
  let totalScore = 0;
  let maxPossibleScore = 0;

  assessmentQuestions.forEach(question => {
    const answer = answers.find(a => a.questionId === question.id);
    if (answer) {
      totalScore += answer.value * question.weight;
    }
    
    // Calculate max possible score for this question
    if (question.type === 'multiple-choice') {
      maxPossibleScore += (question.options!.length - 1) * question.weight;
    } else if (question.type === 'scale') {
      maxPossibleScore += question.scaleMax! * question.weight;
    } else if (question.type === 'yes-no') {
      maxPossibleScore += 1 * question.weight;
    }
  });

  const percentage = (totalScore / maxPossibleScore) * 100;

  if (percentage <= 30) {
    return {
      score: Math.round(percentage),
      level: 'mild',
      title: 'Mild Concern Level',
      description: "Your responses suggest minimal addiction patterns. You may have some habits that could benefit from attention, but they don't appear to significantly impact your daily life.",
      recommendations: [
        'Practice mindfulness and self-awareness',
        'Establish healthy daily routines',
        'Consider preventive strategies',
        'Monitor your behaviors regularly'
      ],
      programs: ['/programs/ebooks', '/programs/tools']
    };
  } else if (percentage <= 60) {
    return {
      score: Math.round(percentage),
      level: 'moderate',
      title: 'Moderate Concern Level',
      description: 'Your responses indicate moderate addiction patterns that are beginning to impact various areas of your life. Professional guidance could be very beneficial.',
      recommendations: [
        'Seek professional counseling or therapy',
        'Join a support group or community',
        'Develop a structured recovery plan',
        'Consider intensive outpatient programs'
      ],
      programs: ['/programs/community', '/programs/sessions', '/programs/ebooks']
    };
  } else {
    return {
      score: Math.round(percentage),
      level: 'severe',
      title: 'High Concern Level',
      description: 'Your responses suggest significant addiction patterns that are substantially impacting your life. Immediate professional intervention is strongly recommended.',
      recommendations: [
        'Seek immediate professional help',
        'Consider intensive treatment programs',
        'Engage with a qualified addiction specialist',
        'Explore comprehensive recovery options'
      ],
      programs: ['/programs/mentorship', '/programs/sessions', '/programs/community']
    };
  }
};

const Calculator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<AssessmentResult | null>(null);
  const location = useLocation();

  // Scroll to top when location changes
  useEffect(() => {
    scrollToTop();
  }, [location.pathname]);

  const currentQuestion = assessmentQuestions[currentStep];
  const progress = ((currentStep + 1) / assessmentQuestions.length) * 100;

  const handleAnswer = (value: number, text?: string) => {
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      value,
      text
    };

    setAnswers(prev => {
      const filtered = prev.filter(a => a.questionId !== currentQuestion.id);
      return [...filtered, newAnswer];
    });
  };

  const nextQuestion = () => {
    if (currentStep < assessmentQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Calculate and show results
      const calculatedResults = calculateResults(answers);
      setResults(calculatedResults);
      setShowResults(true);
    }
  };

  const previousQuestion = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const restartAssessment = () => {
    setCurrentStep(0);
    setAnswers([]);
    setShowResults(false);
    setResults(null);
  };

  const getCurrentAnswer = () => {
    return answers.find(a => a.questionId === currentQuestion?.id);
  };

  const isAnswered = () => {
    return getCurrentAnswer() !== undefined;
  };

  if (showResults && results) {
    return (
        <div className="min-h-screen bg-slate-950 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Assessment Complete
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto font-medium">
              Based on your responses, here are your personalized results and recommendations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-slate-900 rounded-2xl p-8 border border-white/10 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-white">{results.title}</h2>
              <div className={`px-4 py-2 rounded-lg font-bold text-sm ${
                results.level === 'mild' ? 'bg-green-500/20 text-green-400' :
                results.level === 'moderate' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                Score: {results.score}%
              </div>
            </div>
            
            <p className="text-gray-300 mb-8 leading-relaxed font-medium">
              {results.description}
            </p>

            <div className="mb-8">
              <h3 className="text-xl font-black text-white mb-4">Recommended Actions</h3>
              <div className="space-y-3">
                {results.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white/30 rounded-full mt-2" />
                    <span className="text-gray-300 font-medium">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 pt-8">
              <h3 className="text-xl font-black text-white mb-4">Recommended Programs</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results.programs.map((program, index) => {
                  const programNames = {
                    '/programs/mentorship': '1-on-1 Mentorship',
                    '/programs/community': 'Community Support',
                    '/programs/sessions': 'Recovery Sessions',
                    '/programs/ebooks': 'Educational Resources',
                    '/programs/tools': 'Recovery Tools'
                  };
                  
                  return (
                    <Link
                      key={index}
                      to={program}
                      className="block p-4 bg-slate-800 rounded-lg border border-white/10 hover:border-white/20 transition-colors group"
                      onClick={scrollToTop}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white font-semibold">
                          {programNames[program as keyof typeof programNames]}
                        </span>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6 mb-8"
          >
            <div className="flex items-start space-x-4">
              <Info className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-orange-400 font-bold mb-2">Important Disclaimer</h3>
                <p className="text-gray-300 text-sm leading-relaxed font-medium">
                  This assessment is for informational purposes only and is not a substitute for professional medical or psychological evaluation. 
                  If you're experiencing severe symptoms or having thoughts of self-harm, please seek immediate professional help or contact a crisis hotline.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <button
              onClick={restartAssessment}
              className="inline-flex items-center space-x-2 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 border border-white/10 mr-4"
            >
              <span>Retake Assessment</span>
            </button>
            <Link
              to="/"
              className="inline-flex items-center space-x-2 border border-white/15 hover:border-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              onClick={scrollToTop}
            >
              <span>Return Home</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-slate-950 pt-20">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CalculatorIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Addiction Assessment
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8 font-medium">
              Take this confidential assessment to better understand your relationship with addictive behaviors 
              and receive personalized recommendations for your recovery journey.
            </p>
            
            {/* Progress Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-400">
                  Question {currentStep + 1} of {assessmentQuestions.length}
                </span>
                <span className="text-sm font-semibold text-gray-400">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <motion.div
                  className="bg-white h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Question Section */}
      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-900 rounded-2xl p-8 border border-white/10"
            >
              <h2 className="text-2xl font-black text-white mb-8 leading-relaxed">
                {currentQuestion.text}
              </h2>

              {/* Multiple Choice Questions */}
              {currentQuestion.type === 'multiple-choice' && (
                <div className="space-y-3">
                  {currentQuestion.options!.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index, option)}
                      className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                        getCurrentAnswer()?.value === index
                          ? 'border-white/30 bg-white/5 text-white'
                          : 'border-white/10 bg-slate-800 text-gray-300 hover:border-white/20 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          getCurrentAnswer()?.value === index
                            ? 'border-white bg-white'
                            : 'border-gray-400'
                        }`} />
                        <span className="font-medium">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Scale Questions */}
              {currentQuestion.type === 'scale' && (
                <div>
                  <div className="flex justify-between text-sm text-gray-400 mb-4">
                    <span>{currentQuestion.scaleLabels![0]}</span>
                    <span>{currentQuestion.scaleLabels![1]}</span>
                  </div>
                  <div className="flex justify-between items-center mb-6">
                    {Array.from({ length: currentQuestion.scaleMax! }, (_, i) => i + 1).map(value => (
                      <button
                        key={value}
                        onClick={() => handleAnswer(value)}
                        className={`w-12 h-12 rounded-full border-2 font-bold transition-all duration-300 ${
                          getCurrentAnswer()?.value === value
                            ? 'border-white bg-white text-slate-900'
                            : 'border-gray-400 text-gray-400 hover:border-white hover:text-white'
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Yes/No Questions */}
              {currentQuestion.type === 'yes-no' && (
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleAnswer(0, 'No')}
                    className={`p-6 rounded-lg border transition-all duration-300 ${
                      getCurrentAnswer()?.value === 0
                        ? 'border-white/30 bg-white/5 text-white'
                        : 'border-white/10 bg-slate-800 text-gray-300 hover:border-white/20 hover:bg-white/5'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`w-6 h-6 rounded-full border-2 mx-auto mb-2 ${
                        getCurrentAnswer()?.value === 0
                          ? 'border-white bg-white'
                          : 'border-gray-400'
                      }`} />
                      <span className="font-semibold">No</span>
                    </div>
                  </button>
                  <button
                    onClick={() => handleAnswer(1, 'Yes')}
                    className={`p-6 rounded-lg border transition-all duration-300 ${
                      getCurrentAnswer()?.value === 1
                        ? 'border-white/30 bg-white/5 text-white'
                        : 'border-white/10 bg-slate-800 text-gray-300 hover:border-white/20 hover:bg-white/5'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`w-6 h-6 rounded-full border-2 mx-auto mb-2 ${
                        getCurrentAnswer()?.value === 1
                          ? 'border-white bg-white'
                          : 'border-gray-400'
                      }`} />
                      <span className="font-semibold">Yes</span>
                    </div>
                  </button>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8">
                <button
                  onClick={previousQuestion}
                  disabled={currentStep === 0}
                  className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    currentStep === 0
                      ? 'bg-slate-800 text-gray-500 cursor-not-allowed'
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={nextQuestion}
                  disabled={!isAnswered()}
                  className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    !isAnswered()
                      ? 'bg-slate-800 text-gray-500 cursor-not-allowed'
                      : 'border border-white/15 hover:border-white/30 text-white'
                  }`}
                >
                  <span>{currentStep === assessmentQuestions.length - 1 ? 'Get Results' : 'Next'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      </div>
  );
};

export default Calculator;