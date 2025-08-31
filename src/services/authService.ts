import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';
import type { Profile } from '../types/database';

export interface AuthResponse {
  user: User | null;
  session: Session | null;
  error: any;
}

export interface ProfileResponse {
  profile: Profile | null;
  error: any;
}

export class AuthService {
  /**
   * Sign up a new user
   */
  static async signUp(email: string, password: string, fullName?: string): Promise<AuthResponse> {
    if (!isSupabaseConfigured) {
      return {
        user: null,
        session: null,
        error: { message: 'Authentication service not configured. Please set up Supabase environment variables.' }
      };
    }
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName || ''
          }
        }
      });

      // If signup successful and user is confirmed, try to create profile
      if (!error && data.user && data.user.email_confirmed_at) {
        try {
          await this.createProfile(data.user);
        } catch (profileError) {
          console.log('Profile creation failed during signup, will retry on login:', profileError);
        }
      }

      return {
        user: data.user,
        session: data.session,
        error
      };
    } catch (error) {
      return {
        user: null,
        session: null,
        error
      };
    }
  }

  /**
   * Sign in an existing user
   */
  static async signIn(email: string, password: string): Promise<AuthResponse> {
    if (!isSupabaseConfigured) {
      return {
        user: null,
        session: null,
        error: { message: 'Authentication service not configured. Please set up Supabase environment variables.' }
      };
    }
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      return {
        user: data.user,
        session: data.session,
        error
      };
    } catch (error) {
      return {
        user: null,
        session: null,
        error
      };
    }
  }

  /**
   * Sign in with Google OAuth
   */
  static async signInWithGoogle(): Promise<AuthResponse> {
    if (!isSupabaseConfigured) {
      return {
        user: null,
        session: null,
        error: { message: 'Authentication service not configured. Please set up Supabase environment variables.' }
      };
    }
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      return {
        user: data.user,
        session: data.session,
        error
      };
    } catch (error) {
      return {
        user: null,
        session: null,
        error
      };
    }
  }

  /**
   * Sign out the current user with comprehensive session clearing
   */
  static async signOut(): Promise<{ error: any }> {
    if (!isSupabaseConfigured) {
      return { error: { message: 'Supabase not configured' } };
    }
    
    try {
      console.log('AuthService: Starting comprehensive sign out...');
      
      // Force sign out with scope 'global' to clear all sessions
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      
      // Clear all possible localStorage keys related to Supabase
      try {
        const keysToRemove = [
          'supabase.auth.token',
          'sb-auth-token',
          'breakfree_isAdmin',
          'breakfree_explicit_login'
        ];
        
        // Clear specific keys
        keysToRemove.forEach(key => {
          localStorage.removeItem(key);
        });
        
        // Clear any Supabase-related keys that might exist
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('supabase') || key.startsWith('sb-')) {
            localStorage.removeItem(key);
          }
        });
        
        console.log('AuthService: Cleared all localStorage auth data');
      } catch (storageError) {
        console.warn('AuthService: Failed to clear localStorage:', storageError);
      }
      
      // Clear sessionStorage as well
      try {
        Object.keys(sessionStorage).forEach(key => {
          if (key.startsWith('supabase') || key.startsWith('sb-') || key.includes('auth')) {
            sessionStorage.removeItem(key);
          }
        });
        console.log('AuthService: Cleared sessionStorage auth data');
      } catch (storageError) {
        console.warn('AuthService: Failed to clear sessionStorage:', storageError);
      }
      
      if (error) {
        console.error('AuthService: Supabase signOut error:', error);
      } else {
        console.log('AuthService: Successfully signed out from Supabase');
      }
      
      return { error };
    } catch (error) {
      console.error('AuthService: Sign out error:', error);
      
      // Even if there's an error, try to clear storage
      try {
        localStorage.clear();
        sessionStorage.clear();
        console.log('AuthService: Force cleared all storage due to error');
      } catch (clearError) {
        console.warn('AuthService: Failed to force clear storage:', clearError);
      }
      
      return { error };
    }
  }

  /**
   * Get the current user
   */
  static async getCurrentUser(): Promise<{ user: User | null; error: any }> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      return { user, error };
    } catch (error) {
      return { user: null, error };
    }
  }

  /**
   * Get the current session
   */
  static async getCurrentSession(): Promise<{ session: Session | null; error: any }> {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      return { session, error };
    } catch (error) {
      return { session: null, error };
    }
  }

  /**
   * Create profile for existing user
   */
  static async createProfile(user: User): Promise<ProfileResponse> {
    try {
      const fullName = user.user_metadata?.full_name || '';
      
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          email: user.email!,
          full_name: fullName,
          role: 'user'
        })
        .select()
        .single();

      return { profile: data, error };
    } catch (error) {
      return { profile: null, error };
    }
  }

  /**
   * Get user profile
   */
  static async getUserProfile(userId?: string): Promise<ProfileResponse> {
    try {
      let targetUserId = userId;
      let currentUser = null;
      
      if (!targetUserId) {
        const { user, error: userError } = await this.getCurrentUser();
        if (userError || !user) {
          return { profile: null, error: userError || { message: 'No user found' } };
        }
        targetUserId = user.id;
        currentUser = user;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', targetUserId)
        .single();

      // If profile doesn't exist but user does, create it automatically
      if (error && error.code === 'PGRST116' && currentUser) {
        console.log('Profile not found, creating automatically...');
        return await this.createProfile(currentUser);
      }

      return { profile: data, error };
    } catch (error) {
      return { profile: null, error };
    }
  }

  /**
   * Update user profile
   */
  static async updateProfile(updates: Partial<Profile>): Promise<ProfileResponse> {
    try {
      const { user, error: userError } = await this.getCurrentUser();
      if (userError || !user) {
        return { profile: null, error: userError || { message: 'No user found' } };
      }

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      return { profile: data, error };
    } catch (error) {
      return { profile: null, error };
    }
  }

  /**
   * Reset password
   */
  static async resetPassword(email: string): Promise<{ error: any }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      return { error };
    } catch (error) {
      return { error };
    }
  }

  /**
   * Update password
   */
  static async updatePassword(newPassword: string): Promise<{ error: any }> {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      return { error };
    } catch (error) {
      return { error };
    }
  }

  /**
   * Check if user is admin
   */
  static async isAdmin(): Promise<{ isAdmin: boolean; error: any }> {
    try {
      const { profile, error } = await this.getUserProfile();
      if (error || !profile) {
        return { isAdmin: false, error };
      }

      return { isAdmin: profile.role === 'admin', error: null };
    } catch (error) {
      return { isAdmin: false, error };
    }
  }

  /**
   * Listen to auth state changes
   */
  static onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
}