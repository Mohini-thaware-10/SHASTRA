import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server-client";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const { data, error } = await supabaseServer.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    // Check if the user's profile exists and has the right status
    const { data: profileData, error: profileError } = await supabaseServer
      .from("profiles")
      .select("account_status, account_role, institution_id")
      .eq("id", data.user.id)
      .single();

    if (profileError) {
      // Profile may not exist yet - this is ok for new signups
      // Return minimal user data; frontend will handle onboarding
      return NextResponse.json({
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email,
          email_confirmed: data.user.email_confirmed_at !== null,
          account_status: "pending_verification",
          account_role: "pending_teacher",
          // No institution_id yet - will be set during onboarding
          institution_id: null,
        },
      });
    }

    // Check account status
    if (profileData.account_status === "suspended") {
      return NextResponse.json(
        { error: "Account has been suspended" },
        { status: 403 }
      );
    }

    if (profileData.account_status === "pending_verification" && !data.user.email_confirmed_at) {
      return NextResponse.json(
        { error: "Email not verified. Please check your email for verification link." },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        email_confirmed: data.user.email_confirmed_at !== null,
        account_status: profileData.account_status,
        account_role: profileData.account_role,
        institution_id: profileData.institution_id,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}