import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import {
  identity,
  projects,
  accolades,
  academics,
  skills,
  specializations,
} from '@/data/portfolio';
import heroPortrait from '@assets/IMG_6864_1777758948574.JPEG';
import logicStepLogo from '@assets/ai_dojo_2_2_1777758948573.PNG';

const ICON_STROKE = 1.5;

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className = '', children }) => (
  <div
    className={
      'rounded-2xl bg-white border border-slate-200 shadow-sm ' +
      'transition-shadow duration-300 hover:shadow-md p-6 md:p-8 ' +
      className
    }
  >
    {children}
  </div>
);

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
    {children}
  </p>
);

export function BentoGrid() {
  const flagship = projects.find((p) => p.featured) ?? projects[0];
  const otherProjects = projects.filter((p) => p.id !== flagship.id);

  return (
    <main className="min-h-[100dvh] bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {/* Hero Identity — 8 cols */}
          <Card className="md:col-span-8 flex flex-col justify-between min-h-[280px]">
            <div>
              <SectionLabel>Portfolio · 2026</SectionLabel>
              <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
                {identity.name}
              </h1>
              <p className="mt-3 text-lg md:text-xl font-medium text-slate-700">
                {identity.tagline}
              </p>
              <p className="mt-2 text-base text-slate-500">{identity.location}</p>
            </div>

            <div className="mt-8 flex items-center gap-5">
              <a
                href={identity.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-slate-500 hover:text-slate-900 transition-colors"
              >
                <Github strokeWidth={ICON_STROKE} className="w-5 h-5" />
              </a>
              <a
                href={identity.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-slate-500 hover:text-slate-900 transition-colors"
              >
                <Linkedin strokeWidth={ICON_STROKE} className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${identity.socials.email}`}
                aria-label="Email"
                className="text-slate-500 hover:text-slate-900 transition-colors"
              >
                <Mail strokeWidth={ICON_STROKE} className="w-5 h-5" />
              </a>
            </div>
          </Card>

          {/* Portrait — 4 cols */}
          <div className="md:col-span-4 rounded-2xl overflow-hidden border border-slate-200 shadow-sm transition-shadow duration-300 hover:shadow-md bg-white min-h-[280px]">
            <img
              src={heroPortrait}
              alt={`${identity.name} portrait`}
              className="w-full h-full object-cover object-top aspect-square md:aspect-auto"
            />
          </div>

          {/* LogicStep AI — flagship, 8 cols */}
          <Card className="md:col-span-8 flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#0A4A9A] flex items-center justify-center shrink-0">
                <img
                  src={logicStepLogo}
                  alt="LogicStep AI logo"
                  className="w-11 h-11 object-contain"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                  {flagship.title}
                </h2>
                <span className="mt-2 inline-flex items-center px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700">
                  {flagship.role}
                </span>
              </div>
            </div>

            <p className="text-lg md:text-xl leading-relaxed text-slate-700">
              {flagship.tagline}. Building production MVPs for legal and
              real-estate teams — from prototype to deployed software that real
              operators use every day.
            </p>

            <div className="flex flex-wrap gap-2 mt-auto pt-2">
              {flagship.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-slate-50 text-slate-700 text-xs font-medium border border-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Card>

          {/* Recognition — 4 cols */}
          <Card className="md:col-span-4 flex flex-col gap-4">
            <SectionLabel>Recognition</SectionLabel>
            <ul className="space-y-4">
              {accolades.map((a) => (
                <li key={a.id}>
                  <p className="text-sm font-semibold text-slate-900">
                    {a.title}
                  </p>
                  <p className="text-sm text-slate-500">{a.organization}</p>
                </li>
              ))}
            </ul>
          </Card>

          {/* Secondary projects — 3 cards × 4 cols = full 12 */}
          {otherProjects.map((project) => (
            <Card
              key={project.id}
              className="md:col-span-4 flex flex-col gap-3"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {project.title}
              </h3>
              <p className="text-sm font-medium text-slate-500">
                {project.role}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed flex-1">
                {project.tagline}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {project.stack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 text-[11px] font-medium border border-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Card>
          ))}

          {/* Focus — 6 cols */}
          <Card className="md:col-span-6 flex flex-col gap-4">
            <SectionLabel>Focus</SectionLabel>
            <ul className="space-y-2">
              {specializations.map((spec) => (
                <li key={spec.id} className="text-base text-slate-800">
                  {spec.name}
                </li>
              ))}
            </ul>
          </Card>

          {/* Academic & Service — 6 cols */}
          <Card className="md:col-span-6 flex flex-col gap-4">
            <SectionLabel>Academic &amp; Service</SectionLabel>
            <ul className="space-y-2">
              {academics.map((item) => (
                <li key={item.id} className="text-base text-slate-800">
                  {item.title}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Footer */}
        <footer className="mt-10 md:mt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-2 text-xs text-slate-500">
          <p>
            <span className="font-semibold uppercase tracking-[0.18em] text-slate-400 mr-2">
              Stack
            </span>
            {skills.map((s) => s.name).join(' · ')}
          </p>
          <p>© 2026 {identity.name}</p>
        </footer>
      </div>
    </main>
  );
}
