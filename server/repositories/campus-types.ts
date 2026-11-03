import type { Campus } from "@/types/tenant";
import type { DirectoryContext } from "./directory-types";

export interface CampusRepository {
  /**
   * Only the campuses the signed-in user may work in, within their own tenant.
   * Never returns another tenant's campuses.
   */
  list(ctx: DirectoryContext): Promise<Campus[]>;
}