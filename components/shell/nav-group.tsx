"use client";

import { usePathname } from "next/navigation";
import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/format";
import { NavLink } from "./nav-link";

export type NavGroupItem = { href: string; label: string; badge?: number };

/**
 * Expandable sidebar section. It opens by itself when the current page is
 * inside it; a manual toggle only holds until the user navigates.
 */
export function NavGroup({ label, items }: { label: string; items: NavGroupItem[] }) {
  const pathname = usePathname();
  const panelId = useId();
  const [manual, setManual] = useState<{ path: string; open: boolean } | null>(null);

  const hasActive = items.some(
    (i) => pathname === i.href || pathname.startsWith(`${i.href}/`),
  );
  const open = manual && manual.path === pathname ? manual.open : hasActive;
  const pending = items.reduce((sum, i) => sum + (i.badge && i.badge > 0 ? i.badge : 0), 0);

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setManual({ path: pathname, open: !open })}
        className={cn(
          "flex w-full items-center justify-between gap-3 rounded-lg px-4 py-3 text-left text-[15px] transition-colors hover:bg-navy-raised hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
          hasActive ? "font-semibold text-white" : "text-slate-200",
        )}
      >
        <span className="truncate">{label}</span>
        <span className="flex shrink-0 items-center gap-2">
          {!open && pending > 0 && (
            <>
              <span
                aria-hidden
                className="min-w-6 rounded-full bg-brand px-2 py-0.5 text-center text-xs font-semibold text-white"
              >
                {pending > 99 ? "99+" : pending}
              </span>
              <span className="sr-only">, {pending} pending</span>
            </>
          )}
          <ChevronDown
            size={14}
            aria-hidden
            className={cn("transition-transform", open && "rotate-180")}
          />
        </span>
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="ml-4 mt-1 flex flex-col gap-1 border-l border-navy-line pl-2"
      >
        {items.map((item) => (
          <NavLink key={item.href} href={item.href} label={item.label} badge={item.badge} />
        ))}
      </div>
    </div>
  );
}
