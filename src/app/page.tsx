import { LoginButton } from "@/components/login-button";
import { LogoutButton } from "@/components/logout-button";
import { createSupabaseServerClient } from "@/app/lib/supabase/server";

export default async function Home() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = user
    ? await supabase.from("monsters").select("*")
    : { data: null };

  return (
    <main className="p-6 space-y-4">
      {user ? <LogoutButton /> : <LoginButton />}

      {user ? (
        <section>
          <p>Sesión activa</p>
          <p>Email: {user.email}</p>
        </section>
      ) : (
        <p>No hay sesión activa</p>
      )}

      {user && data?.length ? (
        data.map((card) => (
          <div key={card.id}>
            <h3>{card.name}</h3>
          </div>
        ))
      ) : user ? (
        <p>No hay cartas disponibles.</p>
      ) : null}

      
    </main>
  );
}
