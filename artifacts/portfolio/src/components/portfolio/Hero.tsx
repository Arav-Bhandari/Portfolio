import React, { useEffect, useState } from 'react';
import { BentoCard } from './BentoCard';
import { Github, Linkedin, Twitter, Mail, MapPin } from 'lucide-react';
import heroPortrait from '@assets/IMG_6864_1777758948574.JPEG';

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <BentoCard className={cn(
      "col-span-12 md:col-span-8 row-span-2 flex flex-col md:flex-row gap-6 items-start md:items-center overflow-hidden",
      mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      "transition-all duration-500 ease-out delay-100"
    )}>
      <div className="flex-1 space-y-4 z-10">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            Aarav Sharma
          </h1>
          <p className="text-base md:text-lg font-medium text-primary">
            CEO &amp; Co-Founder, LogicStep AI
          </p>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl">
            Founder, engineer, and operator building MVPs in legal, real-estate, and AI.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 w-fit px-3 py-1.5 rounded-md border border-border/50">
          <MapPin className="w-4 h-4" />
          <span>Building from Upper Arlington, OH</span>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>

      <div className="relative w-full md:w-48 h-64 md:h-full rounded-lg overflow-hidden shrink-0 border border-border/50">
        <img 
          src={heroPortrait} 
          alt="Founder Portrait" 
          className="object-cover w-full h-full object-top"
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-lg"></div>
      </div>
    </BentoCard>
  );
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
