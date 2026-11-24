import { useRef, type ReactNode, type MouseEvent, type RefObject } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type Props = {
  children: ReactNode;
  className?: string;
  as?: 'a' | 'button';
  href?: string;
  download?: boolean;
  target?: string;
  rel?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  ariaLabel?: string;
};

/** A button that gently follows the cursor when hovered (magnetic interaction). */
export default function MagneticButton({
  children,
  className = '',
  as = 'button',
  href,
  download,
  target,
  rel,
  onClick,
  type = 'button',
  disabled,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || window.matchMedia('(hover: none)').matches) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.25);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.25);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const common = {
    className,
    onMouseMove: handleMove,
    onMouseLeave: reset,
    'aria-label': ariaLabel,
  };

  if (as === 'a') {
    return (
      <motion.a
        ref={ref as RefObject<HTMLAnchorElement>}
        href={href}
        download={download}
        target={target}
        rel={rel}
        style={{ x: sx, y: sy }}
        whileTap={{ scale: 0.97 }}
        {...common}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      {...common}
    >
      {children}
    </motion.button>
  );
}
