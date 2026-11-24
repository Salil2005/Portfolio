import { useState, type ChangeEvent, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowUpRight, CheckCircle2, Github, Linkedin, Loader2, Mail, Send } from 'lucide-react';
import { site, socials } from '../data/profile';
import { fadeUp, scaleIn, stagger, viewport } from '../lib/animations';
import MagneticButton from './MagneticButton';

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = 'idle' | 'sending' | 'success' | 'error';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your name (at least 2 characters).';
  if (!emailPattern.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (values.message.trim().length < 10) errors.message = 'Message should be at least 10 characters.';
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState<Fields>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverMessage, setServerMessage] = useState('');

  const update = (key: keyof Fields) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    // No endpoint configured: open Gmail web composer with the message prefilled (avoids opening Outlook/default mail client).
    if (!site.formEndpoint) {
      const subject = encodeURIComponent(`Portfolio contact from ${values.name.trim()}`);
      const body = encodeURIComponent(`${values.message.trim()}\n\nFrom: ${values.name.trim()} <${values.email.trim()}>`);
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${site.email}&su=${subject}&body=${body}`;
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');
      setStatus('success');
      setServerMessage('Gmail opened in a new tab with your message ready to send.');
      return;
    }

    setStatus('sending');
    setServerMessage('');
    try {
      const res = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...values, name: values.name.trim(), email: values.email.trim(), message: values.message.trim() }),
      });
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      setStatus('success');
      setServerMessage('Thanks for reaching out. I will get back to you soon.');
      setValues({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
      setServerMessage('Something went wrong sending your message. Please try again or email me directly.');
    }
  };

  return (
    <section id="contact" className="section">
      <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewport} className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col gap-6">
          <motion.span variants={fadeUp} className="eyebrow">
            <span className="h-px w-6 bg-neon" aria-hidden />
            06 / Contact
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Have an interesting idea? <span className="text-neon text-glow">Let's build something.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="max-w-md text-base text-zinc-400 sm:text-lg">
            I am happy to talk about software engineering roles, backend and full-stack projects, or AI-powered product ideas.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <MagneticButton as="a" href={site.gmailComposeUrl} target="_blank" rel="noreferrer" className="btn-primary">
              <Mail size={16} aria-hidden /> Email me
            </MagneticButton>
            <a href={socials.linkedin} target="_blank" rel="noreferrer" className="btn-ghost">
              <Linkedin size={16} aria-hidden /> LinkedIn <ArrowUpRight size={14} aria-hidden />
            </a>
            <a href={socials.github} target="_blank" rel="noreferrer" className="btn-ghost">
              <Github size={16} aria-hidden /> GitHub <ArrowUpRight size={14} aria-hidden />
            </a>
          </motion.div>
        </div>

        <motion.form
          variants={scaleIn}
          noValidate
          onSubmit={handleSubmit}
          aria-label="Contact form"
          className="glass relative flex flex-col gap-5 p-6 sm:p-8"
        >
          <Field
            id="name"
            label="Name"
            value={values.name}
            onChange={update('name')}
            error={errors.name}
            autoComplete="name"
          />
          <Field
            id="email"
            label="Email"
            type="email"
            value={values.email}
            onChange={update('email')}
            error={errors.email}
            autoComplete="email"
          />
          <Field
            id="message"
            label="Message"
            multiline
            value={values.message}
            onChange={update('message')}
            error={errors.message}
          />

          <MagneticButton
            type="submit"
            disabled={status === 'sending'}
            className="btn-primary mt-1 w-full disabled:cursor-wait disabled:opacity-70"
          >
            {status === 'sending' ? (
              <>
                <Loader2 size={16} className="animate-spin" aria-hidden /> Sending...
              </>
            ) : (
              <>
                <Send size={16} aria-hidden /> Send message
              </>
            )}
          </MagneticButton>

          <AnimatePresence mode="wait">
            {(status === 'success' || status === 'error') && (
              <motion.div
                key={status}
                role="status"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${
                  status === 'success'
                    ? 'border-neon/40 bg-neon/10 text-neon'
                    : 'border-red-400/40 bg-red-500/10 text-red-300'
                }`}
              >
                {status === 'success' ? (
                  <motion.span initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
                    <CheckCircle2 size={18} aria-hidden />
                  </motion.span>
                ) : (
                  <motion.span animate={{ x: [0, -4, 4, -3, 3, 0] }} transition={{ duration: 0.4 }}>
                    <AlertCircle size={18} aria-hidden />
                  </motion.span>
                )}
                <span>{serverMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </motion.div>
    </section>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  type?: string;
  multiline?: boolean;
  autoComplete?: string;
};

function Field({ id, label, value, onChange, error, type = 'text', multiline, autoComplete }: FieldProps) {
  const base =
    'w-full rounded-xl border bg-charcoal-900/80 px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-neon focus:outline-none focus:ring-1 focus:ring-neon/50';
  const border = error ? 'border-red-400/60' : 'border-white/10';
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-mono text-xs uppercase tracking-[0.15em] text-zinc-400">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={id}
          rows={5}
          value={value}
          onChange={onChange}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`${base} ${border} resize-y`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`${base} ${border}`}
        />
      )}
      <AnimatePresence>
        {error && (
          <motion.p
            id={errorId}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs text-red-300"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
