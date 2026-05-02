import React from 'react';
import { BentoCard } from './BentoCard';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import heroPortrait from '@assets/IMG_6864_1777758948574.JPEG';
import { cn } from '@/lib/utils';
import { identity } from '@/data/portfolio';

export function Hero() {
  return (
    <BentoCard className={cn(
      "col-span-12 flex flex-col md:flex-row gap-8 items-start md:items-center p-8"
    )}>
      <div className="flex-1 space-y-5">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">
            {identity.name}
          </h1>
          <p className="text-base md:text-lg font-medium text-slate-900">
            {identity.tagline}
          </p>
          <p className="text-slate-600 text-base md:text-lg max-w-xl leading-relaxed">
            {identity.bio}
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600 w-fit">
          <MapPin className="w-4 h-4" />
          <span>{identity.location}</span>
        </div>

        <div className="flex items-center gap-5 pt-1">
          <a
            href={identity.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-slate-500 hover:text-slate-900 transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={identity.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-slate-500 hover:text-slate-900 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${identity.socials.email}`}
            aria-label="Email"
            className="text-slate-500 hover:text-slate-900 transition-colors"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>

      <div className="w-40 h-40 md:w-48 md:h-48 rounded-xl overflow-hidden shrink-0 border border-slate-200">
        <img
          src={heroPortrait}
          alt={`${identity.name} portrait`}
          className="object-cover w-full h-full object-top"
        />
      </div>
    </BentoCard>
  );
}
