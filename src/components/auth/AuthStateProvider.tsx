"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser-client";
import { getLearnerProfile, type LearnerProfile } from "@/lib/dashboard/mock-data";
import { createDataProvider, type IDataProvider } from "@/lib/dashboard/data-provider";
import { useDataProvider } from "@/lib/dashboard/data-provider";
import { Container } from "@/components/common/container";
import { Reveal } from "@/components/common/reveal";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export type AuthRole = "student" | "teacher" | "admin" | "pending_teacher";

export type AuthState =
  | "unauthenticated"
  | "authenticating"
  | "authenticated";

export type ProfileState =
  | { status: "loaded"; role: AuthRole; institutionId: string | null; learnerProfile: LearnerProfile }
  | { status: "pending"; role: AuthRole; institutionId: string | null }
  | { status: "error"; error: string };

export type AuthContextType = {
  authState: AuthState;
  profileState: ProfileState;
  user: { id: string; email: string | null; name: string | null } | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role: AuthRole, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  reloadAuthState: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthStateProvider - Centralized authentication state layer.
 * 
 * Responsibilities:
 * - Listen to Supabase Auth state changes
 * - Bootstrap user profile on sign-in
 * - Redirect to onboarding if profile missing
 * - Expose auth state, role, institution membership to the app
 * - Handle session restoration after page refresh
 * - Prevent auth-related flickering
 */
export function AuthStateProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>("authenticating");
  const [profileState, setProfileState] = useState<ProfileState>(
    { status: "pending", role: "student", institutionId: null }
  );
  const [user, setUser] = useState({ id: "", email: null, name: null });
  const router = useRouter();

  // Initialize auth state and set up listener
  useEffect(() => {
    // Initial session check
    supabaseBrowser.auth.getSession().then(({ session, error }) => {
      if (error || !session) {
        setAuthState("unauthenticated");
        setUser(null);
        setProfileState({ status: "pending", role: "student", institutionId: null });
      } else {
        setAuthState("authenticated");
        setUser({
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.full_name || null,
        });

        // Check if profile exists
        checkProfileAndRedirect(session.user.id);
      }
    });

    // Listen for session changes
    const { data: { subscription } } = supabaseBrowser.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN") {
          setAuthState("authenticated");
          setUser({
            id: session?.user?.id || "",
            email: session?.user?.email || null,
            name: session?.user?.user_metadata?.full_name || null,
          });

          checkProfileAndRedirect(session?.user?.id);
        } else if (event === "SIGNED_OUT") {
          setAuthState("unauthenticated");
          setUser(null);
          setProfileState({ status: "pending", role: "student", institutionId: null });
          router.push("/auth/sign-in");
        } else if (event === "SESSION_REFRESHED") {
          // Session was renewed, re-check profile
          setAuthState("authenticated");
          if (session?.user?.id) {
            checkProfileAndRedirect(session.user.id);
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  // Check if profile exists and determine role/institution
  const checkProfileAndRedirect = async (userId: string) => {
    // First, check if a profile exists in the database
    const { data: profileData, error } = await supabaseBrowser
      .from("profiles")
      .select("account_role, institution_id, full_name")
      .eq("id", userId)
      .single();

    if (error || !profileData) {
      // No profile exists - redirect to onboarding/registration
      // But only if user is not already on auth pages
      const path = window.location.pathname;
      const isAuthPage =
        path.startsWith("/auth/sign-in") ||
        path.startsWith("/auth/sign-up") ||
        path.startsWith("/auth/verify-email");

      if (!isAuthPage) {
        // Redirect to sign-in with returnTo so we can redirect back after onboarding
        router.push(`/auth/sign-in?returnTo=${window.location.pathname}`);
      }

      setProfileState({
        status: "pending",
        role: "student",
        institutionId: null,
      });
      return;
    }

    // Profile exists - determine role and institution
    const role = profileData.account_role as AuthRole;
    const institutionId = profileData.institution_id || null;

    // Determine learner profile based on class from onboarding
    // We need to get the class from somewhere - for now use a default
    // In a full implementation, this would be stored during onboarding
    let learnerProfile: LearnerProfile;
    try {
      const defaultClass = "7"; // Default to Class 7 (Nexus)
      learnerProfile = getLearnerProfile(
        parseInt(defaultClass),
        undefined,
        "CBSE"
      );
    } catch (e) {
      learnerProfile = {
        fullName: profileData.full_name || "Student",
        currentClass: defaultClass,
        board: "CBSE",
        currentUniverse: "nexus",
        selectedSubjects: ["Mathematics", "Science", "Languages", "Social Studies"],
        assessmentScore: 75,
        assessmentTotal: 100,
        learningStreak: 5,
        highestStreak: 15,
        totalXP: 2000,
        currentLevel: 5,
        coins: 250,
      };
    }

    setProfileState({
      status: "loaded",
      role,
      institutionId,
      learnerProfile,
    });
  };

  // Sign in function
  const signIn = async (email: string, password: string) => {
    const { error } = await supabaseBrowser.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setProfileState({
        status: "error",
        error: error.message,
      });
      throw error;
    }

    // After sign in, check profile (will redirect if needed)
    await checkProfileAndRedirectUser();
  };

  // Sign up function
  const signUp = async (
    email: string,
    password: string,
    role: AuthRole,
    fullName: string
  ) => {
    const { error } = await supabaseBrowser.auth.signUpWithPassword({
      email,
      password,
      options: {
        data: {
          requested_role: role,
        },
      },
    });

    if (error) {
      setProfileState({
        status: "error",
        error: error.message,
      });
      throw error;
    }

    // After sign up, check profile (will redirect if needed)
    await checkProfileAndRedirectUser();
  };

  // Sign out function
  const signOut = async () => {
    const { error } = await supabaseBrowser.auth.signOut();

    if (error) throw error;

    setAuthState("unauthenticated");
    setUser(null);
    setProfileState({
      status: "pending",
      role: "student",
      institutionId: null,
    });
    router.replace("/auth/sign-in");
  };

  // Helper: check profile and redirect if needed
  const checkProfileAndRedirectUser = async () => {
    // Re-run profile check after sign in / sign up
    await checkProfileAndRedirect(user?.id || "");
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        profileState,
        user,
        signIn,
        signUp,
        signOut,
        reloadAuthState: () => {},
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to use auth context (with fallback for non-provider contexts)
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    // Fallback when used outside provider - return minimal state
    return {
      authState: "unauthenticated",
      profileState: { status: "pending", role: "student", institutionId: null },
      user: null,
      signIn: async () => { throw new Error("Auth not initialized") },
      signUp: async () => { throw new Error("Auth not initialized") },
      signOut: async () => { throw new Error("Auth not initialized") },
    };
  }
  return context;
};

/**
 * Protected route - ensures authenticated users have a profile.
 * Redirects to onboarding if profile missing.
 */
export function useProtectedRoute() {
  const { authState, profileState, user } = useAuth();

  // If still authenticating, don't redirect yet
  if (authState === "authenticating") {
    return { isLoading: true, canNavigate: true };
  }

  // If unauthenticated, redirect to sign in
  if (authState === "unauthenticated") {
    return { isLoading: false, shouldRedirect: true, redirectTo: "/auth/sign-in" };
  }

  // If profile not loaded, redirect to onboarding
  if (profileState.status === "pending") {
    return { isLoading: true, shouldRedirect: true, redirectTo: "/auth/sign-in" };
  }

  // If profile error, redirect
  if (profileState.status === "error") {
    return {
      isLoading: false,
      shouldRedirect: true,
      redirectTo: "/auth/sign-in",
      error: profileState.error,
    };
  }

  return {
    isLoading: false,
    canNavigate: true,
    user,
    role: profileState.role,
    institutionId: profileState.institutionId,
    learnerProfile: profileState.learnerProfile,
  };
}

/**
 * Wrapper that provides auth state to the app.
 * Wrap your root app component with this.
 */
export function useAuthInitialization() {
  // This hook ensures the auth state is loaded before rendering
  // It's called by the root component
  const { authState } = useAuth();

  return { authState };
}