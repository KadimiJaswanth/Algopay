import { ReactNode } from "react";

export default function Placeholder({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="container max-w-4xl mx-auto py-16">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <p className="mt-3 text-muted-foreground">This page is a placeholder. Tell me to generate it next and I will fill it with full functionality.</p>
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
