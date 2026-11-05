import { INSTITUTIONS, INSTITUTION_TYPES, LEVEL_LABELS, systemLabel } from "@/config/institution";
import { K, table, type Builder } from "./shared";

const tenants: Builder = ({ tenants }) => ({
  description: "Every school on ACURIS. The institution type decides whether it runs terms or semesters.",
  actions: ["Add tenant"],
  kpis: [
    { title: "Tenants", caption: "On the platform", value: String(tenants.length), note: `${tenants.filter((t) => t.status === "Active").length} active` },
    { title: "Total learners", caption: "Across tenants", value: tenants.reduce((n, t) => n + t.learners, 0).toLocaleString("en-US") },
    { title: "Semester system", caption: "Tertiary tenants", value: String(tenants.filter((t) => INSTITUTIONS[t.institutionType].system === "semester").length) },
    { title: "Term system", caption: "School-level tenants", value: String(tenants.filter((t) => INSTITUTIONS[t.institutionType].system === "term").length) },
  ],
  tables: [
    table(
      "Tenants & schools",
      ["School", "Institution type", "Academic system", "Campuses", "Learners", "Plan", "Status"],
      tenants.map((t) => [
        t.name,
        INSTITUTIONS[t.institutionType].label,
        systemLabel(t.institutionType),
        String(t.campuses),
        t.learners.toLocaleString("en-US"),
        t.plan,
        t.status,
      ]),
      { statusColumn: "Status" },
    ),
  ],
});

const subscriptions: Builder = ({ tenants }) => {
  const price = { Starter: 1500, Growth: 4200, Enterprise: 11800 } as const;
  return {
    description: "Plans, renewals and billing status for every school.",
    actions: ["Change plan"],
    tables: [
      table(
        "Subscriptions",
        ["School", "Plan", "Billing", "Renewal date", "Amount", "Status"],
        tenants.map((t, i) => [
          t.name,
          t.plan,
          "Monthly",
          `${String(10 + i * 4).padStart(2, "0")} Nov 2026`,
          K(price[t.plan]),
          t.status === "Trial" ? "Trial" : "Paid",
        ]),
        { statusColumn: "Status" },
      ),
    ],
  };
};

const platformUsers: Builder = () => ({
  description: "People who run the ACURIS platform itself (not school staff).",
  actions: ["Invite platform user"],
  tables: [
    table(
      "Platform users",
      ["Name", "Role", "Email", "Last active", "Status"],
      [
        ["Platform Admin", "Super admin", "admin@acuris.example", "Today 08:42", "Active"],
        ["Mercy Kangwa", "Support lead", "mercy@acuris.example", "Today 07:55", "Active"],
        ["Joseph Daka", "Billing", "joseph@acuris.example", "Yesterday", "Active"],
        ["Ruth Sinkala", "Onboarding", "ruth@acuris.example", "02 Nov 2026", "Pending"],
      ],
      { statusColumn: "Status" },
    ),
  ],
});

const usage: Builder = ({ tenants }) => ({
  description: "Storage and learner capacity per school.",
  tables: [
    table(
      "Usage & capacity",
      ["School", "Learners", "Learner limit", "Storage used", "Status"],
      tenants.map((t, i) => {
        const limit = t.plan === "Starter" ? 1000 : t.plan === "Growth" ? 3000 : 10000;
        const gb = [42, 18, 6, 12, 55, 120][i] ?? 10;
        return [
          t.name,
          t.learners.toLocaleString("en-US"),
          limit.toLocaleString("en-US"),
          `${gb} GB`,
          gb > 50 ? "Review" : "Active",
        ];
      }),
      { statusColumn: "Status" },
    ),
  ],
});

const support: Builder = ({ tenants }) => ({
  description: "Open support tickets from schools.",
  actions: ["New ticket"],
  tables: [
    table(
      "Support queue",
      ["Ticket", "School", "Subject", "Priority", "Opened", "Status"],
      [
        ["#SUP-1048", tenants[1]?.name ?? "", "Receipts not printing", "High", "Today 07:50", "Open"],
        ["#SUP-1047", tenants[0]?.name ?? "", "Import learners from CSV", "Medium", "Yesterday", "In progress"],
        ["#SUP-1045", tenants[4]?.name ?? "", "Reset registrar password", "Low", "02 Nov 2026", "Resolved"],
      ],
      { statusColumn: "Status" },
    ),
  ],
});

