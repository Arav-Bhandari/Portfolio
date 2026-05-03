import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight, ChevronDown } from 'lucide-react';

// ─── Assets ──────────────────────────────────────────────────────────────────
import portrait from '@assets/IMG_6864_1777758948574.JPEG';
import logicstepHero from '@assets/logicstep-hero.png';
import logicstepProof from '@assets/logicstep-proof.png';
import logicstepDashboard from '@assets/logicstep-dashboard.png';
import hydraApplications from '@assets/hydra-applications.jpg';
import hydraTickets from '@assets/hydra-tickets.jpg';
import founderTeam from '@assets/founder-team.jpg';

// ─── Constants ────────────────────────────────────────────────────────────────
const EMAIL = 'bhandariarav10@gmail.com';
const GITHUB = 'https://github.com/Arav-Bhandari/';
const LINKEDIN = 'https://www.linkedin.com/in/arav-bhandari/';

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

const staggerContainer = (delay = 0, stagger = 0.09) => ({
  hidden: {},
  show: { transition: { delayChildren: delay, staggerChildren: stagger } },
});

const ease = [0.16, 1, 0.3, 1] as const;

// ─── MagneticButton ───────────────────────────────────────────────────────────
interface MagBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  as?: 'button' | 'a';
  href?: string;
}

function MagneticButton({ children, className = '', as: Tag = 'button', href, onClick, ...rest }: MagBtnProps) {
  const ref = useRef<HTMLElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ x: (e.clientX - (r.left + r.width / 2)) * 0.28, y: (e.clientY - (r.top + r.height / 2)) * 0.28 });
  };

  const sharedProps = {
    ref: ref as any,
    onMouseMove: handleMove,
    onMouseLeave: () => setPos({ x: 0, y: 0 }),
    animate: pos,
    transition: { type: 'spring' as const, stiffness: 200, damping: 18 },
    className,
  };

  if (href) {
    return (
      <motion.a href={href} {...sharedProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button onClick={onClick} {...(rest as any)} {...sharedProps}>
      {children}
    </motion.button>
  );
}

// ─── FloatingNav ──────────────────────────────────────────────────────────────
function FloatingNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handle = () => setVisible(window.scrollY > 100);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  const links = [
    { label: 'LogicStep', href: '#logicstep' },
    { label: 'Hydra', href: '#hydra' },
    { label: 'Journal', href: '#journal' },
    { label: 'Services', href: '#services' },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -72, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -72, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          className="fixed top-5 left-1/2 z-50 -translate-x-1/2 flex items-center gap-1 rounded-full border border-white/[0.08] bg-black/75 px-2.5 py-2 backdrop-blur-2xl shadow-2xl"
          style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.04), 0 24px 48px rgba(0,0,0,0.6)' }}
        >
          <span className="pl-2 pr-3 text-white/35 text-xs font-semibold tracking-widest">AB</span>
          <span className="h-4 w-px bg-white/10" />
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-full px-3.5 py-1.5 text-xs font-medium text-white/50 transition-all duration-200 hover:bg-white/[0.08] hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <span className="h-4 w-px bg-white/10 mx-0.5" />
          <a
            href={`mailto:${EMAIL}`}
            className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-black transition-colors hover:bg-blue-50"
          >
            Hire Me
          </a>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

// ─── SectionLabel ─────────────────────────────────────────────────────────────
function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="mb-7 flex items-center gap-3">
      <span className="font-mono text-[11px] text-white/25">{num}</span>
      <span className="h-px w-8 bg-white/15" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/35">{label}</span>
    </div>
  );
}

