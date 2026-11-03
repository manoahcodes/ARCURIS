import type { RoleKey } from "@/config/navigation";
import type { DirectoryContext } from "./directory-types";

export interface NavBadgeRepository {
  /**
   * Counts keyed by nav item label (for example "Debtors"). Missing or 0 means
   * no badge. Must be scoped to the signed-in user: a teacher's counts cover
   * only their own classes, a parent's only their own children.
   */
  counts(ctx: DirectoryContext, role: RoleKey): Promise<Record<string, number>>;
}