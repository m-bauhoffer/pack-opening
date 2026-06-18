"use client";

import { supabase } from "@/app/lib/supabase/client";
import type { OpenPackResult } from "@/app/lib/database.types";
import { useRouter } from "next/navigation";
import { useState } from "react";

type PackPurchaseButtonProps = {
  packTypeCode: string;
};

const rarityStyles = {
  common: "bg-zinc-800 text-zinc-300",
  rare: "bg-sky-900 text-sky-300",
  epic: "bg-violet-900 text-violet-300",
  legendary: "bg-amber-900 text-amber-300",
  mythic: "bg-rose-900 text-rose-300",
};

export function PackPurchaseButton({ packTypeCode }: PackPurchaseButtonProps) {
  const router = useRouter();
  const [isOpening, setIsOpening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<OpenPackResult | null>(null);

  const openPack = async () => {
    setIsOpening(true);
    setError(null);
    setResult(null);

    const { data, error: rpcError } = await supabase.rpc("open_pack", {
      pack_type_code: packTypeCode,
    });

    setIsOpening(false);

    if (rpcError) {
      setError(rpcError.message);
      return;
    }

    setResult(data as OpenPackResult);
    router.refresh();
  };

  return (
    <div className="mt-5 space-y-4">
      <button
        className="w-full rounded-lg bg-orange-500 px-4 py-3 text-sm font-bold text-zinc-950 shadow-sm transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
        disabled={isOpening}
        onClick={openPack}
        type="button"
      >
        {isOpening ? "Abriendo sobre..." : "Comprar sobre"}
      </button>

      {error ? (
        <div className="rounded-lg border border-red-900 bg-red-950 px-3 py-2 text-sm text-red-400">
          {error}
        </div>
      ) : null}

      {result ? (
        <div className="rounded-lg border border-orange-900 bg-gray-900 p-3">
          <div className="flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="font-black text-orange-300">
              {result.pack_type.name} abierto
            </p>
            <p className="font-semibold text-orange-400">
              Oro: {result.gold_before} - {result.gold_after}
            </p>
          </div>

          <div className="mt-3 grid gap-2">
            {result.monsters.map((monster, index) => (
              <div
                className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2"
                key={`${monster.id}-${index}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-bold text-zinc-50">{monster.name}</p>
                    <p className="text-xs capitalize text-zinc-400">
                      {monster.monster_type} - Nivel {monster.level_after}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-bold uppercase tracking-[0.14em] ${
                      rarityStyles[monster.rarity]
                    }`}
                  >
                    {monster.rarity}
                  </span>
                </div>
                <p className="mt-1 text-xs text-zinc-400">
                  Copias: {monster.quantity_before} - {monster.quantity_after}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
