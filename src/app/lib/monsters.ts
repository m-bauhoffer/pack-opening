import { createSupabaseServerClient } from "@/app/lib/supabase/server";

export type Monster = {
  id: string | number;
  name: string;
  image_url?: string | null;
  rarity?: string | null;
  type?: string | null;
};

export async function getAuthenticatedMonsters() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      user: null,
      monsters: [] as Monster[],
      error: userError?.message ?? null,
    };
  }

  const { data, error } = await supabase
    .from("monsters")
    .select("*")
    .order("name", { ascending: true })
    .returns<Monster[]>();

  return {
    user,
    monsters: data ?? [],
    error: error?.message ?? null,
  };
}
