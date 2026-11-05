import { INSTITUTIONS, systemLabel } from "@/config/institution";
import { getTenantSelection } from "@/server/queries/platform";
import { TenantSwitcher, type TenantOption } from "./tenant-switcher";

/** Sidebar card for the Platform Admin: pick a school, or stay platform-wide. */
export async function PlatformTenantControl() {
  const { tenants, selected } = await getTenantSelection();

  const options: TenantOption[] = [
    { id: "all", name: "All tenants", detail: "Platform-wide view" },
    ...tenants.map((t) => ({
      id: t.id,
      name: t.name,
      detail: `${INSTITUTIONS[t.institutionType].label} · ${systemLabel(t.institutionType)}`,
    })),
  ];

  return <TenantSwitcher options={options} selectedId={selected?.id ?? "all"} />;
}
