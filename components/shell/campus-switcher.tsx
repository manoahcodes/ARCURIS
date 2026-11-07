"use client";

import { useEffect, useId, useOptimistic, useRef, useState, useTransition } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/format";
import { setCampus } from "@/server/actions/campus";
import type { Campus } from "@/types/tenant";
import { TenantCardFace, tenantCardClass } from "./tenant-card";

type Props = {
  tenantName: string;
  campuses: Campus[];
  selectedId: string;
};

export function CampusSwitcher({ tenantName, campuses, selectedId }: Props) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [optimisticId, setOptimisticId] = useOptimistic(selectedId);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const selected = campuses.find((c) => c.id === optimisticId) ?? campuses[0];

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
        aria-label={`Switch campus. Current: ${selected.name}`}
        onClick={() => setOpen((v) => !v)}
        className={cn(tenantCardClass, "hover:bg-white/5")}
      >
        <TenantCardFace title={tenantName} subtitle={selected.name} chevron />
      </button>

      {open && (
        <div
          id={panelId}
          className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-navy-line bg-navy-raised py-1 shadow-lg"
        >
          <ul>
            {campuses.map((c) => {
              const current = c.id === optimisticId;
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    aria-current={current ? "true" : undefined}
                    onClick={() => {
                      setOpen(false);
                      buttonRef.current?.focus();
                      if (current) return;
                      startTransition(async () => {
                        setOptimisticId(c.id);
                        await setCampus(c.id);
                      });
                    }}
                    className="flex w-full items-center justify-between gap-2 px-4 py-2 text-left text-sm text-slate-200 hover:bg-white/10"
                  >
                    <span className="min-w-0 truncate" title={c.name}>
                      {c.name}
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