// ─── HeroSection ──────────────────────────────────────────────────────────────
function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const heroLines = ['Engineering', 'Complex Systems', 'that Redefine', 'Interaction.'];

  return (
    <section ref={ref} className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden">
      {/* Dot-grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* Blue radial bloom */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#070707] to-transparent" />

      <motion.div
        style={{ y: textY, opacity }}
        className="relative mx-auto w-full max-w-7xl px-6 pb-28 pt-36 md:px-12"
      >
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_auto]">
          {/* Left: Text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease }}
              className="mb-9 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-400/75"
            >
              <span className="h-px w-8 bg-blue-400/50" />
              Founder &amp; Software Architect
            </motion.p>

            <motion.h1
              variants={staggerContainer(0.08, 0.07)}
              initial="hidden"
              animate="show"
              className="font-display text-[clamp(2.8rem,7.5vw,6rem)] font-bold leading-[0.93] tracking-[-0.02em]"
            >
              {heroLines.map((line, i) => (
                <motion.span
                  key={i}
                  variants={fadeUp}
                  transition={{ duration: 0.75, ease }}
                  className={`block ${
                    i === 3
                      ? 'bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent'
                      : 'text-white'
                  }`}
                >
                  {line}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 0.7, ease }}
              className="mt-8 max-w-lg text-base leading-relaxed text-white/45"
            >
              Building production-grade AI platforms, scalable infrastructure, and
              high-conversion digital products — shipped, not just designed.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.78, duration: 0.7, ease }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <MagneticButton
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-blue-50"
                onClick={() => document.getElementById('logicstep')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Work
                <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </MagneticButton>
              <MagneticButton
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] px-6 py-3 text-sm font-medium text-white/60 transition-all hover:border-white/20 hover:text-white"
                href={`mailto:${EMAIL}`}
                as="a"
              >
                <Mail size={14} />
                Let's Talk
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.05, duration: 0.7 }}
              className="mt-11 flex items-center gap-5"
            >
              <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="text-white/25 transition-colors hover:text-white/60">
                <Github size={18} strokeWidth={1.5} />
              </a>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-white/25 transition-colors hover:text-white/60">
                <Linkedin size={18} strokeWidth={1.5} />
              </a>
              <a href={`mailto:${EMAIL}`} className="text-white/25 transition-colors hover:text-white/60">
                <Mail size={18} strokeWidth={1.5} />
              </a>
              <span className="h-4 w-px bg-white/10" />
              <span className="text-[11px] text-white/25">Plain City, OH</span>
            </motion.div>
          </div>

          {/* Right: Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.28, duration: 1, ease }}
            style={{ y: portraitY }}
            className="hidden lg:block"
          >
            <div className="relative w-64 xl:w-72">
              <div className="absolute -inset-5 rounded-3xl bg-gradient-to-br from-blue-500/15 to-violet-500/8 blur-3xl" />
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.09]">
                <img
                  src={portrait}
                  alt="Arav Bhandari"
                  className="aspect-[3/4] w-full object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-5 pt-10">
                  <p className="font-display text-base font-semibold text-white">Arav Bhandari</p>
                  <p className="text-xs text-white/45">Founder &amp; Software Architect</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/20">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.9, ease: 'easeInOut' }}
        >
          <ChevronDown size={14} className="text-white/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── LogicStepSection ─────────────────────────────────────────────────────────
function LogicStepSection() {
  return (
    <section id="logicstep" className="relative overflow-hidden py-28 md:py-40">
      <div className="pointer-events-none absolute -top-40 left-0 h-[600px] w-[600px] rounded-full bg-blue-600/7 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer(0, 0.1)}
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }}>
            <SectionLabel num="01" label="LogicStep AI" />
            <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold leading-[1.05] tracking-tight text-white">
              The AI Platform that Turns<br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Practice into Proof
              </span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/45">
              An AI-powered skill certification platform for the modern knowledge economy.
              Founded as an LLC — built for scale, shipped to real users.
            </p>
          </motion.div>

          {/* Hero image — 3D technical visualization */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.85, ease }}
            className="group relative mt-10 overflow-hidden rounded-2xl border border-white/[0.07]"
          >
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#070707]/75 via-transparent to-transparent" />
            <img
              src={logicstepHero}
              alt="LogicStep AI — 3D interconnected cubes technical visualization"
              className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.015]"
            />
            <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/25 bg-blue-500/15 px-2.5 py-1 text-[11px] font-medium text-blue-300 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
                  Live Platform · LLC
                </span>
                <p className="mt-2 font-display text-xl font-bold text-white">LogicStep AI</p>
                <p className="text-xs text-white/40">Founded 2025 · Ohio</p>
              </div>
              <div className="hidden flex-wrap gap-2 md:flex">
                {['TypeScript', 'Python', 'MongoDB', 'Self-hosted LLMs'].map((t) => (
                  <span key={t} className="rounded bg-white/[0.09] px-2 py-0.5 text-[10px] text-white/55 backdrop-blur-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bento grid */}
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-5">
            {/* Practice into Proof screenshot */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7, ease }}
              className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] md:col-span-3"
            >
              <img
                src={logicstepProof}
                alt="LogicStep — How it turns practice into proof"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </motion.div>

            {/* Resilience story card */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7, ease }}
              className="flex flex-col justify-between rounded-2xl border border-white/[0.07] bg-white/[0.03] p-7 md:col-span-2"
            >
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/8 px-3 py-1 text-[11px] font-medium text-amber-400">
                  ⚡ Resilience Story
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  A critical Codex-generated deletion error wiped both the frontend
                  <em> and</em> backend simultaneously during active development.
                  The entire platform was recovered, rewritten, and redeployed —
                  without losing a single user or data record.
                </p>
              </div>
              <div className="mt-6 border-t border-white/[0.07] pt-5">
                <p className="text-[10px] uppercase tracking-wider text-white/30">Outcome</p>
                <p className="mt-1 text-sm font-semibold text-white">Zero-downtime full recovery.</p>
              </div>
            </motion.div>

            {/* Dashboard — full width */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7, ease }}
              className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] md:col-span-5"
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.02] px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
                <span className="ml-3 text-[11px] text-white/20">logicstep.ai / dashboard</span>
              </div>
              <img
                src={logicstepDashboard}
                alt="LogicStep AI dashboard — complex skill evaluation UI"
                className="w-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── CountUp ──────────────────────────────────────────────────────────────────
