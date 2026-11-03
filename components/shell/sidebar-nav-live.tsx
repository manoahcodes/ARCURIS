import type { RoleKey } from "@/config/navigation";
import { getNavBadges } from "@/server/queries/sidebar";
import { SidebarNav } from "./sidebar-nav";

/** The nav with live badge counts. Used inside <Suspense> in the sidebar body. */
export async function SidebarNavLive({ role }: { role: RoleKey }) {
  const counts = await getNavBadges(role);
  return <SidebarNav role={role} counts={counts} />;
}