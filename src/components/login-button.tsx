"use client";

import { supabase } from "@/app/lib/supabase/client";

export function LoginButton() {
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error(error);
    }
  };

  return (
    <button
      className="rounded-lg bg-emerald-400 px-5 py-3 text-sm font-bold text-zinc-950 shadow-sm transition hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-zinc-950"
      onClick={signInWithGoogle}
    >
      Sign in with Google
    </button>
  );
}
