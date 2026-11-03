import type { RoleKey } from "@/config/navigation";
import { getNotifications } from "@/server/queries/topbar";
import { NotificationsBell } from "./notifications-bell";

export async function NotificationsControl({ role }: { role: RoleKey }) {
  const summary = await getNotifications(role);
  return <NotificationsBell summary={summary} />;
}