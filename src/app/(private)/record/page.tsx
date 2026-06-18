import { getRecordData, type RecordData } from "@/app/lib/record";
import { isPackTypePremium } from "@/app/lib/dashboard";
import { getPackStyles } from "@/app/lib/packStyles";

const goldFormatter = new Intl.NumberFormat("es-AR");
const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  dateStyle: "medium",
  timeStyle: "short",
});

const rarityStyles = {
  common: "bg-zinc-800 text-zinc-300",
  rare: "bg-sky-900 text-sky-300",
  epic: "bg-violet-900 text-violet-300",
  legendary: "bg-amber-900 text-amber-300",
  mythic: "bg-rose-900 text-rose-300",
};

export default async function RecordPage() {
  const { packs, totalGoldSpent, commonPacks, premiumPacks, error } = await getRecordData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black">Historial</h1>
        <p className="mt-2 max-w-2xl text-zinc-400">
          Sobres comprados, monstruos obtenidos y oro gastado en total.
        </p>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-900 bg-red-950 px-4 py-3 text-sm text-red-400">
          No se pudo cargar el historial: {error}
        </div>
      ) : null}

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <article className="rounded-lg border border-zinc-700 bg-zinc-900 p-5 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-400">
            Sobres abiertos
          </p>
          <p className="mt-3 text-4xl font-black">{packs.length}</p>
        </article>

        <article className="rounded-lg border border-zinc-700 bg-zinc-900 p-5 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-400">
            Sobres comunes
          </p>
          <p className="mt-3 text-4xl font-black">{commonPacks}</p>
        </article>

        <article className="rounded-lg border border-zinc-700 bg-zinc-900 p-5 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-400">
            Sobres premium
          </p>
          <p className="mt-3 text-4xl font-black">{premiumPacks}</p>
        </article>

        <article className="rounded-lg border border-zinc-700 bg-zinc-900 p-5 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-400">
            Oro total gastado
          </p>
          <p className="mt-3 text-4xl font-black">
            {goldFormatter.format(totalGoldSpent)}
          </p>
        </article>
      </section>

      {!error && packs.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-700 bg-zinc-900 px-6 py-12 text-center">
          <h2 className="text-xl font-bold">Todavia no abriste sobres</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Cuando compres sobres, el historial aparecera en esta pantalla.
          </p>
        </div>
      ) : null}

      {packs.length > 0 ? (
        <div className="space-y-4">
          {packs.map((pack) => {
            const isPremium = pack.packType ? isPackTypePremium(pack.packType.code) : false;
            const styles = getPackStyles(isPremium);
            return (
              <article
                className={`rounded-lg p-5 shadow-sm ${styles.container}`}
                key={pack.id}
              >
                <div className={`flex flex-col gap-3 pb-4 sm:flex-row sm:items-start sm:justify-between border-b ${styles.borderSeparator}`}>
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-[0.18em] ${styles.label}`}>
                      {pack.packType?.code ?? "pack"}
                    </p>
                    <h2 className="mt-2 text-xl font-black">
                      {pack.packType?.name ?? "Sobre"}
                    </h2>
                    <p className={`mt-1 text-sm ${styles.textSecondary}`}>
                      {dateFormatter.format(new Date(pack.createdAt))}
                    </p>
                  </div>
                  <p className={`rounded-lg px-3 py-2 text-sm font-black ${styles.priceBox}`}>
                    {goldFormatter.format(pack.goldSpent)} oro
                  </p>
                </div>

                <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-5">
                  {pack.monsters.map((monster, index) => (
                    <div
                      className={`rounded-lg p-3 ${styles.monsterCard}`}
                      key={`${pack.id}-${monster.id}-${index}`}
                    >
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-bold uppercase tracking-[0.14em] ${
                          rarityStyles[monster.rarity]
                        }`}
                      >
                        {monster.rarity}
                      </span>
                      <p className="mt-2 font-bold text-zinc-50">{monster.name}</p>
                      <p className="mt-1 text-xs capitalize text-zinc-400">
                        {monster.monster_type} - Poder {monster.base_power}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
