import { cache } from "react";
import { ROLES, type RoleKey } from "@/config/navigation";
import { navBadges } from "@/server/repositories";
import { getTenantContext } from "@/server/request-context";

/**
 * Badge counts for the role's nav items, keyed by nav label. Only positive
 * whole numbers for labels that exist in the role's nav survive, so a stale
 * or mistyped label from the data layer cannot break the sidebar.
 * Cached per request: the desktop sidebar and the mobile drawer share one fetch.
 */
export const getNavBadges = cache(
  async (role: RoleKey): Promise<Record<string, number>> => {
    const ctx = await getTenantContext();
    const raw = await navBadges.counts(ctx, role);
    const labels = new Set(ROLES[role].nav.map((n) => n.label));

    const counts: Record<string, number> = {};
    for (const [label, value] of Object.entries(raw)) {
      if (!labels.has(label)) {
        if (process.env.NODE_ENV !== "production") {
          console.warn(`Nav badge for "${role}" names unknown nav item "${label}"`);
        }
        continue;
      }
      if (Number.isFinite(value) && value > 0) counts[label] = Math.floor(value);
    }
    return counts;
  },
);