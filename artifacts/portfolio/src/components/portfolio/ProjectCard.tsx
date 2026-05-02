import React from 'react';
import { BentoCard } from './BentoCard';
import { Project } from '@/data/portfolio';
import logicStepLogo from '@assets/ai_dojo_2_2_1777758948573.PNG';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <BentoCard className={cn("col-span-12 gap-4", className)}>
      {project.featured && (
        <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#0A4A9A] flex items-center justify-center mb-2 border border-slate-200">
          <img src={logicStepLogo} alt="LogicStep AI logo" className="w-10 h-10 object-contain" />
        </div>
      )}

      <div>
        <h3 className="font-semibold text-lg text-slate-900 tracking-tight">{project.title}</h3>
        <p className="text-sm font-medium text-slate-900/70 mt-1">{project.role}</p>
      </div>

      <p className="text-sm text-slate-600 flex-1 leading-relaxed">
        {project.tagline}
      </p>

      <div className="flex flex-wrap gap-2 mt-4">
        {project.stack.map(tech => (
          <span
            key={tech}
            className="px-2.5 py-1 rounded-md bg-slate-50 text-slate-700 text-xs font-medium border border-slate-200"
          >
            {tech}
          </span>
        ))}
      </div>
    </BentoCard>
  );
}
