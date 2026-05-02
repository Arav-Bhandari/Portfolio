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
        "group relative flex flex-col justify-between overflow-hidden rounded-xl bg-card border border-border p-6",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-[2px] hover:border-primary/50",
        "shadow-[0_0_0_1px_hsl(var(--border)),0_0_24px_-8px_hsl(var(--ring)/0.0)]",
        "hover:shadow-[0_0_0_1px_hsl(var(--border)),0_0_24px_-8px_hsl(var(--ring)/0.3)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
