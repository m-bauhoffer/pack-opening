"use client";

import type { Monster } from "@/app/lib/database.types";
import { getMonsterImageUrl } from "@/app/lib/supabase/storage";
import { getMonsterProgress } from "@/app/lib/progress";

export interface CardMonsterData {
  id: string;
  name: string;
  rarity: Monster["rarity"];
  monster_type: Monster["monster_type"];
  base_power: number;
  image_path: string;
  level: number;
  quantity: number;
  quantityBefore?: number;
  quantityAfter?: number;
  showCopiesBar?: boolean;
  statusBadge?: string | null;
  isNew?: boolean;
  isDuplicate?: boolean;
  convertedToGold?: boolean;
  bonusGold?: number;
}

type MonsterCardProps = {
  monster: CardMonsterData;
};

const rarityStyles: Record<
  string,
  {
    border: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    gradient: string;
  }
> = {
  common: {
    border: "border-zinc-600",
    badgeBg: "bg-zinc-900",
    badgeText: "text-zinc-300",
    badgeBorder: "border-zinc-600",
    gradient: "from-zinc-800 via-zinc-900 to-zinc-950",
  },
  rare: {
    border: "border-sky-600",
    badgeBg: "bg-sky-950",
    badgeText: "text-sky-300",
    badgeBorder: "border-sky-600",
    gradient: "from-sky-800 via-sky-950 to-slate-950",
  },
  epic: {
    border: "border-violet-600",
    badgeBg: "bg-violet-950",
    badgeText: "text-violet-300",
    badgeBorder: "border-violet-600",
    gradient: "from-violet-800 via-violet-950 to-zinc-950",
  },
  legendary: {
    border: "border-amber-500",
    badgeBg: "bg-amber-950",
    badgeText: "text-amber-300",
    badgeBorder: "border-amber-500",
    gradient: "from-amber-700 via-amber-950 to-zinc-950",
  },
  mythic: {
    border: "border-rose-500",
    badgeBg: "bg-rose-950",
    badgeText: "text-rose-300",
    badgeBorder: "border-rose-500",
    gradient: "from-rose-700 via-rose-950 to-zinc-950",
  },
};

export function MonsterCard({ monster }: MonsterCardProps) {
  const styles = rarityStyles[monster.rarity] ?? rarityStyles.common;
  const imageUrl = getMonsterImageUrl(monster.image_path);
  const showCopies = monster.showCopiesBar ?? true;

  // Use the real level threshold logic from collection.ts
  const quantity = monster.quantityAfter ?? monster.quantity;
  const progress = getMonsterProgress(quantity);
  const copiesLabel = progress.nextLevel
    ? `${quantity} / ${progress.nextLevelRequiredCopies}`
    : "Nivel maximo";
  const copiesProgress = progress.progressPercent;

  return (
    <div>
      {/* Carta */}
      <div
        className="aspect-[3/4] w-full rounded-xl border-2 shadow-xl relative overflow-hidden"
        style={{
          borderColor: styles.border.replace("border-", ""),
        }}
      >
        {/* Overlay oscuro para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />

        {/* Tinte de rareza */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} opacity-20`}
        />

        {/* Imagen de fondo */}
        {imageUrl && (
          <img
            alt={monster.name}
            className="absolute inset-0 h-full w-full object-contain opacity-100"
            src={imageUrl}
          />
        )}

        {/* Contenido de la carta */}
        <div className="relative flex h-full flex-col p-5">
          {/* Fila superior: rareza a la izquierda, nivel a la derecha */}
          <div className="flex items-start justify-between">
            {/* Rareza badge - arriba a la izquierda */}
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] backdrop-blur-md ${styles.badgeBorder} ${styles.badgeBg} ${styles.badgeText}`}
            >
              {monster.rarity}
            </span>

            {/* Nivel */}
            <span className="inline-flex items-top gap-1.5 rounded-lg border border-zinc-500 bg-zinc-800 px-3 py-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-400">
                Lvl.
              </span>
              <span className="text-lg font-black text-zinc-50 leading-1 ">
                {monster.level}
              </span>
            </span>
          </div>

          {/* Spacer empuja nombre + copias hacia abajo */}
          <div className="flex-1" />

          {/* Grupo inferior: nombre pegado a barra de copias */}
          <div className="text-center">
            <h3 className="text-xl font-black text-zinc-50 leading-tight [text-shadow:0_2px_8px_rgba(0,0,0,0.8)]">
              {monster.name}
            </h3>
            <p className="text-xs capitalize text-zinc-300 [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]">
              {monster.monster_type} · Poder {monster.base_power}
            </p>
          </div>

          {/* Barra de copias */}
          {showCopies && (
            <div className="mt-1 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-300">Copias</span>
                <span className="text-zinc-400">{copiesLabel}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full border border-zinc-600 bg-black/60">
                <div
                  className="h-full animate-bar-fill rounded-full bg-orange-500"
                  style={{
                    width: `${copiesProgress}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tags debajo de la carta, centrados */}
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {monster.isNew && (
          <span className="rounded-full bg-green-900/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-green-300 backdrop-blur-md">
            ✦ Nuevo
          </span>
        )}
        {monster.isDuplicate && (
          <span className="rounded-full bg-blue-900/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-blue-300 backdrop-blur-md">
            Duplicado
          </span>
        )}
        {monster.convertedToGold && (
          <span className="rounded-full bg-amber-900/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-amber-300 backdrop-blur-md">
            +{monster.bonusGold} oro
          </span>
        )}
        {/* {monster.statusBadge && (
          <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-zinc-400 backdrop-blur-md">
            {monster.statusBadge}
          </span>
        )} */}
      </div>
    </div>
  );
}