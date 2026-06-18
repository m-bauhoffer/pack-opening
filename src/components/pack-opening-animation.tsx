"use client";

import type { OpenPackResult } from "@/app/lib/database.types";
import { useCallback, useEffect, useRef, useState } from "react";

type PackOpeningAnimationProps = {
  result: OpenPackResult;
  onClose: () => void;
};

const rarityCardStyles: Record<
  string,
  { border: string; bg: string; text: string; gradient: string }
> = {
  common: {
    border: "border-zinc-600",
    bg: "bg-zinc-900",
    text: "text-zinc-300",
    gradient: "from-zinc-800 via-zinc-900 to-zinc-950",
  },
  rare: {
    border: "border-sky-600",
    bg: "bg-sky-950",
    text: "text-sky-300",
    gradient: "from-sky-800 via-sky-950 to-slate-950",
  },
  epic: {
    border: "border-violet-600",
    bg: "bg-violet-950",
    text: "text-violet-300",
    gradient: "from-violet-800 via-violet-950 to-zinc-950",
  },
  legendary: {
    border: "border-amber-500",
    bg: "bg-amber-950",
    text: "text-amber-300",
    gradient: "from-amber-700 via-amber-950 to-zinc-950",
  },
  mythic: {
    border: "border-rose-500",
    bg: "bg-rose-950",
    text: "text-rose-300",
    gradient: "from-rose-700 via-rose-950 to-zinc-950",
  },
};

