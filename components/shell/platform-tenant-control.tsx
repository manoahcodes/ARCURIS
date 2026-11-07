import { divisionsLabel, tenantSystemLabel } from "@/config/institution";
import { getTenantSelection } from "@/server/queries/platform";
import { DivisionSelect } from "./division-select";
import { TenantSwitcher, type TenantOption } from "./tenant-switcher";

/**
 * Sidebar card for the Platform Admin: pick a school, or stay platform-wide.
 * A school with several divisions also gets a division picker underneath.
 */
export async function PlatformTenantControl() {
  const { tenants, selected, division } = await getTenantSelection();

  const options: TenantOption[] = [
    { id: "all", name: "All tenants", detail: "Platform-wide view" },
    ...tenants.map((t) => ({
      id: t.id,
      name: t.name,
      detail: `${divisionsLabel(t.divisions)} · ${tenantSystemLabel(t.divisions)}`,
    })),
  ];

  return (
    <>
      <TenantSwitcher options={options} selectedId={selected?.id ?? "all"} />
      {selected && selected.divisions.length > 1 && (
        <DivisionSelect
          options={[
            { id: "all", name: "All divisions" },
            ...selected.divisions.map((d) => ({ id: d.id, name: d.name })),
          ]}
          selectedId={division?.id ?? "all"}
        />
      )}
    </>
  );
}
