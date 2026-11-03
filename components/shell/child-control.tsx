import { getChildState } from "@/server/queries/topbar";
import { ChildSelect } from "./child-select";

export async function ChildControl({
  variant = "bar",
}: {
  variant?: "bar" | "drawer";
}) {
  const { list, selected } = await getChildState();
  if (!selected) return null;

  return <ChildSelect learners={list} selectedId={selected.id} variant={variant} />;
}