import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if Supabase is configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

// Create a mock client for development when Supabase is not configured
const createMockClient = () => {
  const mockAuth = {
    signUp: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
    signInWithPassword: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
    signOut: async () => ({ error: { message: 'Supabase not configured' } }),
    getUser: async () => ({ data: { user: null }, error: { message: 'Supabase not configured' } }),
    getSession: async () => ({ data: { session: null }, error: { message: 'Supabase not configured' } }),
    updateUser: async () => ({ error: { message: 'Supabase not configured' } }),
    onAuthStateChange: () => {
      // Return a mock subscription object
      return {
        data: { subscription: { unsubscribe: () => {} } },
        error: null
      };
    }
  };
  
  const mockFrom = () => ({
    select: () => ({ data: [], error: { message: 'Supabase not configured' } }),
    insert: () => ({ data: null, error: { message: 'Supabase not configured' } }),
    update: () => ({ data: null, error: { message: 'Supabase not configured' } }),
    delete: () => ({ data: null, error: { message: 'Supabase not configured' } }),
    eq: function() { return this; },
    single: function() { return this; }
  });
  
  return {
    auth: mockAuth,
    from: mockFrom
  };
};

// Create Supabase client or mock client
export const supabase = isSupabaseConfigured 
  ? createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
  : createMockClient() as any;

// Auth helper functions
export const auth = {
  signUp: async (email: string, password: string, fullName?: string) => {
    if (!isSupabaseConfigured) {
      return { data: null, error: { message: 'Supabase not configured' } };
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    });
    return { data, error };
  },

  signIn: async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      return { data: null, error: { message: 'Supabase not configured' } };
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  },

  signOut: async () => {
    if (!isSupabaseConfigured) {
      return { error: { message: 'Supabase not configured' } };
    }
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  getCurrentUser: async () => {
    if (!isSupabaseConfigured) {
      return { user: null, error: { message: 'Supabase not configured' } };
    }
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  getCurrentSession: async () => {
    if (!isSupabaseConfigured) {
      return { session: null, error: { message: 'Supabase not configured' } };
    }
    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
  }
};