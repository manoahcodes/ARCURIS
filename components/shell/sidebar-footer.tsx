import { CopyrightYear } from "./copyright-year";

/** One-line copyright, pinned to the bottom of the sidebar. */
export function SidebarFooter() {
  return (
    <div className="mt-auto pt-6 group-data-[collapsed=true]/sidebar:hidden">
      <footer className="border-t border-navy-line px-3 pt-3">
        <p className="text-xs text-slate-400">
            &copy; <CopyrightYear /> ACURIS. Powered by STECIA Digital Technologies.
        </p>
      </footer>
    </div>
  );
}