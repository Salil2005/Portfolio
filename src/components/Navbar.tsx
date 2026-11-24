import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { navLinks, site } from '../data/profile';
import { ease } from '../lib/animations';
import MagneticButton from './MagneticButton';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      // Scroll-spy: pick the last section whose top has passed the navbar line.
      let current = 'home';
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el && el.getBoundingClientRect().top <= 140) current = link.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? 'border-b border-white/10 bg-charcoal-950/70 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <button
          onClick={() => go('home')}
          className="group flex items-center gap-2 font-display text-lg font-bold text-white"
          aria-label="Go to top"
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-neon/40 bg-neon/10 text-neon transition-shadow group-hover:shadow-glow">
            {site.logo}
          </span>
        </button>

        <ul className="relative hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id} className="relative">
                <button
                  onClick={() => go(link.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative z-10 rounded-full px-4 py-2 text-sm transition-colors ${
                    isActive ? 'text-charcoal-950' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 -z-0 rounded-full bg-neon"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <MagneticButton
            as="a"
            href={site.resumeUrl}
            download
            className="btn-ghost hidden !px-4 !py-2 sm:inline-flex"
          >
            <Download size={16} aria-hidden /> Resume
          </MagneticButton>

          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease }}
            className="overflow-hidden border-t border-white/10 bg-charcoal-950/95 md:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <button
                    onClick={() => go(link.id)}
                    className={`w-full rounded-lg px-4 py-3 text-left font-display text-lg ${
                      active === link.id ? 'bg-neon/10 text-neon' : 'text-zinc-200 hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
              <li className="mt-2">
                <a href={site.resumeUrl} download className="btn-primary w-full">
                  <Download size={16} aria-hidden /> Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
