"use client";

import { supabase } from "@/app/lib/supabase/client";
import type { OpenPackResult } from "@/app/lib/database.types";
import { getMonsterImageUrl } from "@/app/lib/supabase/storage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PackOpeningAnimation } from "./pack-opening-animation";

type PackPurchaseButtonProps = {
  packTypeCode: string;
};

/** Precarga una imagen en el navegador */
function preloadImage(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve(); // No fallar si una imagen no carga
    img.src = url;
  });
}

export function PackPurchaseButton({ packTypeCode }: PackPurchaseButtonProps) {
  const router = useRouter();
  const [isOpening, setIsOpening] = useState(false);
  const [isPreloading, setIsPreloading] = useState(false);
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

    const packResult = data as OpenPackResult;

    // Precargar todas las imágenes de los monstruos antes de mostrar la animación
    setIsPreloading(true);
    const imageUrls = packResult.monsters
      .map((m) => getMonsterImageUrl(m.image_path))
      .filter(Boolean);

    await Promise.all(imageUrls.map(preloadImage));
    setIsPreloading(false);

    setResult(packResult);
  };

  const handleCloseAnimation = () => {
    setResult(null);
    router.refresh();
  };

  const isLoading = isOpening || isPreloading;

  return (
    <div className="mt-5 space-y-4">
      <button
        className="w-full rounded-lg bg-orange-500 px-4 py-3 text-sm font-bold text-zinc-950 shadow-sm transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
        disabled={isLoading}
        onClick={openPack}
        type="button"
      >
        {isOpening ? "Abriendo sobre..." : isPreloading ? "Cargando..." : "Comprar sobre"}
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
