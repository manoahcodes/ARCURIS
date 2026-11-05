import type { InstitutionType } from "@/config/institution";
import type { Kpi } from "./dashboard";

/** A school (tenant) as the Platform Admin sees it. */
export type TenantSummary = {
  id: string;
  name: string;
  institutionType: InstitutionType;
  campuses: number;
  learners: number;
  plan: "Starter" | "Growth" | "Enterprise";
  status: "Active" | "Trial" | "Suspended";
};

export type TableSection = {
  title: string;
  subtitle?: string;
  columns: string[];
  rows: string[][];
  /** Column header whose values render as coloured status chips. */
  statusColumn?: string;
  /** Short legend shown under the table. */
  note?: string;
};

/** Everything a list screen needs. Rendered by PlatformScreenView. */
export type PlatformScreen = {
  description: string;
  kpis?: Kpi[];
  tables: TableSection[];
  /** Primary actions. They are stubs until the forms are built. */
  actions?: string[];
};
