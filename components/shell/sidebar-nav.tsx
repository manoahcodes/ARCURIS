import { GENERIC_TERMS, resolveLabel, type Terminology } from "@/config/institution";
import { ROLES, hrefFor, type RoleKey } from "@/config/navigation";
import { NavGroup } from "./nav-group";
import { NavLink } from "./nav-link";

/**
 * The role's primary nav. Without counts it renders plain links. Roles with
 * `navGroups` get the overview first, then expandable sections. Labels with
 * {tokens} are worded for the given terminology (Term vs Semester, and so on).
 */
export function SidebarNav({
  role,
  counts = {},
  terms = GENERIC_TERMS,
}: {
  role: RoleKey;
  counts?: Record<string, number>;
  terms?: Terminology;
}) {
  const config = ROLES[role];
  const groups = config.navGroups;

  if (!groups) {
    return (
      <nav className="mt-2 flex flex-col gap-1" aria-label="Primary">
        {config.nav.map((item, i) => (
          <NavLink
            key={item.label}
            href={hrefFor(role, item.slug)}
            label={resolveLabel(item.label, terms)}
            exact={i === 0}
            badge={counts[item.label]}
          />
        ))}
      </nav>
    );
  }

  const [overview, ...rest] = config.nav;

  return (
    <nav className="mt-2 flex flex-col gap-1" aria-label="Primary">
      <NavLink
        href={hrefFor(role, overview.slug)}
        label={resolveLabel(overview.label, terms)}
        exact
        badge={counts[overview.label]}
      />
      {groups.map((group) => (
        <NavGroup
          key={group.label}
          label={group.label}
          items={group.items.flatMap((label) => {
            const item = rest.find((n) => n.label === label);
            if (!item) return [];
            return [
              {
                href: hrefFor(role, item.slug),
                label: resolveLabel(item.label, terms),
                badge: counts[item.label],
              },
            ];
          })}
        />
      ))}
    </nav>
  );
}