export function PackOpeningAnimation({ result, onClose }: PackOpeningAnimationProps) {
  const [phase, setPhase] = useState<"pack-name" | "cards" | "done">("pack-name");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [cardState, setCardState] = useState<"hidden" | "back" | "revealed">("hidden");
  const isNavigating = useRef(false);

  // Fase 1: mostrar nombre del pack
  useEffect(() => {
    const t = setTimeout(() => {
      setPhase("cards");
      setCardState("back");
      // Revelar la primera carta después de mostrar el dorso
      setTimeout(() => setCardState("revealed"), 600);
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  const revealCard = useCallback(() => {
    setCardState("revealed");
  }, []);

  const goToNextCard = useCallback(() => {
    if (isNavigating.current) return;
    isNavigating.current = true;

    if (currentCardIndex < result.monsters.length - 1) {
      // Ocultar carta actual
      setCardState("hidden");
      // Cambiar índice mientras está oculta
      setTimeout(() => {
        setCurrentCardIndex((prev) => prev + 1);
        // Mostrar inmediatamente revelada sin pasar por dorso
        setCardState("revealed");
        isNavigating.current = false;
      }, 200);
    } else {
      setPhase("done");
      isNavigating.current = false;
    }
  }, [currentCardIndex, result.monsters.length]);

  const goToPrevCard = useCallback(() => {
    if (isNavigating.current) return;
    isNavigating.current = true;

    if (currentCardIndex > 0) {
      setCardState("hidden");
      setTimeout(() => {
        setCurrentCardIndex((prev) => prev - 1);
        setCardState("revealed");
        isNavigating.current = false;
      }, 200);
    }
  }, [currentCardIndex]);

  const monster = result.monsters[currentCardIndex];
  const styles = monster ? rarityCardStyles[monster.rarity] ?? rarityCardStyles.common : rarityCardStyles.common;
  const isNew = monster?.quantity_before === 0;
  const isDuplicate = monster && monster.quantity_before > 0 && !monster.converted_to_gold;
  const converted = monster?.converted_to_gold;
  const total = result.monsters.length;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
      {/* Header superior con botón cerrar y contador */}
      <div className="absolute left-0 right-0 top-0 flex items-center justify-between px-4 py-4">
        <button
          className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs font-bold text-zinc-400 transition hover:border-zinc-500 hover:text-zinc-50"
          onClick={onClose}
          type="button"
        >
          ✕ Cerrar
        </button>

        {phase === "cards" && (
          <span className="text-xs font-bold text-zinc-500">
            {currentCardIndex + 1} / {total}
          </span>
        )}
      </div>

      {/* Fase 1: Nombre del pack */}
      {phase === "pack-name" && (
        <div className="animate-fade-in text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-orange-500">
            Pack abierto
          </p>
          <h2 className="mt-3 animate-slide-up text-3xl font-black text-zinc-50 sm:text-4xl">
            {result.pack_type.name}
          </h2>
          <p className="mt-2 animate-slide-up text-sm text-zinc-400" style={{ animationDelay: "0.15s" }}>
            Oro: {result.gold_before.toLocaleString()} → {result.gold_after.toLocaleString()}
          </p>
        </div>
      )}

      {/* Fase 2: Carta individual */}
      {phase === "cards" && monster && (
        <div className="flex w-full max-w-md flex-col items-center px-4">
          {/* Navegación y contador */}
          <div className="mb-3 flex w-full items-center justify-between">
            <button
              className={`rounded-lg border px-3 py-2 text-xs font-bold transition ${
                currentCardIndex > 0
                  ? "border-zinc-600 text-zinc-300 hover:border-zinc-400 hover:text-zinc-50"
                  : "border-transparent text-zinc-700"
              }`}
              disabled={currentCardIndex === 0}
              onClick={goToPrevCard}
              type="button"
            >
              ← Anterior
            </button>

            <div className="flex gap-1.5">
              {result.monsters.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 w-6 rounded-full transition-all duration-300 ${
                    i === currentCardIndex ? "bg-orange-500" : "bg-zinc-700"
                  }`}
                />
              ))}
            </div>

            {currentCardIndex < total - 1 ? (
              <button
                className="rounded-lg border border-zinc-600 px-3 py-2 text-xs font-bold text-zinc-300 transition hover:border-zinc-400 hover:text-zinc-50"
                onClick={goToNextCard}
                type="button"
              >
                Siguiente →
              </button>
            ) : (
              <button
                className="rounded-lg border border-orange-600 bg-orange-600 px-3 py-2 text-xs font-bold text-zinc-950 transition hover:bg-orange-500"
                onClick={goToNextCard}
                type="button"
              >
                Finalizar
              </button>
            )}
          </div>

          {/* Carta */}
          <div className="w-full max-w-sm">
            <div
              className={`overflow-hidden rounded-xl transition-all duration-300 ${
                cardState === "hidden" ? "scale-95 opacity-0" : "scale-100 opacity-100"
              }`}
              key={currentCardIndex}
            >
              {/* Dorso (solo la primera vez que se abre el pack) */}
              {cardState === "back" && (
                <div className="aspect-[3/4] w-full animate-slide-up rounded-xl border-2 border-zinc-700 bg-gradient-to-br from-zinc-800 to-zinc-950 shadow-lg">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <div className="mx-auto h-14 w-14 animate-pulse rounded-full border-2 border-orange-500/50" />
                      <p className="mt-3 text-sm font-bold uppercase tracking-[0.2em] text-zinc-500">
                        ???
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Cara frontal (revelada inmediatamente al navegar) */}
              {cardState === "revealed" && (
                <div className="aspect-[3/4] w-full animate-card-reveal rounded-xl border-2 shadow-xl"
                  style={{
                    borderColor: styles.border.replace("border-", ""),
                  }}
                >
                  <div className={`h-full w-full rounded-xl bg-gradient-to-br ${styles.gradient} p-5`}>
                    <div className="flex h-full flex-col justify-between">
                      {/* Rareza badge + nivel */}
                      <div className="flex items-start justify-between">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${styles.border} ${styles.bg} ${styles.text}`}
                        >
                          {monster.rarity}
                        </span>
                        <span className="rounded-lg bg-black/40 px-3 py-1.5 text-center">
                          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-500">
                            Nvl
                          </p>
                          <p className="text-xl font-black text-zinc-50">
                            {monster.level_after}
                          </p>
                        </span>
                      </div>

                      {/* Espacio central */}
                      <div className="text-center">
                        <h3 className="text-2xl font-black text-zinc-50">
                          {monster.name}
                        </h3>
                        <p className="mt-1 text-sm capitalize text-zinc-400">
                          {monster.monster_type} · Poder {monster.base_power}
                        </p>
                      </div>

                      {/* Tags + barra copias */}
                      <div className="space-y-3">
                        <div className="flex flex-wrap justify-center gap-2">
                          {isNew && (
                            <span className="rounded-full bg-green-900/60 px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-green-400">
                              ✦ Nuevo
                            </span>
                          )}
                          {isDuplicate && (
                            <span className="rounded-full bg-blue-900/60 px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-blue-400">
                              Duplicado
                            </span>
                          )}
                          {converted && (
                            <span className="rounded-full bg-amber-900/60 px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-amber-400">
                              +{monster.bonus_gold} oro
                            </span>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-zinc-400">Copias</span>
                            <span className="text-zinc-500">
                              {monster.quantity_before} → {monster.quantity_after}
                            </span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-black/40">
                            <div
                              className="h-full animate-bar-fill rounded-full bg-orange-500"
                              style={{
                                width: `${Math.min((monster.quantity_after / 10) * 100, 100)}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Fase 3: Todo revelado, pantalla de cierre */}
      {phase === "done" && (
        <div className="animate-fade-in text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-900/50">
            <span className="text-3xl">✓</span>
          </div>
          <h2 className="text-2xl font-black text-zinc-50">¡Todos revelados!</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Has abierto {total} {total === 1 ? "carta" : "cartas"} de {result.pack_type.name}.
          </p>
          <button
            className="mt-6 rounded-lg bg-orange-500 px-6 py-3 text-sm font-bold text-zinc-950 transition hover:bg-orange-400"
            onClick={onClose}
            type="button"
          >
            Volver al dashboard
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes card-reveal {
          0% { opacity: 0; transform: scale(0.8) rotateY(-10deg); }
          100% { opacity: 1; transform: scale(1) rotateY(0deg); }
        }
        @keyframes bar-fill {
          from { width: 0%; }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .animate-slide-up {
          opacity: 0;
          animation: slide-up 0.5s ease-out forwards;
        }
        .animate-card-reveal {
          animation: card-reveal 0.5s ease-out forwards;
        }
        .animate-bar-fill {
          animation: bar-fill 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}