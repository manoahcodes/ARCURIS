import { LEARNERS, flavour, groupNames, table, type Builder } from "./shared";

const students: Builder = (ctx) => {
  const f = flavour(ctx);
  const groups = groupNames(f.tertiary);
  return {
    description: `Enrolled ${f.tertiary ? "students" : "learners"} at ${f.tenantName}.`,
    actions: ["Add student", "Import CSV"],
    tables: [
      table(
        "Students",
        ["Student no.", "Name", f.tertiary ? "Programme" : "Class", "Campus", "Status"],
        LEARNERS.map((l, i) => [
          l.no,
          l.name,
          groups[i],
          i % 3 === 2 ? "North Campus" : "Main Campus",
          i === 6 ? "Suspended" : "Active",
        ]),
        { statusColumn: "Status" },
      ),
    ],
  };
};

const staff: Builder = (ctx) => {
  const f = flavour(ctx);
  return {
    description: "Staff by role and level. A staff member's level decides which modules they can use.",
    actions: ["Add staff member"],
    tables: [
      table(
        "Staff",
        ["Name", "Staff no.", "Role", "Level", "Department", "Status"],
        [
          ["Dr. Alice Mulenga", "STF-0001", f.tertiary ? "Vice-Chancellor" : "Principal", "Level 1 · Executive", "Administration", "Active"],
          ["Mrs. Grace Mumba", "STF-0012", "Registrar", "Level 2 · Management", "Registry", "Active"],
          ["Mr. Joseph Phiri", "STF-0015", "Bursar", "Level 2 · Management", "Finance", "Active"],
          ["Ms. Esther Kunda", "STF-0042", "Cashier", "Level 3 · Operational", "Finance", "Active"],
          ["Mr. Peter Daka", "STF-0051", "Hostel Warden", "Level 3 · Operational", "Student Affairs", "Active"],
          ["Mrs. Ruth Sakala", "STF-0067", "Admissions Officer", "Level 3 · Operational", "Registry", "Pending"],
        ],
        { statusColumn: "Status" },
      ),
    ],
  };
};

const educators: Builder = (ctx) => {
  const f = flavour(ctx);
  const title = f.terms.educators;
  return {
    description: `${title} and the ${f.terms.courses.toLowerCase()} they teach.`,
    actions: [`Add ${title.toLowerCase().replace(/s$/, "")}`],
    tables: [
      table(
        title,
        ["Name", "Staff no.", "Department", f.terms.courses, "Weekly hours", "Status"],
        f.tertiary
          ? [
              ["Dr. Moses Kunda", "STF-0102", "Computer Science", "CSC101, CSC204", "14", "Active"],
              ["Mrs. Lucy Lungu", "STF-0108", "Accounting & Finance", "ACC201", "10", "Active"],
              ["Eng. Sam Zimba", "STF-0113", "Civil Engineering", "CIV210, CIV305", "16", "Active"],
              ["Sr. Mary Mwansa", "STF-0121", "Nursing", "NUR120", "12", "On leave"],
            ]
          : [
              ["Mr. Isaac Chanda", "STF-0102", "Mathematics", "MAT10 (9A, 10B, 11A)", "22", "Active"],
              ["Mrs. Joyce Sakala", "STF-0108", "English", "ENG10 (9A, 10B)", "20", "Active"],
              ["Mr. Paul Daka", "STF-0113", "Sciences", "PHY10, BIO10", "24", "Active"],
              ["Mrs. Agnes Phiri", "STF-0121", "Humanities", "Geography (8C)", "18", "On leave"],
            ],
        { statusColumn: "Status" },
      ),
    ],
  };
};

export const userScreens: Record<string, Builder> = {
  "users/students": students,
  "users/staff": staff,
  "users/educators": educators,
};
