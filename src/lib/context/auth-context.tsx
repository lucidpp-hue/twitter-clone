import { useState, useEffect, useContext, createContext, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@lib/supabase/client';
import { getRandomId, getRandomInt } from '@lib/random';
import type { ReactNode } from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import type { User } from '@lib/types/user';

type AuthContext = {
  user: User | null;
  error: Error | null;
  loading: boolean;
  isAdmin: boolean;
  randomSeed: string;
  userBookmarks: any[] | null;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContext | null>(null);

type AuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({
  children
}: AuthContextProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [userBookmarks, setUserBookmarks] = useState<any[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Check for existing session
    const checkUser = async () => {
      try {
        const {
          data: { session }
        } = await supabase.auth.getSession();

        if (session?.user) {
          // Convert Supabase user to our User type
          const convertedUser: User = {
            id: session.user.id,
            name: session.user.user_metadata?.display_name || 'User',
            username: session.user.user_metadata?.username || session.user.email?.split('@')[0] || 'user',
            bio: session.user.user_metadata?.bio || null,
            website: session.user.user_metadata?.website || null,
            location: session.user.user_metadata?.location || null,
            photoURL: session.user.user_metadata?.avatar_url || '/assets/twitter-avatar.jpg',
            coverPhotoURL: session.user.user_metadata?.cover_photo_url || null,
            theme: session.user.user_metadata?.theme || null,
            accent: session.user.user_metadata?.accent || null,
            verified: session.user.user_metadata?.verified || false,
            following: session.user.user_metadata?.following || [],
            followers: session.user.user_metadata?.followers || [],
            createdAt: new Date(session.user.created_at),
            updatedAt: null,
            totalTweets: 0,
            totalPhotos: 0,
            pinnedTweet: null
          };
          setUser(convertedUser);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Subscribe to auth changes
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const convertedUser: User = {
          id: session.user.id,
          name: session.user.user_metadata?.display_name || 'User',
          username: session.user.user_metadata?.username || session.user.email?.split('@')[0] || 'user',
          bio: session.user.user_metadata?.bio || null,
          website: session.user.user_metadata?.website || null,
          location: session.user.user_metadata?.location || null,
          photoURL: session.user.user_metadata?.avatar_url || '/assets/twitter-avatar.jpg',
          coverPhotoURL: session.user.user_metadata?.cover_photo_url || null,
          theme: session.user.user_metadata?.theme || null,
          accent: session.user.user_metadata?.accent || null,
          verified: session.user.user_metadata?.verified || false,
          following: session.user.user_metadata?.following || [],
          followers: session.user.user_metadata?.followers || [],
          createdAt: new Date(session.user.created_at),
          updatedAt: null,
          totalTweets: 0,
          totalPhotos: 0,
          pinnedTweet: null
        };
        setUser(convertedUser);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [supabase]);

  const signUp = useCallback(async (
    email: string,
    password: string,
    username: string
  ): Promise<void> => {
    try {
      setError(null);
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: username,
            username: username.toLowerCase(),
            avatar_url: '/assets/twitter-avatar.jpg'
          }
        }
      });

      if (signUpError) throw signUpError;

      // Redirect to home after signup
      if (data.user) {
        setTimeout(() => {
          void router.push('/home');
        }, 500);
      }
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }, [router, supabase]);

  const signIn = useCallback(async (email: string, password: string): Promise<void> => {
    try {
      setError(null);
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) throw signInError;

      // Redirect to home after signin
      setTimeout(() => {
        void router.push('/home');
      }, 500);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }, [router, supabase]);

  const signOut = useCallback(async (): Promise<void> => {
    try {
      setError(null);
      const { error: signOutError } = await supabase.auth.signOut();

      if (signOutError) throw signOutError;

      setUser(null);
      setTimeout(() => {
        void router.push('/');
      }, 500);
    } catch (err) {
      setError(err as Error);
    }
  }, [router, supabase]);

  const isAdmin = user ? user.username === 'admin' : false;
  const randomSeed = useMemo(getRandomId, [user?.id]);

  const value: AuthContext = {
    user,
    error,
    loading,
    isAdmin,
    randomSeed,
    userBookmarks,
    signOut,
    signUp,
    signIn
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContext {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error('useAuth must be used within an AuthContextProvider');

  return context;
}
