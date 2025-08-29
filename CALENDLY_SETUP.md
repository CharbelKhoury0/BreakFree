# Calendly Integration Setup Guide

## Overview
The BreakFree website now includes a fully integrated Calendly booking system with a dedicated booking page that allows users to schedule consultations seamlessly.

## Features Implemented
✅ **Dedicated Booking Page** - Full-page Calendly integration at `/booking`
✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
✅ **Multiple Button Styles** - Different button configurations for different contexts
✅ **UTM Tracking** - Automatic tracking of where bookings come from
✅ **Hero Section** - Professional introduction with consultation details
✅ **BreakFree Branding** - Page design matches the website's aesthetic

## Configuration Required

### 1. Update Calendly URL
Edit the file: `src/config/calendly.ts`

```typescript
export const CALENDLY_CONFIG = {
  // Replace with your actual Calendly URL
  url: 'https://calendly.com/your-username/consultation-type',
  // ... rest of config
};
```

### 2. Calendly Account Setup
1. Create or log into your Calendly account
2. Set up your consultation event type
3. Configure your availability
4. Copy your Calendly scheduling URL
5. Update the URL in the config file

## Where Calendly Buttons Are Located

### Mentorship Page (`/programs/mentorship`)
- **Hero Section**: "Schedule Consultation" button
- **Pricing Section**: "Start your journey" button  
- **CTA Section**: "Schedule consultation" button

### Button Configurations
The system includes different button styles for different contexts:
- `primary`: Main consultation buttons
- `secondary`: Alternative style buttons
- `cta`: Call-to-action buttons
- `pricing`: Pricing section buttons

## UTM Tracking
Each button automatically includes UTM parameters to track:
- Source: `breakfree-website`
- Medium: `website`
- Campaign: Specific to the page/section
- Content: Specific to the button location

## Testing the Integration

1. **Navigate to the Mentorship page**: `/programs/mentorship`
2. **Click any "Schedule Consultation" button**
3. **Verify navigation to the booking page** at `/booking`
4. **Test the Calendly widget** embedded on the booking page
5. **Test on different devices** to ensure responsiveness

## Customization Options

### Button Text
Update button text in `src/config/calendly.ts`:
```typescript
buttons: {
  primary: {
    text: 'Your Custom Text',
    // ...
  }
}
```

### Button Styling
Modify button classes in the config or pass custom `buttonClassName` prop.

### Prefill Data
Customize prefill data to automatically populate user information:
```typescript
prefill: {
  name: 'User Name',
  email: 'user@example.com',
  customAnswers: {
    a1: 'BreakFree Website'
  }
}
```

## Component Usage

To add Calendly integration to other pages:

```tsx
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { getButtonConfig } from '../config/calendly';

// Navigation to booking page (recommended)
<Link
  to="/booking"
  className={`${getButtonConfig('primary').className} inline-flex items-center space-x-2`}
>
  <Calendar className="w-5 h-5" />
  <span>{getButtonConfig('primary').text}</span>
</Link>

// Direct access to booking page
// Visit: /booking
```

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify your Calendly URL is correct and public
3. Ensure your Calendly account is properly configured
4. Test with a simple Calendly URL first

## Next Steps

1. **Update the Calendly URL** in the config file
2. **Test the integration** with your actual Calendly account
3. **Customize button text** and styling as needed
4. **Add Calendly buttons** to other pages if desired
5. **Monitor booking analytics** through Calendly dashboard

The integration is now complete and ready for use!