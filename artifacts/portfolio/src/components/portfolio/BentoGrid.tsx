import React from 'react';
import { Hero } from './Hero';
import { FounderNote } from './FounderNote';
import { ProjectCard } from './ProjectCard';
import { AccoladesCard } from './AccoladesCard';
import { AcademicCard } from './AcademicCard';
import { SkillsCard } from './SkillsCard';
import { SpecializationCard } from './SpecializationCard';
import { projects } from '@/data/portfolio';

export function BentoGrid() {
  // Split projects based on priority
  const flagshipProject = projects[0];
  const otherProjects = projects.slice(1);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
      <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-[minmax(180px,auto)]">
        
        {/* Top Row: Hero spans 8, FounderNote spans 4 */}
        <Hero />
        <FounderNote />
        
        {/* Flagship Project spans 8 columns, Accolades spans 4 but takes 2 rows */}
        <ProjectCard 
          project={flagshipProject} 
          className="col-span-12 md:col-span-8 row-span-2 md:row-span-2" 
          delay={250}
        />
        
        <AccoladesCard />

        {/* Other Projects - 2 per row on desktop */}
        {otherProjects.slice(0, 2).map((project, idx) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            className="col-span-12 md:col-span-6 lg:col-span-4 row-span-1" 
            delay={350 + (idx * 50)}
          />
        ))}

        {/* Specialization, Skills, Academic */}
        <SpecializationCard />
        <SkillsCard />
        <AcademicCard />
        
        {/* Remaining project if any */}
        {otherProjects.slice(2).map((project, idx) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            className="col-span-12 md:col-span-6 lg:col-span-4 row-span-1" 
            delay={700}
          />
        ))}

      </div>
      
      <footer className="mt-16 pb-8 text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} LogicStep AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
