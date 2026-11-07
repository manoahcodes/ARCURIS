import { ChevronDown, Diamond } from "lucide-react";
import { RailTooltip } from "./rail-tooltip";

/** Shared look of the card: the switcher button and the static card both use it. */
export const tenantCardClass =
  "flex w-full min-w-0 flex-col gap-1 rounded-xl border border-navy-line bg-navy-raised px-4 py-3 text-left group-data-[collapsed=true]/sidebar:items-center group-data-[collapsed=true]/sidebar:px-0";

export function TenantCardFace({
  title,
  subtitle,
  chevron = false,
}: {
  title: string;
  subtitle: string;
  chevron?: boolean;
}) {
  return (
    <>
      {/* Long names are cut with an ellipsis on one line; the full text is in the tooltip. */}
      <span className="flex min-w-0 items-center gap-2 font-medium text-white">
        <Diamond size={16} aria-hidden className="shrink-0" />
        <span className="min-w-0 truncate group-data-[collapsed=true]/sidebar:hidden" title={title}>
          {title}
        </span>
      </span>
      <span className="flex min-w-0 items-center gap-1 pl-6 text-sm text-slate-300 group-data-[collapsed=true]/sidebar:hidden">
        <span className="min-w-0 truncate" title={subtitle}>
          {subtitle}
        </span>
        {chevron && <ChevronDown size={12} aria-hidden className="shrink-0" />}
      </span>
    </>
  );
}

/** Non-interactive card: shown when there is nothing to switch. */
export function StaticTenantCard({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <RailTooltip label={title} detail={subtitle}>
      <div className={tenantCardClass}>
        <TenantCardFace title={title} subtitle={subtitle} />
      </div>
    </RailTooltip>
  );
}