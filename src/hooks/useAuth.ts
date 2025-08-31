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
  // Initialize isAdmin from localStorage to persist across page refreshes
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      const stored = localStorage.getItem('breakfree_isAdmin');
      return stored === 'true';
    } catch {
      return false;
    }
  });

  // Helper function to check if session is from explicit login
  const isExplicitLogin = () => {
    try {
      return localStorage.getItem('breakfree_explicit_login') === 'true';
    } catch {
      return false;
    }
  };

  // Helper function to set explicit login flag
  const setExplicitLogin = (value: boolean) => {
    try {
      if (value) {
        localStorage.setItem('breakfree_explicit_login', 'true');
      } else {
        localStorage.removeItem('breakfree_explicit_login');
      }
    } catch (error) {
      console.warn('Failed to manage explicit login flag:', error);
    }
  };

  // Helper function to validate session
  const isValidSession = (session: Session | null): boolean => {
    if (!session) return false;
    
    // Check if session is expired
    const now = Math.floor(Date.now() / 1000);
    if (session.expires_at && session.expires_at < now) {
      console.log('Session expired');
      return false;
    }
    
    // Check if user email is confirmed
    if (!session.user?.email_confirmed_at) {
      console.log('User email not confirmed');
      return false;
    }
    
    return true;
  };

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
            const adminStatus = profile?.role === 'admin';
            setIsAdmin(adminStatus);
            // Persist admin status to localStorage
            try {
              localStorage.setItem('breakfree_isAdmin', adminStatus.toString());
            } catch (error) {
              console.warn('Failed to save admin status to localStorage:', error);
            }
            return; // Success, exit retry loop
          } else {
            console.log(`Profile loading failed on attempt ${attempt + 1}:`, error);
            
            if (attempt === maxRetries) {
              // Final attempt failed, set defaults
              console.log('All profile loading attempts failed, setting defaults');
              setProfile(null);
              setIsAdmin(false);
              // Clear localStorage on failure
              try {
                localStorage.removeItem('breakfree_isAdmin');
              } catch (error) {
                console.warn('Failed to clear admin status from localStorage:', error);
              }
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
            // Clear localStorage on error
            try {
              localStorage.removeItem('breakfree_isAdmin');
            } catch (error) {
              console.warn('Failed to clear admin status from localStorage:', error);
            }
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
        
        // Check if session is valid and from explicit login
        const hasExplicitLogin = isExplicitLogin();
        const sessionValid = isValidSession(session);
        
        console.log('Session validation:', {
          hasSession: !!session,
          hasExplicitLogin,
          sessionValid,
          userId: session?.user?.id
        });
        
        // Only restore session if it's from explicit login and valid
        if (session && sessionValid && hasExplicitLogin) {
          console.log('Valid explicit session found, restoring user...');
          setSession(session);
          setUser(session.user);
          await loadProfileWithRetry(session.user);
        } else {
          // Clear any invalid or non-explicit sessions
          if (session && !hasExplicitLogin) {
            console.log('Found persisted session without explicit login, clearing...');
            await AuthService.signOut();
          } else if (session && !sessionValid) {
            console.log('Found invalid session, clearing...');
            await AuthService.signOut();
          } else {
            console.log('No valid session found');
          }
          
          // Clear all auth state
          setSession(null);
          setUser(null);
          setProfile(null);
          setIsAdmin(false);
          setExplicitLogin(false);
          
          // Clear localStorage
          try {
            localStorage.removeItem('breakfree_isAdmin');
          } catch (error) {
            console.warn('Failed to clear admin status from localStorage:', error);
          }
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
        
        // Clear all state on error
        setSession(null);
        setUser(null);
        setProfile(null);
        setIsAdmin(false);
        setExplicitLogin(false);
        
        // Clear localStorage on session error
        try {
          localStorage.removeItem('breakfree_isAdmin');
        } catch (storageError) {
          console.warn('Failed to clear admin status from localStorage:', storageError);
        }
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
        
        // Handle different auth events
        if (event === 'SIGNED_OUT') {
          console.log('User signed out, performing comprehensive cleanup');
          
          // Clear all local state immediately
          setSession(null);
          setUser(null);
          setProfile(null);
          setIsAdmin(false);
          setExplicitLogin(false);
          
          // Clear all auth-related localStorage
          try {
            const authKeys = [
              'breakfree_isAdmin',
              'breakfree_explicit_login',
              'supabase.auth.token',
              'sb-auth-token'
            ];
            
            authKeys.forEach(key => {
              localStorage.removeItem(key);
            });
            
            // Clear any remaining Supabase or auth-related keys
            Object.keys(localStorage).forEach(key => {
              if (key.startsWith('supabase') || key.startsWith('sb-') || key.includes('breakfree') || key.includes('auth')) {
                localStorage.removeItem(key);
              }
            });
            
            console.log('SIGNED_OUT: Cleared all localStorage auth data');
          } catch (error) {
            console.warn('SIGNED_OUT: Failed to clear localStorage:', error);
          }
          
          // Clear sessionStorage as well
          try {
            Object.keys(sessionStorage).forEach(key => {
              if (key.startsWith('supabase') || key.startsWith('sb-') || key.includes('auth') || key.includes('breakfree')) {
                sessionStorage.removeItem(key);
              }
            });
            console.log('SIGNED_OUT: Cleared sessionStorage auth data');
          } catch (error) {
            console.warn('SIGNED_OUT: Failed to clear sessionStorage:', error);
          }
        } else if (event === 'SIGNED_IN' && session?.user) {
          console.log('User signed in explicitly, setting session');
          setExplicitLogin(true);
          setSession(session);
          setUser(session.user);
          
          if (session.user.email_confirmed_at) {
            await loadProfileWithRetry(session.user);
          }
        } else if (event === 'TOKEN_REFRESHED' && session?.user) {
          // Only update if we already have an explicit login
          if (isExplicitLogin()) {
            console.log('Token refreshed for explicit session');
            setSession(session);
            setUser(session.user);
          } else {
            console.log('Token refreshed but no explicit login, ignoring');
          }
        } else {
          // For other events, only proceed if we have explicit login
          if (session?.user && session.user.email_confirmed_at && isExplicitLogin()) {
            console.log('Auth change: User confirmed with explicit login, loading profile...');
            setSession(session);
            setUser(session.user);
            await loadProfileWithRetry(session.user);
          } else {
            console.log('Auth change: No confirmed user or explicit login, clearing profile');
            setSession(null);
            setUser(null);
            setProfile(null);
            setIsAdmin(false);
            
            if (!isExplicitLogin()) {
              setExplicitLogin(false);
            }
            
            try {
              localStorage.removeItem('breakfree_isAdmin');
            } catch (error) {
              console.warn('Failed to clear admin status from localStorage:', error);
            }
          }
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
    try {
      console.log('Attempting sign in...');
      const { error } = await AuthService.signIn(email, password);
      
      if (!error) {
        console.log('Sign in successful, setting explicit login flag');
        setExplicitLogin(true);
      }
      
      return { error };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error };
    }
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      console.log('Attempting sign up...');
      const { error } = await AuthService.signUp(email, password, fullName);
      
      if (!error) {
        console.log('Sign up successful, setting explicit login flag');
        setExplicitLogin(true);
      }
      
      return { error };
    } catch (error) {
      console.error('Sign up error:', error);
      return { error };
    }
  };

  const signInWithGoogle = async () => {
    try {
      console.log('Attempting Google sign in...');
      const { error } = await AuthService.signInWithGoogle();
      
      if (!error) {
        console.log('Google sign in successful, setting explicit login flag');
        setExplicitLogin(true);
      }
      
      return { error };
    } catch (error) {
      console.error('Google sign in error:', error);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      console.log('useAuth: Starting comprehensive sign out process...');
      
      // Clear local state immediately for better UX
      setUser(null);
      setSession(null);
      setProfile(null);
      setIsAdmin(false);
      console.log('useAuth: Cleared local auth state');
      
      // Clear explicit login flag
      setExplicitLogin(false);
      console.log('useAuth: Cleared explicit login flag');
      
      // Clear all localStorage auth-related data
      try {
        const authKeys = [
          'breakfree_isAdmin',
          'breakfree_explicit_login',
          'supabase.auth.token',
          'sb-auth-token'
        ];
        
        authKeys.forEach(key => {
          localStorage.removeItem(key);
        });
        
        // Clear any remaining Supabase keys
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('supabase') || key.startsWith('sb-') || key.includes('breakfree')) {
            localStorage.removeItem(key);
          }
        });
        
        console.log('useAuth: Cleared all localStorage auth data');
      } catch (error) {
        console.warn('useAuth: Failed to clear localStorage:', error);
      }
      
      // Call enhanced AuthService signOut (which includes global scope and storage clearing)
      const { error } = await AuthService.signOut();
      
      if (error) {
        console.error('useAuth: AuthService signOut error:', error);
      } else {
        console.log('useAuth: Successfully signed out from AuthService');
      }
      
      // Force a complete page reload to ensure all state is cleared
      // This ensures no residual state remains in memory
      console.log('useAuth: Forcing page reload to ensure complete logout');
      window.location.href = '/login';
      
      return { error };
    } catch (error) {
      console.error('useAuth: Sign out error:', error);
      
      // Even if there's an error, force clear everything
      try {
        // Clear all localStorage
        localStorage.clear();
        // Clear all sessionStorage
        sessionStorage.clear();
        console.log('useAuth: Force cleared all storage due to error');
      } catch (storageError) {
        console.warn('useAuth: Failed to force clear storage:', storageError);
      }
      
      // Clear explicit login flag
      setExplicitLogin(false);
      
      // Clear local state
      setUser(null);
      setSession(null);
      setProfile(null);
      setIsAdmin(false);
      
      // Force redirect to login page
      window.location.href = '/login';
      
      return { error };
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    const { profile: updatedProfile, error } = await AuthService.updateProfile(updates);
    if (!error && updatedProfile) {
      setProfile(updatedProfile);
      const adminStatus = updatedProfile.role === 'admin';
      setIsAdmin(adminStatus);
      // Update localStorage when profile is updated
      try {
        localStorage.setItem('breakfree_isAdmin', adminStatus.toString());
      } catch (error) {
        console.warn('Failed to save admin status to localStorage:', error);
      }
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