import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
  useSpring,
} from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight, ChevronDown } from 'lucide-react';

// ─── Assets ──────────────────────────────────────────────────────────────────
import logicstepProof from '@assets/logicstep-proof.png';
import logicstepDashboard from '@assets/logicstep-dashboard.png';
import hydraApplications from '@assets/hydra-applications.jpg';
import hydraTickets from '@assets/hydra-tickets.jpg';
import founderTeam from '@assets/founder-team.jpg';

// ─── Constants ────────────────────────────────────────────────────────────────
const EMAIL    = 'bhandariarav10@gmail.com';
const GITHUB   = 'https://github.com/Arav-Bhandari/';
const LINKEDIN = 'https://www.linkedin.com/in/arav-bhandari/';

// ─── Animation config ─────────────────────────────────────────────────────────
const ease = [0.16, 1, 0.3, 1] as const;
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const stagger = (delay = 0, staggerChildren = 0.07) => ({
  hidden: {},
  show: { transition: { delayChildren: delay, staggerChildren } },
});

// ─── Gold CTA button ──────────────────────────────────────────────────────────
const GOLD_BTN =
  'inline-flex items-center gap-2 rounded-sm px-5 py-2.5 text-sm font-semibold text-[#000000] ' +
  'bg-[#F59E0B] hover:bg-[#D97706] transition-colors duration-150 ' +
  'shadow-[2px_2px_0px_0px_#000000]';

// ─── ScrollProgress ───────────────────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="fixed right-5 top-0 z-50 h-screen w-px bg-white/[0.06] hidden lg:block">
      <motion.div
        style={{ scaleY, transformOrigin: 'top' }}
        className="absolute inset-0 bg-white/30"
      />
      {/* Tick marks */}
      {[0.25, 0.5, 0.75].map((p) => (
        <div
          key={p}
          className="absolute right-0 w-1.5 h-px bg-white/10"
          style={{ top: `${p * 100}%` }}
        />
      ))}
    </div>
  );
}

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
    setPos({ x: (e.clientX - (r.left + r.width / 2)) * 0.22, y: (e.clientY - (r.top + r.height / 2)) * 0.22 });
  };
  const shared = {
    ref: ref as any,
    onMouseMove: move,
    onMouseLeave: () => setPos({ x: 0, y: 0 }),
    animate: pos,
    transition: { type: 'spring' as const, stiffness: 260, damping: 22 },
    className,
  };
  if (href) return <motion.a href={href} {...shared}>{children}</motion.a>;
  return <motion.button onClick={onClick} {...(rest as any)} {...shared}>{children}</motion.button>;
}

// ─── TiltCard ─────────────────────────────────────────────────────────────────
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springRotX = useSpring(rotX, { stiffness: 200, damping: 25 });
  const springRotY = useSpring(rotY, { stiffness: 200, damping: 25 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current!.getBoundingClientRect();
    rotX.set(((e.clientY - r.top) / r.height - 0.5) * -10);
    rotY.set(((e.clientX - r.left) / r.width - 0.5) * 10);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { rotX.set(0); rotY.set(0); }}
      style={{ rotateX: springRotX, rotateY: springRotY, transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── FloatingNav ─────────────────────────────────────────────────────────────
function FloatingNav() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const h = () => setVisible(window.scrollY > 120);
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
          className="fixed top-5 left-1/2 z-50 -translate-x-1/2 flex items-center gap-1 px-3 py-2"
          style={{
            background: 'rgba(6,6,6,0.78)',
            border: '1px solid rgba(255,255,255,0.09)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
            borderRadius: '4px',
          }}
        >
          <span className="pl-1 pr-3 font-mono text-[10px] font-semibold tracking-widest text-white/25">AB</span>
          <span className="h-3.5 w-px bg-white/08" />
          {[
            { label: 'LogicStep', href: '#logicstep' },
            { label: 'Hydra',     href: '#hydra'     },
            { label: 'Journal',   href: '#journal'   },
            { label: 'Services',  href: '#services'  },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="px-3.5 py-1.5 font-mono text-[11px] text-white/40 transition-all duration-150 hover:text-white/80"
            >
              {l.label}
            </a>
          ))}
          <span className="h-3.5 w-px bg-white/08 mx-0.5" />
          <MagneticButton className={`${GOLD_BTN} !px-3.5 !py-1.5 !text-[11px] !rounded-sm`} href={`mailto:${EMAIL}`} as="a">
            Hire Me
          </MagneticButton>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

// ─── AnimatedDivider — draws the 2px border left→right on scroll ───────────────
function AnimatedDivider({ index, label }: { index: string; label: string }) {
  return (
    <div className="relative mx-auto max-w-7xl px-6 md:px-12">
      <div className="relative flex items-center gap-4 py-0">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.4, ease }}
          style={{ transformOrigin: 'left' }}
          className="h-0.5 flex-1 bg-white/10"
        />
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="shrink-0 font-mono text-[10px] uppercase tracking-[0.22em] text-amber-400/30"
        >
          {index} // {label}
        </motion.span>
      </div>
    </div>
  );
}

