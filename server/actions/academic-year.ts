"use server";

import { cookies } from "next/headers";
import { ACADEMIC_YEAR_COOKIE } from "@/lib/academic-year";

/**
 * Stores the chosen year. The value is only format-checked here; the reader
 * (getAcademicYearState) ignores anything that isn't one of the tenant's years.
 * Setting a cookie in a Server Action re-renders the current route.
 */
export async function setAcademicYear(yearId: string) {
  if (!/^[A-Za-z0-9_-]{1,32}$/.test(yearId)) return;

  (await cookies()).set(ACADEMIC_YEAR_COOKIE, yearId, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
}