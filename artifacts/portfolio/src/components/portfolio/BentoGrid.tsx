import React from 'react';
import {
  identity,
  projects,
  accolades,
  academics,
  skills,
  specializations,
} from '@/data/portfolio';

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500">
    {children}
  </h2>
);

export function BentoGrid() {
  const flagship = projects.find((p) => p.featured) ?? projects[0];
  const otherProjects = projects.filter((p) => p.id !== flagship.id);

  return (
    <main className="mx-auto w-full max-w-3xl px-6 md:px-8">
      {/* Hero */}
      <section className="pt-20 pb-12">
        <h1 className="text-5xl font-medium tracking-tighter text-slate-950">
          {identity.name}
        </h1>
        <p className="mt-3 text-lg text-slate-700">{identity.tagline}</p>
        <p className="mt-2 text-base text-slate-500">{identity.location}</p>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
          <a
            href={identity.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:text-slate-950 hover:underline"
          >
            GitHub
          </a>
          <a
            href={identity.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:text-slate-950 hover:underline"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${identity.socials.email}`}
            className="underline-offset-4 hover:text-slate-950 hover:underline"
          >
            Email
          </a>
        </div>
      </section>

      <hr className="border-slate-100" />

      {/* About / Bio */}
      <section className="py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-12">
          <SectionLabel>About</SectionLabel>
          <div className="md:col-span-2 mt-3 md:mt-0">
            <p className="text-lg leading-relaxed text-slate-800">
              {identity.bio}
            </p>
          </div>
        </div>
      </section>

      <hr className="border-slate-100" />

      {/* LogicStep AI — The Anchor */}
      <section className="py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-12">
          <div>
            <SectionLabel>Currently</SectionLabel>
            <h3 className="mt-3 text-3xl font-medium tracking-tight text-slate-950">
              {flagship.title}
            </h3>
            <p className="mt-2 text-base text-slate-600">{flagship.role}</p>
          </div>
          <div className="md:col-span-2 mt-6 md:mt-0">
            <p className="text-lg leading-relaxed text-slate-800">
              {flagship.tagline}. Building production MVPs for legal and
              real-estate teams — from prototype to deployed software that real
              operators use every day.
            </p>
          </div>
        </div>
      </section>

      <hr className="border-slate-100" />

      {/* Other Projects */}
      <section className="py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-12">
          <SectionLabel>Selected Work</SectionLabel>
          <ul className="md:col-span-2 mt-3 md:mt-0 space-y-6">
            {otherProjects.map((project) => (
              <li key={project.id} className="text-base leading-relaxed">
                <span className="font-semibold text-slate-950">
                  {project.title}
                </span>
                <span className="text-slate-500"> — {project.role} — </span>
                <span className="text-slate-700">{project.tagline}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <hr className="border-slate-100" />

      {/* Recognition */}
      <section className="py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-12">
          <SectionLabel>Recognition</SectionLabel>
          <ul className="md:col-span-2 mt-3 md:mt-0 space-y-3">
            {accolades.map((a) => (
              <li key={a.id} className="text-base text-slate-800">
                <span className="font-medium text-slate-950">{a.title}</span>
                <span className="text-slate-500"> — {a.organization}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <hr className="border-slate-100" />

      {/* Academic & Service */}
      <section className="py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-12">
          <SectionLabel>Academic &amp; Service</SectionLabel>
          <ul className="md:col-span-2 mt-3 md:mt-0 space-y-2">
            {academics.map((item) => (
              <li key={item.id} className="text-base text-slate-800">
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <hr className="border-slate-100" />

      {/* Specializations */}
      <section className="py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-12">
          <SectionLabel>Focus</SectionLabel>
          <ul className="md:col-span-2 mt-3 md:mt-0 space-y-2">
            {specializations.map((spec) => (
              <li key={spec.id} className="text-base text-slate-800">
                {spec.name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer with muted Stack line */}
      <footer className="mt-12 border-t border-slate-100 py-10 text-xs text-slate-400">
        <p>
          Stack:{' '}
          {skills.map((s) => s.name).join(' · ')}
        </p>
        <p className="mt-2">
          © {new Date().getFullYear()} {identity.name}
        </p>
      </footer>
    </main>
  );
}
