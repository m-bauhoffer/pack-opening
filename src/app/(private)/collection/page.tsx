import { getCollectionData } from "@/app/lib/collection";

const rarityStyles = {
  common: "bg-zinc-100 text-zinc-700",
  rare: "bg-sky-100 text-sky-700",
  epic: "bg-violet-100 text-violet-700",
  legendary: "bg-amber-100 text-amber-800",
  mythic: "bg-rose-100 text-rose-700",
};

export default async function CollectionPage() {
  const { collection, error } = await getCollectionData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black">Coleccion</h1>
        <p className="mt-2 max-w-2xl text-zinc-600">
          Monstruos obtenidos, nivel actual y progreso hacia el siguiente nivel.
        </p>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          No se pudo cargar la coleccion: {error}
        </div>
      ) : null}

      {!error && collection.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-300 bg-white px-6 py-12 text-center">
          <h2 className="text-xl font-bold">Todavia no tenes monstruos</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Cuando abras sobres, tus monstruos apareceran en esta pantalla.
          </p>
        </div>
      ) : null}

      {collection.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {collection.map((item) => (
            <article
              className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm"
              key={item.id}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] ${
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
      ) : null}
    </div>
  );
}
