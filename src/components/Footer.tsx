import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { site, socials } from '../data/profile';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 sm:flex-row sm:px-8">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <span className="font-display text-base font-semibold text-white">{site.name}</span>
          <p className="text-xs text-zinc-500">
            &copy; {year} {site.name}.
          </p>
        </div>

        <ul className="flex items-center gap-2">
          <li>
            <a href={socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-10 w-10 place-items-center rounded-full text-zinc-400 transition-colors hover:bg-white/5 hover:text-neon">
              <Github size={18} />
            </a>
          </li>
          <li>
            <a href={socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-full text-zinc-400 transition-colors hover:bg-white/5 hover:text-neon">
              <Linkedin size={18} />
            </a>
          </li>
          <li>
            <a href={site.gmailComposeUrl} target="_blank" rel="noreferrer" aria-label="Email" className="grid h-10 w-10 place-items-center rounded-full text-zinc-400 transition-colors hover:bg-white/5 hover:text-neon">
              <Mail size={18} />
            </a>
          </li>
          <li>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              className="group ml-2 grid h-10 w-10 place-items-center rounded-full border border-white/10 text-zinc-300 transition-all hover:-translate-y-1 hover:border-neon hover:text-neon"
            >
              <ArrowUp size={16} className="transition-transform group-hover:-translate-y-0.5" />
            </button>
          </li>
        </ul>
      </div>
    </footer>
  );
}
