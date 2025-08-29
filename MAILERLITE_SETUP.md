# MailerLite Integration Setup Guide

This guide will help you set up MailerLite integration for the BreakFree website to capture leads and manage email subscriptions.

## Overview

The MailerLite integration is already fully implemented and includes:
- Newsletter subscription forms
- Free ebook lead capture
- Segmented subscriber management
- Custom field tracking (recovery stage, interests, lead sources)
- Error handling and user feedback

## Prerequisites

1. A MailerLite account (free tier available)
2. Access to your MailerLite dashboard
3. Basic understanding of environment variables

## Step 1: Create MailerLite Account

1. Go to [MailerLite.com](https://www.mailerlite.com)
2. Sign up for a free account
3. Verify your email address
4. Complete the onboarding process

## Step 2: Get Your API Key

1. Log into your MailerLite dashboard
2. Navigate to **Integrations** → **API**
3. Click **Generate new token**
4. Give it a descriptive name (e.g., "BreakFree Website")
5. Copy the generated API key (starts with `ml_`)

## Step 3: Create a Default Group

1. In your MailerLite dashboard, go to **Subscribers** → **Groups**
2. Click **Create group**
3. Name it something like "Website Subscribers" or "General Newsletter"
4. Save the group
5. Note the Group ID (visible in the URL or group settings)

## Step 4: Configure Environment Variables

1. Copy `.env.example` to `.env` in your project root:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and update the MailerLite variables:
   ```env
   VITE_MAILERLITE_API_KEY=ml_your_actual_api_key_here
   VITE_MAILERLITE_GROUP_ID=your_actual_group_id_here
   ```

## Step 5: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the blog page (`/blog`) or free ebook page (`/free-ebook`)
3. Try subscribing with a test email
4. Check your MailerLite dashboard to confirm the subscriber was added

## Features Included

### 1. Newsletter Subscription
- **Location**: Blog page, footer (if implemented)
- **Component**: `NewsletterForm`
- **Functionality**: Simple email capture with source tracking

### 2. Free Ebook Lead Capture
- **Location**: `/free-ebook` page
- **Functionality**: Captures name, email, recovery stage, and primary challenge
- **Custom Fields**: 
  - `recovery_stage`
  - `primary_challenge`
  - `lead_source`
  - `signup_date`

### 3. Interest-Based Subscriptions
- **Functionality**: Segment subscribers by interests
- **Usage**: Can be used for program-specific signups

## Custom Fields Setup (Optional)

To track additional subscriber data:

1. In MailerLite dashboard, go to **Subscribers** → **Custom fields**
2. Create these fields:
   - `recovery_stage` (Text)
   - `primary_challenge` (Text)
   - `lead_source` (Text)
   - `signup_date` (Date)
   - `interest` (Text)

## Error Handling

The integration includes comprehensive error handling:
- Invalid email validation
- Duplicate subscriber detection
- API connection errors
- User-friendly error messages

## Security Considerations

- API keys are stored as environment variables
- Never commit `.env` files to version control
- API key has limited permissions (subscriber management only)
- All API calls are made from the client side (suitable for public websites)

## Troubleshooting

### Common Issues:

1. **"MailerLite API key not configured" error**
   - Check that `VITE_MAILERLITE_API_KEY` is set in your `.env` file
   - Ensure the API key starts with `ml_`
   - Restart your development server after adding environment variables

2. **Subscribers not appearing in MailerLite**
   - Verify the Group ID is correct
   - Check the browser console for API errors
   - Ensure your MailerLite account is active

3. **"Email already subscribed" message**
   - This is normal behavior for duplicate emails
   - Check your MailerLite dashboard to confirm the subscriber exists

### Debug Mode:

To enable debug logging, open browser console and check for MailerLite-related messages.

## API Rate Limits

- Free tier: 1,000 subscribers, 12,000 emails/month
- API calls are rate-limited by MailerLite
- The integration handles rate limiting gracefully

## Next Steps

1. **Email Templates**: Create welcome emails and automation sequences in MailerLite
2. **Segmentation**: Use custom fields to create targeted subscriber segments
3. **Analytics**: Monitor subscription rates and email performance
4. **A/B Testing**: Test different form placements and copy

## Support

For MailerLite-specific issues:
- [MailerLite Help Center](https://help.mailerlite.com/)
- [MailerLite API Documentation](https://developers.mailerlite.com/)

For integration issues:
- Check the browser console for errors
- Verify environment variables are correctly set
- Ensure the development server is restarted after environment changes

## File Structure

```
src/
├── services/
│   └── mailerlite.ts          # Main MailerLite service
├── components/
│   └── NewsletterForm.tsx     # Reusable newsletter form
└── pages/
    ├── Blog.tsx               # Includes newsletter signup
    ├── FreeEbook.tsx          # Lead capture form
    └── about/
        └── Donations.tsx      # Additional lead capture
```

The integration is production-ready and follows best practices for error handling, user experience, and data privacy.