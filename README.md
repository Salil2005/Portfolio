# Salil Gupta | Developer Portfolio

A responsive, animated portfolio built with **React + Vite + TypeScript**, **Tailwind CSS**, **Framer Motion** and **Lucide React** icons.

## Run locally

Requires Node.js 18 or newer.

```bash
cd salil-portfolio
npm install
npm run dev        # http://localhost:5173
```

Production build and preview:

```bash
npm run build      # type-checks, then builds to dist/
npm run preview    # serves dist/ locally
```

## Before you deploy: things to configure

All personal information lives in **one file**: `src/data/profile.ts`.

| What | Where | Action |
| --- | --- | --- |
| Contact email | `site.email` | Replace the placeholder with your real address. |
| LinkedIn URL | `socials.linkedin` | Replace the placeholder with your profile URL. |
| Domain / canonical URL | `site.canonicalUrl`, and `index.html` (`canonical`, `og:url`, `og:image`) | Set your deployed domain. |
| Resume | `public/resume.pdf` | Add your resume PDF with this exact name, or change `site.resumeUrl`. |
| Availability indicator | `site.openToOpportunities` | Leave `false` unless you want "Open to opportunities" shown. |
| Contact form backend | `site.formEndpoint` | Set a form endpoint (e.g. Formspree, or your own API that accepts a JSON POST). If left `null`, the form opens the visitor's mail app with the message prefilled. |
| Social preview image | `public/og-image.png` | Add a 1200x630 image for link previews. |

Projects, skills, the "What I do" areas and the timeline are also in `profile.ts`. Live demo links are supported per project via `liveDemo`; none are set because none were provided.

## Project structure

```
src/
  components/   Section components and reusable UI
    Navbar, Hero, About, Skills, Projects, Experience, WhatIDo, Contact, Footer
    CustomCursor, ScrollProgress, Background, MagneticButton, Typewriter, Counter, SectionHeading
  data/
    profile.ts  All personal content, links, skills and projects (edit here)
  lib/
    animations.ts  Reusable Framer Motion variants and viewport settings
  index.css     Tailwind layers, base styles and utility classes
  App.tsx       Page composition
  main.tsx      Entry point
```

## Features

- Custom cursor on fine-pointer devices (native cursor on touch devices)
- Scroll progress bar, sticky navbar that gains a background on scroll, scroll-spy navigation with an animated indicator
- Mobile menu with animated transitions and body scroll lock
- Hero with word-by-word reveal, looping role typewriter and a floating code visual with parallax
- Animated counters, scroll-triggered reveals, and magnetic buttons
- Project cards with 3D tilt and a glow that follows the cursor, plus a details modal (Escape to close, focus returned on close)
- Contact form with validation, an animated loading state, and success and error states
- Respects `prefers-reduced-motion`

## Notes

- Animation uses Framer Motion throughout. GSAP was not added because Framer Motion covers every effect in the brief, and a second animation library would add weight without a clear benefit.
- The "Experience" section shows only verified education and the four projects. Add internships or certifications to `profile.ts` only when they are confirmed.
- To add SEO details beyond the defaults, edit the `<meta>` tags in `index.html`.
