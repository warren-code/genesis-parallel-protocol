'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { getCurrentUser, signIn, signOut, signUp, refreshSession } from '@/utils/supabase/auth-helpers';
import { Database, UserRole, User as UserProfile } from '@/types/supabase';
import { createClient } from '@/utils/supabase/client';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string, role: UserRole, organization?: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshTimer, setRefreshTimer] = useState<NodeJS.Timeout | null>(null);

  // Load initial auth state and setup auth listener
  useEffect(() => {
    loadAuthState();
    
    // Setup auth state change listener
    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setSession(session);
        setUser(session?.user || null);
        await loadAuthState();
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setProfile(null);
        setSession(null);
        if (refreshTimer) {
          clearTimeout(refreshTimer);
          setRefreshTimer(null);
        }
      }
    });
    
    return () => {
      subscription.unsubscribe();
      if (refreshTimer) {
        clearTimeout(refreshTimer);
      }
    };
  }, []);

  const loadAuthState = async () => {
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const { user, profile } = await getCurrentUser();
        setUser(user);
        setProfile(profile);
        setSession(session);
        
        // Setup token refresh
        setupTokenRefresh(session);
      } else {
        setUser(null);
        setProfile(null);
        setSession(null);
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const setupTokenRefresh = useCallback((session: Session) => {
    // Clear existing timer
    if (refreshTimer) {
      clearTimeout(refreshTimer);
    }
    
    // Calculate when to refresh (5 minutes before expiry)
    const expiresAt = session.expires_at;
    if (!expiresAt) return;
    
    const expiresIn = expiresAt * 1000 - Date.now();
    const refreshIn = Math.max(0, expiresIn - 5 * 60 * 1000); // 5 minutes before expiry
    
    if (refreshIn > 0) {
      const timer = setTimeout(async () => {
        console.log('Refreshing session token...');
        const { session: newSession, error } = await refreshSession();
        
        if (!error && newSession) {
          setSession(newSession);
          setupTokenRefresh(newSession);
        } else if (error) {
          console.error('Error refreshing session:', error);
          // Session refresh failed, sign out
          await handleSignOut();
        }
      }, refreshIn);
      
      setRefreshTimer(timer);
    }
  }, [refreshTimer]);

  const refreshAuth = async () => {
    await loadAuthState();
  };

  const handleSignIn = async (email: string, password: string) => {
    const { user, session, error } = await signIn(email, password);
    if (!error && user && session) {
      setUser(user);
      setSession(session);
      setupTokenRefresh(session);
      await loadAuthState(); // Reload to get profile
    }
    return { error };
  };

  const handleSignUp = async (
    email: string,
    password: string,
    fullName: string,
    role: UserRole,
    organization?: string
  ) => {
    const { user, error } = await signUp(email, password, fullName, role, organization);
    if (!error && user) {
      setUser(user);
      await loadAuthState(); // Reload to get profile
    }
    return { error };
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (!error) {
      setUser(null);
      setProfile(null);
      setSession(null);
    }
    return { error };
  };

  const value = {
    user,
    profile,
    session,
    loading,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    refreshAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
