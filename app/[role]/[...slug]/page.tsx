import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ROLES, ROLE_KEYS, hrefFor, isRoleKey } from "@/config/navigation";
import { PageHeader } from "@/components/dashboard/page-header";
import { PageSkeleton } from "@/components/dashboard/page-skeleton";

type Params = Promise<{ role: string; slug: string[] }>;

// Every sidebar page for every role is known up front.
export function generateStaticParams() {
  return ROLE_KEYS.flatMap((role) =>
    ROLES[role].nav
      .filter((item) => item.slug)
      .map((item) => ({ role, slug: item.slug.split("/") })),
  );
}

// Placeholder page: skip instant-navigation validation until the real page exists.
  export const instant = false;

// `params` is read inside <Suspense> (see ../layout.tsx for why).
export default function SectionPage({ params }: { params: Params }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Section params={params} />
    </Suspense>
  );
}

/** Placeholder for every sidebar page that isn't built yet. */
async function Section({ params }: { params: Params }) {
  const { role, slug } = await params;
  if (!isRoleKey(role)) notFound();

  const item = ROLES[role].nav.find((n) => n.slug === slug.join("/"));
  if (!item) notFound();

  return (
    <PageHeader
      crumbs={[
        { label: "Dashboard", href: `/${role}` },
        { label: ROLES[role].label, href: hrefFor(role, "") },
        { label: item.label, href: hrefFor(role, item.slug) },
      ]}
      title={item.label}
      subtitle="This section hasn't been built yet."
    />
  );
}