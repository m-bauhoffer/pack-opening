"use client";

import { supabase } from "@/app/lib/supabase/client";
import type { OpenPackResult } from "@/app/lib/database.types";
import { useRouter } from "next/navigation";
import { useState } from "react";

type PackPurchaseButtonProps = {
  packTypeCode: string;
};

const rarityStyles = {
  common: "bg-zinc-100 text-zinc-700",
  rare: "bg-sky-100 text-sky-700",
  epic: "bg-violet-100 text-violet-700",
  legendary: "bg-amber-100 text-amber-800",
  mythic: "bg-rose-100 text-rose-700",
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
        className="w-full rounded-lg bg-emerald-400 px-4 py-3 text-sm font-bold text-zinc-950 shadow-sm transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-500"
        disabled={isOpening}
        onClick={openPack}
        type="button"
      >
        {isOpening ? "Abriendo sobre..." : "Comprar sobre"}
      </button>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {result ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
          <div className="flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="font-black text-emerald-950">
              {result.pack_type.name} abierto
            </p>
            <p className="font-semibold text-emerald-800">
              Oro: {result.gold_before} - {result.gold_after}
            </p>
          </div>

          <div className="mt-3 grid gap-2">
            {result.monsters.map((monster, index) => (
              <div
                className="rounded-lg border border-white/80 bg-white px-3 py-2"
                key={`${monster.id}-${index}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-bold text-zinc-950">{monster.name}</p>
                    <p className="text-xs capitalize text-zinc-600">
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
                <p className="mt-1 text-xs text-zinc-600">
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
