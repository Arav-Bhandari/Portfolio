import React from 'react';
import { Hero } from './Hero';
import { ProjectCard } from './ProjectCard';
import { AccoladesCard } from './AccoladesCard';
import { AcademicCard } from './AcademicCard';
import { StackCard } from './StackCard';
import { projects } from '@/data/portfolio';

export function BentoGrid() {
  const flagshipProject = projects[0];
  const otherProjects = projects.slice(1);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16">
      <div className="grid grid-cols-12 gap-6">
        <Hero />

        <ProjectCard
          project={flagshipProject}
          className="col-span-12 md:col-span-8"
        />
        <AccoladesCard className="col-span-12 md:col-span-4" />

        {otherProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            className="col-span-12 md:col-span-4"
          />
        ))}

        <AcademicCard className="col-span-12 md:col-span-6" />
        <StackCard className="col-span-12 md:col-span-6" />
      </div>

      <footer className="mt-12 pt-8 border-t border-slate-200 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Aarav Sharma — LogicStep AI</p>
      </footer>
    </div>
  );
}
