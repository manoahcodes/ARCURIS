"use client";

import { useRef, useState } from "react";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/format";
import {
  SIDEBAR_COOKIE,
  SIDEBAR_MAX,
  SIDEBAR_MIN,
  clampSidebarWidth,
} from "@/lib/sidebar-width";

const KEY_STEP = 16;
const KEY_STEP_BIG = 48;

/**
 * Desktop sidebar with a drag handle on its right edge.
 *  - Drag, or focus the handle and use Left/Right (Shift for bigger steps).
 *  - Double-click or Enter fits the width to the longest visible text.
 *  - Home / End jump to the smallest / largest width.
 * The width is saved in a cookie when a change ends, and the server reads it
 * back, so there is no jump on the next load.
 */
export function ResizableSidebar({
  initialWidth,
  children,
}: {
  initialWidth: number;
  children: React.ReactNode;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(initialWidth);
  const [dragging, setDragging] = useState(false);

  const save = (px: number) => {
    document.cookie = `${SIDEBAR_COOKIE}=${px}; path=/; max-age=31536000; samesite=lax`;
  };

  const commit = (px: number) => {
    const next = clampSidebarWidth(px);
    setWidth(next);
    save(next);
  };

  /** Measures the longest line of text the sidebar is showing right now. */
  const fitToContent = () => {
    const box = boxRef.current;
    if (!box) return;
    const aside = box.firstElementChild as HTMLElement | null;
    const previous = box.style.width;
    box.style.width = "max-content";
    const wanted = box.getBoundingClientRect().width;
    box.style.width = previous;
    // max-content leaves out a vertical scrollbar, so add its width back.
    const scrollbar = aside ? aside.offsetWidth - aside.clientWidth : 0;
    commit(wanted + scrollbar);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging || !boxRef.current) return;
    setWidth(clampSidebarWidth(e.clientX - boxRef.current.getBoundingClientRect().left));
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setDragging(false);
    save(width);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? KEY_STEP_BIG : KEY_STEP;
    switch (e.key) {
      case "ArrowLeft":
        commit(width - step);
        break;
      case "ArrowRight":
        commit(width + step);
        break;
      case "Home":
        commit(SIDEBAR_MIN);
        break;
      case "End":
        commit(SIDEBAR_MAX);
        break;
      case "Enter":
        fitToContent();
        break;
      default:
        return;
    }
    e.preventDefault();
  };

  return (
    <div
      ref={boxRef}
      style={{ width }}
      className={cn(
        "relative hidden h-full shrink-0 lg:block",
        // While dragging, keep the text from being selected and the cursor steady.
        dragging && "cursor-col-resize select-none",
      )}
    >
      <aside className="flex h-full w-full flex-col overflow-y-auto bg-navy px-3 py-5">
        {children}
      </aside>

      <div
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize sidebar"
        aria-valuenow={width}
        aria-valuemin={SIDEBAR_MIN}
        aria-valuemax={SIDEBAR_MAX}
        tabIndex={0}
        title="Drag to resize. Double-click to fit the text."
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={fitToContent}
        onKeyDown={onKeyDown}
        className="group absolute inset-y-0 -right-2 z-30 flex w-4 cursor-col-resize touch-none items-center justify-center focus-visible:outline-none"
      >
        {/* The edge line shows on hover, focus and while dragging. */}
        <span
          aria-hidden
          className={cn(
            "absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-brand opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100",
            dragging && "opacity-100",
          )}
        />
        {/* The visible grip is the resize button. */}
        <span
          aria-hidden
          className={cn(
            "relative flex h-10 w-4 items-center justify-center rounded-full border border-navy-line bg-navy-raised text-slate-300 shadow-sm group-hover:border-brand group-hover:text-white group-focus-visible:border-brand group-focus-visible:text-white group-focus-visible:ring-2 group-focus-visible:ring-brand",
            dragging && "border-brand text-white",
          )}
        >
          <GripVertical size={12} />
        </span>
      </div>
    </div>
  );
}
