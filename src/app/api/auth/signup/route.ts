import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server-client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, requestedRole, email, password } = body;

    // Step 1: Sign up with Supabase
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

    // Step 2: Create profile if user was signed up
    if (signUpData.user) {
      const { error: profileError } = await supabaseServer
        .from("profiles")
        .insert({
          id: signUpData.user.id,
          full_name: fullName,
          requested_role: requestedRole,
          account_role: "pending_teacher",
          account_status: "pending_verification",
        });

      if (profileError) {
        return NextResponse.json(
          { error: "Signup successful but profile creation failed: " + profileError.message },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { 
        success: true, 
        user: signUpData.user ? {
          id: signUpData.user.id,
          email: signUpData.user.email,
          email_confirmed: signUpData.user.email_confirmed_at !== null,
        } : null 
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}