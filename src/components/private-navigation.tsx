"use client";

import { usePathname } from "next/navigation";

const privateNavigation = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/collection", label: "Coleccion" },
  { href: "/record", label: "Historial" },
] as const;

export function PrivateNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Private navigation" className="flex flex-wrap gap-2">
      {privateNavigation.map((item) => {
        const isActive = pathname === item.href;
        return (
          <a
            className={`px-4 py-2 text-sm font-bold transition ${
              isActive
                ? "border-b-2 border-orange-500 text-orange-500"
                : "border-b-2 border-transparent text-zinc-300 hover:border-orange-500 hover:text-orange-500"
            }`}
            href={item.href}
            key={item.href}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
