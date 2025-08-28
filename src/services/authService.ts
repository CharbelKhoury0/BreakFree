import { supabase } from '../lib/supabase';
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
  static async signUp(
    email: string, 
    password: string, 
    fullName?: string
  ): Promise<AuthResponse> {
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
   * Sign out the current user
   */
  static async signOut(): Promise<{ error: any }> {
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
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
   * Get user profile
   */
  static async getUserProfile(userId?: string): Promise<ProfileResponse> {
    try {
      let targetUserId = userId;
      
      if (!targetUserId) {
        const { user, error: userError } = await this.getCurrentUser();
        if (userError || !user) {
          return { profile: null, error: userError || { message: 'No user found' } };
        }
        targetUserId = user.id;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', targetUserId)
        .single();

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