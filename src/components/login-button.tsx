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
        <button onClick={signInWithGoogle}>
            Iniciar sesión con Google
        </button>
    );
}