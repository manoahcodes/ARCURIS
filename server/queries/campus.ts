import { cache } from "react";
import { cookies } from "next/headers";
import { CAMPUS_COOKIE } from "@/lib/campus";
import { campuses } from "@/server/repositories";
import { getTenantContext } from "@/server/request-context";
import type { Campus } from "@/types/tenant";

export type CampusState = {
  list: Campus[];
  selected: Campus | undefined;
};

/**
 * The user's campuses plus the one they picked. A cookie naming a campus the
 * user cannot access is ignored. With no valid cookie it falls back to the
 * campus from the session, then to the first one.
 * Reads the cookie, so call it inside a <Suspense> boundary.
 */
export const getCampusState = cache(
  async (sessionCampusName: string): Promise<CampusState> => {
    const ctx = await getTenantContext();
    const list = await campuses.list(ctx);
    const saved = (await cookies()).get(CAMPUS_COOKIE)?.value;

    const selected =
      list.find((c) => c.id === saved) ??
      list.find((c) => c.name === sessionCampusName) ??
      list[0];

    return { list, selected };
  },
);