import { NextResponse } from "next/server";
import { supabaseBrowser } from "@/lib/supabase/browser-client";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(new URL("/auth/verify-email?error=missing_token", request.url));
    }

    // Verify email using Supabase auth
    // @ts-expectError - verifyEmail may not be fully typed in all SDK versions
    const result: { data: unknown; error: { message: string } | null } = (
      await (supabaseBrowser.auth as unknown as { verifyEmail: (token: string) => Promise<{ data: unknown; error: { message: string } | null }> }).verifyEmail(token)
    );

    if (result.error?.message) {
      // Token might be expired
      if (result.error.message.toLowerCase().includes("expired")) {
        return NextResponse.redirect(
          new URL("/auth/verify-email?expired=true", request.url)
        );
      }
      return NextResponse.redirect(
        new URL("/auth/verify-email?error=" + encodeURIComponent(result.error.message), request.url)
      );
    }

    // Email verified successfully - redirect to login with verified flag
    return NextResponse.redirect(new URL("/auth/sign-in?verified=true", request.url));
  } catch (e: unknown) {
    return NextResponse.redirect(
      new URL("/auth/verify-email?error=" + encodeURIComponent((e as Error).message), request.url)
    );
  }
}