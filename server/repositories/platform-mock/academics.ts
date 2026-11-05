import { COURSE_ROWS, LEARNERS, flavour, table, type Builder } from "./shared";

const programmes: Builder = (ctx) => {
  const f = flavour(ctx);
  return {
    description: f.tertiary ? "Programmes offered by the institution." : "Classes and grades in the school.",
    actions: [f.tertiary ? "Add programme" : "Add class"],
    tables: [
      table(
        f.terms.programmes,
        f.tertiary
          ? ["Code", "Programme", "School", "Duration", "Students", "Status"]
          : ["Class", "Level", "Class teacher", "Room", "Learners", "Status"],
        f.tertiary
          ? [
              ["BSC-CS", "BSc Computer Science", "Engineering", "4 years", "420", "Active"],
              ["BA-ACF", "BA Accounting & Finance", "Business", "4 years", "510", "Active"],
              ["BENG-CIV", "BEng Civil Engineering", "Engineering", "5 years", "300", "Active"],
              ["BSC-NUR", "BSc Nursing", "Health Sciences", "4 years", "260", "Pending"],
            ]
          : [
              ["Grade 9A", "Junior", "Mr. Chanda", "A-101", "42", "Active"],
              ["Grade 10B", "Senior", "Mrs. Sakala", "B-203", "36", "Active"],
              ["Grade 11A", "Senior", "Mr. Daka", "A-102", "31", "Active"],
              ["Grade 12", "Senior", "Mrs. Phiri", "B-201", "38", "Active"],
            ],
        { statusColumn: "Status" },
      ),
    ],
  };
};

const courses: Builder = (ctx) => {
  const f = flavour(ctx);
  const rows = COURSE_ROWS(f.tertiary, f.primary);
  return {
    description: `${f.terms.courses} offered this year.`,
    actions: [`Add ${f.terms.course.toLowerCase()}`],
    tables: [
      table(
        f.terms.courses,
        ["Code", f.terms.course, f.tertiary ? "Credits" : "Periods per week", "Department", f.tertiary ? "Lecturer" : "Teacher", "Status"],
        rows.map(([code, title], i) => [
          code,
          title,
          f.tertiary ? "12" : "5",
          ["Computer Science", "Accounting & Finance", "Civil Engineering", "Nursing", "Education"][i],
          ["Dr. Kunda", "Mrs. Lungu", "Eng. Zimba", "Sr. Mwansa", "Dr. Phiri"][i],
          "Active",
        ]),
        { statusColumn: "Status" },
      ),
    ],
  };
};

const exemptions: Builder = (ctx) => {
  const f = flavour(ctx);
  const rows = COURSE_ROWS(f.tertiary, f.primary);
  return {
    description: `${f.terms.course} exemptions granted to learners.`,
    actions: ["Grant exemption"],
    tables: [
      table(
        "Exemptions",
        ["Student", f.terms.course, "Reason", "Granted by", "Status"],
        [
          [`${LEARNERS[0].no} · ${LEARNERS[0].name}`, rows[0][1], "Prior learning", "Registrar", "Approved"],
          [`${LEARNERS[4].no} · ${LEARNERS[4].name}`, rows[1][1], "Transfer credit", "Registrar", "Approved"],
          [`${LEARNERS[6].no} · ${LEARNERS[6].name}`, rows[3][1], "Medical", "Head of department", "Pending"],
          [`${LEARNERS[2].no} · ${LEARNERS[2].name}`, rows[2][1], "Not eligible", "Registrar", "Rejected"],
        ],
        { statusColumn: "Status" },
      ),
    ],
  };
};

const assessments: Builder = (ctx) => {
  const f = flavour(ctx);
  const rows = COURSE_ROWS(f.tertiary, f.primary);
  return {
    description: "Assignments, tests and examinations across the school.",
    actions: ["Create assessment"],
    tables: [
      table(
        "Assessments & assignments",
        ["Title", f.terms.course, "Type", "Due", "Weight", "Status"],
        [
          ["Algebra worksheet", rows[0][1], "Assignment", "07 Nov 2026", "10%", "Published"],
          ["Mid-period test", rows[1][1], "Test", "12 Nov 2026", "30%", "Published"],
          ["Practical report", rows[2][1], "Assignment", "14 Nov 2026", "15%", "Draft"],
          ["End-of-period exam", rows[3][1], "Exam", "30 Nov 2026", "60%", "Draft"],
        ],
        { statusColumn: "Status" },
      ),
    ],
  };
};

export const academicScreens: Record<string, Builder> = {
  "academics/programmes": programmes,
  "academics/courses": courses,
  "academics/exemptions": exemptions,
  "academics/assessments-and-assignments": assessments,
};
