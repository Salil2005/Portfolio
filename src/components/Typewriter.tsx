import { useEffect, useState } from 'react';

type Props = { words: string[]; typeSpeed?: number; deleteSpeed?: number; pause?: number };

/** Types out each word, pauses, deletes, then moves on to the next. Loops forever. */
export default function Typewriter({ words, typeSpeed = 70, deleteSpeed = 40, pause = 1600 }: Props) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    let delay = deleting ? deleteSpeed : typeSpeed;

    if (!deleting && text === current) {
      delay = pause;
      const t = setTimeout(() => setDeleting(true), delay);
      return () => clearTimeout(t);
    }
    if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const t = setTimeout(() => {
      setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause]);

  return (
    <span className="text-neon text-glow" aria-live="polite">
      {text}
      <span className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-[0.1em] animate-pulse bg-neon align-middle" aria-hidden />
    </span>
  );
}
