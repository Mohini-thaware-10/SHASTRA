import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server-client";

export async function POST(request: Request) {
  try {
    const { teacherId } = await request.json();

    // Approve teacher - promote pending_teacher to teacher
    const { data } = await supabaseServer
      .from("profiles")
      .update({ 
        account_role: "teacher",
        account_status: "active",
      })
      .eq("id", teacherId)
      .eq("account_role", "pending_teacher")
      .select()
      .single();

    if (!data) {
      return NextResponse.json(
        { error: "Teacher record not found or already approved" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      profile: data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}