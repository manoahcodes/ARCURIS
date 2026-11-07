"use client";

import { createContext, useContext } from "react";

export type SidebarState = {
  collapsed: boolean;
  /** Opens a collapsed sidebar. Used by controls that need the full width (school switcher). */
  expand: () => void;
};

/**
 * Whether the desktop sidebar is collapsed to its icon rail. Only the desktop
 * sidebar provides it, so the mobile drawer always gets the expanded default.
 */
export const SidebarStateContext = createContext<SidebarState>({
  collapsed: false,
  expand: () => {},
});

export const useSidebarState = () => useContext(SidebarStateContext);
