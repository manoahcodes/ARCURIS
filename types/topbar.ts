export type NotificationItem = {
  id: string;
  title: string;
  detail: string;
  href: string;
  unread: boolean;
};

export type NotificationSummary = {
  /** Total unread for this user, which can exceed the number of items listed. */
  unreadCount: number;
  items: NotificationItem[];
};

export type Child = {
  id: string;
  name: string;
  /** e.g. "Grade 10A" */
  grade: string;
};