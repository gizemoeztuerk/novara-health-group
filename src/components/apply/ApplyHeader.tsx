import type { ReactNode } from 'react';

import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type ApplyHeaderProps = {
  breadcrumbs: BreadcrumbItem[];
  icon: ReactNode;
  title: string;
  subtitle?: string;
  tagline?: string;
};

export function ApplyHeader({ breadcrumbs, icon, title, subtitle, tagline }: ApplyHeaderProps) {
  return (
    <section className="bg-gradient-to-br from-primary/10 to-background border-b border-border">
      <div className="container-wide py-12 md:py-16">
        <Breadcrumbs items={breadcrumbs} className="mb-6" />
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">{icon}</div>
          <div>
            <h1 className="font-display text-2xl font-bold md:text-3xl">{title}</h1>
            {subtitle ? <p className="text-muted-foreground">{subtitle}</p> : null}
            {tagline ? <p className="mt-1 text-sm text-muted-foreground">{tagline}</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
