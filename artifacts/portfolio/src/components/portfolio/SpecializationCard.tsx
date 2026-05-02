import React, { useEffect, useState } from 'react';
import { BentoCard } from './BentoCard';
import { specializations } from '@/data/portfolio';
import { Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SpecializationCard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <BentoCard className={cn(
      "col-span-12 md:col-span-6 lg:col-span-4 row-span-1 flex flex-col gap-4",
      mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      "transition-all duration-500 ease-out delay-[600ms]"
    )}>
      <div className="flex items-center gap-2 mb-2">
        <Zap className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-lg text-foreground tracking-tight">Specialization</h3>
      </div>
      
      <div className="space-y-3">
        {specializations.map((spec) => (
          <div key={spec.id} className="flex items-center gap-3">
            <div className="h-0.5 w-4 bg-primary/40 rounded-full" />
            <span className="text-sm font-medium text-foreground">{spec.name}</span>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
