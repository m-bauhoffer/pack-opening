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

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black">Dashboard</h1>
        <p className="mt-2 max-w-2xl text-zinc-600">
          Centro principal para comprar sobres, ver el oro disponible y acceder
          a las pantallas privadas.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-500">
            Oro disponible
          </p>
          <p className="mt-3 text-4xl font-black">--</p>
          <p className="mt-2 text-sm text-zinc-600">
            Pendiente de conectar con datos del usuario.
          </p>
        </article>

        <article className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm md:col-span-2">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-500">
            Comprar sobres
          </p>
          <h2 className="mt-3 text-2xl font-black">Tienda de sobres</h2>
          <p className="mt-2 text-sm text-zinc-600">
            La compra de sobres se implementara en una siguiente etapa.
          </p>
        </article>
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
