import { requireCurrentUser } from "@/app/lib/auth";
import { createSupabaseServerClient } from "@/app/lib/supabase/server";

export function isPackTypePremium(packTypeCode: string): boolean {
  const premiumCodes = ["premium", "legendary", "mythic", "vip"];
  return premiumCodes.some((code) => packTypeCode.toLowerCase().includes(code));
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
