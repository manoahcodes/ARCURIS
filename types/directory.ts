export type AcademicYear = {
  id: string;
  label: string;
  /** Which year the tenant treats as current. Never derived from the server clock. */
  isCurrent: boolean;
};

export type SearchResult = {
  id: string;
  title: string;
  subtitle: string;
  /** Short type label shown as a chip, e.g. "Learner", "Receipt". */
  kind: string;
  href: string;
};