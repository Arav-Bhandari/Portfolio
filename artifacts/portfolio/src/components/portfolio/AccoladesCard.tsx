import React, { useEffect, useState } from 'react';
import { BentoCard } from './BentoCard';
import { accolades } from '@/data/portfolio';
import { Trophy, Award, Medal } from 'lucide-react';
import { cn } from '@/lib/utils';
import groupPhoto from '@assets/IMG_7693_1777758948579.JPG';

export function AccoladesCard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Trophy': return <Trophy className="w-4 h-4 text-primary" />;
      case 'Award': return <Award className="w-4 h-4 text-primary" />;
      case 'Medal': return <Medal className="w-4 h-4 text-primary" />;
      default: return <Trophy className="w-4 h-4 text-primary" />;
    }
  };

  return (
    <BentoCard className={cn(
      "col-span-12 md:col-span-6 lg:col-span-4 row-span-2 flex flex-col gap-4 relative overflow-hidden",
      mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      "transition-all duration-500 ease-out delay-300"
    )}>
      <div className="absolute inset-0 opacity-10 pointer-events-none">
         <img src={groupPhoto} alt="Hackathon Team" className="w-full h-full object-cover filter grayscale" />
         <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent"></div>
      </div>
      
      <div className="z-10 flex flex-col h-full">
        <h3 className="font-semibold text-lg text-foreground tracking-tight mb-4">Competitive Edge</h3>
        
        <div className="space-y-4 flex-1">
          {accolades.map((accolade) => (
            <div key={accolade.id} className="flex items-start gap-3">
              <div className="mt-0.5 p-1.5 bg-primary/10 rounded-md ring-1 ring-primary/20">
                {getIcon(accolade.icon)}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{accolade.title}</p>
                <p className="text-xs text-muted-foreground">{accolade.organization}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
