import { ChevronDown, Diamond } from "lucide-react";

/** Shared look of the card: the switcher button and the static card both use it. */
export const tenantCardClass =
  "flex w-full flex-col gap-1 rounded-xl border border-navy-line bg-navy-raised px-4 py-3 text-left";

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
      <span className="flex items-center gap-2 font-medium text-white">
        <Diamond size={16} aria-hidden /> {title}
      </span>
      <span className="flex items-center gap-1 pl-6 text-sm text-slate-300">
        {subtitle} {chevron && <ChevronDown size={12} aria-hidden />}
      </span>
    </>
  );
}

/** Non-interactive card: shown when there is nothing to switch. */
export function StaticTenantCard({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className={tenantCardClass}>
      <TenantCardFace title={title} subtitle={subtitle} />
    </div>
  );
}