const settings: Builder = () => ({
  description: "Platform-wide defaults. School-specific settings are managed per tenant.",
  actions: ["Edit settings"],
  tables: [
    table(
      "Institution types",
      ["Institution type", "Level", "Grades", "Academic system", "Period label"],
      INSTITUTION_TYPES.map((type) => {
        const info = INSTITUTIONS[type];
        return [
          info.label,
          LEVEL_LABELS[info.level],
          info.grades ?? "—",
          systemLabel(type),
          info.system === "semester" ? "Semester" : "Term",
        ];
      }),
      { note: "Primary (grades 1–7) is for smaller tenants. University and College are Tertiary and use semesters; Primary and High School use terms." },
    ),
    table("General", ["Setting", "Value", "Scope"], [
      ["Default currency", "Zambian Kwacha (ZMW)", "Platform"],
      ["Time zone", "Africa/Lusaka", "Platform"],
      ["Academic year start", "January", "Platform"],
      ["Session timeout", "30 minutes", "Platform"],
      ["Audit trail retention", "7 years", "Platform"],
    ]),
  ],
});

const P = (...p: string[]) => p.join(" ");

const access: Builder = () => ({
  description: "Roles and what each can do in every module.",
  actions: ["Add role"],
  tables: [
    table(
      "Staff roles",
      ["Role", "Level", "Users", "Description"],
      [
        ["Platform Admin", "Level 1 · Executive", "4", "Runs the platform across all schools"],
        ["School Admin", "Level 1 · Executive", "128", "Principal / Vice-Chancellor: full control of one school"],
        ["Registrar", "Level 2 · Management", "96", "Admissions, registrations, results"],
        ["Bursar", "Level 2 · Management", "120", "Fees, bursaries, reconciliation"],
        ["Cashier", "Level 3 · Operational", "210", "Takes payments and issues receipts"],
        ["Lecturer / Teacher", "Level 3 · Operational", "2,340", "Teaching, assessments, marks entry"],
        ["Hostel Warden", "Level 3 · Operational", "58", "Room allocation and hostel records"],
        ["Student", "Learner", "48,620", "Own records only"],
        ["Parent", "Guardian", "31,400", "Linked children only"],
      ],
    ),
    table(
      "Permission matrix",
      ["Module", "Platform Admin", "School Admin", "Registrar", "Bursar", "Cashier", "Lecturer / Teacher", "Hostel Warden", "Student", "Parent"],
      [
        ["Campuses, Schools, Departments", P("V C E D"), P("V C E D"), "V", "V", "—", "V", "—", "—", "—"],
        ["Finances", P("V C E D A"), P("V C E A"), "V", P("V C E D A"), P("V C"), "—", "—", "V", "V"],
        ["Users", P("V C E D A"), P("V C E A"), P("V C E"), "V", "V", "V", "V", "V", "V"],
        ["Registrations", P("V C E D A"), P("V C E A"), P("V C E A"), "V", "—", "V", "—", "V C", "V"],
        ["Academics", P("V C E D A"), P("V C E A"), P("V C E"), "—", "—", P("V C E"), "—", "V", "V"],
        ["Examinations", P("V C E D A"), P("V C E A"), P("V C E A"), "V", "—", P("V C E"), "—", "V", "V"],
        ["Hostels", P("V C E D A"), P("V C E A"), "V", "V", "—", "—", P("V C E"), "V", "—"],
        ["Reports", "V", "V", "V", "V", "—", "V", "V", "—", "—"],
        ["Access control", P("V C E D A"), "V", "—", "—", "—", "—", "—", "—", "—"],
        ["Platform settings", P("V C E D A"), "—", "—", "—", "—", "—", "—", "—", "—"],
      ],
      { note: "V view · C create · E edit · D delete · A approve · — no access" },
    ),
  ],
});

export const platformScreens: Record<string, Builder> = {
  "tenants-and-schools": tenants,
  subscriptions,
  "platform-users": platformUsers,
  "usage-and-capacity": usage,
  "support-queue": support,
  "platform-settings": settings,
  "access-control": access,
};
