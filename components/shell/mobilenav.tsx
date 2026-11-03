"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";

type Props = {
  /** Logo block, rendered by the server (same component as the sidebar). */
  brand: ReactNode;
  /** Replaces the top bar's year/child controls, which are hidden on small screens. */
  contextSlot?: ReactNode;
  /** The shared sidebar body: tenant card and primary nav. */
  children: ReactNode;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileNav({ brand, contextSlot, children }: Props) {
  const pathname = usePathname();
  // The drawer counts as open only on the page it was opened on, so any
  // navigation closes it without an effect.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = (restoreFocus: boolean) => {
    setOpenedAt(null);
    if (restoreFocus) triggerRef.current?.focus();
  };

  // Move focus into the drawer when it opens.
  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      close(true);
      return;
    }
    if (e.key !== "Tab" || !panelRef.current) return;

    // Keep Tab inside the drawer while it is open.
    const focusable = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label="Open navigation"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpenedAt(pathname)}
        className="flex size-10 shrink-0 items-center justify-center rounded-lg text-ink hover:bg-canvas lg:hidden"
      >
        <Menu size={22} aria-hidden />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" onKeyDown={onKeyDown}>
          <div
            className="absolute inset-0 bg-black/40"
            aria-hidden
            onClick={() => close(true)}
          />

          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-navy text-white shadow-xl"
          >
            <div className="flex items-start justify-between px-3 pb-4 pt-6">
              {brand}
              <button
                ref={closeRef}
                type="button"
                aria-label="Close navigation"
                onClick={() => close(true)}
                className="flex size-9 shrink-0 items-center justify-center rounded-lg text-white/80 hover:bg-white/10"
              >
                <X size={20} aria-hidden />
              </button>
            </div>

            {contextSlot && <div className="mx-3 mb-2">{contextSlot}</div>}

            {/* Any link click closes the drawer, including a link to the current page. */}
            <div
              className="flex flex-1 flex-col overflow-y-auto px-3 pb-6"
              onClick={(e) => {
                if ((e.target as HTMLElement).closest("a")) close(false);
              }}
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}