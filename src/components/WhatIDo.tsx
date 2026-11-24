import { motion } from 'framer-motion';
import { Layers, Server, Sparkles, type LucideIcon } from 'lucide-react';
import { whatIDo } from '../data/profile';
import { fadeUp, stagger, viewport } from '../lib/animations';
import SectionHeading from './SectionHeading';

const icons: Record<(typeof whatIDo)[number]['icon'], LucideIcon> = {
  Layers,
  Server,
  Sparkles,
};

export default function WhatIDo() {
  return (
    <section id="what-i-do" className="section">
      <SectionHeading eyebrow="05 / Focus" title="What I do." />

      <motion.div variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={viewport} className="grid gap-6 md:grid-cols-3">
        {whatIDo.map((area) => {
          const Icon = icons[area.icon];
          return (
            <motion.div key={area.id} variants={fadeUp} className="glass group relative overflow-hidden p-7 transition-all duration-300 hover:-translate-y-1 hover:border-neon/40">
              <motion.div
                aria-hidden
                className="mb-6 grid h-14 w-14 place-items-center rounded-2xl border border-neon/30 bg-neon/10 text-neon"
                whileHover={{ rotate: [0, -8, 8, 0], scale: 1.06 }}
                transition={{ duration: 0.6 }}
              >
                <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                  <Icon size={26} />
                </motion.span>
              </motion.div>
              <h3 className="text-xl font-semibold text-white">{area.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{area.text}</p>
              <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-neon/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 sm:opacity-60" aria-hidden />
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
