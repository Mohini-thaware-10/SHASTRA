import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server-client";

export async function GET() {
  try {
    // Sign out the user on the server
    await supabaseServer.auth.signOut();

    return NextResponse.json({
      success: true,
      redirectTo: "/auth/sign-in",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}