import { cache } from "react";
import { cookies } from "next/headers";
import { termsFor, type Terminology } from "@/config/institution";
import { PLATFORM_TENANT_COOKIE } from "@/lib/platform-tenant";
import { tenantDirectory } from "@/server/repositories";
import type { TenantSummary } from "@/types/platform";

export type TenantSelection = {
  tenants: TenantSummary[];
  /** The school the Platform Admin picked, or undefined for the platform-wide view. */
  selected: TenantSummary | undefined;
};

/**
 * Every school plus the one the Platform Admin picked. A cookie naming an
 * unknown school is ignored.
 * Reads the cookie, so call it inside a <Suspense> boundary.
 */
export const getTenantSelection = cache(async (): Promise<TenantSelection> => {
  const tenants = await tenantDirectory.list();
  const saved = (await cookies()).get(PLATFORM_TENANT_COOKIE)?.value;
  return { tenants, selected: tenants.find((t) => t.id === saved) };
});

/** Term/Semester wording for the selected school (neutral when none is selected). */
export const getPlatformTerms = cache(async (): Promise<Terminology> => {
  const { selected } = await getTenantSelection();
  return termsFor(selected?.institutionType);
});
