import React from 'react';
import { BentoCard } from './BentoCard';
import { Project } from '@/data/portfolio';
import logicStepLogo from '@assets/ai_dojo_2_2_1777758948573.PNG';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  className?: string;
  delay?: number;
}

export function ProjectCard({ project, className, delay = 0 }: ProjectCardProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <BentoCard className={cn(
      "col-span-12 flex flex-col gap-4",
      mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      "transition-all duration-500 ease-out",
      className
    )} style={{ transitionDelay: `${delay}ms` }}>
      
      {project.featured && (
        <div className="w-12 h-12 rounded-md overflow-hidden bg-[#0A4A9A] flex items-center justify-center mb-2 border border-border/50">
          <img src={logicStepLogo} alt="LogicStep Logo" className="w-10 h-10 object-contain" />
        </div>
      )}

      <div>
        <h3 className="font-semibold text-lg text-foreground tracking-tight">{project.title}</h3>
        <p className="text-sm font-medium text-primary mt-1">{project.role}</p>
      </div>
      
      <p className="text-sm text-muted-foreground flex-1">
        {project.tagline}
      </p>

      <div className="flex flex-wrap gap-2 mt-4">
        {project.stack.map(tech => (
          <span 
            key={tech} 
            className="px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium border border-border/40"
          >
            {tech}
          </span>
        ))}
      </div>
    </BentoCard>
  );
}
