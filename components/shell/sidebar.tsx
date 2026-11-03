import type { RoleKey } from "@/config/navigation";
import type { TenantContext } from "@/types/dashboard";
import { SidebarBody } from "./sidebar-body";
import { SidebarBrand } from "./sidebar-brand";

export function Sidebar({
  role,
  userName,
  tenant,
}: {
  role: RoleKey;
  userName: string;
  tenant: TenantContext;
}) {
  return (
    <aside className="hidden h-full w-60 shrink-0 flex-col overflow-y-auto bg-navy px-3 py-5 lg:flex">
      <SidebarBrand role={role} userName={userName} />
      <SidebarBody role={role} tenant={tenant} />
    </aside>
  );
}