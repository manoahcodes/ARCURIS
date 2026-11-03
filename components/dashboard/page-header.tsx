import Link from "next/link";
import type { ReactNode } from "react";

export function PageHeader({
  crumbs,
  title,
  subtitle,
}: {
  crumbs: Array<{ label: string; href: string }>;
  title: string;
  subtitle: ReactNode;
}) {
  return (
    <header>
      <nav aria-label="Breadcrumb" className="text-[15px] text-brand">
        {crumbs.map((crumb, i) => (
          <span key={`${i}-${crumb.label}`}>
            {i > 0 && <span className="mx-2">/</span>}
            <Link href={crumb.href} className="hover:underline">
              {crumb.label}
            </Link>
          </span>
        ))}
      </nav>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink">{title}</h1>
      <p className="mt-2 text-[17px] text-muted">{subtitle}</p>
    </header>
  );
}