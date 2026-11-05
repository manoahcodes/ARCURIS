import type { TenantSummary } from "@/types/platform";
import type { TenantDirectory } from "./platform-types";

export const TENANTS: TenantSummary[] = [
  { id: "lusaka-hills", name: "Lusaka Hills Academy", institutionType: "high_school", campuses: 2, learners: 1248, plan: "Growth", status: "Active" },
  { id: "chilenje", name: "Chilenje Secondary", institutionType: "secondary", campuses: 1, learners: 2104, plan: "Growth", status: "Active" },
  { id: "northview", name: "Northview Primary", institutionType: "primary", campuses: 1, learners: 684, plan: "Starter", status: "Trial" },
  { id: "mukuba", name: "Mukuba Learning Centre", institutionType: "college", campuses: 2, learners: 950, plan: "Growth", status: "Active" },
  { id: "kafue-valley", name: "Kafue Valley School", institutionType: "tertiary", campuses: 3, learners: 1720, plan: "Enterprise", status: "Active" },
  { id: "zambezi-university", name: "Zambezi University", institutionType: "university", campuses: 3, learners: 6400, plan: "Enterprise", status: "Active" },
];

export const mockTenantDirectory: TenantDirectory = {
  async list() {
    return TENANTS;
  },
};
