import React from 'react';
import { cn } from '@/lib/utils';

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export function BentoCard({ className, children, ...props }: BentoCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-xl bg-white border border-slate-200 p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
