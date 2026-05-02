import React from 'react';
import { BentoCard } from './BentoCard';
import { accolades } from '@/data/portfolio';
import { Trophy, Award, Medal } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AccoladesCard({ className }: { className?: string }) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Trophy': return <Trophy className="w-4 h-4 text-slate-900" />;
      case 'Award': return <Award className="w-4 h-4 text-slate-900" />;
      case 'Medal': return <Medal className="w-4 h-4 text-slate-900" />;
      default: return <Trophy className="w-4 h-4 text-slate-900" />;
    }
  };

  return (
    <BentoCard className={cn("col-span-12 gap-4", className)}>
      <h3 className="font-semibold text-lg text-slate-900 tracking-tight mb-2">Competitive Edge</h3>

      <div className="space-y-4 flex-1">
        {accolades.map((accolade) => (
          <div key={accolade.id} className="flex items-start gap-3">
            <div className="mt-0.5 p-1.5 bg-slate-100 rounded-md border border-slate-200">
              {getIcon(accolade.icon)}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">{accolade.title}</p>
              <p className="text-xs text-slate-600">{accolade.organization}</p>
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
