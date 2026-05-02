import React, { useEffect, useState } from 'react';
import { BentoCard } from './BentoCard';
import { academics } from '@/data/portfolio';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AcademicCard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <BentoCard className={cn(
      "col-span-12 md:col-span-6 lg:col-span-4 row-span-1 flex flex-col gap-4",
      mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      "transition-all duration-500 ease-out delay-400"
    )}>
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-lg text-foreground tracking-tight">Academic & Service</h3>
      </div>
      
      <div className="space-y-2.5">
        {academics.map((item) => (
          <div key={item.id} className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-1 h-1 rounded-full bg-primary/50" />
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
