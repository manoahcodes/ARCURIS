import type { Division } from "@/config/institution";

/**
 * Which divisions a staff role assignment covers.
 * "all": the whole school, every division now and any added later.
 * "divisions": only the listed divisions (a Head of Primary sees Primary only).
 */
export type RoleScope = { kind: "all" } | { kind: "divisions"; ids: string[] };

export const ALL_DIVISIONS: RoleScope = { kind: "all" };

export const onlyDivisions = (...ids: string[]): RoleScope => ({ kind: "divisions", ids });

/** True when records of this division are visible to the assignment. */
export function inScope(scope: RoleScope, divisionId: string): boolean {
  return scope.kind === "all" || scope.ids.includes(divisionId);
}

export function visibleDivisions(scope: RoleScope, divisions: readonly Division[]): Division[] {
  return divisions.filter((d) => inScope(scope, d.id));
}

/** "All divisions" or the division names, for tables. */
export function scopeLabel(scope: RoleScope, divisions: readonly Division[]): string {
  if (scope.kind === "all") return "All divisions";
  const names = visibleDivisions(scope, divisions).map((d) => d.name);
  return names.length > 0 ? names.join(", ") : "No division";
}
