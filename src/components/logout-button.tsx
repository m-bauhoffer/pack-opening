"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase/client";

export function LogoutButton() {
    const router = useRouter();

    const signOut = async () => {
        // Supabase elimina la sesion del navegador y limpia sus tokens locales.
        const { error } = await supabase.auth.signOut();

        // Si falla, por ahora lo dejamos visible en consola para depurar facil.
        if (error) {
            console.error(error);
            return;
        }

        // Refresca los Server Components para que la home vuelva a leer la sesion.
        router.refresh();
    };

    return (
        <button onClick={signOut}>
            Cerrar sesion
        </button>
    );
}
