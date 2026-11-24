import { motion } from 'framer-motion';
import { fadeUp, viewport } from '../lib/animations';

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
};

export default function SectionHeading({ eyebrow, title, description, align = 'left' }: Props) {
  const alignment = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={`mb-14 flex flex-col gap-4 ${alignment}`}
    >
      <span className="eyebrow">
        <span className="h-px w-6 bg-neon" aria-hidden />
        {eyebrow}
      </span>
      <h2 className="max-w-2xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">{title}</h2>
      {description && <p className="max-w-2xl text-base text-zinc-400 sm:text-lg">{description}</p>}
    </motion.div>
  );
}
