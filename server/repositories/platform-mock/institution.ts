import { table, flavour, type Builder } from "./shared";

const campuses: Builder = (ctx) => {
  const f = flavour(ctx);
  return {
    description: `Campuses of ${f.tenantName}.`,
    actions: ["Add campus"],
    tables: [
      table(
        "Campuses",
        ["Campus", "Code", "Location", "Departments", "Learners", "Status"],
        [
          ["Main Campus", "MAIN", "Lusaka", "9", "1,240", "Active"],
          ["North Campus", "NORTH", "Kitwe", "5", "680", "Active"],
          ["Distance Learning Centre", "DLC", "Online", "3", "320", "Pending"],
        ],
        { statusColumn: "Status" },
      ),
    ],
  };
};

const schools: Builder = (ctx) => {
  const f = flavour(ctx);
  return {
    description: f.tertiary
      ? "Faculties and schools within the institution."
      : "Sections of the school (for example junior and senior).",
    actions: [f.tertiary ? "Add school" : "Add section"],
    tables: [
      table(
        f.tertiary ? "Schools" : "Sections",
        ["Name", "Head", "Departments", f.terms.programmes, "Learners", "Status"],
        f.tertiary
          ? [
              ["School of Business", "Dr. Mulenga", "3", "6", "1,420", "Active"],
              ["School of Engineering", "Prof. Zimba", "4", "5", "980", "Active"],
              ["School of Health Sciences", "Dr. Tembo", "2", "4", "760", "Active"],
              ["School of Education", "Dr. Phiri", "2", "3", "540", "Active"],
            ]
          : [
              ["Junior section (Grades 8–9)", "Mrs. Banda", "5", "6", "480", "Active"],
              ["Senior section (Grades 10–12)", "Mr. Chanda", "6", "8", "620", "Active"],
            ],
        { statusColumn: "Status" },
      ),
    ],
  };
};

const departments: Builder = (ctx) => {
  const f = flavour(ctx);
  const rows = f.tertiary
    ? [
        ["Computer Science", "School of Engineering", "Dr. Kunda", "Main Campus", "14", "Active"],
        ["Accounting & Finance", "School of Business", "Mrs. Lungu", "Main Campus", "11", "Active"],
        ["Civil Engineering", "School of Engineering", "Eng. Zimba", "North Campus", "9", "Active"],
        ["Nursing", "School of Health Sciences", "Sr. Mwansa", "Main Campus", "12", "Active"],
      ]
    : [
        ["Mathematics", "Senior section", "Mr. Chanda", "Main Campus", "8", "Active"],
        ["English", "Senior section", "Mrs. Sakala", "Main Campus", "7", "Active"],
        ["Sciences", "Senior section", "Mr. Daka", "Main Campus", "9", "Active"],
        ["Humanities", "Junior section", "Mrs. Phiri", "North Campus", "6", "Active"],
        ["ICT", "Senior section", "Mr. Tembo", "Main Campus", "3", "Pending"],
      ];
  return {
    description: `Departments of ${f.tenantName}.`,
    actions: ["Add department"],
    tables: [
      table("Departments", ["Department", f.tertiary ? "School" : "Section", "Head", "Campus", "Staff", "Status"], rows, { statusColumn: "Status" }),
    ],
  };
};

export const institutionScreens: Record<string, Builder> = {
  "institution/campuses": campuses,
  "institution/schools": schools,
  "institution/departments": departments,
};
