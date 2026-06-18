import { supabase } from "./client";

/**
 * Obtiene la URL pública de una imagen de monstruo desde Supabase Storage
 * usando el cliente de Supabase.
 */
export function getMonsterImageUrl(imagePath: string): string {
  if (!imagePath) return "";

  const { data } = supabase.storage
    .from("monster-images")
    .getPublicUrl(imagePath);

  return data.publicUrl;
}