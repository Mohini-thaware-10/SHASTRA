import { NextResponse } from "next/server";
import { supabaseBrowser } from "@/lib/supabase/browser-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    const next = searchParams.get("next") || "/";

    if (!token) {
      return NextResponse.redirect(new URL("/auth/verify-email?error=missing_token", next));
    }

    const { data, error } = await supabaseBrowser.auth.verifyEmail(token);

    if (error) {
      // Check if token is expired
      if (error.message?.includes("expired")) {
        return NextResponse.redirect(
          new URL("/auth/verify-email?expired=true", next)
        );
      }
      return NextResponse.redirect(
        new URL("/auth/verify-email?error=" + encodeURIComponent(error.message), next)
      );
    }

    // Email verified successfully
    return NextResponse.redirect(new URL(next, request.url));
  } catch (error) {
    return NextResponse.redirect(
      new URL("/auth/verify-email?error=internal", request.url)
    );
  }
}