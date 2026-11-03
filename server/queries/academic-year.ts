import { cache } from "react";
import { cookies } from "next/headers";
import { ACADEMIC_YEAR_COOKIE } from "@/lib/academic-year";
import { academicYears } from "@/server/repositories";
import { getTenantContext } from "@/server/request-context";
import type { AcademicYear } from "@/types/directory";

export type AcademicYearState = {
  years: AcademicYear[];
  selected: AcademicYear | undefined;
};

/**
 * The tenant's years plus the one the user picked.
 * An unknown or missing cookie falls back to the tenant's current year.
 * Reads the cookie, so call it inside a <Suspense> boundary.
 * Dashboard queries should call this to scope their data by year.
 */
export const getAcademicYearState = cache(
  async (): Promise<AcademicYearState> => {
    const ctx = await getTenantContext();
    const years = await academicYears.list(ctx);
    const saved = (await cookies()).get(ACADEMIC_YEAR_COOKIE)?.value;

    const selected =
      years.find((y) => y.id === saved) ??
      years.find((y) => y.isCurrent) ??
      years[0];

    return { years, selected };
  },
);