import { ALL_DIVISIONS, inScope, onlyDivisions, type RoleScope } from "@/lib/division-scope";
import type { PlatformContext } from "../platform-types";
import { flavour } from "./shared";

export type StaffRow = {
  name: string;
  no: string;
  role: string;
  level: string;
  department: string;
  status: "Active" | "Pending";
  /** Which divisions this person's role covers. */
  scope: RoleScope;
};

/**
 * Staff of the selected school. Whole-school roles cover every division. In a
 * school with several divisions each division also has a Head whose role is
 * limited to that division: they only see its students, fees, classes and results.
 * With a division selected, only people who can see that division are listed.
 */
export function staffFor(ctx: PlatformContext): StaffRow[] {
  const f = flavour(ctx);
  const divisions = ctx.tenant?.divisions ?? [];

  const wholeSchool: StaffRow[] = [
    { name: "Dr. Alice Mulenga", no: "STF-0001", role: f.tertiary ? "Vice-Chancellor" : "Principal", level: "Level 1 · Executive", department: "Administration", status: "Active", scope: ALL_DIVISIONS },
    { name: "Mrs. Grace Mumba", no: "STF-0012", role: "Registrar", level: "Level 2 · Management", department: "Registry", status: "Active", scope: ALL_DIVISIONS },
    { name: "Mr. Joseph Phiri", no: "STF-0015", role: "Bursar", level: "Level 2 · Management", department: "Finance", status: "Active", scope: ALL_DIVISIONS },
    { name: "Ms. Esther Kunda", no: "STF-0042", role: "Cashier", level: "Level 3 · Operational", department: "Finance", status: "Active", scope: ALL_DIVISIONS },
    { name: "Mr. Peter Daka", no: "STF-0051", role: "Hostel Warden", level: "Level 3 · Operational", department: "Student Affairs", status: "Active", scope: ALL_DIVISIONS },
    { name: "Mrs. Ruth Sakala", no: "STF-0067", role: "Admissions Officer", level: "Level 3 · Operational", department: "Registry", status: "Pending", scope: ALL_DIVISIONS },
  ];

  const heads: StaffRow[] =
    divisions.length > 1
      ? divisions.map((d, i) => ({
          name: ["Mrs. Beatrice Chola", "Mr. Isaac Chanda", "Dr. Moses Kunda"][i % 3],
          no: `STF-01${10 + i}`,
          role: `Head of ${d.name}`,
          level: "Level 2 · Management",
          department: d.name,
          status: "Active",
          scope: onlyDivisions(d.id),
        }))
      : [];

  const all = [...wholeSchool, ...heads];
  return ctx.division ? all.filter((s) => inScope(s.scope, ctx.division!.id)) : all;
}
