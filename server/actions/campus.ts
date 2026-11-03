"use server";

import { cookies } from "next/headers";
import { CAMPUS_COOKIE } from "@/lib/campus";

/**
 * Stores the chosen campus. The value is only format-checked here; the reader
 * (getCampusState) ignores anything that isn't one of the user's own campuses.
 * Setting a cookie in a Server Action re-renders the current route.
 */
export async function setCampus(campusId: string) {
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(campusId)) return;

  (await cookies()).set(CAMPUS_COOKIE, campusId, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
}