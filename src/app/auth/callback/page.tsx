"use client";

import { useEffect } from "react";
import { supabase } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleSession = async () => {
      const { error } = await supabase.auth.getSession();

      if (!error) {
        router.push("/");
      }
    };

    handleSession();
  }, [router]);

  return <p>Logging in...</p>;
}