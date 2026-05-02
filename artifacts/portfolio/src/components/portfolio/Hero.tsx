import React from 'react';
import { BentoCard } from './BentoCard';
import { Github, Linkedin, Twitter, Mail, MapPin } from 'lucide-react';
import heroPortrait from '@assets/IMG_6864_1777758948574.JPEG';
import { cn } from '@/lib/utils';

export function Hero() {
  return (
    <BentoCard className={cn(
      "col-span-12 flex flex-col md:flex-row gap-8 items-start md:items-center p-8"
    )}>
      <div className="flex-1 space-y-5">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">
            Aarav Sharma
          </h1>
          <p className="text-base md:text-lg font-medium text-slate-900">
            CEO &amp; Co-Founder, LogicStep AI
          </p>
          <p className="text-slate-600 text-base md:text-lg max-w-xl leading-relaxed">
            Founder, engineer, and operator building MVPs in legal and real-estate.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600 w-fit">
          <MapPin className="w-4 h-4" />
          <span>Upper Arlington, OH</span>
        </div>

        <div className="flex items-center gap-5 pt-1">
          <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors" aria-label="GitHub">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors" aria-label="Twitter">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors" aria-label="Email">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>

      <div className="w-40 h-40 md:w-48 md:h-48 rounded-xl overflow-hidden shrink-0 border border-slate-200">
        <img
          src={heroPortrait}
          alt="Aarav Sharma"
          className="object-cover w-full h-full object-top"
        />
      </div>
    </BentoCard>
  );
}
