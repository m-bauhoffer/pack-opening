import { requireCurrentUser } from "@/app/lib/auth";
import { createSupabaseServerClient } from "@/app/lib/supabase/server";
import { isPackTypePremium } from "@/app/lib/dashboard";
import type {
  Monster,
  Pack,
  PackMonster,
  PackType,
} from "@/app/lib/database.types";

type PackMonsterWithMonster = PackMonster & {
  monsters: Monster | null;
};

type PackWithDetails = Pack & {
  pack_types: PackType | null;
  pack_monsters: PackMonsterWithMonster[];
};

export type RecordPack = {
  id: string;
  goldSpent: number;
  createdAt: string;
  packType: PackType | null;
  monsters: Monster[];
};

export type RecordData = {
  packs: RecordPack[];
  totalGoldSpent: number;
  commonPacks: number;
  premiumPacks: number;
  error: string | null;
};

export async function getRecordData() {
  const user = await requireCurrentUser();
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("packs")
    .select(
      `
        id,
        user_id,
        pack_type_id,
        gold_spent,
        created_at,
        pack_types (
          id,
          code,
          name,
          price
        ),
        pack_monsters (
          id,
          pack_id,
          monster_id,
          monsters (
            id,
            name,
            rarity,
            monster_type,
            base_power,
            image_path,
            created_at
          )
        )
      `
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .returns<PackWithDetails[]>();

  const packs = (data ?? []).map(mapRecordPack);

  const commonPacks = packs.filter(
    (pack) => !isPackTypePremium(pack.packType?.code ?? "")
  ).length;
  const premiumPacks = packs.filter(
    (pack) => isPackTypePremium(pack.packType?.code ?? "")
  ).length;

  return {
    user,
    packs,
    totalGoldSpent: packs.reduce((total, pack) => total + pack.goldSpent, 0),
    commonPacks,
    premiumPacks,
    error: error?.message ?? null,
  };
}

function mapRecordPack(pack: PackWithDetails): RecordPack {
  return {
    id: pack.id,
    goldSpent: pack.gold_spent,
    createdAt: pack.created_at,
    packType: pack.pack_types,
    monsters: pack.pack_monsters
      .map((item) => item.monsters)
      .filter((monster): monster is Monster => Boolean(monster)),
  };
}
