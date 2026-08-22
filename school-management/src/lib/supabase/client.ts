"use client";

import { createClient } from "@supabase/supabase-js";

export function getSupabaseBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    throw new Error("Supabase URL or anon key is missing.");
  }

  return createClient(supabaseUrl, anonKey);
}