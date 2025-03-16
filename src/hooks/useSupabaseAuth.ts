
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

export function useSupabaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Handle hash fragment from Supabase redirect
    const handleHashRedirect = async () => {
      const hash = window.location.hash;
      
      if (hash && (hash.includes('access_token') || hash.includes('error'))) {
        // Clear the hash from the URL without reloading
        window.history.replaceState(null, '', window.location.pathname);
        
        try {
          // Process the hash for authentication
          const { data, error } = await supabase.auth.getSession();
          
          if (error) throw error;
          
          if (data?.session) {
            setUser(data.session.user);
            toast({
              title: "Authentication successful",
              description: "You have been successfully authenticated.",
            });
            navigate('/diary');
          }
        } catch (error) {
          console.error("Error handling redirect:", error);
          toast({
            title: "Authentication error",
            description: error instanceof Error ? error.message : "An error occurred during authentication",
            variant: "destructive",
          });
        }
      }
    };

    // Check for URL params first
    handleHashRedirect();

    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state (signed in, signed out, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: "Successfully logged in",
        description: "Welcome back to Culture Vulture!",
      });
      
      navigate('/diary');
    } catch (error) {
      toast({
        title: "Error logging in",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/auth`
        }
      });

      if (signUpError) throw signUpError;

      toast({
        title: "Account created successfully",
        description: "Welcome to Culture Vulture! Please check your email to verify your account.",
      });
      
    } catch (error) {
      toast({
        title: "Error creating account",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Signed out successfully",
        description: "Come back soon!",
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: "Error signing out",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };
}
