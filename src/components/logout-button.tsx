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
      className="px-4 py-2 text-sm font-bold transition border-b-2 border-transparent text-zinc-300 hover:border-red-500 hover:text-red-500"
      onClick={signOut}
    >
      Sign out
    </button>
  );
}
