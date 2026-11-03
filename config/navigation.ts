export const ROLE_KEYS = [
  "platform",
  "teacher",
  "bursar",
  "cashier",
  "parent",
  "student",
] as const;

export type RoleKey = (typeof ROLE_KEYS)[number];

export type NavItem = { label: string; slug: string };

/** What the top bar shows next to the search box. */
export type TopbarContext =
  | { kind: "academicYear" } // dropdown: "Academic Year 2026"
  | { kind: "scope"; label: string } // static chip, e.g. "All tenants"
  | { kind: "none" }; // nothing shown

/** Config form: points at an existing nav item by its label. */
export type QuickAction = { label: string; navLabel: string };

/** Resolved form: safe to pass to components. */
export type ResolvedQuickAction = { label: string; href: string };

export type TopbarConfig = {
  searchPlaceholder: string;
  context: TopbarContext;
  /** One-click shortcut to the role's most common task. Omit for none. */
  quickAction?: QuickAction;
  /** Shows the child switcher (parents only). */
  childSwitcher?: boolean;
};

/** Config form: links point at an existing nav item by its label. */
export type UserMenuEntry =
  | { kind: "link"; label: string; navLabel: string }
  | { kind: "signout" };

/** Resolved form: safe to pass to a client component. */
export type ResolvedUserMenuEntry =
  | { kind: "link"; label: string; href: string }
  | { kind: "signout" };

export type RoleConfig = {
  /** Shown in the sidebar subtitle, breadcrumb and user menu */
  label: string;
  nav: NavItem[];
  topbar: TopbarConfig;
  /**
   * Sidebar card lets the user switch between campuses they work at.
   * Off for roles tied to one campus (students) or whose campus follows another
   * choice (parents: the selected child). Those roles get a fixed card.
   */
  campusSwitcher?: boolean;
  /** Entries in the user dropdown. Sign out is appended automatically. */
  userMenu: UserMenuEntry[];
};

const slugify = (label: string) =>
  label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** The first label is always the role's overview page (empty slug). */
const nav = (labels: string[]): NavItem[] =>
  labels.map((label, i) => ({ label, slug: i === 0 ? "" : slugify(label) }));

const link = (label: string, navLabel: string = label): UserMenuEntry => ({
  kind: "link",
  label,
  navLabel,
});

export const ROLES: Record<RoleKey, RoleConfig> = {
  platform: {
    label: "Platform Admin",
    nav: nav([
      "Overview",
      "Tenants & schools",
      "Subscriptions",
      "Platform users",
      "Usage & capacity",
      "Support queue",
      "Audit logs",
      "Platform settings",
    ]),
    topbar: {
      searchPlaceholder: "Search tenants, schools, users, tickets...",
      // The sidebar card already says "All tenants", so the top bar shows no chip.
      context: { kind: "none" },
      quickAction: { label: "Add tenant", navLabel: "Tenants & schools" },
    },
    userMenu: [
      link("Platform settings"),
      link("Audit logs"),
      link("Support queue"),
    ],
  },
  teacher: {
    label: "Teacher",
    nav: nav([
      "My dashboard",
      "My classes",
      "Class register",
      "Lesson planner",
      "Assignments",
      "Assessments",
      "Gradebook",
      "Learning resources",
    ]),
    topbar: {
      searchPlaceholder: "Search learners, classes, assignments...",
      context: { kind: "academicYear" },
      quickAction: { label: "Take register", navLabel: "Class register" },
    },
    campusSwitcher: true,
    userMenu: [
      link("My classes"),
      link("Lesson planner"),
      link("Gradebook"),
    ],
  },
  bursar: {
    label: "Bursar",
    nav: nav([
      "Finance overview",
      "Fee structures",
      "Student accounts",
      "Record payment",
      "Invoices",
      "Debtors",
      "Reconciliation",
      "Financial reports",
    ]),
    topbar: {
      searchPlaceholder: "Search students, invoices, receipts...",
      context: { kind: "academicYear" },
      quickAction: { label: "Record payment", navLabel: "Record payment" },
    },
    campusSwitcher: true,
    userMenu: [
      link("Fee structures"),
      link("Reconciliation"),
      link("Financial reports"),
    ],
  },
  cashier: {
    label: "Cashier",
    nav: nav([
      "Cashier home",
      "Collect payment",
      "Find student",
      "Print receipt",
      "Today's transactions",
      "Cash-up",
      "Payment methods",
    ]),
    topbar: {
      searchPlaceholder: "Find learner by student number or name...",
      context: { kind: "none" },
      quickAction: { label: "Collect payment", navLabel: "Collect payment" },
    },
    campusSwitcher: true,
    userMenu: [
      link("Today's transactions"),
      link("End-of-day cash-up", "Cash-up"),
      link("Payment methods"),
    ],
  },
  parent: {
    label: "Parent",
    nav: nav([
      "Family overview",
      "My children",
      "Attendance",
      "Academic progress",
      "Fee statements",
      "School calendar",
      "Messages",
      "Profile",
    ]),
    topbar: {
      searchPlaceholder: "Search messages, notices, statements...",
      context: { kind: "academicYear" },
      childSwitcher: true,
    },
    userMenu: [
      link("My profile", "Profile"),
      link("Messages"),
      link("Fee statements"),
    ],
  },
  student: {
    label: "Student",
    nav: nav([
      "My home",
      "My timetable",
      "Assignments",
      "Results & grades",
      "Attendance",
      "Learning resources",
      "School notices",
      "My profile",
    ]),
    topbar: {
      searchPlaceholder: "Search assignments, resources, notices...",
      context: { kind: "academicYear" },
    },
    userMenu: [
      link("My profile"),
      link("School notices"),
      link("Results & grades"),
    ],
  },
};

export const isRoleKey = (value: string): value is RoleKey =>
  (ROLE_KEYS as readonly string[]).includes(value);

export const hrefFor = (role: RoleKey, slug: string) =>
  slug ? `/${role}/${slug}` : `/${role}`;

/**
 * Finds the href of a nav item by its label. A label that doesn't match throws,
 * so a typo fails the build instead of shipping a dead link.
 */
export function hrefForNavLabel(
  role: RoleKey,
  navLabel: string,
  source = "Reference",
): string {
  const target = ROLES[role].nav.find((n) => n.label === navLabel);
  if (!target) {
    throw new Error(`${source} for "${role}" references unknown nav item "${navLabel}"`);
  }
  return hrefFor(role, target.slug);
}

/** Turns a role's userMenu config into hrefs. Sign out is always appended last. */
export function resolveUserMenu(role: RoleKey): ResolvedUserMenuEntry[] {
  const resolved = ROLES[role].userMenu.map((entry): ResolvedUserMenuEntry => {
    if (entry.kind === "signout") return entry;
    return {
      kind: "link",
      label: entry.label,
      href: hrefForNavLabel(role, entry.navLabel, "userMenu"),
    };
  });

  return [...resolved, { kind: "signout" }];
}

/** The role's quick action with its href, or undefined when the role has none. */
export function resolveQuickAction(role: RoleKey): ResolvedQuickAction | undefined {
  const action = ROLES[role].topbar.quickAction;
  if (!action) return undefined;
  return {
    label: action.label,
    href: hrefForNavLabel(role, action.navLabel, "quickAction"),
  };
}