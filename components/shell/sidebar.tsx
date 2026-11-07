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
}: {
  role: RoleKey;
  userName: string;
  tenant: TenantContext;
  /** Saved width in pixels (see lib/sidebar-width.ts). */
  width: number;
}) {
  return (
    <ResizableSidebar initialWidth={width}>
      <SidebarBrand role={role} userName={userName} />
      <SidebarBody role={role} tenant={tenant} />
    </ResizableSidebar>
  );
}