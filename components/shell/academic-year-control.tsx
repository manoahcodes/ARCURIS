import { getAcademicYearState } from "@/server/queries/academic-year";
import { AcademicYearSelect } from "./academic-year-select";

export async function AcademicYearControl({
  variant = "bar",
}: {
  variant?: "bar" | "drawer";
}) {
  const { years, selected } = await getAcademicYearState();
  if (!selected) return null;

  return (
    <AcademicYearSelect years={years} selectedId={selected.id} variant={variant} />
  );
}