// ─── SectionIndex ─────────────────────────────────────────────────────────────
function SectionIndex({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="font-mono text-[11px] font-semibold text-white/20 tabular-nums">{num}</span>
      <span className="h-px w-5 bg-white/10" />
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/25">{label}</span>
    </div>
  );
}

// ─── MonorepoBox ──────────────────────────────────────────────────────────────
function MonorepoBox() {
  return (
    <div
      className="rounded-sm p-5 overflow-hidden"
      style={{ background: '#0A0A0A', border: '1.5px solid rgba(255,255,255,0.10)' }}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="ml-2 font-mono text-[10px] text-white/20">workspace://logicstep</span>
      </div>
      <pre className="font-mono text-[11px] leading-[1.8] text-white/50 overflow-x-auto">
{`@workspace/logicstep
├── frontend/          # React + Vite (SPA)
│   ├── src/pages/
│   └── src/components/
└── api-server/        # Deno 2 + Hono v4
    ├── src/routes/    # REST endpoints
    ├── src/db/        # postgres.js
    └── src/grading/   # DeepSeek V3 SSE`}
      </pre>
    </div>
  );
}

// ─── ArchDiagram ─────────────────────────────────────────────────────────────
interface ArchRow { component: string; technology: string; note: string; }

function ArchDiagram({ title, rows, footer }: { title: string; rows: ArchRow[]; footer?: string }) {
  return (
    <div className="overflow-hidden rounded-sm" style={{ border: '1.5px solid rgba(255,255,255,0.09)', background: '#0A0A0A' }}>
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/22">{title}</span>
        <span className="font-mono text-[10px] text-white/10">schema.v2</span>
      </div>
      <div className="grid grid-cols-3 gap-4 px-5 py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        {['Component', 'Technology', 'Notes'].map((h) => (
          <span key={h} className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/15">{h}</span>
        ))}
      </div>
      {rows.map((row, i) => (
        <div
          key={i}
          className="grid grid-cols-3 gap-4 px-5 py-2.5 transition-colors hover:bg-white/[0.015]"
          style={i < rows.length - 1 ? { borderBottom: '1px solid rgba(255,255,255,0.04)' } : {}}
        >
          <span className="font-mono text-[11px] text-white/35">{row.component}</span>
          <span className="font-mono text-[11px] font-semibold text-white/70">{row.technology}</span>
          <span className="font-mono text-[11px] text-white/25">{row.note}</span>
        </div>
      ))}
      {footer && (
        <div className="px-5 py-2.5" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
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
  const textY   = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });
  const spotlightBg = useMotionTemplate`radial-gradient(300px circle at ${springX}px ${springY}px, rgba(245,158,11,0.03) 0%, transparent 70%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section ref={ref} onMouseMove={handleMouseMove} className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-[#060606]">
      {/* Dot grid texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* Mouse spotlight — ultra-faint amber, tight radius */}
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: spotlightBg }} />
      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#060606] to-transparent" />

      <motion.div style={{ y: textY, opacity }} className="relative w-full max-w-7xl mx-auto px-6 md:px-12 pt-36 pb-24">
        {/* 12-col grid */}
        <div className="grid grid-cols-12 gap-x-4 items-center">

          {/* Col 2-9: headline block */}
          <div className="col-start-1 col-span-12 lg:col-start-2 lg:col-span-8">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-7 font-mono text-[10px] uppercase tracking-[0.3em] text-white/25"
            >
              Founder &amp; Software Architect
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="leading-[0.9] tracking-[-0.055em] text-white font-black"
              style={{ fontSize: 'clamp(3.8rem,10vw,8rem)', fontWeight: 900 }}
            >
              ARAV BHANDARI
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 font-mono text-[11px] tracking-[0.12em] text-amber-400/60 uppercase"
            >
              CEO &amp; Co-Founder, LogicStep AI
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/72 lg:ml-[calc(3/9*100%)]"
            >
              I build AI platforms, developer tooling, and infrastructure.
              I own the stack end-to-end — architecture to deployment.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 lg:ml-[calc(3/9*100%)]"
            >
              {[
                { val: '2',     label: 'production projects' },
                { val: '100K+', label: 'users at peak' },
                { val: 'LLC',   label: 'entity founded' },
              ].map((s) => (
                <div key={s.label} className="flex items-baseline gap-1.5">
                  <span className="font-mono text-sm font-bold text-white/75">{s.val}</span>
                  <span className="font-mono text-[10px] text-white/28">{s.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-8 flex flex-wrap items-center gap-3 lg:ml-[calc(3/9*100%)]"
            >
              <MagneticButton
                className={`${GOLD_BTN} group`}
                onClick={() => document.getElementById('logicstep')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Work
                <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </MagneticButton>
              <MagneticButton
                className="inline-flex items-center gap-2 rounded-sm px-5 py-2.5 text-sm font-mono text-white/45 transition-all duration-200 hover:text-white/80"
                style={{ border: '1px solid rgba(255,255,255,0.09)' }}
                href={`mailto:${EMAIL}`}
                as="a"
              >
                <Mail size={12} />
                Get in touch
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-9 flex items-center gap-5 lg:ml-[calc(3/9*100%)]"
            >
              <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="text-white/20 transition-colors hover:text-white/55">
                <Github size={16} strokeWidth={1.5} />
              </a>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-white/20 transition-colors hover:text-white/55">
                <Linkedin size={16} strokeWidth={1.5} />
              </a>
              <a href={`mailto:${EMAIL}`} className="text-white/20 transition-colors hover:text-white/55">
                <Mail size={16} strokeWidth={1.5} />
              </a>
              <span className="h-3 w-px bg-white/08" />
              <span className="font-mono text-[10px] text-white/20">Plain City, OH</span>
            </motion.div>
          </div>


        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/16">Scroll</span>
        <motion.div animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}>
          <ChevronDown size={12} className="text-white/16" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── LogicStepSection ─────────────────────────────────────────────────────────
function LogicStepSection() {
  const llmRows: ArchRow[] = [
    { component: 'Frontend',   technology: 'React + Vite',      note: 'TypeScript SPA'           },
    { component: 'API',        technology: 'Deno 2 + Hono v4',  note: 'REST route handlers'       },
    { component: 'Database',   technology: 'PostgreSQL',         note: 'postgres.js driver'        },
    { component: 'AI Grading', technology: 'DeepSeek V3',        note: 'SSE stream + auto-repair'  },
    { component: 'Monorepo',   technology: 'pnpm workspaces',    note: '@workspace/* packages'     },
  ];

  return (
    <section id="logicstep" className="relative bg-[#060606] pt-20 pb-28 md:pb-36">
      <AnimatedDivider index="01" label="ARCHITECTURE" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 pt-16 md:pt-20">
        {/* 12-col grid */}
        <div className="grid grid-cols-12 gap-x-4">

          {/* Section index — col 2 */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
            variants={stagger(0, 0.08)}
            className="col-start-1 col-span-12 lg:col-start-2 lg:col-span-10"
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.55, ease }}>
              <SectionIndex num="01" label="LogicStep AI" />
            </motion.div>

            {/* Headline — cols 2-7 */}
            <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }}>
              <h2
                className="leading-[1.02] tracking-[-0.04em] text-white font-black"
                style={{ fontSize: 'clamp(2rem,4.5vw,3.6rem)', fontWeight: 900, maxWidth: '62%' }}
              >
                AI skill certification<br />for professionals.
              </h2>
            </motion.div>

            {/* Body — offset to col 5 equivalent */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease }}
              className="mt-5 lg:ml-[calc(3/10*100%)]"
            >
              <p className="max-w-lg text-[15px] leading-relaxed text-white/40">
                LogicStep evaluates professional competency through real-world, AI-scored challenges.
                Verifiable results visible to employers. Founded as an LLC and built production-ready.
              </p>

              {/* Status badge */}
              <div className="mt-5 inline-flex items-center gap-2.5 rounded-sm px-4 py-2.5"
                style={{ border: '1.5px solid rgba(255,255,255,0.08)', background: '#0A0A0A' }}>
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                <span className="font-mono text-[11px] text-white/55">Live platform — LLC entity · 2025</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* DeepSeek V3 SSE callout — highlighted */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}
          variants={stagger(0.1, 0.08)}
          className="mt-8 grid grid-cols-12 gap-x-4"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.65, ease }}
            className="col-start-1 col-span-12 lg:col-start-5 lg:col-span-8"
          >
            <div
              className="rounded-sm p-5 mb-5"
              style={{ border: '1.5px solid rgba(255,255,255,0.12)', background: '#0A0A0A' }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/22 mb-2">
                    AI Grading Engine
                  </p>
                  <p className="font-mono text-[13px] font-semibold text-white/75">DeepSeek V3 — SSE Implementation</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/72">
                    Real-time scoring feedback streamed over Server-Sent Events. Includes auto-repair
                    logic that retries and re-parses malformed JSON from the model before surfacing
                    a score — zero dropped evaluations in production.
                  </p>
                </div>
                <span className="shrink-0 font-mono text-[10px] px-2.5 py-1 rounded-sm text-emerald-400/70"
                  style={{ border: '1px solid rgba(52,211,153,0.2)', background: 'rgba(52,211,153,0.04)' }}>
                  SSE
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Images + arch + monorepo grid */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}
          variants={stagger(0.05, 0.09)}
          className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-12"
        >
          {/* Product screenshot — spans 7 cols */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7, ease }}
            className="overflow-hidden rounded-sm md:col-span-7"
            style={{ border: '1.5px solid rgba(255,255,255,0.08)' }}
          >
            <img src={logicstepProof} alt="LogicStep — challenge and evaluation flow" className="w-full object-cover" loading="lazy" />
          </motion.div>

          {/* Right column — 5 cols */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7, ease }}
            className="flex flex-col gap-4 md:col-span-5"
          >
            <MonorepoBox />
            <ArchDiagram
              title="Production Stack"
              rows={llmRows}
              footer="Monorepo: @workspace/logicstep + @workspace/api-server"
            />
          </motion.div>

          {/* Dashboard — full width with browser chrome */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7, ease }}
            className="overflow-hidden rounded-sm md:col-span-12"
            style={{ border: '1.5px solid rgba(255,255,255,0.08)' }}
          >
            <div
              className="flex items-center gap-2 px-4 py-2.5"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: '#0A0A0A' }}
            >
              <span className="h-2 w-2 rounded-full bg-white/12" />
              <span className="h-2 w-2 rounded-full bg-white/12" />
              <span className="h-2 w-2 rounded-full bg-white/12" />
              <span className="ml-3 font-mono text-[10px] text-white/18">logicstep.ai / dashboard</span>
            </div>
            <img src={logicstepDashboard} alt="LogicStep AI dashboard" className="w-full object-cover" loading="lazy" />
          </motion.div>
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
    const dur = 2000;
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const e = 1 - Math.pow(1 - t, 3);
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
    { component: 'Bot Framework', technology: 'discord.py',        note: 'Python 3 event loop'        },
    { component: 'Gateway',       technology: 'Discord API',        note: 'WebSocket + REST'           },
    { component: 'Storage v0',    technology: 'Custom JSON Engine', note: 'Hand-rolled — first 10k'    },
    { component: 'Storage v1',    technology: 'PostgreSQL',         note: 'Migration at scale'         },
    { component: 'Language',      technology: 'Python 3',           note: 'All services'               },
  ];

  return (
    <section id="hydra" className="relative bg-[#060606] pt-20 pb-28 md:pb-36">
      <AnimatedDivider index="02" label="IMPACT" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 pt-16 md:pt-20">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2">

          {/* Left */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
            variants={stagger(0, 0.09)}
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.55, ease }}>
              <SectionIndex num="02" label="Hydra Bot" />
            </motion.div>

            {/* Giant counter */}
            <motion.div variants={fadeUp} transition={{ duration: 0.7, ease }}>
              <div
                className="font-mono font-black leading-none text-white tabular-nums"
                style={{ fontSize: 'clamp(5rem,14vw,8.5rem)', letterSpacing: '-0.04em', fontWeight: 900 }}
              >
                <CountUp target={100000} suffix="+" />
              </div>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/28">
                Peak Active Users
              </p>
            </motion.div>

            <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }} className="mt-8">
              <h2
                className="leading-tight tracking-[-0.04em] text-white font-black"
                style={{ fontSize: 'clamp(1.8rem,3.2vw,2.8rem)', fontWeight: 900 }}
              >
                Discord esports bot.<br />Built to scale.
              </h2>
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/72">
                Built end-to-end with Python and discord.py — covering application management,
                support ticketing, moderation, and community tooling across tens of thousands
                of concurrent Discord users.
              </p>
            </motion.div>

            {/* Engineering Primitive callout — the JSON DB story */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease }}
              className="mt-6 rounded-sm p-5"
              style={{ border: '1.5px solid rgba(255,255,255,0.10)', background: '#0A0A0A' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">Engineering Primitive</span>
                <span className="font-mono text-[9px] px-2 py-0.5 rounded-sm text-white/30"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}>v0 · first 10k users</span>
              </div>
              <p className="font-mono text-[12px] font-semibold text-white/65 mb-2">
                Custom JSON Storage Engine
              </p>
              <p className="text-[15px] leading-relaxed text-white/72">
                Before introducing a real database, I hand-rolled a file-system key-value store in
                Python — flat JSON files with custom indexing, locking, and query logic.
                A deliberate choice to understand storage primitives from first principles.
                Scaled to the first 10k users before migrating to PostgreSQL.
              </p>
            </motion.div>

            {/* Postgres migration */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease }}
              className="mt-3 rounded-sm p-5"
              style={{ border: '1.5px solid rgba(255,255,255,0.07)', background: '#0A0A0A' }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/20 mb-2">Migration · PostgreSQL</p>
              <p className="text-[15px] leading-relaxed text-white/72">
                When user load outgrew the JSON engine, I migrated to PostgreSQL — retaining all
                historical data. The architectural patterns from Hydra's storage migrations
                directly informed LogicStep's production database design.
              </p>
            </motion.div>

            {/* Stack tags */}
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="mt-5 flex flex-wrap gap-2">
              {['discord.py', 'Python 3', 'PostgreSQL', 'Custom JSON Engine', 'Discord API'].map((t) => (
                <span
                  key={t}
                  className="rounded-sm px-3 py-1 font-mono text-[11px] text-white/32"
                  style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#0A0A0A' }}
                >
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: arch diagram + phone screenshots */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
            variants={stagger(0.1, 0.1)}
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.65, ease }}>
              <ArchDiagram
                title="Hydra Bot Architecture"
                rows={hydraRows}
                footer="v0 JSON engine hand-rolled — understand primitives first, add infrastructure second."
              />
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.8, ease }}
              className="flex items-start justify-center"
            >
              <div className="relative z-10 w-[185px]">
                <div className="overflow-hidden rounded-[26px]" style={{ border: '1.5px solid rgba(255,255,255,0.12)' }}>
                  <img src={hydraApplications} alt="Hydra Bot — Application system" className="w-full" loading="lazy" />
                </div>
              </div>
              <div className="relative z-0 -ml-8 mt-10 w-[185px] opacity-75">
                <div className="overflow-hidden rounded-[26px]" style={{ border: '1.5px solid rgba(255,255,255,0.08)' }}>
                  <img src={hydraTickets} alt="Hydra Bot — Support tickets" className="w-full" loading="lazy" />
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
    { val: '1st',   label: 'UA Hackathon'  },
    { val: '2',     label: 'Production projects' },
  ];

  return (
    <section id="journal" className="relative bg-[#060606] pt-20 pb-28 md:pb-36">
      <AnimatedDivider index="03" label="FIELD NOTES" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Founder photo breaks out of the divider — negative top margin */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, ease }}
          className="relative -mt-0 pt-0 z-10"
          style={{ marginTop: '-2rem' }}
        >
          {/* The image deliberately overlaps the section border above */}
          <div className="relative overflow-visible">
            <div
              className="overflow-hidden rounded-sm relative"
              style={{ border: '1.5px solid rgba(255,255,255,0.09)' }}
            >
              <img
                src={founderTeam}
                alt="Arav Bhandari at the Upper Arlington Hackathon — William & Carol Mohr STEM Lab, Ohio"
                className="h-[340px] w-full object-cover object-center md:h-[480px]"
                loading="lazy"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(6,6,6,0.78) 0%, transparent 55%)' }}
              />
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-black text-white md:text-xl" style={{ fontWeight: 900, fontSize: 'clamp(1rem,2vw,1.2rem)' }}>
                    Upper Arlington Hackathon
                  </p>
                  <p className="mt-1 font-mono text-[10px] text-white/35">
                    William &amp; Carol Mohr Family STEM Lab · Ohio
                  </p>
                </div>
                <div
                  className="flex items-center gap-2 rounded-sm px-3 py-1.5"
                  style={{
                    border: '1px solid rgba(255,255,255,0.14)',
                    background: 'rgba(6,6,6,0.65)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <span className="font-mono text-xs font-bold text-white">1st Place</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}
          variants={stagger(0, 0.09)}
          className="mt-10"
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.55, ease }}>
            <SectionIndex num="03" label="Field Notes" />
            <h2
              className="tracking-[-0.04em] text-white font-black"
              style={{ fontSize: 'clamp(2rem,4.5vw,3.4rem)', fontWeight: 900, lineHeight: 1.05 }}
            >
              In the room.
              <span style={{ color: 'rgba(255,255,255,0.3)' }}> Not behind the screen.</span>
            </h2>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/72">
              Products get built at the keyboard — but they get validated in the room.
              At hackathons, demos, and in front of people who don't care about the code.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease }}
            className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-sm p-5"
                style={{ border: '1.5px solid rgba(255,255,255,0.08)', background: '#0A0A0A' }}
              >
                <p className="font-mono text-xl font-black tracking-tight text-white" style={{ fontWeight: 900 }}>{s.val}</p>
                <p className="mt-1 font-mono text-[10px] text-white/28">{s.label}</p>
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
      desc: 'Production-grade web products — zero-to-one MVPs to full consumer applications. React, TypeScript, and modern tooling. Delivered on time.',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Deno 2'],
    },
    {
      num: '02',
      title: 'AI Automation & Integration',
      desc: 'Self-hosted LLM deployment, intelligent workflow automation, and AI feature integration. Real-time SSE grading, private infrastructure, no vendor lock-in.',
      tags: ['DeepSeek V3', 'SSE Streaming', 'Python', 'PostgreSQL', 'Hono v4'],
    },
  ];

  return (
    <section id="services" className="relative bg-[#060606] pt-20 pb-28 md:pb-36">
      <AnimatedDivider index="05" label="SERVICES" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 pt-16 md:pt-20">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
          variants={stagger(0, 0.09)}
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.55, ease }}>
            <SectionIndex num="05" label="Services" />
            <h2
              className="tracking-[-0.04em] text-white font-black"
              style={{ fontSize: 'clamp(2rem,4.5vw,3.4rem)', fontWeight: 900, lineHeight: 1.05 }}
            >
              What I build.
            </h2>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 gap-0 md:grid-cols-2">
            {services.map((s, i) => (
              <motion.div
                key={s.num}
                variants={fadeUp}
                transition={{ duration: 0.65, ease }}
                className="group p-8 transition-colors duration-300 hover:bg-white/[0.018] md:p-10"
                style={{
                  border: '1.5px solid rgba(255,255,255,0.08)',
                  background: '#0A0A0A',
                  borderLeft: i === 1 ? 'none' : undefined,
                }}
              >
                <p className="font-mono text-[10px] text-white/18 tabular-nums">{s.num}</p>
                <h3
                  className="mt-5 leading-tight tracking-[-0.03em] text-white font-black"
                  style={{ fontSize: 'clamp(1.2rem,2vw,1.5rem)', fontWeight: 900 }}
                >
                  {s.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/72">{s.desc}</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-sm font-mono text-[10px] px-2.5 py-1 text-white/28"
                      style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.015)' }}
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
            className="mt-12 flex flex-col items-center gap-5 text-center"
          >
            <p className="max-w-xs font-mono text-[12px] text-white/28">
              I work with founders and teams who need software that actually ships.
            </p>
            <MagneticButton
              className={`${GOLD_BTN} group`}
              href={`mailto:${EMAIL}?subject=Project%20Inquiry`}
              as="a"
            >
              Start a project
              <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
    <footer className="bg-[#060606]" style={{ borderTop: '1.5px solid rgba(255,255,255,0.07)' }}>
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <p className="font-black text-white" style={{ fontWeight: 900 }}>Arav Bhandari</p>
            <p className="mt-0.5 font-mono text-[10px] text-white/20">
              Founder &amp; Software Architect · LogicStep AI LLC
            </p>
          </div>
          <div className="flex items-center gap-6">
            {[
              { label: 'GitHub',   href: GITHUB,            Icon: Github   },
              { label: 'LinkedIn', href: LINKEDIN,           Icon: Linkedin },
              { label: 'Email',    href: `mailto:${EMAIL}`,  Icon: Mail     },
            ].map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-1.5 font-mono text-[11px] text-white/20 transition-colors hover:text-white/55"
              >
                <Icon size={12} strokeWidth={1.5} />
                {label}
              </a>
            ))}
          </div>
          <p className="font-mono text-[10px] text-white/15">© 2026 Arav Bhandari</p>
        </div>
      </div>
    </footer>
  );
}

// ─── AwardsSection ────────────────────────────────────────────────────────────
function AwardsSection() {
  const featured = [
    {
      title: 'ACSL Silver',
      org: 'American Computer Science League · International Finals',
      desc: 'Top international finish in algorithmic computing. Advanced to ACSL All-Stars — the international round among national qualifiers worldwide.',
      badge: 'International',
    },
    {
      title: '1st Place — Gold',
      org: 'Upper Arlington Hackathon · William & Carol Mohr STEM Lab, Ohio',
      desc: 'First-place finish at the UA hackathon. End-to-end product execution under time constraints, evaluated by technical judges.',
      badge: 'Gold',
      image: founderTeam,
    },
  ];

  const others = [
    { title: 'National History Day', detail: 'National Level' },
    { title: 'Continental Math League', detail: 'Top 1%' },
    { title: 'DJMUNC (Model UN)', detail: 'Delegate' },
    { title: 'Aspire Program', detail: 'Tutor' },
  ];

  return (
    <section id="awards" className="relative bg-[#060606] pt-20 pb-28 md:pb-36">
      <AnimatedDivider index="04" label="RECOGNITION" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 pt-16 md:pt-20">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
          variants={stagger(0, 0.09)}
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.55, ease }}>
            <SectionIndex num="04" label="Recognition" />
            <h2
              className="tracking-[-0.04em] text-white font-black"
              style={{ fontSize: 'clamp(2rem,4.5vw,3.4rem)', fontWeight: 900, lineHeight: 1.05 }}
            >
              Competed. Won.
              <span style={{ color: 'rgba(255,255,255,0.3)' }}> Internationally.</span>
            </h2>
          </motion.div>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {featured.map((award, i) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              className="h-full"
            >
              <TiltCard className="h-full cursor-default">
                <div
                  className="h-full rounded-sm p-6 bg-[#0A0A0A] ring-[1.5px] ring-white/[0.08] hover:ring-amber-400/25 transition-all duration-300"
                >
                  {award.image && (
                    <div className="overflow-hidden rounded-sm mb-5" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                      <img src={award.image} alt={award.title} className="w-full h-32 object-cover object-center" loading="lazy" />
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-black text-white" style={{ fontWeight: 900, fontSize: 'clamp(1.1rem,1.8vw,1.4rem)' }}>
                        {award.title}
                      </p>
                      <p className="mt-1 font-mono text-[10px] text-white/30">{award.org}</p>
                    </div>
                    <span
                      className="shrink-0 font-mono text-[10px] px-2.5 py-1 rounded-sm text-amber-400/70"
                      style={{ border: '1px solid rgba(245,158,11,0.20)', background: 'rgba(245,158,11,0.04)' }}
                    >
                      {award.badge}
                    </span>
                  </div>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/72">{award.desc}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease, delay: 0.3 }}
          className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4"
        >
          {others.map((o) => (
            <div
              key={o.title}
              className="rounded-sm p-4"
              style={{ border: '1px solid rgba(255,255,255,0.06)', background: '#0A0A0A' }}
            >
              <p className="font-mono text-[11px] font-semibold text-white/50">{o.title}</p>
              <p className="mt-1 font-mono text-[10px] text-white/25">{o.detail}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── OtherProjectsSection ─────────────────────────────────────────────────────
function OtherProjectsSection() {
  const projects = [
    {
      title: 'vtrendz.net',
      role: 'SEO & GEO Specialist',
      tagline: 'Implemented JSON-LD schema and optimized site architecture for Generative Engine Optimization (GEO) — built for discoverability in AI-driven search.',
      stack: ['SEO', 'GEO', 'JSON-LD', 'Schema.org'],
    },
    {
      title: 'The Equestrian WT',
      role: 'Supply Chain & IT Management',
      tagline: 'Operations and IT infrastructure for an equestrian retail brand — inventory, logistics, and e-commerce systems.',
      stack: ['Operations', 'IT', 'E-commerce'],
    },
  ];

  return (
    <section id="more-projects" className="relative bg-[#060606] pt-20 pb-28 md:pb-36">
      <AnimatedDivider index="06" label="MORE WORK" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 pt-16 md:pt-20">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
          variants={stagger(0, 0.09)}
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.55, ease }}>
            <SectionIndex num="06" label="More Work" />
          </motion.div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {projects.map((p, i) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                transition={{ duration: 0.65, ease, delay: i * 0.08 }}
              >
                <TiltCard className="h-full cursor-default">
                  <div className="h-full rounded-sm p-6 bg-[#0A0A0A] ring-[1.5px] ring-white/[0.08] hover:ring-amber-400/20 transition-all duration-300">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/20 mb-2">{p.role}</p>
                    <h3
                      className="tracking-[-0.03em] text-white font-black"
                      style={{ fontSize: 'clamp(1.1rem,1.8vw,1.4rem)', fontWeight: 900 }}
                    >
                      {p.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-white/40">{p.tagline}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.stack.map((t) => (
                        <span
                          key={t}
                          className="rounded-sm font-mono text-[10px] px-2.5 py-1 text-white/28"
                          style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.015)' }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Portfolio ────────────────────────────────────────────────────────────────
export function Portfolio() {
  return (
    <div className="bg-[#060606]">
      <ScrollProgress />
      <FloatingNav />
      <HeroSection />
      <LogicStepSection />
      <HydraSection />
      <FounderJournalSection />
      <AwardsSection />
      <ServicesSection />
      <OtherProjectsSection />
      <Footer />
    </div>
  );
}
