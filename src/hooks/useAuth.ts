import { useState, useEffect, createContext, useContext } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import type { Profile } from '../types/database';
import { AuthService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 3;
    const retryDelay = 1000; // 1 second

    // Retry mechanism for profile loading
    const loadProfileWithRetry = async (user: User): Promise<void> => {
      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          console.log(`Loading profile attempt ${attempt + 1}/${maxRetries + 1}`);
          const { profile, error } = await AuthService.getUserProfile();
          
          if (!error && profile) {
            console.log('Profile loaded successfully:', profile);
            setProfile(profile);
            setIsAdmin(profile?.role === 'admin');
            return; // Success, exit retry loop
          } else {
            console.log(`Profile loading failed on attempt ${attempt + 1}:`, error);
            
            if (attempt === maxRetries) {
              // Final attempt failed, set defaults
              console.log('All profile loading attempts failed, setting defaults');
              setProfile(null);
              setIsAdmin(false);
              return;
            }
            
            // Wait before retry (except on last attempt)
            if (attempt < maxRetries) {
              console.log(`Retrying in ${retryDelay}ms...`);
              await new Promise(resolve => setTimeout(resolve, retryDelay));
            }
          }
        } catch (error) {
          console.log(`Profile loading error on attempt ${attempt + 1}:`, error);
          
          if (attempt === maxRetries) {
            setProfile(null);
            setIsAdmin(false);
            return;
          }
          
          if (attempt < maxRetries) {
            await new Promise(resolve => setTimeout(resolve, retryDelay));
          }
        }
      }
    };

    // Get initial session
    const getInitialSession = async () => {
      try {
        console.log('Getting initial session...');
        const { session } = await AuthService.getCurrentSession();
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user && session.user.email_confirmed_at) {
          console.log('User found, loading profile...');
          await loadProfileWithRetry(session.user);
        } else {
          console.log('No confirmed user found');
          setProfile(null);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
        setSession(null);
        setUser(null);
        setProfile(null);
        setIsAdmin(false);
      } finally {
        console.log('Initial session loading complete, setting loading to false');
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = AuthService.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user && session.user.email_confirmed_at) {
          console.log('Auth change: User confirmed, loading profile...');
          await loadProfileWithRetry(session.user);
        } else {
          console.log('Auth change: No confirmed user, clearing profile');
          setProfile(null);
          setIsAdmin(false);
        }

        // Always ensure loading is set to false after auth change
        setLoading(false);
      }
    );

    return () => {
      console.log('Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await AuthService.signIn(email, password);
    return { error };
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    const { error } = await AuthService.signUp(email, password, fullName);
    return { error };
  };

  const signInWithGoogle = async () => {
    const { error } = await AuthService.signInWithGoogle();
    return { error };
  };

  const signOut = async () => {
    try {
      const { error } = await AuthService.signOut();
      
      // Always clear local state regardless of error
      // This ensures UI updates even if there's a network issue
      setUser(null);
      setSession(null);
      setProfile(null);
      setIsAdmin(false);
      
      // Force a page reload to ensure complete state cleanup
      setTimeout(() => {
        window.location.href = '/';
      }, 100);
      
      return { error };
    } catch (error) {
      // Even if there's an error, clear the state and redirect
      setUser(null);
      setSession(null);
      setProfile(null);
      setIsAdmin(false);
      
      setTimeout(() => {
        window.location.href = '/';
      }, 100);
      
      return { error };
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    const { profile: updatedProfile, error } = await AuthService.updateProfile(updates);
    if (!error && updatedProfile) {
      setProfile(updatedProfile);
      setIsAdmin(updatedProfile.role === 'admin');
    }
    return { error };
  };

  return {
    user,
    session,
    profile,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    updateProfile,
    isAdmin
  };
};

export { AuthContext };