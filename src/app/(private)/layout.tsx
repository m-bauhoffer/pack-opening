import { requireCurrentUser } from "@/app/lib/auth";
import { LogoutButton } from "@/components/logout-button";
import { PrivateNavigation } from "@/components/private-navigation";

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await requireCurrentUser();

  return (
    <main className="min-h-screen bg-black text-zinc-50">
      <header className="border-b border-zinc-800 bg-zinc-900">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-500">
              Monster Pack Opening
            </p>
            <p className="mt-1 text-sm text-zinc-400">{user.email}</p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <PrivateNavigation />
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
