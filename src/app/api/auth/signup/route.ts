import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server-client";

/**
 * CRITICAL Security Rule:
 * Do not allow a public registration form to create an administrator,
 * reviewer or privileged officer account.
 *
 * Only 'student' role is permitted for self-service sign-up.
 * Institutional officer accounts require authorized onboarding.
 */

// Allowed roles for self-service registration
const ALLOWED_SELF_SERVICE_ROLES = ["student"] as const;
type SelfServiceRole = (typeof ALLOWED_SELF_SERVICE_ROLES)[number];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, requestedRole, email, password } = body;

    // Step 1: Validate role - only allow student self-registration
    if (!ALLOWED_SELF_SERVICE_ROLES.includes(requestedRole as SelfServiceRole)) {
      return NextResponse.json(
        {
          error:
            "Invalid account type for self-registration. Please contact institution administration.",
        },
        { status: 403 }
      );
    }

    // Step 2: Sign up with Supabase
    const { data: signUpData, error: signUpError } = await supabaseServer.auth.signUp({
      email,
      password,
      options: {
        data: {
          requested_role: requestedRole,
        },
      },
    });

    if (signUpError) {
      return NextResponse.json(
        { error: signUpError.message },
        { status: 400 }
      );
    }

    // Step 3: Create profile only for allowed roles
    if (signUpData.user) {
      // Map requested role to profile account_role
      // Students get 'student', all others get 'pending_teacher' (must go through onboarding)
      const accountRole =
        requestedRole === "student"
          ? "student"
          : "pending_teacher";

      const { error: profileError } = await supabaseServer
        .from("profiles")
        .insert({
          id: signUpData.user.id,
          full_name: fullName,
          requested_role: requestedRole,
          account_role: accountRole,
          account_status: "pending_verification",
        });

      if (profileError) {
        return NextResponse.json(
          {
            error:
              "Signup successful but profile creation failed. Please contact support.",
          },
          { status: 500 }
        );
      }

      // Step 4: For non-student roles, create pending institution membership
      // that requires administrative approval
      if (requestedRole !== "student") {
        // Note: Institution membership creation is handled onboarding flow,
        // not during initial sign-up. The pending_teacher role with
        // pending_verification status prevents unauthorized access.
      }
    }

    return NextResponse.json(
      {
        success: true,
        user: signUpData.user
          ? {
              id: signUpData.user.id,
              email: signUpData.user.email,
              email_confirmed: signUpData.user.email_confirmed_at !== null,
            }
          : null,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}