/** Desktop sidebar width in pixels. The width is remembered in a cookie so the server can render it. */
export const SIDEBAR_COOKIE = "stecia_sidebar_width";
export const SIDEBAR_MIN = 240;
export const SIDEBAR_MAX = 440;
export const SIDEBAR_DEFAULT = 280;

export const clampSidebarWidth = (px: number): number =>
  Math.min(SIDEBAR_MAX, Math.max(SIDEBAR_MIN, Math.round(px)));

/** Reads the cookie value. Anything that is not a plain number gives the default. */
export function parseSidebarWidth(value: string | undefined): number {
  if (!value || !/^\d{2,4}$/.test(value)) return SIDEBAR_DEFAULT;
  return clampSidebarWidth(Number(value));
}

/** Collapsed icon rail. The expanded width above is kept, so expanding returns to it. */
export const SIDEBAR_COLLAPSED_COOKIE = "stecia_sidebar_collapsed";
export const SIDEBAR_COLLAPSED_WIDTH = 72;

export const parseSidebarCollapsed = (value: string | undefined): boolean => value === "1";
