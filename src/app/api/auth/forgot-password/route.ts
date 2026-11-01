import { NextResponse } from "next/server";
import { supabaseBrowser } from "@/lib/supabase/browser-client";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const { error } = await supabaseBrowser.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    // Return success without revealing whether the email exists
    return NextResponse.json({
      success: true,
      message: "If an account with that email exists, a password reset link has been sent.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}