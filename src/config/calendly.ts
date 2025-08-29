// Calendly Configuration
// Update this file with your actual Calendly scheduling URL

export const CALENDLY_CONFIG = {
  // Replace with your actual Calendly URL
  // Example: 'https://calendly.com/your-username/consultation'
  url: 'https://calendly.com/ckhoury100/1-on-1-mentorship-call',
  
  // Default prefill data
  prefill: {
    name: '',
    email: '',
    customAnswers: {
      a1: 'BreakFree Website', // How did you hear about us?
    }
  },
  
  // UTM tracking parameters
  utm: {
    utmSource: 'breakfree-website',
    utmMedium: 'website',
    utmCampaign: 'consultation-booking',
  },
  
  // Button configurations for different contexts
  buttons: {
    primary: {
      text: 'Schedule Consultation',
      className: 'border border-white/15 hover:border-white/30 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 inline-flex items-center space-x-2'
    },
    secondary: {
      text: 'Book a Call',
      className: 'bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 inline-flex items-center space-x-2'
    },
    cta: {
      text: 'Schedule consultation',
      className: 'border border-white/15 hover:border-white/30 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 inline-flex items-center space-x-2'
    },
    pricing: {
      text: 'Start your journey',
      className: 'w-full border border-white/15 hover:border-white/30 text-white py-4 rounded-lg font-bold text-lg transition-all duration-300'
    }
  }
};

// Helper function to get button config
export const getButtonConfig = (type: keyof typeof CALENDLY_CONFIG.buttons) => {
  return CALENDLY_CONFIG.buttons[type];
};

// Helper function to create UTM parameters with custom campaign
export const createUTMParams = (campaign?: string, content?: string) => {
  return {
    ...CALENDLY_CONFIG.utm,
    ...(campaign && { utmCampaign: campaign }),
    ...(content && { utmContent: content })
  };
};