function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 2200;
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.floor(eased * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ─── HydraSection ─────────────────────────────────────────────────────────────
function HydraSection() {
  return (
    <section id="hydra" className="relative overflow-hidden py-28 md:py-40">
      <div className="pointer-events-none absolute top-1/2 right-0 h-[700px] w-[700px] -translate-y-1/2 rounded-full bg-violet-600/6 blur-[130px]" />
      {/* Top divider */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left: metrics + narrative */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer(0, 0.1)}
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }}>
              <SectionLabel num="02" label="Hydra Bot" />
            </motion.div>

            <motion.div variants={fadeUp} transition={{ duration: 0.75, ease }}>
              <div className="font-display text-[clamp(4.5rem,11vw,7.5rem)] font-bold leading-none text-white">
                <CountUp target={100000} suffix="+" />
              </div>
              <p className="mt-2 text-base font-medium text-white/35">Users Reached</p>
            </motion.div>

            <motion.div variants={fadeUp} transition={{ duration: 0.7, ease }} className="mt-8">
              <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-bold leading-tight text-white">
                Scaling an Esports Bot<br />
                <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                  to 100,000+ Users
                </span>
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/50">
                Built and scaled a full-featured Discord esports bot — with application
                management, support ticketing, moderation, and community tooling —
                entirely from scratch to over 100,000 users.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7, ease }}
              className="mt-7 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5"
            >
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-white/30">
                The Pivot
              </p>
              <p className="text-sm leading-relaxed text-white/60">
                When the original Rust backend showed instability at scale, the entire
                architecture was migrated to a{' '}
                <span className="font-medium text-violet-300">TypeScript (Deno / Hono)</span> stack —
                achieving{' '}
                <span className="font-semibold text-white">99.9% uptime</span> without
                disrupting tens of thousands of active users mid-migration.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease }}
              className="mt-6 flex flex-wrap gap-2"
            >
              {['TypeScript', 'Deno', 'Hono', 'Discord API', 'MongoDB'].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/[0.09] px-3 py-1 text-[11px] font-medium text-white/40"
                >
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: phone mockups */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, ease }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative flex items-start">
              {/* Applications */}
              <div className="relative z-10 w-[200px] md:w-[220px]">
                <div className="absolute -inset-4 rounded-[2rem] bg-violet-500/12 blur-2xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.13] shadow-2xl">
                  <img
                    src={hydraApplications}
                    alt="Hydra Bot — Application system on Discord"
                    className="w-full"
                    loading="lazy"
                  />
                </div>
              </div>
              {/* Tickets — offset */}
              <div className="relative z-0 -ml-10 mt-14 w-[200px] md:w-[220px]">
                <div className="absolute -inset-4 rounded-[2rem] bg-pink-500/8 blur-2xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.09] shadow-2xl opacity-90">
                  <img
                    src={hydraTickets}
                    alt="Hydra Bot — Support ticket system on Discord"
                    className="w-full"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── FounderJournalSection ────────────────────────────────────────────────────
