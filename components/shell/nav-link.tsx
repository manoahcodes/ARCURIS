"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/format";

export function NavLink({
  href,
  label,
  exact,
  badge,
}: {
  href: string;
  label: string;
  exact?: boolean;
  /** Pending items for this section. Hidden when missing or 0. */
  badge?: number;
}) {
  const pathname = usePathname();
  const active = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
  const count = badge && badge > 0 ? badge : 0;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center justify-between gap-3 rounded-lg px-4 py-3 text-[15px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        active
          ? "bg-brand font-semibold text-white"
          : "text-slate-200 hover:bg-navy-raised hover:text-white",
      )}
    >
      <span className="truncate">{label}</span>
      {count > 0 && (
        <>
          <span
            aria-hidden
            className={cn(
              "min-w-6 shrink-0 rounded-full px-2 py-0.5 text-center text-xs font-semibold text-white",
              active ? "bg-white/25" : "bg-brand",
            )}
          >
            {count > 99 ? "99+" : count}
          </span>
          <span className="sr-only">, {count} pending</span>
        </>
      )}
    </Link>
  );
}