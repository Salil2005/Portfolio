import { motion } from 'framer-motion';
import { GraduationCap, Rocket } from 'lucide-react';
import { education, milestones } from '../data/profile';
import { fadeUp, stagger, viewport } from '../lib/animations';
import SectionHeading from './SectionHeading';

type Item = { icon: typeof GraduationCap; kicker: string; title: string; text: string };

const items: Item[] = [
  {
    icon: GraduationCap,
    kicker: 'Education',
    title: education.degree,
    text: `${education.institution}. ${education.summary}`,
  },
  ...milestones.map((m) => ({
    icon: Rocket,
    kicker: 'Project milestone',
    title: m.title,
    text: m.text,
  })),
];

export default function Experience() {
  return (
    <section id="experience" className="section">
      <SectionHeading
        eyebrow="04 / Journey"
        title="Education and the projects that shaped me."
        description="A timeline of my learning and the products I have built along the way."
      />

      <motion.ol
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="relative ml-3 border-l border-white/10 pl-8 sm:ml-4 sm:pl-10"
      >
        <motion.span
          aria-hidden
          className="absolute -left-px top-0 w-px origin-top bg-gradient-to-b from-neon via-neon/60 to-transparent"
          style={{ height: '100%' }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={viewport}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />

        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.li key={`${item.kicker}-${i}`} variants={fadeUp} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[calc(2rem+5px)] grid h-9 w-9 place-items-center rounded-full border border-neon/40 bg-charcoal-950 text-neon shadow-glow sm:-left-[calc(2.5rem+5px)]">
                <Icon size={16} aria-hidden />
              </span>
              <div className="glass group p-5 transition-colors hover:border-neon/40 sm:p-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-neon">{item.kicker}</span>
                <h3 className="mt-2 text-lg font-semibold text-white sm:text-xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.text}</p>
              </div>
            </motion.li>
          );
        })}
      </motion.ol>
    </section>
  );
}
