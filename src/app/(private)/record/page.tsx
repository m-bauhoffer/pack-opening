import { getRecordData } from "@/app/lib/record";

const goldFormatter = new Intl.NumberFormat("es-AR");
const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  dateStyle: "medium",
  timeStyle: "short",
});

const rarityStyles = {
  common: "bg-zinc-100 text-zinc-700",
  rare: "bg-sky-100 text-sky-700",
  epic: "bg-violet-100 text-violet-700",
  legendary: "bg-amber-100 text-amber-800",
  mythic: "bg-rose-100 text-rose-700",
};

export default async function RecordPage() {
  const { packs, totalGoldSpent, error } = await getRecordData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black">Historial</h1>
        <p className="mt-2 max-w-2xl text-zinc-600">
          Sobres comprados, monstruos obtenidos y oro gastado en total.
        </p>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          No se pudo cargar el historial: {error}
        </div>
      ) : null}

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-500">
            Sobres abiertos
          </p>
          <p className="mt-3 text-4xl font-black">{packs.length}</p>
        </article>

        <article className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-500">
            Oro total gastado
          </p>
          <p className="mt-3 text-4xl font-black">
            {goldFormatter.format(totalGoldSpent)}
          </p>
        </article>
      </section>

      {!error && packs.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-300 bg-white px-6 py-12 text-center">
          <h2 className="text-xl font-bold">Todavia no abriste sobres</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Cuando compres sobres, el historial aparecera en esta pantalla.
          </p>
        </div>
      ) : null}

      {packs.length > 0 ? (
        <div className="space-y-4">
          {packs.map((pack) => (
            <article
              className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm"
              key={pack.id}
            >
              <div className="flex flex-col gap-3 border-b border-zinc-100 pb-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                    {pack.packType?.code ?? "pack"}
                  </p>
                  <h2 className="mt-2 text-xl font-black">
                    {pack.packType?.name ?? "Sobre"}
                  </h2>
                  <p className="mt-1 text-sm text-zinc-600">
                    {dateFormatter.format(new Date(pack.createdAt))}
                  </p>
                </div>
                <p className="rounded-lg bg-zinc-100 px-3 py-2 text-sm font-black text-zinc-900">
                  {goldFormatter.format(pack.goldSpent)} oro
                </p>
              </div>

              <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-5">
                {pack.monsters.map((monster, index) => (
                  <div
                    className="rounded-lg border border-zinc-100 bg-zinc-50 p-3"
                    key={`${pack.id}-${monster.id}-${index}`}
                  >
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-bold uppercase tracking-[0.14em] ${
                        rarityStyles[monster.rarity]
                      }`}
                    >
                      {monster.rarity}
                    </span>
                    <p className="mt-2 font-bold text-zinc-950">{monster.name}</p>
                    <p className="mt-1 text-xs capitalize text-zinc-600">
                      {monster.monster_type} - Poder {monster.base_power}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </div>
  );
}
