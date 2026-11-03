"use client";

import { useEffect, useState } from "react";
import { formatLongDate } from "@/lib/format";

/**
 * Shows today's date in Lusaka time. It is filled in after mount so the
 * server never has to read the clock while prerendering (which Next 16
 * rejects) and server/client output can't mismatch.
 */
export function TodayDate() {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(formatLongDate(new Date()));
  }, []);

  // Reserve space so the layout doesn't jump when the date appears.
  return <span className="inline-block min-w-[14ch]">{text || "\u00a0"}</span>;
}