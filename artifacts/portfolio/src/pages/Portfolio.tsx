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
const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };
const fadeIn  = { hidden: { opacity: 0 },         show: { opacity: 1 } };

const stagger = (delay = 0, staggerChildren = 0.08) => ({
  hidden: {},
  show: { transition: { delayChildren: delay, staggerChildren } },
});

const ease = [0.25, 0.1, 0.25, 1] as const;

// ─── Silver button gradient ───────────────────────────────────────────────────
const SILVER_BTN =
  'inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-slate-900 ' +
  'bg-gradient-to-r from-slate-100 via-slate-200 to-slate-300 ' +
  'hover:from-white hover:to-slate-200 transition-all duration-200 shadow-sm';

// ─── MagneticButton ───────────────────────────────────────────────────────────
interface MagBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  as?: 'button' | 'a';
  href?: string;
}

function MagneticButton({ children, className = '', as: _tag = 'button', href, onClick, ...rest }: MagBtnProps) {
  const ref = useRef<HTMLElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ x: (e.clientX - (r.left + r.width / 2)) * 0.25, y: (e.clientY - (r.top + r.height / 2)) * 0.25 });
  };
  const shared = {
    ref: ref as any,
    onMouseMove: move,
    onMouseLeave: () => setPos({ x: 0, y: 0 }),
    animate: pos,
    transition: { type: 'spring' as const, stiffness: 220, damping: 20 },
    className,
  };
  if (href) return <motion.a href={href} {...shared}>{children}</motion.a>;
  return <motion.button onClick={onClick} {...(rest as any)} {...shared}>{children}</motion.button>;
}

// ─── FloatingNav (glass only here) ───────────────────────────────────────────
function FloatingNav() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const h = () => setVisible(window.scrollY > 100);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -64, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -64, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 340, damping: 34 }}
          className="fixed top-5 left-1/2 z-50 -translate-x-1/2 flex items-center gap-1 rounded-full px-2.5 py-2"
          style={{
            background: 'rgba(10,10,10,0.72)',
            border: '1px solid rgba(255,255,255,0.10)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}
        >
          <span className="pl-2 pr-3 font-mono text-[11px] font-semibold tracking-widest text-white/30">AB</span>
          <span className="h-3.5 w-px bg-white/10" />
          {[
            { label: 'LogicStep', href: '#logicstep' },
            { label: 'Hydra',     href: '#hydra' },
            { label: 'Journal',   href: '#journal' },
            { label: 'Services',  href: '#services' },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-full px-3.5 py-1.5 text-[12px] font-medium text-white/45
                         transition-all duration-150 hover:bg-white/[0.07] hover:text-white/90"
            >
              {l.label}
            </a>
          ))}
          <span className="h-3.5 w-px bg-white/10 mx-0.5" />
          <MagneticButton
            className={`${SILVER_BTN} !px-4 !py-1.5 !text-xs`}
            href={`mailto:${EMAIL}`}
            as="a"
          >
            Hire Me
          </MagneticButton>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

// ─── SectionLabel ─────────────────────────────────────────────────────────────
function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="mb-7 flex items-center gap-3">
      <span className="font-mono text-[10px] text-white/20">{num}</span>
      <span className="h-px w-6 bg-white/12" />
      <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/30">{label}</span>
    </div>
  );
}

// ─── ArchDiagram ─────────────────────────────────────────────────────────────
interface ArchRow { component: string; technology: string; note: string; }

function ArchDiagram({ title, rows, footer }: { title: string; rows: ArchRow[]; footer?: string }) {
  return (
    <div className="overflow-hidden rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/25">{title}</span>
        <span className="font-mono text-[10px] text-white/12">schema.v1</span>
      </div>
      <div
        className="grid grid-cols-3 gap-4 px-5 py-2"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
      >
        {['Component', 'Technology', 'Notes'].map((h) => (
          <span key={h} className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/18">{h}</span>
        ))}
      </div>
      {rows.map((row, i) => (
        <div
          key={i}
          className="grid grid-cols-3 gap-4 px-5 py-2.5 transition-colors hover:bg-white/[0.018]"
          style={ i < rows.length - 1 ? { borderBottom: '1px solid rgba(255,255,255,0.035)' } : {} }
        >
          <span className="font-mono text-[11px] text-white/40">{row.component}</span>
          <span className="font-mono text-[11px] font-medium text-white/75">{row.technology}</span>
          <span className="font-mono text-[11px] text-white/28">{row.note}</span>
        </div>
      ))}
      {footer && (
        <div
          className="px-5 py-2.5"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)', background: 'rgba(255,255,255,0.01)' }}
        >
          <span className="font-mono text-[10px] text-white/18">{footer}</span>
        </div>
      )}
    </div>
  );
}

