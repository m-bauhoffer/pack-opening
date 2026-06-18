import { getDashboardData, isPackTypePremium } from "@/app/lib/dashboard";
import { getPackStyles } from "@/app/lib/packStyles";
import { PackPurchaseButton } from "@/components/pack-purchase-button";

// const dashboardActions = [
//   {
//     href: "/collection",
//     title: "Ver coleccion",
//     description: "Revisar monstruos obtenidos, niveles y progreso.",
//   },
//   {
//     href: "/record",
//     title: "Ver historial",
//     description: "Consultar sobres abiertos, recompensas y oro gastado.",
//   },
// ];

const goldFormatter = new Intl.NumberFormat("es-AR");

export default async function DashboardPage() {
  const { profile, packTypes, error } = await getDashboardData();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black">Dashboard</h1>
        {/* <p className="mt-2 max-w-2xl text-zinc-400">
          Centro principal para comprar sobres, ver el oro disponible y acceder
          a las pantallas privadas.
        </p> */}
      </div>

      {error ? (
        <div className="rounded-lg border border-red-900 bg-red-950 px-4 py-3 text-sm text-red-400">
          No se pudieron cargar los datos del dashboard: {error}
        </div>
      ) : null}

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-lg border border-zinc-700 bg-zinc-900 p-5 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-400">
            Oro disponible
          </p>
          <p className="mt-3 text-4xl font-black">
            {profile ? goldFormatter.format(profile.gold) : "--"}
          </p>
          <p className="mt-2 text-sm text-zinc-400">
            Saldo actual.
          </p>
        </article>

        <article className="rounded-lg border border-zinc-700 bg-zinc-900 p-5 shadow-sm md:col-span-2">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-400">
            Comprar sobres
          </p>
          <h2 className="mt-3 text-2xl font-black">Tienda de sobres</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Las sombras se agitan más allá del reino conocido. Abre un sobre y descubre qué criatura aguarda en la oscuridad.
          </p>
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {packTypes.map((packType) => {
          const isPremium = isPackTypePremium(packType.code);
          const styles = getPackStyles(isPremium);
          return (
            <article
              className={`rounded-lg p-5 shadow-sm ${styles.container}`}
              key={packType.id}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className={`text-xs font-bold uppercase tracking-[0.18em] ${styles.label}`}>
                    {packType.code}
                  </p>
                  <h2 className="mt-2 text-xl font-black">{packType.name}</h2>
                </div>
                <p className={`rounded-lg px-3 py-2 text-sm font-black ${styles.priceBox}`}>
                  {goldFormatter.format(packType.price)} oro
                </p>
              </div>
              <PackPurchaseButton packTypeCode={packType.code} />
            </article>
          );
        })}
      </section>

      {/* <section className="grid gap-4 md:grid-cols-2">
        {dashboardActions.map((action) => (
          <a
            className="rounded-lg border border-zinc-700 bg-zinc-900 p-5 shadow-sm transition hover:border-orange-600 hover:bg-zinc-800"
            href={action.href}
            key={action.href}
          >
            <h2 className="text-xl font-black">{action.title}</h2>
            <p className="mt-2 text-sm text-zinc-400">{action.description}</p>
          </a>
        ))}
      </section> */}
    </div>
  );
}
