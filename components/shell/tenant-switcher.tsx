"use client";

import { useEffect, useId, useOptimistic, useRef, useState, useTransition } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/format";
import { setPlatformTenant } from "@/server/actions/platform-tenant";
import { TenantCardFace, tenantCardClass } from "./tenant-card";

export type TenantOption = { id: string; name: string; detail: string };

type Props = {
  /** First option is "All tenants" (id "all"); the rest are schools. */
  options: TenantOption[];
  selectedId: string;
};

/** Platform Admin's school picker. School-level screens follow the choice. */
export function TenantSwitcher({ options, selectedId }: Props) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [optimisticId, setOptimisticId] = useOptimistic(selectedId);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const selected = options.find((o) => o.id === optimisticId) ?? options[0];

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    // Tabbing out of the list closes it.
    const onFocusIn = (e: FocusEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-busy={pending}
        aria-label={`Switch school. Current: ${selected.name}`}
        onClick={() => setOpen((v) => !v)}
        className={cn(tenantCardClass, "hover:bg-white/5")}
      >
        <TenantCardFace title={selected.name} subtitle={selected.detail} chevron />
      </button>

      {open && (
        <div
          id={panelId}
          className="absolute inset-x-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-xl border border-navy-line bg-navy-raised py-1 shadow-lg"
        >
          <ul>
            {options.map((o) => {
              const current = o.id === optimisticId;
              return (
                <li key={o.id}>
                  <button
                    type="button"
                    aria-current={current ? "true" : undefined}
                    onClick={() => {
                      setOpen(false);
                      buttonRef.current?.focus();
                      if (current) return;
                      startTransition(async () => {
                        setOptimisticId(o.id);
                        await setPlatformTenant(o.id);
                      });
                    }}
                    className="flex w-full items-center justify-between gap-2 px-4 py-2 text-left text-sm text-slate-200 hover:bg-white/10"
                  >
                    <span className="min-w-0">
                      <span className="block truncate" title={o.name}>
                        {o.name}
                      </span>
                      <span className="block truncate text-xs text-slate-400" title={o.detail}>
                        {o.detail}
                      </span>
                    </span>
                    {current && <Check size={14} aria-hidden className="shrink-0" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