// ─── HeroSection ──────────────────────────────────────────────────────────────
function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const textY    = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity  = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden bg-[#050505]">
      {/* Subtle dot grid — hero only */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Bottom fade to solid bg */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />

      <motion.div
        style={{ y: textY, opacity }}
        className="relative mx-auto w-full max-w-7xl px-6 pb-28 pt-36 md:px-12"
      >
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_auto]">
          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease }}
              className="mb-8 font-mono text-[10px] uppercase tracking-[0.25em] text-white/30"
            >
              Founder &amp; Software Architect
            </motion.p>

            <motion.h1
              variants={stagger(0.05, 0.08)}
              initial="hidden"
              animate="show"
              className="text-[clamp(3rem,7.5vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-white"
            >
              {['From architecture', 'to production.'].map((line, i) => (
                <motion.span
                  key={i}
                  variants={fadeUp}
                  transition={{ duration: 0.65, ease }}
                  className="block"
                  style={i === 1 ? { color: 'rgba(255,255,255,0.45)' } : {}}
                >
                  {line}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6, ease }}
              className="mt-7 max-w-md text-[15px] leading-relaxed text-white/40"
            >
              I build AI platforms, developer tooling, and infrastructure.
              I own the stack end-to-end — architecture to deployment.
            </motion.p>

            {/* Credential bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2"
            >
              {[
                { val: '2',    label: 'production projects' },
                { val: '100K+', label: 'users at peak scale' },
                { val: '1',    label: 'LLC entity' },
              ].map((s) => (
                <div key={s.label} className="flex items-baseline gap-1.5">
                  <span className="font-mono text-sm font-bold text-white/80">{s.val}</span>
                  <span className="text-[11px] text-white/30">{s.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.82, duration: 0.5 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <MagneticButton
                className={`${SILVER_BTN} group`}
                onClick={() => document.getElementById('logicstep')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Work
                <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </MagneticButton>
              <MagneticButton
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white/50
                           transition-all duration-200 hover:text-white/80"
                style={{ border: '1px solid rgba(255,255,255,0.10)' }}
                href={`mailto:${EMAIL}`}
                as="a"
              >
                <Mail size={13} />
                Get in touch
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-10 flex items-center gap-5"
            >
              <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="text-white/22 transition-colors hover:text-white/55">
                <Github size={17} strokeWidth={1.5} />
              </a>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-white/22 transition-colors hover:text-white/55">
                <Linkedin size={17} strokeWidth={1.5} />
              </a>
              <a href={`mailto:${EMAIL}`} className="text-white/22 transition-colors hover:text-white/55">
                <Mail size={17} strokeWidth={1.5} />
              </a>
              <span className="h-3.5 w-px bg-white/10" />
              <span className="font-mono text-[10px] text-white/22">Plain City, OH</span>
            </motion.div>
          </div>

          {/* Right: Portrait — clean, no glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.9, ease }}
            style={{ y: portraitY }}
            className="hidden lg:block"
          >
            <div className="relative w-60 xl:w-64">
              <div
                className="overflow-hidden rounded-2xl"
                style={{ border: '1px solid rgba(255,255,255,0.09)' }}
              >
                <img
                  src={portrait}
                  alt="Arav Bhandari"
                  className="aspect-[3/4] w-full object-cover object-top"
                />
                <div
                  className="absolute inset-x-0 bottom-0 p-4 pt-10"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 100%)' }}
                >
                  <p className="text-sm font-bold text-white">Arav Bhandari</p>
                  <p className="text-[11px] text-white/40">CEO, LogicStep AI LLC</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/18">Scroll</span>
        <motion.div animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
          <ChevronDown size={13} className="text-white/18" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Divider ─────────────────────────────────────────────────────────────────
function Divider() {
  return (
    <div className="mx-auto max-w-7xl px-6 md:px-12">
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
    </div>
  );
}

// ─── LogicStepSection ─────────────────────────────────────────────────────────
function LogicStepSection() {
  const llmRows: ArchRow[] = [
    { component: 'Frontend',     technology: 'React + TypeScript', note: 'SPA — Vite bundler'        },
    { component: 'API',          technology: 'Node.js REST',        note: 'Auth + routing layer'      },
    { component: 'LLM Engine',   technology: 'Self-hosted',         note: 'Ollama / llama.cpp'        },
    { component: 'Vector Store', technology: 'Embeddings',          note: 'Semantic search — RAG'     },
    { component: 'Database',     technology: 'MongoDB',             note: 'User state + results'      },
  ];

  return (
    <section id="logicstep" className="relative overflow-hidden bg-[#050505] py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger(0, 0.09)}
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.55, ease }}>
            <SectionLabel num="01" label="LogicStep AI" />
            <h2 className="text-[clamp(2rem,4vw,3.4rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-white">
              AI skill certification for professionals.
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/40">
              LogicStep is an AI-powered platform that evaluates professional competency through
              real-world, scored challenges — verifiable results, visible to employers.
              Founded as an LLC and built production-ready from the ground up.
            </p>
          </motion.div>

          {/* Proof screenshot + Architecture side by side */}
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-5">
            {/* Product screenshot — "Practice into Proof" */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7, ease }}
              className="overflow-hidden rounded-xl md:col-span-3"
              style={{ border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <img
                src={logicstepProof}
                alt="LogicStep — product walkthrough showing challenge and evaluation flow"
                className="w-full object-cover"
                loading="lazy"
              />
            </motion.div>

            {/* Architecture card */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7, ease }}
              className="flex flex-col gap-4 md:col-span-2"
            >
              {/* Status badge */}
              <div
                className="flex items-center gap-2.5 rounded-lg px-4 py-3"
                style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                <span className="text-[11px] font-medium text-white/60">Live platform — LLC entity · 2025</span>
              </div>

              {/* Stack tags */}
              <div
                className="flex-1 rounded-xl p-5"
                style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
              >
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.15em] text-white/25">
                  Technical Architecture
                </p>
                <ArchDiagram
                  title="Self-hosted LLM Stack"
                  rows={llmRows}
                  footer="All inference runs on self-managed hardware. No third-party LLM API."
                />
              </div>
            </motion.div>

            {/* Dashboard — full width with browser chrome */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7, ease }}
              className="overflow-hidden rounded-xl md:col-span-5"
              style={{ border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div
                className="flex items-center gap-2 px-4 py-2.5"
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                  background: 'rgba(255,255,255,0.015)',
                }}
              >
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="ml-3 font-mono text-[10px] text-white/18">logicstep.ai / dashboard</span>
              </div>
              <img
                src={logicstepDashboard}
                alt="LogicStep AI dashboard — user skill evaluation interface"
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
    const dur = 1800;
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      /* ease-out cubic */ const e = 1 - Math.pow(1 - t, 3);
      setCount(Math.floor(e * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ─── HydraSection ─────────────────────────────────────────────────────────────
function HydraSection() {
  const hydraRows: ArchRow[] = [
    { component: 'Bot Framework', technology: 'discord.py',       note: 'Python 3 — event loop'   },
    { component: 'Gateway',       technology: 'Discord API',       note: 'WebSocket + REST'        },
    { component: 'Storage v1',    technology: 'Custom JSON DB',    note: 'File-system KV store'    },
    { component: 'Storage v2',    technology: 'MongoDB',           note: 'Persistent documents'    },
    { component: 'Language',      technology: 'Python 3',          note: 'All services'            },
  ];

  return (
    <section id="hydra" className="relative overflow-hidden bg-[#050505] py-28 md:py-36">
      <Divider />
      <div className="mx-auto max-w-7xl px-6 pt-28 md:px-12 md:pt-36">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
          {/* Left */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger(0, 0.09)}
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.55, ease }}>
              <SectionLabel num="02" label="Hydra Bot" />
            </motion.div>

            {/* Industrial counter */}
            <motion.div variants={fadeUp} transition={{ duration: 0.65, ease }}>
              <div
                className="font-mono font-black leading-none text-white tabular-nums"
                style={{ fontSize: 'clamp(5rem,13vw,8rem)', letterSpacing: '-0.04em' }}
              >
                <CountUp target={100000} suffix="+" />
              </div>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/30">
                Peak Active Users
              </p>
            </motion.div>

            <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }} className="mt-8">
              <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold leading-tight tracking-[-0.04em] text-white">
                Discord esports bot.<br />Built to scale.
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/40">
                Built end-to-end with Python and discord.py — covering application management,
                support ticketing, moderation, and community tooling across tens of thousands
                of concurrent Discord users.
              </p>
            </motion.div>

            {/* DB Story */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease }}
              className="mt-6 rounded-xl p-5"
              style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
            >
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.15em] text-white/25">
                Architectural Decision · Storage
              </p>
              <p className="text-[13px] leading-relaxed text-white/55">
                Initial scaling used a custom JSON-based database — a deliberate exercise in
                file-system management and key-value store design before introducing a
                full document database. As user load grew, storage migrated to MongoDB for
                persistent document handling and query performance.
              </p>
            </motion.div>

            {/* Sunset story */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease }}
              className="mt-3 rounded-xl p-5"
              style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
            >
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.15em] text-white/25">
                Status · Sunsetted
              </p>
              <p className="text-[13px] leading-relaxed text-white/55">
                The project was sunsetted after scaling bottlenecks surfaced at peak load.
                The infrastructure patterns and architectural decisions made during Hydra's
                development directly informed the production-grade systems now running
                LogicStep AI LLC.
              </p>
            </motion.div>

            {/* Stack tags */}
            <motion.div variants={fadeIn} transition={{ duration: 0.5 }} className="mt-5 flex flex-wrap gap-2">
              {['discord.py', 'Python 3', 'MongoDB', 'Custom JSON DB', 'Discord API'].map((t) => (
                <span
                  key={t}
                  className="rounded-md px-3 py-1 font-mono text-[11px] text-white/35"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Arch diagram + phone screenshots */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger(0.1, 0.1)}
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.65, ease }}>
              <ArchDiagram
                title="Hydra Bot Architecture"
                rows={hydraRows}
                footer="v1 JSON store was hand-rolled — deliberate decision to understand primitives before adding a DB layer."
              />
            </motion.div>

            {/* Phone screenshots — clean, no decorative glow */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.8, ease }}
              className="flex items-start justify-center gap-0"
            >
              <div className="relative z-10 w-[190px]">
                <div
                  className="overflow-hidden rounded-[28px]"
                  style={{ border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  <img
                    src={hydraApplications}
                    alt="Hydra Bot — Application system channel"
                    className="w-full"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="relative z-0 -ml-8 mt-12 w-[190px] opacity-80">
                <div
                  className="overflow-hidden rounded-[28px]"
                  style={{ border: '1px solid rgba(255,255,255,0.09)' }}
                >
                  <img
                    src={hydraTickets}
                    alt="Hydra Bot — Support ticket channel"
                    className="w-full"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── FounderJournalSection ────────────────────────────────────────────────────
function FounderJournalSection() {
  const stats = [
    { val: '100K+', label: 'Users at peak' },
    { val: 'LLC',   label: 'Entity founded' },
    { val: '1st',   label: 'Hackathon — Upper Arlington' },
    { val: '2',     label: 'Production projects' },
  ];

  return (
    <section id="journal" className="relative overflow-hidden bg-[#050505] py-28 md:py-36">
      <Divider />
      <div className="mx-auto max-w-7xl px-6 pt-28 md:px-12 md:pt-36">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger(0, 0.09)}
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.55, ease }}>
            <SectionLabel num="03" label="Field Notes" />
            <h2 className="text-[clamp(2rem,4vw,3.4rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-white">
              In the room.
              <span className="text-white/35"> Not behind the screen.</span>
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/40">
              Products get built at the keyboard — but they get validated in the room.
              At hackathons, demos, and in front of people who don't care about the code.
            </p>
          </motion.div>

          {/* Full-bleed photo */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.85, ease }}
            className="relative mt-10 overflow-hidden rounded-xl"
            style={{ border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <img
              src={founderTeam}
              alt="Arav Bhandari with team at the Upper Arlington Hackathon — William & Carol Mohr STEM Lab, Ohio"
              className="h-[360px] w-full object-cover object-center md:h-[500px]"
              loading="lazy"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.72) 0%, transparent 60%)' }}
            />
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-lg font-bold text-white md:text-xl">Upper Arlington Hackathon</p>
                <p className="mt-0.5 font-mono text-[11px] text-white/40">
                  William &amp; Carol Mohr Family STEM Lab · Ohio
                </p>
              </div>
              <div
                className="flex items-center gap-2 rounded-full px-3 py-1.5"
                style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)' }}
              >
                <span className="font-mono text-xs font-bold text-white">1st Place</span>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease }}
            className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl p-5"
                style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
              >
                <p className="font-mono text-xl font-black tracking-tight text-white">{s.val}</p>
                <p className="mt-1 font-mono text-[10px] text-white/30">{s.label}</p>
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
      title: 'Web Design & Development',
      desc: 'Production-grade web products — from zero-to-one MVPs to full consumer applications. Built with React, TypeScript, and modern tooling. Delivered on time.',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Node.js'],
    },
    {
      num: '02',
      title: 'AI Automation & Integration',
      desc: 'Self-hosted LLM deployment, intelligent workflow automation, and AI feature integration. Private infrastructure, no API vendor lock-in.',
      tags: ['Self-hosted LLMs', 'Python', 'Ollama', 'MongoDB', 'RAG pipelines'],
    },
  ];

  return (
    <section id="services" className="relative bg-[#050505] py-28 md:py-36">
      <Divider />
      <div className="mx-auto max-w-7xl px-6 pt-28 md:px-12 md:pt-36">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger(0, 0.09)}
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.55, ease }}>
            <SectionLabel num="04" label="Services" />
            <h2 className="text-[clamp(2rem,4vw,3.4rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-white">
              What I build.
            </h2>
          </motion.div>

          <div className="mt-11 grid grid-cols-1 gap-4 md:grid-cols-2">
            {services.map((s) => (
              <motion.div
                key={s.num}
                variants={fadeUp}
                transition={{ duration: 0.65, ease }}
                className="group rounded-xl p-7 transition-colors duration-300 hover:bg-white/[0.025] md:p-9"
                style={{ border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <p className="font-mono text-[10px] text-white/20">{s.num}</p>
                <h3 className="mt-5 text-xl font-bold leading-tight tracking-[-0.03em] text-white md:text-2xl">
                  {s.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-white/45">{s.desc}</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded font-mono text-[10px] px-2.5 py-1 text-white/30"
                      style={{ border: '1px solid rgba(255,255,255,0.07)' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.65, ease }}
            className="mt-14 flex flex-col items-center gap-5 text-center"
          >
            <p className="max-w-xs text-[14px] text-white/30">
              I work with founders and teams who need software that actually ships.
            </p>
            <MagneticButton
              className={`${SILVER_BTN} group`}
              href={`mailto:${EMAIL}?subject=Project%20Inquiry`}
              as="a"
            >
              Start a project
              <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
    <footer className="bg-[#050505]" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <p className="text-sm font-bold text-white">Arav Bhandari</p>
            <p className="mt-0.5 font-mono text-[10px] text-white/22">
              Founder &amp; Software Architect · LogicStep AI LLC
            </p>
          </div>
          <div className="flex items-center gap-6">
            {[
              { label: 'GitHub',   href: GITHUB,              Icon: Github   },
              { label: 'LinkedIn', href: LINKEDIN,            Icon: Linkedin },
              { label: 'Email',    href: `mailto:${EMAIL}`,   Icon: Mail     },
            ].map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-1.5 font-mono text-[11px] text-white/22 transition-colors hover:text-white/55"
              >
                <Icon size={12} strokeWidth={1.5} />
                {label}
              </a>
            ))}
          </div>
          <p className="font-mono text-[10px] text-white/18">© 2026 Arav Bhandari</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Portfolio ────────────────────────────────────────────────────────────────
export function Portfolio() {
  return (
    <div className="bg-[#050505]">
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
