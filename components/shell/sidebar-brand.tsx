import Link from "next/link";
import { ROLES, hrefFor, type RoleKey } from "@/config/navigation";

/** Software name and signed-in user. Links to the role's overview page. */
export function SidebarBrand({ role, userName }: { role: RoleKey; userName: string }) {
  return (
    <Link
      href={hrefFor(role, "")}
      aria-label={`ACURIS, ${userName}. Go to ${ROLES[role].label} overview`}
      className="block min-w-0 rounded-lg px-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white group-data-[collapsed=true]/sidebar:px-0 group-data-[collapsed=true]/sidebar:text-center"
    >
      <div className="flex items-baseline gap-2 group-data-[collapsed=true]/sidebar:justify-center">
        <span className="text-xl font-bold leading-tight tracking-wide text-white">
          {/* In the collapsed rail only the first letter fits. */}
          <span className="group-data-[collapsed=true]/sidebar:hidden">ACURIS</span>
          <span aria-hidden className="hidden group-data-[collapsed=true]/sidebar:inline">
            A
          </span>
        </span>
      </div>
      <div className="truncate text-sm leading-snug text-slate-300 group-data-[collapsed=true]/sidebar:hidden">
        {userName}
      </div>
    </Link>
  );
}