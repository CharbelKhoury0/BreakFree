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
    // Get initial session
    const getInitialSession = async () => {
      const { session } = await AuthService.getCurrentSession();
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        const { profile } = await AuthService.getUserProfile();
        setProfile(profile);
        setIsAdmin(profile?.role === 'admin');
      }

      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = AuthService.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          const { profile } = await AuthService.getUserProfile();
          setProfile(profile);
          setIsAdmin(profile?.role === 'admin');
        } else {
          setProfile(null);
          setIsAdmin(false);
        }

        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await AuthService.signIn(email, password);
    return { error };
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    const { error } = await AuthService.signUp(email, password, fullName);
    return { error };
  };

  const signOut = async () => {
    const { error } = await AuthService.signOut();
    return { error };
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
    signOut,
    updateProfile,
    isAdmin
  };
};

export { AuthContext };