function FounderJournalSection() {
  const stats = [
    { val: '100k+', label: 'Users reached' },
    { val: 'LLC', label: 'Entity founded' },
    { val: '1st', label: 'Hackathon place' },
    { val: '99.9%', label: 'Bot uptime' },
  ];

  return (
    <section id="journal" className="relative overflow-hidden py-28 md:py-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer(0, 0.1)}
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }}>
            <SectionLabel num="03" label="Founder's Journal" />
            <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold leading-[1.05] text-white">
              In the Trenches.
              <br />
              <span className="text-white/35">Not in a vacuum.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/45">
              Real products are built in the room — at hackathons, at demos, in front of live users.
              The work speaks, and so does the presence.
            </p>
          </motion.div>

          {/* Full-bleed image */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.95, ease }}
            className="relative mt-10 overflow-hidden rounded-2xl border border-white/[0.07]"
          >
            <img
              src={founderTeam}
              alt="Arav Bhandari with team at the Upper Arlington Hackathon — William & Carol Mohr Family STEM Lab"
              className="h-[380px] w-full object-cover object-center md:h-[520px]"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070707]/75 via-transparent to-transparent" />
            <div className="absolute bottom-7 left-7 right-7 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-display text-xl font-bold text-white md:text-2xl">
                  Upper Arlington Hackathon
                </p>
                <p className="mt-1 text-xs text-white/45">
                  William &amp; Carol Mohr Family STEM Lab · Ohio
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/[0.13] bg-white/[0.09] px-3 py-2 backdrop-blur-sm">
                <span className="text-sm">🏆</span>
                <span className="text-sm font-semibold text-white">1st Place</span>
              </div>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7, ease }}
            className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5"
              >
                <p className="font-display text-2xl font-bold text-white">{s.val}</p>
                <p className="mt-1 text-[11px] text-white/35">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── ServicesSection ──────────────────────────────────────────────────────────
function ServicesSection() {
  const services = [
    {
      num: '01',
      title: 'Web Design\n& Development',
      desc: 'High-performance, visually striking web products built with modern stacks. From zero-to-one MVPs to polished consumer products — fast, functional, and production-ready.',
      tags: ['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'Vite'],
      accent: 'from-blue-500/5 to-cyan-500/5',
      hoverAccent: 'from-blue-500/10 to-cyan-500/8',
    },
    {
      num: '02',
      title: 'AI Automation\n& Integration',
      desc: 'Integrate self-hosted LLMs, build intelligent agents and automated workflows, and make your product smarter — fast, private, and production-ready.',
      tags: ['LLM APIs', 'Self-hosted Models', 'Python', 'Agentic Systems', 'MongoDB'],
      accent: 'from-violet-500/5 to-pink-500/5',
      hoverAccent: 'from-violet-500/10 to-pink-500/8',
    },
  ];

  return (
    <section id="services" className="relative py-28 md:py-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer(0, 0.1)}
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }}>
            <SectionLabel num="04" label="Services" />
            <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold leading-[1.05] text-white">
              What I Build
            </h2>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {services.map((s) => (
              <motion.div
                key={s.num}
                variants={fadeUp}
                transition={{ duration: 0.7, ease }}
                className={`group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br ${s.accent} p-8 transition-all duration-500 hover:border-white/[0.13] md:p-10`}
                style={{}}
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${s.hoverAccent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />
                <p className="font-mono text-[11px] text-white/20">{s.num}</p>
                <h3 className="relative mt-5 font-display text-2xl font-bold leading-tight text-white whitespace-pre-line md:text-3xl">
                  {s.title}
                </h3>
                <p className="relative mt-4 text-sm leading-relaxed text-white/50">{s.desc}</p>
                <div className="relative mt-8 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/[0.08] px-3 py-1 text-[11px] text-white/35"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7, ease }}
            className="mt-16 flex flex-col items-center text-center"
          >
            <p className="mb-7 max-w-sm text-sm text-white/35">
              Ready to build something that actually ships? Skip the noise.
            </p>
            <MagneticButton
              className="group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-colors hover:bg-blue-50"
              href={`mailto:${EMAIL}?subject=Project%20Inquiry`}
              as="a"
            >
              Start a Project
              <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <p className="font-display text-sm font-bold text-white">Arav Bhandari</p>
            <p className="mt-0.5 text-[11px] text-white/25">Founder &amp; Software Architect · LogicStep AI</p>
          </div>
          <div className="flex items-center gap-6">
            {[
              { label: 'GitHub', href: GITHUB, Icon: Github },
              { label: 'LinkedIn', href: LINKEDIN, Icon: Linkedin },
              { label: 'Email', href: `mailto:${EMAIL}`, Icon: Mail },
            ].map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-1.5 text-[11px] text-white/25 transition-colors hover:text-white/55"
              >
                <Icon size={13} strokeWidth={1.5} />
                {label}
              </a>
            ))}
          </div>
          <p className="text-[11px] text-white/18">© 2026 Arav Bhandari</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Portfolio ────────────────────────────────────────────────────────────────
export function Portfolio() {
  return (
    <div className="relative bg-[#070707]">
      <FloatingNav />
      <HeroSection />
      <LogicStepSection />
      <HydraSection />
      <FounderJournalSection />
      <ServicesSection />
      <Footer />
    </div>
  );
}
