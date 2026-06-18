"use client";

import type { CollectionMonster } from "@/app/lib/collection";
import type { Monster } from "@/app/lib/database.types";
import { useMemo, useState } from "react";
import { MonsterCard } from "./monster-card";

type SortKey = "rarity" | "level" | "power";
type SortDirection = "asc" | "desc";

type CollectionPageClientProps = {
  collection: CollectionMonster[];
  error: string | null;
};

const rarityOrder: Monster["rarity"][] = [
  "common",
  "rare",
  "epic",
  "legendary",
  "mythic",
];

const rarityActiveStyles: Record<Monster["rarity"], string> = {
  common: "border-zinc-600 bg-zinc-900 text-zinc-300",
  rare: "border-sky-600 bg-sky-950 text-sky-300",
  epic: "border-violet-600 bg-violet-950 text-violet-300",
  legendary: "border-amber-500 bg-amber-950 text-amber-300",
  mythic: "border-rose-500 bg-rose-950 text-rose-300",
};

const sortOptions: Array<{ key: SortKey; direction: SortDirection; label: string }> = [
  { key: "rarity", direction: "asc", label: "Rareza asc" },
  { key: "rarity", direction: "desc", label: "Rareza desc" },
  { key: "level", direction: "asc", label: "Nivel asc" },
  { key: "level", direction: "desc", label: "Nivel desc" },
  { key: "power", direction: "asc", label: "Poder asc" },
  { key: "power", direction: "desc", label: "Poder desc" },
];

