import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { site, socials } from '../data/profile';
import { ease, fadeUp, stagger } from '../lib/animations';
import MagneticButton from './MagneticButton';
import Typewriter from './Typewriter';

const headingWords = site.headline.split(' ');

export default function Hero() {
  const { scrollY } = useScroll();
  const visualY = useTransform(scrollY, [0, 600], [0, -80]);
  const textY = useTransform(scrollY, [0, 600], [0, 40]);

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden pt-24">
      <div className="section grid w-full items-center gap-14 py-16 lg:grid-cols-[1.15fr_1fr]">
        <motion.div style={{ y: textY }} variants={stagger(0.09)} initial="hidden" animate="show" className="flex flex-col gap-6">
          {site.openToOpportunities && (
            <motion.span variants={fadeUp} className="inline-flex w-fit items-center gap-2 rounded-full border border-neon/30 bg-neon/5 px-3 py-1 font-mono text-xs text-neon">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
              </span>
              Open to opportunities
            </motion.span>
          )}

          <motion.p variants={fadeUp} className="font-mono text-sm text-zinc-400">
            {site.greeting}
          </motion.p>

          <h1 className="text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            {headingWords.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: '0.6em', filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.6, delay: 0.25 + i * 0.06, ease }}
                className="mr-[0.25em] inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-x-3 gap-y-1 text-lg text-zinc-300 sm:text-xl">
            <span className="text-zinc-500">I work as a</span>
            <span className="font-display">
              <Typewriter words={site.roles} />
            </span>
          </motion.div>

          <motion.p variants={fadeUp} className="max-w-xl text-base leading-relaxed text-zinc-400">
            {site.intro}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 pt-2">
            <MagneticButton as="a" href="#projects" className="btn-primary">
              View Projects <ArrowUpRight size={16} aria-hidden />
            </MagneticButton>
            <MagneticButton as="a" href={site.gmailComposeUrl} target="_blank" rel="noreferrer" className="btn-ghost">
              <Mail size={16} aria-hidden /> Let's Connect
            </MagneticButton>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-3 pt-2">
            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-zinc-300 transition-all hover:-translate-y-0.5 hover:border-neon hover:text-neon"
            >
              <Github size={18} />
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-zinc-300 transition-all hover:-translate-y-0.5 hover:border-neon hover:text-neon"
            >
              <Linkedin size={18} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: visualY }} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease, delay: 0.3 }} className="relative mx-auto w-full max-w-md">
          <HeroVisual />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500 md:flex"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        Scroll
        <span className="h-8 w-px bg-gradient-to-b from-neon to-transparent" />
      </motion.a>
    </section>
  );
}

/** Floating animated portrait of Salil with glowing orbital rings and glass backdrop. */
function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[380px] sm:max-w-[420px]">
      {/* 3D orbital rings */}
      <motion.div
        aria-hidden
        className="absolute inset-[-12px] rounded-3xl border border-neon/30"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateX: [65, 75, 65], rotateZ: [0, 360] }}
        transition={{ rotateZ: { duration: 25, repeat: Infinity, ease: 'linear' }, rotateX: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
      />
      <motion.div
        aria-hidden
        className="absolute inset-2 rounded-2xl border border-dashed border-white/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
      />

      {/* Pulsing neon radial aura */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/20 blur-3xl"
        animate={{ scale: [0.9, 1.25, 0.9], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating animated frame holding Salil's photo */}
      <motion.div
        className="relative mx-auto flex h-full w-full items-center justify-center"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div         className="glass group relative h-[84%] w-[84%] overflow-hidden rounded-2xl border border-white/20 p-2.5 shadow-glow transition-all duration-500 hover:border-neon/60 hover:shadow-[0_0_35px_rgba(182,255,59,0.3)]">
          <div className="relative h-full w-full overflow-hidden rounded-xl bg-charcoal-900">
            <motion.img
              src="/salil-photo.jpg"
              alt="Salil Gupta"
              className="h-full w-full object-contain object-center filter grayscale contrast-110 brightness-95 transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100"
              initial={{ scale: 1.08, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
            {/* Subtle high-tech gradient sheen */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent opacity-60" />
            
            {/* Status tag badge */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl border border-white/10 bg-charcoal-950/80 px-3 py-1.5 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
                </span>
                <span className="font-mono text-[11px] font-medium text-white">Salil Gupta</span>
              </div>
              <span className="font-mono text-[10px] text-zinc-400">Software Eng.</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
