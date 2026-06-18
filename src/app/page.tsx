import { getCurrentUser } from "@/app/lib/auth";
import { LoginButton } from "@/components/login-button";
import { getMonsterImageUrl } from "@/app/lib/supabase/storage";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  // const backgroundImageUrl = getMonsterImageUrl("bg-dragon.webp");
  const backgroundImageUrl = getMonsterImageUrl("dragon_bg-1.webp");

  return (
    <main
      className="min-h-screen bg-black text-zinc-50"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundPosition: "right center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    >
      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-500">
          Monster Pack Opening
        </p>
        <h1 className="mt-5 max-w-3xl text-5xl font-black leading-tight sm:text-7xl">
          Abrí tu colección de monstruos de forma segura.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
          nicia sesión con Google para acceder a la aplicación privada. Tu sesión se gestiona
          con Supabase Auth y las pantallas protegidas se renderizan en el servidor.
        </p>
        <div className="mt-9">
          <LoginButton />
        </div>
      </section>
    </main>
  );
}
