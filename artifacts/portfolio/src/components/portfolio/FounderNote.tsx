import React, { useEffect, useState } from 'react';
import { BentoCard } from './BentoCard';
import founderAvatar from '@assets/IMG_6866_1777758948578.PNG';
import { cn } from '@/lib/utils';

export function FounderNote() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <BentoCard className={cn(
      "col-span-12 md:col-span-4 row-span-1 flex flex-col gap-4",
      mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      "transition-all duration-500 ease-out delay-200"
    )}>
      <div className="flex items-center gap-3">
        <img 
          src={founderAvatar} 
          alt="Avatar" 
          className="w-10 h-10 rounded-full border border-border/50 object-cover object-top"
        />
        <div className="font-medium text-sm text-foreground/80">Operator's Note</div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        "I build software that ships. My focus is taking ambiguous problems in regulated spaces — legal, real estate, content discovery — and turning them into MVPs that real teams actually use."
      </p>
    </BentoCard>
  );
}
