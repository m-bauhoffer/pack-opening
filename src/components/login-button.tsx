"use client";

import { supabase } from "@/app/lib/supabase/client";

export function LoginButton() {
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      },
    });

    if (error) {
      console.error(error);
    }
  };

  return (
    <button
      className="rounded-lg bg-orange-500 px-5 py-3 text-sm font-bold text-zinc-950 shadow-sm transition hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-zinc-950"
      onClick={signInWithGoogle}
    >
      Iniciar Sesión con Google
    </button>
  );
}
