export interface Program {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
  features: string[];
  price?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  age?: number;
  quote: string;
  image?: string;
  recovery_time?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  image?: string;
}

export interface CalculatorResult {
  score: number;
  level: 'Low' | 'Moderate' | 'High' | 'Severe';
  recommendations: string[];
  programs: string[];
}