import React from 'react';
import { BentoCard } from './BentoCard';
import { academics } from '@/data/portfolio';
import { cn } from '@/lib/utils';

export function AcademicCard({ className }: { className?: string }) {
  return (
    <BentoCard className={cn("col-span-12 gap-4", className)}>
      <h3 className="font-semibold text-lg text-slate-900 tracking-tight mb-2">Academic &amp; Service</h3>

      <ul className="space-y-2.5">
        {academics.map((item) => (
          <li key={item.id} className="flex items-center gap-2 text-sm text-slate-600">
            <span className="w-1 h-1 rounded-full bg-slate-400" />
            <span>{item.title}</span>
          </li>
        ))}
      </ul>
    </BentoCard>
  );
}
