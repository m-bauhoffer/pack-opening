import { getDashboardData } from "@/app/lib/dashboard";
import { PackPurchaseButton } from "@/components/pack-purchase-button";

const dashboardActions = [
  {
    href: "/collection",
    title: "Ver coleccion",
    description: "Revisar monstruos obtenidos, niveles y progreso.",
  },
  {
    href: "/record",
    title: "Ver historial",
    description: "Consultar sobres abiertos, recompensas y oro gastado.",
  },
];

const goldFormatter = new Intl.NumberFormat("es-AR");

export default async function DashboardPage() {
  const { profile, packTypes, error } = await getDashboardData();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black">Dashboard</h1>
        <p className="mt-2 max-w-2xl text-zinc-600">
          Centro principal para comprar sobres, ver el oro disponible y acceder
          a las pantallas privadas.
        </p>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          No se pudieron cargar los datos del dashboard: {error}
        </div>
      ) : null}

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-500">
            Oro disponible
          </p>
          <p className="mt-3 text-4xl font-black">
            {profile ? goldFormatter.format(profile.gold) : "--"}
          </p>
          <p className="mt-2 text-sm text-zinc-600">
            Saldo actual asociado a tu perfil.
          </p>
        </article>

        <article className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm md:col-span-2">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-500">
            Comprar sobres
          </p>
          <h2 className="mt-3 text-2xl font-black">Tienda de sobres</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Los sobres disponibles se leen desde Supabase. La apertura se
            implementara con una operacion transaccional segura.
          </p>
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {packTypes.map((packType) => (
          <article
            className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm"
            key={packType.id}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                  {packType.code}
                </p>
                <h2 className="mt-2 text-xl font-black">{packType.name}</h2>
              </div>
              <p className="rounded-lg bg-zinc-100 px-3 py-2 text-sm font-black text-zinc-900">
                {goldFormatter.format(packType.price)} oro
              </p>
            </div>
            <PackPurchaseButton packTypeCode={packType.code} />
          </article>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {dashboardActions.map((action) => (
          <a
            className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50"
            href={action.href}
            key={action.href}
          >
            <h2 className="text-xl font-black">{action.title}</h2>
            <p className="mt-2 text-sm text-zinc-600">{action.description}</p>
          </a>
        ))}
      </section>
    </div>
  );
}
