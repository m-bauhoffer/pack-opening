"use client";

import type { CollectionMonster } from "@/app/lib/collection";
import type { Monster } from "@/app/lib/database.types";
import { useMemo, useState } from "react";

type SortKey = "rarity" | "level" | "power";
type SortDirection = "asc" | "desc";

type CollectionFiltersProps = {
  collection: CollectionMonster[];
};

const rarityOrder: Monster["rarity"][] = [
  "common",
  "rare",
  "epic",
  "legendary",
  "mythic",
];

const rarityStyles = {
  common: "bg-zinc-100 text-zinc-700 border-zinc-200",
  rare: "bg-sky-100 text-sky-700 border-sky-200",
  epic: "bg-violet-100 text-violet-700 border-violet-200",
  legendary: "bg-amber-100 text-amber-800 border-amber-200",
  mythic: "bg-rose-100 text-rose-700 border-rose-200",
};

const sortOptions: Array<{ key: SortKey; direction: SortDirection; label: string }> = [
  { key: "rarity", direction: "asc", label: "Rareza asc" },
  { key: "rarity", direction: "desc", label: "Rareza desc" },
  { key: "level", direction: "asc", label: "Nivel asc" },
  { key: "level", direction: "desc", label: "Nivel desc" },
  { key: "power", direction: "asc", label: "Poder asc" },
  { key: "power", direction: "desc", label: "Poder desc" },
];

export function CollectionFilters({ collection }: CollectionFiltersProps) {
  const [search, setSearch] = useState("");
  const [selectedRarities, setSelectedRarities] = useState<Monster["rarity"][]>([]);
  const [selectedLevels, setSelectedLevels] = useState<number[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<Monster["monster_type"][]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("rarity");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

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

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="grid gap-5">
          <label className="grid gap-2">
            <span className="text-sm font-bold text-zinc-700">Buscar por nombre</span>
            <input
              className="rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Ej: dragon, wolf, lich"
              type="search"
              value={search}
            />
          </label>

          <FilterGroup title="Rareza">
            {rarityOrder.map((rarity) => (
              <ToggleButton
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

          <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
            <label className="grid gap-2">
              <span className="text-sm font-bold text-zinc-700">Ordenar por</span>
              <select
                className="rounded-lg border border-zinc-300 px-4 py-3 text-sm font-semibold outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
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

            <button
              className="rounded-lg border border-zinc-300 px-4 py-3 text-sm font-bold text-zinc-800 transition hover:bg-zinc-100"
              onClick={resetFilters}
              type="button"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-zinc-600">
          Mostrando {visibleCollection.length} de {collection.length}
        </p>
      </div>

      {visibleCollection.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-300 bg-white px-6 py-12 text-center">
          <h2 className="text-xl font-bold">No hay resultados</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Ajusta la busqueda o limpia los filtros para ver mas monstruos.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleCollection.map((item) => (
            <article
              className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm"
              key={item.id}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] ${
                      rarityStyles[item.monster.rarity]
                    }`}
                  >
                    {item.monster.rarity}
                  </p>
                  <h2 className="mt-3 text-xl font-black">{item.monster.name}</h2>
                  <p className="mt-1 text-sm capitalize text-zinc-600">
                    {item.monster.monster_type} - Poder {item.monster.base_power}
                  </p>
                </div>
                <div className="rounded-lg bg-zinc-950 px-3 py-2 text-center text-zinc-50">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">
                    Nivel
                  </p>
                  <p className="text-2xl font-black">{item.level}</p>
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-zinc-700">Copias</span>
                  <span className="text-zinc-600">{item.quantity}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-zinc-100">
                  <div
                    className="h-full rounded-full bg-emerald-400"
                    style={{ width: `${item.progressPercent}%` }}
                  />
                </div>
                <p className="text-sm font-semibold text-zinc-600">
                  {item.progressLabel}
                </p>
              </div>
            </article>
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
      <p className="text-sm font-bold text-zinc-700">{title}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function ToggleButton({
  isActive,
  label,
  onClick,
}: Readonly<{
  isActive: boolean;
  label: string;
  onClick: () => void;
}>) {
  return (
    <button
      className={`rounded-lg border px-3 py-2 text-sm font-bold capitalize transition ${
        isActive
          ? "border-emerald-500 bg-emerald-100 text-emerald-900"
          : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100"
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