export function CollectionPageClient({ collection, error = null }: CollectionPageClientProps) {
  const [search, setSearch] = useState("");
  const [selectedRarities, setSelectedRarities] = useState<Monster["rarity"][]>([]);
  const [selectedLevels, setSelectedLevels] = useState<number[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<Monster["monster_type"][]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("rarity");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [showFilters, setShowFilters] = useState(false);

  const availableTypes = useMemo(
    () =>
      Array.from(new Set(collection.map((item) => item.monster.monster_type))).sort(),
    [collection]
  );

  const visibleCollection = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return collection
      .filter((item) => {
        const matchesName = item.monster.name
          .toLowerCase()
          .includes(normalizedSearch);
        const matchesRarity =
          selectedRarities.length === 0 ||
          selectedRarities.includes(item.monster.rarity);
        const matchesLevel =
          selectedLevels.length === 0 || selectedLevels.includes(item.level);
        const matchesType =
          selectedTypes.length === 0 ||
          selectedTypes.includes(item.monster.monster_type);

        return matchesName && matchesRarity && matchesLevel && matchesType;
      })
      .sort((first, second) => {
        const direction = sortDirection === "asc" ? 1 : -1;

        if (sortKey === "rarity") {
          return (
            (rarityOrder.indexOf(first.monster.rarity) -
              rarityOrder.indexOf(second.monster.rarity)) *
            direction
          );
        }

        if (sortKey === "level") {
          return (first.level - second.level) * direction;
        }

        return (first.monster.base_power - second.monster.base_power) * direction;
      });
  }, [
    collection,
    search,
    selectedLevels,
    selectedRarities,
    selectedTypes,
    sortDirection,
    sortKey,
  ]);

  const resetFilters = () => {
    setSearch("");
    setSelectedRarities([]);
    setSelectedLevels([]);
    setSelectedTypes([]);
    setSortKey("rarity");
    setSortDirection("asc");
  };

  const hasActiveFilters =
    selectedRarities.length > 0 ||
    selectedLevels.length > 0 ||
    selectedTypes.length > 0 ||
    search.trim().length > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black">Colección</h1>
          <p className="mt-2 max-w-2xl text-zinc-400">
            Monstruos obtenidos, nivel actual y progreso hacia el siguiente nivel.
          </p>
        </div>
        {collection.length > 0 && (
          <button
            className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-bold text-zinc-300 transition hover:bg-zinc-700"
            onClick={() => setShowFilters((prev) => !prev)}
            type="button"
          >
            <svg
              className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            Filtros
            {hasActiveFilters && (
              <span className="ml-1 rounded-full bg-orange-600 px-2 py-0.5 text-xs text-zinc-950">
                Activos
              </span>
            )}
          </button>
        )}
      </div>

      {error ? (
        <div className="rounded-lg border border-red-900 bg-red-950 px-4 py-3 text-sm text-red-400">
          No se pudo cargar la coleccion: {error}
        </div>
      ) : null}

      {!error && collection.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-700 bg-zinc-900 px-6 py-12 text-center">
          <h2 className="text-xl font-bold">Todavia no tenes monstruos</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Cuando abras sobres, tus monstruos apareceran en esta pantalla.
          </p>
        </div>
      ) : null}

      {showFilters && collection.length > 0 && (
        <section className="rounded-lg border border-zinc-700 bg-zinc-900 p-5 shadow-sm">
          <div className="grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-bold text-zinc-300">Buscar por nombre</span>
              <input
                className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-50 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Ej: dragon, wolf, lich"
                type="search"
                value={search}
              />
            </label>

            <FilterGroup title="Rareza">
              {rarityOrder.map((rarity) => (
                <ToggleButton
                  activeStyle={rarityActiveStyles[rarity]}
                  isActive={selectedRarities.includes(rarity)}
                  key={rarity}
                  label={rarity}
                  onClick={() => toggleValue(rarity, selectedRarities, setSelectedRarities)}
                />
              ))}
            </FilterGroup>

            <FilterGroup title="Nivel">
              {[1, 2, 3, 4, 5].map((level) => (
                <ToggleButton
                  isActive={selectedLevels.includes(level)}
                  key={level}
                  label={`Nivel ${level}`}
                  onClick={() => toggleValue(level, selectedLevels, setSelectedLevels)}
                />
              ))}
            </FilterGroup>

            <FilterGroup title="Monster type">
              {availableTypes.map((monsterType) => (
                <ToggleButton
                  isActive={selectedTypes.includes(monsterType)}
                  key={monsterType}
                  label={monsterType}
                  onClick={() => toggleValue(monsterType, selectedTypes, setSelectedTypes)}
                />
              ))}
            </FilterGroup>

            <label className="grid gap-2">
              <span className="text-sm font-bold text-zinc-300">Ordenar por</span>
              <select
                className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm font-semibold text-zinc-50 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                onChange={(event) => {
                  const [nextSortKey, nextSortDirection] = event.target.value.split(
                    ":"
                  ) as [SortKey, SortDirection];

                  setSortKey(nextSortKey);
                  setSortDirection(nextSortDirection);
                }}
                value={`${sortKey}:${sortDirection}`}
              >
                {sortOptions.map((option) => (
                  <option
                    key={`${option.key}:${option.direction}`}
                    value={`${option.key}:${option.direction}`}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>
      )}

      {hasActiveFilters && collection.length > 0 && (
        <div className="flex justify-end">
          <button
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-bold text-zinc-300 transition hover:bg-zinc-700"
            onClick={resetFilters}
            type="button"
          >
            Limpiar filtros
          </button>
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-zinc-400">
          Mostrando {visibleCollection.length} de {collection.length}
        </p>
      </div>

      {visibleCollection.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-700 bg-zinc-900 px-6 py-12 text-center">
          <h2 className="text-xl font-bold">No hay resultados</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Ajusta la busqueda o limpia los filtros para ver mas monstruos.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleCollection.map((item) => (
            <MonsterCard
              key={item.id}
              monster={{
                id: item.monster.id,
                name: item.monster.name,
                rarity: item.monster.rarity,
                monster_type: item.monster.monster_type,
                base_power: item.monster.base_power,
                image_path: item.monster.image_path,
                level: item.level,
                quantity: item.quantity,
                showCopiesBar: true,
                statusBadge: item.nextLevel ? `${item.quantity} / ${item.nextLevelRequiredCopies}` : "Nivel maximo",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterGroup({
  children,
  title,
}: Readonly<{
  children: React.ReactNode;
  title: string;
}>) {
  return (
    <div className="grid gap-2">
      <p className="text-sm font-bold text-zinc-300">{title}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function ToggleButton({
  activeStyle,
  isActive,
  label,
  onClick,
}: Readonly<{
  activeStyle?: string;
  isActive: boolean;
  label: string;
  onClick: () => void;
}>) {
  return (
    <button
      className={`rounded-lg border px-3 py-2 text-sm font-bold capitalize transition ${
        isActive
          ? activeStyle ?? "border-orange-600 bg-orange-950 text-orange-300"
          : "border-zinc-700 bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
      }`}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}

function toggleValue<T>(
  value: T,
  selectedValues: T[],
  setSelectedValues: (nextValues: T[]) => void
) {
  if (selectedValues.includes(value)) {
    setSelectedValues(selectedValues.filter((selectedValue) => selectedValue !== value));
    return;
  }

  setSelectedValues([...selectedValues, value]);
}