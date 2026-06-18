"use client";

import { supabase } from "@/app/lib/supabase/client";
import type { OpenPackResult } from "@/app/lib/database.types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PackOpeningAnimation } from "./pack-opening-animation";

type PackPurchaseButtonProps = {
  packTypeCode: string;
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
  };

  const handleCloseAnimation = () => {
    setResult(null);
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
        <PackOpeningAnimation result={result} onClose={handleCloseAnimation} />
      ) : null}
    </div>
  );
}
