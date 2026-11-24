import { motion } from 'framer-motion';
import { Brain, Handshake, Crown, RefreshCw } from 'lucide-react';
import { about, education, projects, skillCategories } from '../data/profile';
import { fadeUp, slideLeft, slideRight, stagger, viewport } from '../lib/animations';
import SectionHeading from './SectionHeading';
import Counter from './Counter';

const traitIcons = [Brain, Handshake, Crown, RefreshCw];
const technologyCount = skillCategories.reduce((n, c) => n + c.items.length, 0);

export default function About() {
  const stats = [
    { value: projects.length, label: 'Projects built', suffix: '' },
    { value: technologyCount, label: 'Technologies used', suffix: '+' },
    { value: skillCategories.length, label: 'Skill areas', suffix: '' },
  ];

  return (
    <section id="about" className="section">
      <SectionHeading eyebrow="01 / About" title="Engineering with clarity, shipping with care." />

      <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
        <motion.div variants={slideLeft} initial="hidden" whileInView="show" viewport={viewport} className="flex flex-col gap-6">
          {about.paragraphs.map((p, i) => (
            <p key={i} className="text-base leading-relaxed text-zinc-300 sm:text-lg">
              {p}
            </p>
          ))}

          <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={viewport} className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {about.traits.map((t, i) => {
              const Icon = traitIcons[i];
              return (
                <motion.div key={t.title} variants={fadeUp} className="glass group p-5 transition-colors hover:border-neon/40">
                  <Icon size={20} className="mb-3 text-neon transition-transform group-hover:-rotate-6" aria-hidden />
                  <h3 className="text-base font-semibold text-white">{t.title}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{t.text}</p>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewport} className="mt-2 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
            {stats.map((s) => (
              <motion.div key={s.label} variants={fadeUp}>
                <div className="text-3xl font-bold text-neon sm:text-4xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-1 text-xs text-zinc-500 sm:text-sm">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={slideRight} initial="hidden" whileInView="show" viewport={viewport} className="relative">
          <div className="glass relative overflow-hidden p-6 sm:p-8">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-neon/15 blur-3xl" aria-hidden />
            <div className="relative flex flex-col gap-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-neon">Education</p>
                <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">{education.degree}</h3>
                <p className="mt-1 text-sm text-zinc-400">{education.institution}</p>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">{education.summary}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {['Problem Solving', 'Teamwork', 'Leadership', 'Adaptability'].map((label, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={viewport}
                    transition={{ delay: 0.1 * i, duration: 0.4 }}
                    className="rounded-xl border border-white/10 bg-charcoal-900/70 px-4 py-3 text-center font-mono text-xs text-zinc-300"
                  >
                    {label}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
