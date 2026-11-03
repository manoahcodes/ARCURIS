import type { RoleKey } from "@/config/navigation";
import type { AcademicYear, SearchResult } from "@/types/directory";

/** Structurally compatible with TenantContext, which also carries tenantId. */
export type DirectoryContext = { tenantId: string };

export interface AcademicYearRepository {
  list(ctx: DirectoryContext): Promise<AcademicYear[]>;
}

export interface SearchRepository {
  /**
   * Must scope results by tenant AND by what this role may see
   * (a parent only reaches linked children, a teacher only assigned classes).
   */
  search(
    ctx: DirectoryContext,
    role: RoleKey,
    query: string,
  ): Promise<SearchResult[]>;
}