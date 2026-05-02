import React from 'react';
import { BentoCard } from './BentoCard';
import { skills, specializations } from '@/data/portfolio';
import { cn } from '@/lib/utils';

export function StackCard({ className }: { className?: string }) {
  return (
    <BentoCard className={cn("col-span-12 gap-5", className)}>
      <h3 className="font-semibold text-lg text-slate-900 tracking-tight">Stack</h3>

      <div className="space-y-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500 mb-2">
            Languages &amp; Tools
          </p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="px-2.5 py-1 rounded-md bg-slate-50 text-slate-700 text-sm font-medium border border-slate-200"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500 mb-2">
            Specializations
          </p>
          <div className="flex flex-wrap gap-2">
            {specializations.map((spec) => (
              <span
                key={spec.id}
                className="px-2.5 py-1 rounded-md bg-slate-50 text-slate-700 text-sm font-medium border border-slate-200"
              >
                {spec.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </BentoCard>
  );
}
