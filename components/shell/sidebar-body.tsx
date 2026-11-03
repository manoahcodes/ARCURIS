import { Suspense } from "react";
import { ROLES, type RoleKey } from "@/config/navigation";
import type { TenantContext } from "@/types/dashboard";
import { CampusControl } from "./campus-control";
import { SidebarFooter } from "./sidebar-footer";
import { SidebarNav } from "./sidebar-nav";
import { SidebarNavLive } from "./sidebar-nav-live";
import { StaticTenantCard } from "./tenant-card";

/**
 * Tenant card, primary nav and footer. Rendered in the desktop sidebar and, as
 * the same element, inside the mobile drawer, so the two can never drift apart.
 */
export function SidebarBody({ role, tenant }: { role: RoleKey; tenant: TenantContext }) {
  const config = ROLES[role];

  return (
    <>
      <div className="mt-5">
        {role === "platform" ? (
          // A platform admin spans every school, so no single school or campus here.
          <StaticTenantCard title="All tenants" subtitle="Platform-wide view" />
        ) : config.campusSwitcher ? (
          // Staff who may work at several campuses can switch between them.
          <Suspense
            fallback={<StaticTenantCard title={tenant.tenantName} subtitle={tenant.campus} />}
          >
            <CampusControl tenant={tenant} />
          </Suspense>
        ) : (
          // Students and parents: a fixed card, nothing to switch.
          <StaticTenantCard title={tenant.tenantName} subtitle={tenant.campus} />
        )}
      </div>

      <div className="mt-7 px-3 text-xs font-semibold uppercase tracking-wider text-accent/80">
        Workspace
      </div>

      {/* Links show at once; badge counts fill in when they load. */}
      <Suspense fallback={<SidebarNav role={role} />}>
        <SidebarNavLive role={role} />
      </Suspense>

      <SidebarFooter />
    </>
  );
}