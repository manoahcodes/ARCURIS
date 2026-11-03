"use server";

import { cookies } from "next/headers";
import { CHILD_COOKIE } from "@/lib/child";

/**
 * Stores the chosen child. The value is only format-checked here; the reader
 * (getChildState) ignores anything that isn't one of the guardian's own children.
 * Setting a cookie in a Server Action re-renders the current route.
 */
export async function setChild(childId: string) {
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(childId)) return;

  (await cookies()).set(CHILD_COOKIE, childId, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
}