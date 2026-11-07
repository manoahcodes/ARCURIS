import type { RoleKey } from "@/config/navigation";
import type { TenantContext } from "@/types/dashboard";
import { ResizableSidebar } from "./resizable-sidebar";
import { SidebarBody } from "./sidebar-body";
import { SidebarBrand } from "./sidebar-brand";

export function Sidebar({
  role,
  userName,
  tenant,
  width,
  collapsed,
}: {
  role: RoleKey;
  userName: string;
  tenant: TenantContext;
  /** Saved width in pixels (see lib/sidebar-width.ts). */
  width: number;
  /** Saved collapsed state (see lib/sidebar-width.ts). */
  collapsed: boolean;
}) {
  return (
    <ResizableSidebar
      initialWidth={width}
      initialCollapsed={collapsed}
      header={<SidebarBrand role={role} userName={userName} />}
    >
      <SidebarBody role={role} tenant={tenant} />
    </ResizableSidebar>
  );
}