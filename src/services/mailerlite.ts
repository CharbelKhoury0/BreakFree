import axios from 'axios';

interface SubscriberData {
  email: string;
  name?: string;
  fields?: {
    [key: string]: string | number;
  };
  groups?: string[];
}

interface MailerLiteResponse {
  success: boolean;
  message: string;
  data?: any;
}

class MailerLiteService {
  private apiKey: string;
  private baseURL = 'https://connect.mailerlite.com/api';
  private defaultGroupId: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_MAILERLITE_API_KEY;
    this.defaultGroupId = import.meta.env.VITE_MAILERLITE_GROUP_ID;
    
    if (!this.apiKey) {
      console.warn('MailerLite API key not found. Email subscriptions will not work.');
    }
  }

  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };
  }

  async subscribe(subscriberData: SubscriberData): Promise<MailerLiteResponse> {
    if (!this.apiKey) {
      return {
        success: false,
        message: 'MailerLite API key not configured'
      };
    }

    try {
      const payload = {
        email: subscriberData.email,
        fields: {
          name: subscriberData.name || '',
          ...subscriberData.fields
        },
        groups: subscriberData.groups || [this.defaultGroupId]
      };

      const response = await axios.post(
        `${this.baseURL}/subscribers`,
        payload,
        { headers: this.getHeaders() }
      );

      return {
        success: true,
        message: 'Successfully subscribed to newsletter',
        data: response.data
      };
    } catch (error: any) {
      console.error('MailerLite subscription error:', error);
      
      if (error.response?.status === 422) {
        return {
          success: false,
          message: 'Email address is already subscribed or invalid'
        };
      }
      
      return {
        success: false,
        message: 'Failed to subscribe. Please try again later.'
      };
    }
  }

  async subscribeToFreeEbook(data: {
    firstName: string;
    email: string;
    recoveryStage?: string;
    primaryChallenge?: string;
  }): Promise<MailerLiteResponse> {
    return this.subscribe({
      email: data.email,
      name: data.firstName,
      fields: {
        recovery_stage: data.recoveryStage || '',
        primary_challenge: data.primaryChallenge || '',
        lead_source: 'free_ebook',
        signup_date: new Date().toISOString()
      }
    });
  }

  async subscribeToNewsletter(email: string, source: string = 'newsletter'): Promise<MailerLiteResponse> {
    return this.subscribe({
      email,
      fields: {
        lead_source: source,
        signup_date: new Date().toISOString()
      }
    });
  }

  async subscribeWithInterest(data: {
    email: string;
    name?: string;
    interest: string;
    source: string;
  }): Promise<MailerLiteResponse> {
    return this.subscribe({
      email: data.email,
      name: data.name,
      fields: {
        interest: data.interest,
        lead_source: data.source,
        signup_date: new Date().toISOString()
      }
    });
  }
}

export const mailerLiteService = new MailerLiteService();
export default mailerLiteService;