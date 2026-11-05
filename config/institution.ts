/**
 * Institution types and the academic vocabulary that follows from them.
 *
 * Rule: tertiary institutions (university, college, tertiary) run a SEMESTER
 * system; school-level institutions (primary, secondary, high school) run a
 * TERM system. Change the mapping here and every label follows.
 */
export const INSTITUTION_TYPES = [
  "primary",
  "secondary",
  "high_school",
  "college",
  "university",
  "tertiary",
] as const;

export type InstitutionType = (typeof INSTITUTION_TYPES)[number];
export type AcademicSystem = "term" | "semester";
export type InstitutionLevel = "school" | "tertiary";

type InstitutionInfo = {
  label: string;
  level: InstitutionLevel;
  system: AcademicSystem;
};

export const INSTITUTIONS: Record<InstitutionType, InstitutionInfo> = {
  primary: { label: "Primary School", level: "school", system: "term" },
  secondary: { label: "Secondary School", level: "school", system: "term" },
  high_school: { label: "High School", level: "school", system: "term" },
  college: { label: "College", level: "tertiary", system: "semester" },
  university: { label: "University", level: "tertiary", system: "semester" },
  tertiary: { label: "Tertiary Institution", level: "tertiary", system: "semester" },
};

export const isInstitutionType = (value: string): value is InstitutionType =>
  (INSTITUTION_TYPES as readonly string[]).includes(value);

export const systemLabel = (type: InstitutionType) =>
  INSTITUTIONS[type].system === "semester" ? "Semester system" : "Term system";

/** Words that change with the institution level. Used as {tokens} in nav labels. */
export type Terminology = {
  period: string;
  course: string;
  courses: string;
  programmes: string;
  educators: string;
};

const SCHOOL_TERMS: Terminology = {
  period: "Term",
  course: "Subject",
  courses: "Subjects",
  programmes: "Classes",
  educators: "Teachers",
};

const TERTIARY_TERMS: Terminology = {
  period: "Semester",
  course: "Course",
  courses: "Courses",
  programmes: "Programmes",
  educators: "Lecturers",
};

/** Shown when no school is selected, so the wording stays neutral. */
export const GENERIC_TERMS: Terminology = {
  period: "Term/Semester",
  course: "Course/Subject",
  courses: "Courses/Subjects",
  programmes: "Programmes/Classes",
  educators: "Lecturers/Teachers",
};

export function termsFor(type: InstitutionType | null | undefined): Terminology {
  if (!type) return GENERIC_TERMS;
  return INSTITUTIONS[type].level === "tertiary" ? TERTIARY_TERMS : SCHOOL_TERMS;
}

/** Replaces {period}, {course}, {courses}, {programmes}, {educators} in a label. */
export function resolveLabel(label: string, terms: Terminology): string {
  return label.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in terms ? terms[key as keyof Terminology] : match,
  );
}
