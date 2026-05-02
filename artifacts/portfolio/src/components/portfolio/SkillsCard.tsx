import React, { useEffect, useState } from 'react';
import { BentoCard } from './BentoCard';
import { skills } from '@/data/portfolio';
import { Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SkillsCard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <BentoCard className={cn(
      "col-span-12 md:col-span-6 lg:col-span-4 row-span-1 flex flex-col gap-4",
      mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      "transition-all duration-500 ease-out delay-500"
    )}>
      <div className="flex items-center gap-2 mb-2">
        <Code2 className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-lg text-foreground tracking-tight">Skills</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span 
            key={skill.id} 
            className="px-2.5 py-1 rounded-md bg-secondary/50 text-foreground text-sm font-medium border border-border/40 hover:bg-secondary transition-colors cursor-default"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </BentoCard>
  );
}
