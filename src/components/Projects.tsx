import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Github, X } from 'lucide-react';
import { projects, type Project } from '../data/profile';
import { ease, fadeUp, stagger, viewport } from '../lib/animations';
import SectionHeading from './SectionHeading';

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="section">
      <SectionHeading
        eyebrow="03 / Projects"
        title="Real-world products, end to end."
        description="Selected work with the problem, the approach and my specific contribution."
      />

      <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewport} className="grid gap-6 md:grid-cols-2 overflow-x-hidden overflow-y-hidden">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={() => setSelected(project)} />
        ))}
      </motion.div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });
  const glow = useTransform([srx, sry], ([x, y]: number[]) => {
    const gx = 50 + (y / 8) * 30;
    const gy = 50 - (x / 8) * 30;
    return `radial-gradient(circle at ${gx}% ${gy}%, rgba(182,255,59,0.14), transparent 55%)`;
  });
  const [hover, setHover] = useState(false);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || window.matchMedia('(hover: none)').matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 12);
    rx.set(-py * 12);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
    setHover(false);
  };

  return (
    <motion.div variants={fadeUp} className="[perspective:1000px]">
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={reset}
        style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
        className="glass group relative flex h-full flex-col gap-5 overflow-hidden p-6 transition-shadow duration-500 hover:shadow-glow sm:p-7"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500"
          style={{ opacity: hover ? 1 : 0, background: glow }}
        />

        <div className="relative flex items-start justify-between gap-4" style={{ transform: 'translateZ(30px)' }}>
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
              {project.accent === 'neon' ? 'Featured' : 'Project'}
            </span>
            <h3 className="mt-1 text-xl font-semibold text-white sm:text-2xl">{project.name}</h3>
          </div>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.name} on GitHub`}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-zinc-300 transition-colors hover:border-neon hover:text-neon"
            >
              <Github size={18} />
            </a>
          )}
        </div>

        <p className="relative text-sm leading-relaxed text-zinc-400" style={{ transform: 'translateZ(20px)' }}>
          {project.solution}
        </p>

        <div className="relative flex flex-wrap gap-2" style={{ transform: 'translateZ(20px)' }}>
          {project.stack.slice(0, 5).map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
          {project.stack.length > 5 && <span className="tag text-neon">+{project.stack.length - 5}</span>}
        </div>

        <div className="relative mt-auto flex items-center justify-between pt-2">
          <button
            onClick={onOpen}
            className="group/btn inline-flex items-center gap-2 text-sm font-semibold text-neon transition-colors hover:text-white"
          >
            View details
            <ArrowUpRight size={16} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </button>
          {project.liveDemo && (
            <a href={project.liveDemo} target="_blank" rel="noreferrer" className="text-sm text-zinc-400 hover:text-white">
              Live demo
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previous?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-charcoal-950/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 60, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ duration: 0.45, ease }}
        className="glass relative max-h-[92svh] w-full overflow-y-auto no-scrollbar rounded-t-3xl border-white/15 bg-charcoal-900 p-6 outline-none sm:max-w-2xl sm:rounded-3xl sm:p-10"
      >
        <button
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/10 text-zinc-300 hover:border-neon hover:text-neon"
        >
          <X size={18} />
        </button>

        <span className="eyebrow">Project details</span>
        <h3 id="project-modal-title" className="mt-2 text-2xl font-bold text-white sm:text-3xl">
          {project.name}
        </h3>

        <Block title="The problem">{project.problem}</Block>
        <Block title="The solution">{project.solution}</Block>

        <div className="mt-6">
          <h4 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">Key features</h4>
          <ul className="grid gap-2 sm:grid-cols-2">
            {project.features.map((f) => (
              <li key={f} className="flex gap-2 text-sm text-zinc-300">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neon" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h4 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">Technology stack</h4>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        </div>

        <Block title="My contribution">{project.contribution}</Block>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="btn-primary">
              <Github size={16} aria-hidden /> View on GitHub
            </a>
          )}
          {project.liveDemo && (
            <a href={project.liveDemo} target="_blank" rel="noreferrer" className="btn-ghost">
              Live demo <ArrowUpRight size={16} aria-hidden />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-6">
      <h4 className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">{title}</h4>
      <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">{children}</p>
    </div>
  );
}
