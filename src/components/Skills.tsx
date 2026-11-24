import { motion } from 'framer-motion';
import { skillCategories } from '../data/profile';
import { fadeUp, scaleIn, stagger, viewport } from '../lib/animations';
import SectionHeading from './SectionHeading';

export default function Skills() {
  return (
    <section id="skills" className="section">
      <SectionHeading
        eyebrow="02 / Skills"
        title="Technologies I use to build."
        description="The tools I reach for across frontend, backend, data and AI work."
      />

      <motion.div variants={stagger(0.07)} initial="hidden" whileInView="show" viewport={viewport} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((cat) => (
          <motion.article key={cat.id} variants={fadeUp} className="glass group relative flex flex-col gap-5 overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neon/40 hover:shadow-glow">
            <div className="absolute inset-x-6 top-0 h-px origin-left scale-x-0 bg-neon transition-transform duration-500 group-hover:scale-x-100" aria-hidden />
            <h3 className="font-display text-lg font-semibold text-white">{cat.title}</h3>
            <ul className="flex flex-wrap gap-2.5">
              {cat.items.map((item, i) => (
                <motion.li key={item.name} variants={scaleIn} transition={{ delay: i * 0.03 }}>
                  <span className="group/tag inline-flex items-center gap-2 rounded-lg border border-white/10 bg-charcoal-900/80 px-3 py-2 text-sm text-zinc-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-neon/60 hover:text-neon">
                    <span className="grid h-6 min-w-6 place-items-center rounded bg-neon/10 px-1 font-mono text-[10px] font-semibold text-neon transition-colors group-hover/tag:bg-neon group-hover/tag:text-charcoal-950">
                      {item.icon}
                    </span>
                    {item.name}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
