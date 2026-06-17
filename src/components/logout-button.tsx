"use client";

import { supabase } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
      return;
    }

    router.refresh();
  };

  return (
    <button
      className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-bold text-zinc-900 shadow-sm transition hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      onClick={signOut}
    >
      Sign out
    </button>
  );
}
