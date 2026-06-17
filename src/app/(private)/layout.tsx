import { requireCurrentUser } from "@/app/lib/auth";
import { LogoutButton } from "@/components/logout-button";

const privateNavigation = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/collection", label: "Coleccion" },
  { href: "/record", label: "Historial" },
];

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await requireCurrentUser();

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">
              Monster Pack Opening
            </p>
            <p className="mt-1 text-sm text-zinc-600">{user.email}</p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <nav aria-label="Private navigation" className="flex flex-wrap gap-2">
              {privateNavigation.map((item) => (
                <a
                  className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-bold text-zinc-800 transition hover:border-emerald-300 hover:bg-emerald-50"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <LogoutButton />
          </div>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-6 py-8">
        {children}
      </section>
    </main>
  );
}
