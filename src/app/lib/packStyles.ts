/**
 * Estilos centralizados para packs comunes y premium
 * Modifica los colores aquí y se aplicarán en toda la app
 */

export const packStyles = {
  common: {
    container: "border-zinc-700 bg-zinc-900",
    border: "border-zinc-700",
    label: "text-orange-500",
    priceBox: "bg-zinc-800 text-zinc-50",
    borderSeparator: "border-zinc-800",
    monsterCard: "border-zinc-800 bg-zinc-800",
    monsterBorder: "border-zinc-800",
    textSecondary: "text-zinc-400",
  },
  premium: {
    container: "border-amber-800 bg-yellow-600",
    border: "border-amber-800",
    label: "text-neutral-900",
    priceBox: "bg-zinc-700 text-amber-50",
    borderSeparator: "border-amber-800",
    monsterCard: "border-amber-800 bg-gray-700",
    monsterBorder: "border-amber-800",
    textSecondary: "text-amber-900",
  },
};

export function getPackStyles(isPremium: boolean) {
  return isPremium ? packStyles.premium : packStyles.common;
}
