import { Program } from '../types';

export const programs: Program[] = [
  {
    id: 'mentorship',
    title: '1-on-1 Mentorship',
    description: 'Personal guidance and accountability with a certified recovery coach',
    icon: '👥',
    path: '/programs/mentorship',
    features: [
      'Weekly 1-hour sessions',
      'Personalized recovery plan',
      '24/7 text support',
      'Progress tracking tools',
      'Relapse prevention strategies'
    ],
    price: '$297/month'
  },
  {
    id: 'community',
    title: 'Community',
    description: 'Join a brotherhood of men committed to breaking free from addiction',
    icon: '🤝',
    path: '/programs/community',
    features: [
      'Private Discord community',
      'Weekly group calls',
      'Accountability partners',
      'Success challenges',
      'Resource library access'
    ],
    price: '$97/month'
  },
  {
    id: 'sessions',
    title: 'Recovery Sessions',
    description: 'Structured therapy sessions focused on addiction recovery',
    icon: '🎯',
    path: '/programs/sessions',
    features: [
      'CBT-based approach',
      'Trauma-informed therapy',
      'Flexible scheduling',
      'Insurance accepted',
      'Crisis support available'
    ],
    price: '$150/session'
  },
  {
    id: 'ebooks',
    title: 'Ebooks',
    description: 'Comprehensive guides and workbooks for self-directed recovery',
    icon: '📚',
    path: '/programs/ebooks',
    features: [
      'Instant downloads',
      'Printable workbooks',
      'Audio versions',
      'Bonus materials',
      'Lifetime access'
    ],
    price: 'From $29'
  },
  {
    id: 'tools',
    title: 'Tools',
    description: 'Digital tools and apps to support your recovery journey',
    icon: '🛠️',
    path: '/programs/tools',
    features: [
      'Habit tracking app',
      'Meditation guides',
      'Emergency protocols',
      'Progress analytics',
      'Mobile accessibility'
    ],
    price: '$47/month'
  }
];