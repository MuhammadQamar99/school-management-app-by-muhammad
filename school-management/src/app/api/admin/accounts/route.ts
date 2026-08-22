import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

type UserRole = "admin" | "teacher" | "student" | "parent";

const allowedRoles: UserRole[] = ["admin", "teacher", "student", "parent"];

export const dynamic = "force-dynamic";

function jsonError(message: string, status = 400) {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status }
  );
}

async function requireAdmin(request: NextRequest) {
  const supabase = getSupabaseAdminClient();

  const authHeader = request.headers.get("authorization");

  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.replace("Bearer ", "")
    : null;

  if (!token) {
    return {
      error: jsonError("Unauthorized. Login required.", 401),
      userId: null,
    };
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser(token);

  if (userError || !user) {
    return {
      error: jsonError("Invalid or expired session.", 401),
      userId: null,
    };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || profile?.role !== "admin") {
    return {
      error: jsonError("Only admin can manage accounts.", 403),
      userId: null,
    };
  }

  return {
    error: null,
    userId: user.id,
  };
}

export async function GET(request: NextRequest) {
  const adminCheck = await requireAdmin(request);

  if (adminCheck.error) {
    return adminCheck.error;
  }

  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, email, role, class_section, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return jsonError(error.message, 500);
  }

  return NextResponse.json({
    success: true,
    accounts: data,
  });
}

export async function POST(request: NextRequest) {
  const adminCheck = await requireAdmin(request);

  if (adminCheck.error) {
    return adminCheck.error;
  }

  const body = await request.json();

  const fullName = String(body.fullName || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  const role = String(body.role || "") as UserRole;
  const classSection = body.classSection
    ? String(body.classSection).trim()
    : null;

  if (!fullName) {
    return jsonError("Full name is required.");
  }

  if (!email || !email.includes("@")) {
    return jsonError("Valid email is required.");
  }

  if (!password || password.length < 6) {
    return jsonError("Password must be at least 6 characters.");
  }

  if (!allowedRoles.includes(role)) {
    return jsonError("Invalid role selected.");
  }

  const supabase = getSupabaseAdminClient();

  const { data: createdUser, error: createUserError } =
    await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
        role,
      },
    });

  if (createUserError || !createdUser.user) {
    return jsonError(
      createUserError?.message || "User could not be created.",
      500
    );
  }

  const userId = createdUser.user.id;

  const { error: profileError } = await supabase.from("profiles").insert({
    id: userId,
    full_name: fullName,
    email,
    role,
    class_section: classSection,
  });

  if (profileError) {
    await supabase.auth.admin.deleteUser(userId);

    return jsonError(
      `User was created but profile failed: ${profileError.message}`,
      500
    );
  }

  return NextResponse.json({
    success: true,
    account: {
      id: userId,
      fullName,
      email,
      role,
      classSection,
    },
  });
}

export async function DELETE(request: NextRequest) {
  const adminCheck = await requireAdmin(request);

  if (adminCheck.error) {
    return adminCheck.error;
  }

  const userId = request.nextUrl.searchParams.get("id");

  if (!userId) {
    return jsonError("User id is required.");
  }

  if (userId === adminCheck.userId) {
    return jsonError("Admin cannot delete their own account.", 400);
  }

  const supabase = getSupabaseAdminClient();

  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    return jsonError(error.message, 500);
  }

  return NextResponse.json({
    success: true,
  });
}