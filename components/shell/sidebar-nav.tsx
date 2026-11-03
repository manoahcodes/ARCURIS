import { ROLES, hrefFor, type RoleKey } from "@/config/navigation";
import { NavLink } from "./nav-link";

/** The role's primary nav. Without counts it renders plain links. */
export function SidebarNav({
  role,
  counts = {},
}: {
  role: RoleKey;
  counts?: Record<string, number>;
}) {
  return (
    <nav className="mt-2 flex flex-col gap-1" aria-label="Primary">
      {ROLES[role].nav.map((item, i) => (
        <NavLink
          key={item.label}
          href={hrefFor(role, item.slug)}
          label={item.label}
          exact={i === 0}
          badge={counts[item.label]}
        />
      ))}
    </nav>
  );
}