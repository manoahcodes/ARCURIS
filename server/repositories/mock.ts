import type { RoleKey } from "@/config/navigation";
import { formatKwacha, kwachaToNgwee } from "@/lib/money";
import type { Dashboard, Row } from "@/types/dashboard";
import type { DashboardRepository, SessionProvider } from "./types";

// Row builders keep the data below readable.
const r = (...cells: string[]): Row => ({ cells });
const go = (label: string, target: string): Row => ({
  cells: [label, target],
  sep: "arrow",
});
const link = (label: string): Row => ({ cells: [label], trailingArrow: true });
const K = (kwacha: number) => formatKwacha(kwachaToNgwee(kwacha));

const DASHBOARDS: Record<RoleKey, Dashboard> = {
  platform: {
    title: "Platform overview",
    kpis: [
      { title: "Active tenants", caption: "Schools using ACURIS", value: "128", note: "+12 this month" },
      { title: "Total learners", caption: "Across all tenants", value: "48,620", note: "+8.4% this term" },
      { title: "Platform health", caption: "Services operational", value: "99.98%", note: "All systems normal" },
      { title: "Open support", caption: "Awaiting action", value: "17", note: "5 high priority" },
    ],
    sections: [
      {
        title: "Tenant activity",
        subtitle: "New schools and recent usage",
        span: "half",
        rows: [
          r("Lusaka Hills Academy", "1,248 learners", "Active"),
          r("Chilenje Secondary", "2,104 learners", "Active"),
          r("Northview Primary", "684 learners", "Trial"),
          r("Mukuba Learning Centre", "950 learners", "Active"),
          r("Kafue Valley School", "1,720 learners", "Active"),
        ],
      },
      {
        title: "Platform alerts",
        subtitle: "Items requiring platform-level attention",
        span: "half",
        rows: [
          r("Storage approaching limit", "Lusaka Hills", "Review"),
          r("Subscription renewal due in 5 days", "Northview"),
          r("Failed nightly sync", "2 tenant(s)", "Investigate"),
          r("New tenant awaiting verification", "1 request"),
        ],
      },
      {
        title: "Recent platform events",
        subtitle: "Audit trail across the platform",
        span: "full",
        rows: [
          r("08:42", "Tenant created", "Kafue Valley School", "By Platform Admin"),
          r("08:20", "Subscription changed", "Chilenje Secondary", "Plan: Growth"),
          r("07:55", "Support ticket escalated", "#SUP-1048", "High"),
        ],
      },
    ],
  },

  teacher: {
    title: "Good morning, User",
    kpis: [
      { title: "My classes", caption: "Assigned this term", value: "6", note: "Across Grades 8–12" },
      { title: "Learners", caption: "In your classes", value: "184", note: "4 classes need review" },
      { title: "Attendance today", caption: "Across my lessons", value: "92%", note: "3 learners absent" },
      { title: "To mark", caption: "Assessments pending", value: "28", note: "Due by Friday" },
    ],
    sections: [
      {
        title: "Today's teaching schedule",
        subtitle: "Tuesday • Main Campus",
        span: "half",
        rows: [
          r("08:00–09:00", "Grade 9A", "Mathematics", "Room A-101"),
          r("09:10–10:10", "Grade 10B", "Mathematics", "Room B-203"),
          r("10:30–11:30", "Grade 11A", "Mathematics", "Room A-102"),
          r("12:00–13:00", "Grade 8C", "Mathematics", "Room C-104"),
          r("14:00–15:00", "Grade 12", "Mathematics", "Room B-201"),
        ],
      },
      {
        title: "Teacher quick actions",
        span: "half",
        rows: [
          go("Take class register", "Grade 9A"),
          go("Create assignment", "Select class"),
          go("Enter assessment marks", "28 pending"),
          go("View lesson plan", "Week 4"),
        ],
      },
      {
        title: "Class attendance",
        subtitle: "Today's register status",
        span: "half",
        rows: [
          r("Grade 9A", "42 learners", "40 present", "2 absent"),
          r("Grade 10B", "36 learners", "Register complete"),
          r("Grade 11A", "31 learners", "Register not started"),
          r("Grade 8C", "38 learners", "Register complete"),
        ],
      },
      {
        title: "Recent learner submissions",
        subtitle: "Latest work to review",
        span: "half",
        rows: [
          r("Chisomo Banda", "Algebra worksheet", "Submitted 08:32"),
          r("Mwamba Zulu", "Quadratic equations", "Submitted 08:14"),
          r("Tionenji Phiri", "Week 4 quiz", "Needs marking"),
        ],
      },
    ],
  },

  bursar: {
    title: "Finance & fee collections",
    kpis: [
      { title: "Collected today", caption: "Receipted payments", value: K(18450), note: "24 transactions" },
      { title: "Outstanding fees", caption: "All active learners", value: K(186450), note: "24 accounts overdue" },
      { title: "Unallocated payments", caption: "Needs matching", value: K(2350), note: "3 payments" },
      { title: "Reconciliation", caption: "Today's status", value: "Pending", note: "Cash-up not submitted" },
    ],
    sections: [
      {
        title: "Collections by payment method",
        subtitle: "Today's receipts",
        span: "half",
        rows: [
          r("Mobile money", K(8200), "12 transactions"),
          r("Bank transfer", K(6750), "7 transactions"),
          r("Cash", K(2500), "5 transactions"),
          r("Total", K(17450), "24 transactions"),
        ],
      },
      {
        title: "Finance actions",
        span: "half",
        rows: [
          link("Record a fee payment"),
          link("Review overdue accounts"),
          link("Reconcile daily collections"),
          link("Generate fee statement"),
        ],
      },
      {
        title: "Accounts needing attention",
        subtitle: "Prioritised follow-up",
        span: "full",
        rows: [
          r("STU-1048", "Grade 11", `${K(4200)} overdue`, "Contact guardian"),
          r("STU-0832", "Grade 9", `${K(2850)} overdue`, "Payment plan"),
          r("STU-1201", "Grade 12", `${K(1600)} unallocated`, "Match receipt"),
        ],
      },
    ],
  },

  cashier: {
    title: "Payments desk",
    kpis: [
      { title: "Transactions today", caption: "Payments recorded", value: "24", note: "Across all methods" },
      { title: "Amount collected", caption: "Today's total", value: K(18450), note: "Receipts issued" },
      { title: "Pending receipts", caption: "Awaiting completion", value: "2", note: "Check payment status" },
      { title: "Cash drawer", caption: "Expected balance", value: K(2500), note: "Cash payments only" },
    ],
    sections: [
      {
        title: "Collect a payment",
        subtitle: "Find learner by student number or name",
        span: "half",
        rows: [
          r("Student: search to select learner"),
          r("Account: tuition, transport, meals or other fee"),
          r("Payment method: cash, mobile money, bank"),
          r("Amount received: enter amount and confirm"),
          go("Action: Review payment", "Issue receipt"),
        ],
      },
      {
        title: "Recent transactions",
        span: "half",
        rows: [
          r("RC-02641", "STU-1048", K(850), "Mobile money", "Success"),
          r("RC-02640", "STU-0832", K(500), "Cash", "Success"),
          r("RC-02639", "STU-1201", K(1200), "Bank", "Success"),
          r("RC-02638", "STU-1140", K(300), "Cash", "Pending"),
        ],
      },
      {
        title: "End-of-day cash-up",
        subtitle: "Verify totals before submitting",
        span: "full",
        rows: [
          r(`Cash received  ${K(2500)}`, `Expected cash  ${K(2500)}`, `Variance  ${K(0)}`),
          r(`Mobile money  ${K(8200)}`, `Bank transfer  ${K(6750)}`),
          r("Last cash-up: Monday, 20 Oct 2026", "Submitted by cashier"),
        ],
      },
    ],
  },

  parent: {
    title: "Welcome back, Mrs. Banda",
    kpis: [
      { title: "Children enrolled", caption: "Linked to your account", value: "2", note: "Both attending this term" },
      { title: "Attendance", caption: "This term", value: "96%", note: "1 late arrival this week" },
      { title: "Fees outstanding", caption: "Across family accounts", value: K(1250), note: "Due 31 October" },
      { title: "Unread messages", caption: "From school", value: "3", note: "1 requires a response" },
    ],
    sections: [
      {
        title: "My children",
        subtitle: "Quick view of learner wellbeing",
        span: "half",
        rows: [
          r("Chisomo Banda", "Grade 10A", "Present today", "08:02"),
          r("Natasha Banda", "Grade 5B", "Present today", "07:48"),
          link("View attendance history"),
          link("View academic progress"),
        ],
      },
      {
        title: "Fee account",
        subtitle: "Family balance summary",
        span: "half",
        rows: [
          r("Chisomo", "Term 3 tuition", `${K(850)} outstanding`),
          r("Natasha", "Activities", `${K(400)} outstanding`),
          r("Total balance", K(1250), "Due 31 Oct"),
          link("View statement / make payment"),
        ],
      },
      {
        title: "School updates",
        subtitle: "Notices from Lusaka Hills Academy",
        span: "half",
        rows: [
          r("Parent-teacher meeting", "24 Oct", "RSVP requested"),
          r("Grade 10 assessment schedule published"),
          r("School closes for holiday", "03 Nov"),
        ],
      },
      {
        title: "Academic snapshot",
        subtitle: "Latest results available",
        span: "half",
        rows: [
          r("Chisomo", "Mathematics  78%", "+4% from last assessment"),
          r("Chisomo", "English  82%", "On track"),
          r("Natasha", "Reading", "Teacher feedback available"),
        ],
      },
    ],
  },

  student: {
    title: "Your learning space",
    kpis: [
      { title: "Attendance", caption: "This term", value: "97%", note: "You are on track" },
      { title: "Assignments due", caption: "Across your subjects", value: "3", note: "Next due tomorrow" },
      { title: "Average score", caption: "Current term", value: "81%", note: "Up 3% this term" },
      { title: "Unread notices", caption: "School updates", value: "2", note: "Check announcements" },
    ],
    sections: [
      {
        title: "Today's timetable",
        subtitle: "Tuesday • Week 4",
        span: "half",
        rows: [
          r("08:00", "Mathematics", "Room A-101", "Completed"),
          r("09:10", "English", "Room B-203", "Completed"),
          r("10:30", "Physics", "Lab 2", "In progress"),
          r("12:00", "Biology", "Room C-104", "Upcoming"),
          r("14:00", "ICT", "Computer Lab", "Upcoming"),
        ],
      },
      {
        title: "Assignments to complete",
        subtitle: "Plan your work",
        span: "half",
        rows: [
          r("Mathematics", "Algebra practice", "Due 22 Oct"),
          r("English", "Essay draft", "Due 23 Oct"),
          r("Biology", "Label the cell diagram", "Due 24 Oct"),
          link("Open assignments"),
        ],
      },
      {
        title: "Recent results",
        subtitle: "Your latest academic feedback",
        span: "half",
        rows: [
          r("Mathematics", "Algebra test", "78%", "Good progress"),
          r("English", "Comprehension", "82%", "Strong"),
          r("Physics", "Practical report", "Awaiting mark"),
        ],
      },
      {
        title: "School notices",
        subtitle: "Important information",
        span: "half",
        rows: [
          r("Grade 10 revision session", "Thursday after school"),
          r("Library books due back", "Friday"),
          r("Sports day sign-ups are open", "Register by 28 Oct"),
        ],
      },
    ],
  },
};

export const mockDashboardRepository: DashboardRepository = {
  async getDashboard(role) {
    return DASHBOARDS[role];
  },
};

export const mockSessionProvider: SessionProvider = {
  async getCurrentUser() {
    return {
      id: "dev-user",
      name: "User",
      tenant: {
        tenantId: "lusaka-hills",
        tenantName: "Lusaka Hills Academy",
        campus: "Main Campus",
        institutionType: "high_school",
      },
    };
  },
};
