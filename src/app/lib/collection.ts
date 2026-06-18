import { requireCurrentUser } from "@/app/lib/auth";
import { createSupabaseServerClient } from "@/app/lib/supabase/server";
import type { Monster, UserMonster } from "@/app/lib/database.types";

const levelThresholds = [
  { level: 1, requiredCopies: 1 },
  { level: 2, requiredCopies: 5 },
  { level: 3, requiredCopies: 10 },
  { level: 4, requiredCopies: 20 },
  { level: 5, requiredCopies: 50 },
] as const;

type UserMonsterWithMonster = UserMonster & {
  monsters: Monster | null;
};

export type CollectionMonster = {
  id: string;
  quantity: number;
  level: number;
  currentLevelRequiredCopies: number;
  nextLevel: number | null;
  nextLevelRequiredCopies: number | null;
  progressLabel: string;
  progressPercent: number;
  monster: Monster;
};

export async function getCollectionData() {
  const user = await requireCurrentUser();
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("user_monsters")
    .select(
      `
        id,
        user_id,
        monster_id,
        quantity,
        monsters (
          id,
          name,
          rarity,
          monster_type,
          base_power,
          image_path,
          created_at
        )
      `
    )
    .eq("user_id", user.id)
    .order("quantity", { ascending: false })
    .returns<UserMonsterWithMonster[]>();

  return {
    user,
    collection: (data ?? [])
      .filter((item): item is UserMonsterWithMonster & { monsters: Monster } =>
        Boolean(item.monsters)
      )
      .map(mapCollectionMonster),
    error: error?.message ?? null,
  };
}

function mapCollectionMonster(item: UserMonsterWithMonster & { monsters: Monster }) {
  const progress = getMonsterProgress(item.quantity);

  return {
    id: item.id,
    quantity: item.quantity,
    monster: item.monsters,
    ...progress,
  };
}

export function getMonsterProgress(quantity: number) {
  const currentLevel =
    [...levelThresholds].reverse().find((threshold) => quantity >= threshold.requiredCopies) ??
    levelThresholds[0];
  const nextLevel = levelThresholds.find(
    (threshold) => threshold.level === currentLevel.level + 1
  );

  if (!nextLevel) {
    return {
      level: currentLevel.level,
      currentLevelRequiredCopies: currentLevel.requiredCopies,
      nextLevel: null,
      nextLevelRequiredCopies: null,
      progressLabel: "Nivel maximo",
      progressPercent: 100,
    };
  }

  return {
    level: currentLevel.level,
    currentLevelRequiredCopies: currentLevel.requiredCopies,
    nextLevel: nextLevel.level,
    nextLevelRequiredCopies: nextLevel.requiredCopies,
    progressLabel: `${quantity} / ${nextLevel.requiredCopies} hacia nivel ${nextLevel.level}`,
    progressPercent: Math.min((quantity / nextLevel.requiredCopies) * 100, 100),
  };
}
