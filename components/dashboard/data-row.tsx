import { ArrowRight } from "lucide-react";
import { Fragment } from "react";
import { cn } from "@/lib/format";
import type { Row } from "@/types/dashboard";

export function DataRow({ row, emphasised }: { row: Row; emphasised?: boolean }) {
  const { cells, sep = "dot", trailingArrow } = row;

  return (
    <li
      className={cn(
        "flex flex-wrap items-center gap-y-1 border-t border-line py-4 text-[16px] first:border-t-0",
        emphasised ? "font-medium text-ink" : "text-muted",
      )}
    >
      {cells.map((cell, i) => (
        <Fragment key={i}>
          {i > 0 &&
            (sep === "arrow" ? (
              <ArrowRight size={15} className="mx-3 shrink-0" aria-hidden />
            ) : (
              <span className="mx-3 text-xs" aria-hidden>
                •
              </span>
            ))}
          <span>{cell}</span>
        </Fragment>
      ))}
      {trailingArrow && <ArrowRight size={15} className="ml-3 shrink-0" aria-hidden />}
    </li>
  );
}
