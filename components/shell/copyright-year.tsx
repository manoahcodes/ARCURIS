"use client";

import { useSyncExternalStore } from "react";

// Year in Lusaka time, so it flips at local midnight on 1 January.
const formatter = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  timeZone: "Africa/Lusaka",
});

const subscribe = () => () => {};
const getSnapshot = () => formatter.format(new Date());
// The server never reads the clock (Cache Components forbids it), so the
// server render leaves the year empty and the browser fills it in.
const getServerSnapshot = () => "";

export function CopyrightYear() {
  const year = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return <>{year}</>;
}