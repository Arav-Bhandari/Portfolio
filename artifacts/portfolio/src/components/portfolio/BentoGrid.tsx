import React from 'react';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
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

const ICON_STROKE = 1.25;

interface SectionProps {
  index: string;
  label: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ index, label, children }) => (
  <section className="grid grid-cols-12 gap-6 md:gap-10 py-20 md:py-28 border-t border-slate-100">
    <div className="col-span-12 md:col-span-4">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
        {index} / {label}
      </p>
    </div>
    <div className="col-span-12 md:col-span-8">{children}</div>
  </section>
);

// Map each accolade to a meaningful side-label
const accoladeLabels: Record<string, string> = {
  hackathon: 'Award',
  history: 'National',
  math: 'Top 1%',
};

export function BentoGrid() {
  const flagship = projects.find((p) => p.featured) ?? projects[0];
  const otherProjects = projects.filter((p) => p.id !== flagship.id);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 md:px-10">
      {/* HERO */}
      <section className="grid grid-cols-12 gap-6 md:gap-10 pt-20 md:pt-28 pb-16 md:pb-24">
        <div className="col-span-12 md:col-span-8 flex flex-col justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
              Portfolio / 2026
            </p>
            <h1 className="mt-6 text-5xl md:text-6xl font-bold tracking-tight text-slate-900">
              {identity.name}
            </h1>
            <p className="mt-4 text-xl md:text-2xl font-medium text-slate-700">
              {identity.tagline}
            </p>
            <p className="mt-2 text-base text-slate-500">{identity.location}</p>
          </div>

          <div className="mt-10 flex items-center gap-6">
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
        </div>

        <div className="col-span-12 md:col-span-4">
          <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-slate-100">
            <img
              src={heroPortrait}
              alt={`${identity.name} portrait`}
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* 01 / ABOUT */}
      <Section index="01" label="About">
        <p className="text-2xl leading-relaxed text-slate-800 max-w-2xl font-normal">
          {identity.bio}
        </p>
      </Section>

      {/* 02 / LOGICSTEP — the anchor */}
      <Section index="02" label="LogicStep">
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#0A4A9A] flex items-center justify-center shrink-0">
              <img
                src={logicStepLogo}
                alt="LogicStep AI logo"
                className="w-11 h-11 object-contain"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                {flagship.title}
              </h2>
              <p className="mt-1 text-base font-medium text-slate-600">
                {flagship.role}
              </p>
            </div>
          </div>

          <p className="text-2xl leading-relaxed text-slate-800 font-normal">
            {flagship.tagline}. Building production MVPs for legal and
            real-estate teams — from prototype to deployed software that real
            operators use every day.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {flagship.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs font-medium text-slate-600 border border-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* 03 / WORK */}
      <Section index="03" label="Work">
        <ul className="divide-y divide-slate-100">
          {otherProjects.map((project) => (
            <li
              key={project.id}
              className="py-6 first:pt-0 last:pb-0 grid grid-cols-12 gap-4 items-start"
            >
              <div className="col-span-12 md:col-span-9">
                <div className="flex items-center gap-2">
                  <ArrowUpRight
                    strokeWidth={ICON_STROKE}
                    className="w-4 h-4 text-slate-400"
                  />
                  <h3 className="text-lg font-semibold text-slate-900">
                    {project.title}
                  </h3>
                </div>
                <p className="mt-2 text-base text-slate-600 leading-relaxed">
                  {project.tagline}
                </p>
              </div>
              <div className="col-span-12 md:col-span-3 md:text-right">
                <p className="text-sm font-medium text-slate-500">
                  {project.role}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* 04 / RECOGNITION */}
      <Section index="04" label="Recognition">
        <ul className="divide-y divide-slate-100">
          {accolades.map((a) => (
            <li
              key={a.id}
              className="py-5 first:pt-0 last:pb-0 grid grid-cols-12 gap-4 items-baseline"
            >
              <div className="col-span-3 md:col-span-2">
                <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
                  {accoladeLabels[a.id] ?? 'Award'}
                </p>
              </div>
              <div className="col-span-9 md:col-span-10">
                <p className="text-base text-slate-900">
                  <span className="font-semibold">{a.title}</span>
                  <span className="text-slate-500"> — {a.organization}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* 05 / FOCUS */}
      <Section index="05" label="Focus">
        <ul className="space-y-3">
          {specializations.map((spec) => (
            <li key={spec.id} className="text-lg text-slate-800">
              {spec.name}
            </li>
          ))}
        </ul>
      </Section>

      {/* 06 / ACADEMIC & SERVICE */}
      <Section index="06" label="Academic &amp; Service">
        <ul className="space-y-3">
          {academics.map((item) => (
            <li key={item.id} className="text-lg text-slate-800">
              {item.title}
            </li>
          ))}
        </ul>
      </Section>

      {/* Footer */}
      <footer className="grid grid-cols-12 gap-6 md:gap-10 border-t border-slate-100 py-10 mt-8 text-xs text-slate-400">
        <div className="col-span-12 md:col-span-4">
          <p className="font-black uppercase tracking-[0.2em]">Stack</p>
        </div>
        <div className="col-span-12 md:col-span-8 flex flex-wrap items-center justify-between gap-4">
          <p>{skills.map((s) => s.name).join(' · ')}</p>
          <p>© {new Date().getFullYear()} {identity.name}</p>
        </div>
      </footer>
    </main>
  );
}
