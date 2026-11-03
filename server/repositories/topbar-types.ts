import type { RoleKey } from "@/config/navigation";
import type { Child, NotificationSummary } from "@/types/topbar";
import type { DirectoryContext } from "./directory-types";

export interface NotificationRepository {
  /** Recent items for the signed-in user in this role, plus the unread total. */
  list(ctx: DirectoryContext, role: RoleKey): Promise<NotificationSummary>;
}

export interface ChildRepository {
  /**
   * Only the children linked to the signed-in guardian (guardian-learner links),
   * within the tenant. The real implementation needs the guardian's id, so add
   * it to the context once authentication exists.
   */
  listForGuardian(ctx: DirectoryContext): Promise<Child[]>;
}