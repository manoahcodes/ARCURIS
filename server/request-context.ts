import { session } from "./repositories";
import type { DirectoryContext } from "./repositories/directory-types";

/**
 * Tenant context for the signed-in user, taken from the same session provider
 * the layout uses. Assumes `user.tenant` has a `tenantId` string; if your
 * field is named differently, TypeScript will flag this line.
 */
export async function getTenantContext(): Promise<DirectoryContext> {
  const user = await session.getCurrentUser();
  return { tenantId: user.tenant.tenantId };
}