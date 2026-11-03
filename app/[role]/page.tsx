import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ROLES, ROLE_KEYS, isRoleKey } from "@/config/navigation";
import { DashboardView } from "@/components/dashboard/dashboard-view";
import { PageHeader } from "@/components/dashboard/page-header";
import { PageSkeleton } from "@/components/dashboard/page-skeleton";
import { TodayDate } from "@/components/dashboard/today-date";
import { dashboards, session } from "@/server/repositories";

type Params = Promise<{ role: string }>;

export function generateStaticParams() {
  return ROLE_KEYS.map((role) => ({ role }));
}

// `params` is read inside <Suspense> (see layout.tsx for why).
export default function RoleDashboardPage({ params }: { params: Params }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <RoleDashboard params={params} />
    </Suspense>
  );
}

async function RoleDashboard({ params }: { params: Params }) {
  const { role } = await params;
  if (!isRoleKey(role)) notFound();

  const user = await session.getCurrentUser();
  const data = await dashboards.getDashboard(role, user.tenant);

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Dashboard", href: `/${role}` },
          { label: ROLES[role].label, href: `/${role}` },
        ]}
        title={data.title}
        subtitle={
          <>
            {user.tenant.tenantName}  •  <TodayDate />
          </>
        }
      />
      <DashboardView data={data} />
    </>
  );
}