import { MotionConfig } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import WhatIDo from './components/WhatIDo';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { site } from './data/profile';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    document.title = 'Salil Gupta | Full Stack Developer & Software Engineer';
    document
      .querySelector('meta[property="og:url"]')
      ?.setAttribute('content', site.canonicalUrl);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen overflow-x-hidden">
        <Background />
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <WhatIDo />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
