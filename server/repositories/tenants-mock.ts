import type { TenantSummary } from "@/types/platform";
import { assertSharedSystem, INSTITUTIONS, type Division, type InstitutionType } from "@/config/institution";
import type { TenantDirectory } from "./platform-types";

const CODES: Record<InstitutionType, string> = { primary: "PRI", high_school: "HS", college: "COL", university: "UNI" };

/** A tenant with a single division, named after its institution type. */
const single = (type: InstitutionType): Division[] => [
  { id: type, name: INSTITUTIONS[type].label, code: CODES[type], institutionType: type },
];

/** A combined school: one division per type, all on the same academic system. */
const combined = (...types: InstitutionType[]): Division[] => types.flatMap(single);

export const TENANTS: TenantSummary[] = [
  { id: "lusaka-hills", name: "Lusaka Hills Academy", divisions: combined("primary", "high_school"), campuses: 2, learners: 1248, plan: "Growth", status: "Active" },
  { id: "chilenje", name: "Chilenje Secondary", divisions: single("high_school"), campuses: 1, learners: 2104, plan: "Growth", status: "Active" },
  { id: "northview", name: "Northview Primary", divisions: single("primary"), campuses: 1, learners: 684, plan: "Starter", status: "Trial" },
  { id: "mukuba", name: "Mukuba Learning Centre", divisions: single("college"), campuses: 2, learners: 950, plan: "Growth", status: "Active" },
  { id: "kafue-valley", name: "Kafue Valley College", divisions: single("college"), campuses: 3, learners: 1720, plan: "Enterprise", status: "Active" },
  { id: "zambezi-university", name: "Zambezi University", divisions: single("university"), campuses: 3, learners: 6400, plan: "Enterprise", status: "Active" },
];

// Data sanity: every tenant keeps one academic system across its divisions.
TENANTS.forEach((t) => assertSharedSystem(t.name, t.divisions));

export const mockTenantDirectory: TenantDirectory = {
  async list() {
    return TENANTS;
  },
};
