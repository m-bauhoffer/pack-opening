import { requireCurrentUser } from "@/app/lib/auth";
import { createSupabaseServerClient } from "@/app/lib/supabase/server";

export function isPackTypePremium(packTypeCode: string): boolean {
  return packTypeCode === "premium";
}

export async function getDashboardData() {
  const user = await requireCurrentUser();
  const supabase = await createSupabaseServerClient();

  const [profileResult, packTypesResult] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, gold, created_at")
      .eq("id", user.id)
      .single(),
    supabase
      .from("pack_types")
      .select("id, code, name, price")
      .order("price", { ascending: true }),
  ]);

  return {
    user,
    profile: profileResult.data,
    packTypes: packTypesResult.data ?? [],
    error: profileResult.error?.message ?? packTypesResult.error?.message ?? null,
  };
}
