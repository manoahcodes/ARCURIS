import type { PlatformScreen } from "@/types/platform";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { DataTable } from "./data-table";

/** Renders a Platform Admin list screen: description, actions, KPIs and tables. */
export function PlatformScreenView({ screen }: { screen: PlatformScreen }) {
  return (
    <div className="mt-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-3xl text-[16px] text-muted">{screen.description}</p>
        {screen.actions && screen.actions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {screen.actions.map((label) => (
              // Stubs: the create/edit forms are not built yet.
              <button
                key={label}
                type="button"
                disabled
                title="Not built yet"
                className="rounded-lg bg-brand px-4 py-2 text-[15px] font-semibold text-white opacity-50"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {screen.kpis && screen.kpis.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {screen.kpis.map((kpi) => (
            <KpiCard key={kpi.title} {...kpi} />
          ))}
        </div>
      )}

      {screen.tables.map((section) => (
        <DataTable key={section.title} section={section} />
      ))}
    </div>
  );
}
