"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase/client";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (!error && data.session) {
        router.replace("/");
        return;
      }

      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(window.location.href);

      if (!exchangeError) {
        router.replace("/");
      }
    };

    handleCallback();
  }, [router]);

  return <p>Iniciando Sesión...</p>;
}