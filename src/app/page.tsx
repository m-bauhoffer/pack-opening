import { getAuthenticatedMonsters } from "@/app/lib/monsters";
import { LoginButton } from "@/components/login-button";
import { LogoutButton } from "@/components/logout-button";

export default async function Home() {
  const { user, monsters, error } = await getAuthenticatedMonsters();

  if (!user) {
    return (
      <main className="min-h-screen bg-zinc-950 text-zinc-50">
        <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">
            Monster Pack Opening
          </p>
          <h1 className="mt-5 max-w-3xl text-5xl font-black leading-tight sm:text-7xl">
            Open your monster collection securely.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
            Sign in with Google to load the monster database through your
            Supabase session. Protected data is fetched on the server after
            authentication.
          </p>
          <div className="mt-9">
            <LoginButton />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">
              Monster Pack Opening
            </p>
            <h1 className="mt-2 text-3xl font-black">Monster dashboard</h1>
            <p className="mt-1 text-sm text-zinc-600">{user.email}</p>
          </div>
          <LogoutButton />
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-6 py-8">
        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Unable to load monsters: {error}
          </div>
        ) : monsters.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {monsters.map((monster) => (
              <article
                key={monster.id}
                className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm"
              >
                {monster.image_url ? (
                  <div
                    aria-label={monster.name}
                    className="h-48 bg-zinc-100 bg-cover bg-center"
                    role="img"
                    style={{ backgroundImage: `url(${monster.image_url})` }}
                  />
                ) : (
                  <div className="flex h-48 items-center justify-center bg-zinc-900 text-5xl font-black text-emerald-300">
                    {monster.name.slice(0, 1).toUpperCase()}
                  </div>
                )}
                <div className="space-y-3 p-4">
                  <div>
                    <h2 className="text-xl font-bold">{monster.name}</h2>
                    {monster.type ? (
                      <p className="mt-1 text-sm text-zinc-600">
                        {monster.type}
                      </p>
                    ) : null}
                  </div>
                  {monster.rarity ? (
                    <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
                      {monster.rarity}
                    </span>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-zinc-300 bg-white px-6 py-12 text-center">
            <h2 className="text-xl font-bold">No monsters available yet</h2>
            <p className="mt-2 text-sm text-zinc-600">
              Your authenticated session is active, but the database returned
              no rows for the current RLS policies.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
