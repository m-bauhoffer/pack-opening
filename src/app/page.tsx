import { getCurrentUser } from "@/app/lib/auth";
import { LoginButton } from "@/components/login-button";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

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
          Sign in with Google to enter the private app. Your session is managed
          with Supabase Auth and protected screens are rendered server-side.
        </p>
        <div className="mt-9">
          <LoginButton />
        </div>
      </section>
    </main>
  );
}
