import { getCampusState } from "@/server/queries/campus";
import type { TenantContext } from "@/types/dashboard";
import { CampusSwitcher } from "./campus-switcher";
import { StaticTenantCard } from "./tenant-card";

export async function CampusControl({ tenant }: { tenant: TenantContext }) {
  const { list, selected } = await getCampusState(tenant.campus);

  // One campus (or none): nothing to switch, so no dead button.
  if (!selected || list.length <= 1) {
    return (
      <StaticTenantCard
        title={tenant.tenantName}
        subtitle={selected?.name ?? tenant.campus}
      />
    );
  }

  return (
    <CampusSwitcher
      tenantName={tenant.tenantName}
      campuses={list}
      selectedId={selected.id}
    />
  );
}