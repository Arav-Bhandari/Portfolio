import React from 'react';
import { Trophy, Award, Medal } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  role: string;
  tagline: string;
  stack: string[];
  featured?: boolean;
}

export interface Accolade {
  id: string;
  title: string;
  organization: string;
  icon: 'Trophy' | 'Award' | 'Medal';
}

export interface Academic {
  id: string;
  title: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface Specialization {
  id: string;
  name: string;
}

export const projects: Project[] = [
  {
    id: "logicstep-ai",
    title: "LogicStep AI",
    role: "CEO & Co-Founder",
    tagline: "MVP development for legal and real estate sectors",
    stack: ["TypeScript", "Python", "Self-hosted LLMs", "MongoDB"],
    featured: true
  },
  {
    id: "vtrendz",
    title: "vtrendz.net",
    role: "SEO & GEO Specialist",
    tagline: "Implemented JSON-LD schema and optimized site architecture for Generative Engine Optimization (GEO)",
    stack: ["SEO", "GEO", "JSON-LD", "Schema.org"]
  },
  {
    id: "hydra",
    title: "Hydra Discord Bot",
    role: "Full-stack developer",
    tagline: "Built and scaled to 100,000+ users",
    stack: ["TypeScript", "JavaScript", "MongoDB", "Discord API"]
  },
  {
    id: "equestrian",
    title: "The Equestrian WT",
    role: "Supply Chain & IT Management",
    tagline: "Operations and IT for an equestrian retail brand",
    stack: ["Operations", "IT", "E-commerce"]
  }
];

export const accolades: Accolade[] = [
  { id: "hackathon", title: "1st Place", organization: "Upper Arlington Hackathon", icon: "Trophy" },
  { id: "history", title: "National Level", organization: "National History Day", icon: "Award" },
  { id: "math", title: "Top 1%", organization: "Continental Math League", icon: "Medal" }
];

export const academics: Academic[] = [
  { id: "djmunc", title: "DJMUNC (Model UN)" },
  { id: "aspire", title: "Aspire Program Tutor" },
  { id: "ta", title: "Teacher Assistant" }
];

export const skills: Skill[] = [
  { id: "ts", name: "TypeScript" },
  { id: "py", name: "Python" },
  { id: "js", name: "JavaScript" },
  { id: "p5", name: "p5.js" },
  { id: "mongo", name: "MongoDB" }
];

export const specializations: Specialization[] = [
  { id: "llm", name: "Self-hosted LLMs" },
  { id: "seo", name: "SEO/GEO Technical Strategy" },
  { id: "api", name: "API Development" }
];
