/**
 * Single source of truth for all personal information, links and content.
 * Edit this file to update the site. Nothing here is a placeholder claim:
 * only verified facts from the brief are listed.
 */

export const site = {
  name: 'Salil Gupta',
  logo: 'SG',
  headline: 'Building Digital Experiences That Solve Real Problems.',
  greeting: "Hi, I'm Salil Gupta.",
  roles: ['Full Stack Developer', 'Software Engineer', 'Backend Developer'],
  intro:
    'I build scalable web applications and AI-powered solutions, from clean React interfaces to Node.js and database-backed backends.',
  // Set to true ONLY if you want the "Open to opportunities" indicator shown.
  openToOpportunities: true,
  // Configure before deploying.
  email: 'salilgupta2005@gmail.com',
  // Direct web Gmail composer URL to avoid opening system mail clients (like Outlook)
  gmailComposeUrl: 'https://mail.google.com/mail/?view=cm&fs=1&to=salilgupta2005@gmail.com',
  // Used by the contact form. If null, the form opens the user's mail client instead.
  // Example: 'https://formspree.io/f/your-form-id' (accepts JSON POST)
  formEndpoint: null as string | null,
  resumeUrl: '/Salil_Gupta_Resume.pdf', // place your resume PDF in /public/resume.pdf
  canonicalUrl: 'https://your-domain.example',
};

export const socials = {
  github: 'https://github.com/Salil2005',
  linkedin: 'https://www.linkedin.com/in/salilgupta2103', // replace with your URL
};

export const education = {
  degree: 'B.Tech in Computer Engineering',
  institution: 'SGSITS, Indore, India',
  summary:
    'Undergraduate engineering study with a focus on software development, data structures, databases and building applications end to end.',
};

export const about = {
  paragraphs: [
    'I am a Computer Engineering student at SGSITS, Indore, focused on building software that is reliable, readable and useful.',
    'My work spans frontend interfaces, REST APIs, database design and AI integration. I enjoy turning a vague problem into a clear system: defining the data, designing the API, then building the interface people actually use.',
    'I work well in teams, take ownership of my part of a project, and keep learning quickly when a new tool or approach is needed.',
  ],
  traits: [
    { title: 'Problem Solving', text: 'Break ambiguous requirements into clear, testable steps.' },
    { title: 'Teamwork', text: 'Collaborate on shared codebases and communicate blockers early.' },
    { title: 'Leadership', text: 'Take ownership of features and drive them from design to delivery.' },
    { title: 'Adaptability', text: 'Pick up new frameworks and tools and apply them to real problems.' },
  ],
};

export type SkillCategory = {
  id: string;
  title: string;
  items: { name: string; icon: string }[];
};


export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    items: [
      { name: 'Java', icon: 'J' },
      { name: 'Python', icon: 'Py' },
      { name: 'C', icon: 'C' },
      { name: 'JavaScript', icon: 'JS' },
      { name: 'TypeScript', icon: 'TS' },
      { name: 'SQL', icon: 'SQL' },
      { name: 'HTML', icon: 'H5' },
      { name: 'CSS', icon: 'C3' },
      { name: 'Golang', icon: 'GO' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    items: [
      { name: 'React.js', icon: 'Re' },
      { name: 'Next.js', icon: 'Nx' },
      { name: 'Tailwind CSS', icon: 'Tw' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend Development',
    items: [
      { name: 'Node.js', icon: 'No' },
      { name: 'Express.js', icon: 'Ex' },
      { name: 'REST APIs', icon: 'API' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    items: [
      { name: 'PostgreSQL', icon: 'PG' },
      { name: 'MongoDB', icon: 'MG' },
      { name: 'Supabase', icon: 'SB' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    items: [
      { name: 'Git', icon: 'Git' },
      { name: 'GitHub', icon: 'GH' },
      { name: 'Linux', icon: 'Lx' },
      { name: 'VS Code', icon: 'VS' },
      { name: 'Figma', icon: 'Fg' },
      { name: 'Google Colab', icon: 'GC' },
      { name: 'Clerk', icon: 'Cl' },
      { name: 'Inngest', icon: 'In' },
    ],
  },
  {
    id: 'ai',
    title: 'AI & LLM Integration',
    items: [
      { name: 'Groq API', icon: 'Gq' },
      { name: 'Ollama', icon: 'Ol' },
      { name: 'LLM Integration', icon: 'LLM' },
      { name: 'RAG', icon: 'RAG' },
      { name: 'Vector DB', icon: 'VectorDB' },
      { name: 'Embedding', icon: 'Em' },
    ],
  },
  {
    id: 'core-cs',
    title: 'Core Computer Science',
    items: [
      { name: 'Data Structures & Algorithms', icon: 'DSA' },
      { name: 'OOP', icon: 'OOP' },
      { name: 'DBMS', icon: 'DB' },
      { name: 'Operating Systems', icon: 'OS' },
      { name: 'Computer Networks', icon: 'CN' },
      { name: 'SDLC', icon: 'SD' },
      { name: 'Debugging & Testing', icon: 'DT' },
    ],
  },
];

export type Project = {
  id: string;
  name: string;
  problem: string;
  solution: string;
  features: string[];
  stack: string[];
  contribution: string;
  github?: string;
  liveDemo?: string;
  accent: 'neon' | 'cyan';
};


export const projects: Project[] = [
  {
    id: 'interview-simulator',
    name: 'Interview Simulator – AI-Powered Assessment Platform',
    problem:
      'Candidates preparing for technical interviews often lack realistic assessments, adaptive follow-up questions, and meaningful feedback based on their resumes and answers.',
    solution:
      'An AI-powered interview platform that evaluates candidates on web development and system design, analyzes resumes, and generates adaptive follow-up questions based on their responses.',
    features: [
      'Resume-based candidate assessment',
      'Adaptive follow-up question generation',
      '65/35 weighted scoring system',
      'Real-time adjustment of interview difficulty and topics',
      'Parallel resume parsing using two API keys',
      'Three-stage answer evaluation pipeline',
      'Gibberish detection and AI-based answer classification',
      'Seven-dimension answer evaluation',
      'LLM rate-limit management and fallback handling',
    ],
    stack: [
      'React.js',
      'Node.js',
      'REST APIs',
      'MongoDB',
      'Ollama',
      'Groq API',
      'Tailwind CSS',
    ],
    contribution:
      'Designed the adaptive interview engine, implemented resume parsing and AI-based assessment pipelines, developed scoring and evaluation logic, and integrated LLM APIs with rate-limit management.',
    github: 'https://github.com/Salil2005/Placement-Simulator',
    accent: 'neon',
  },
  {
    id: 'examgrid',
    name: 'ExamGrid – Exam Timetable and Seating Scheduler',
    problem:
      'Managing examination schedules, student data, classrooms, faculty duties, and seating arrangements manually is time-consuming and prone to errors.',
    solution:
      'A TypeScript-based examination management platform that organizes structured exam data and generates timetables, seating arrangements, and faculty duty allocations.',
    features: [
      'Structured input management for five data types',
      'Excel import for students, courses, rooms, faculty, and teaching assistants',
      'Separate scheduling flows for theory exams and lab quizzes',
      'Automated timetable generation',
      'Student seating arrangement allocation',
      'Faculty duty allocation',
      'Three PDF export formats',
      'Tested with 300+ students, 15+ faculty, and 10+ rooms',
    ],
    stack: [
      'TypeScript',
      'Next.js',
      'React.js',
      'Tailwind CSS',
    ],
    contribution:
      'Developed structured input management, integrated Excel datasets, implemented typed examination data handling, and connected scheduling outputs with timetable, seating, and faculty duty views.',
    github: 'https://github.com/Vinamra1918/examgrid',
    accent: 'cyan',
  },
  {
    id: 'personal-finance',
    name: 'Personal Finance Management System',
    problem:
      'Managing personal finances can become difficult when income, expenses, savings, and transactions are scattered across different records.',
    solution:
      'A database-driven personal finance management system designed to organize financial records and make tracking and analyzing financial information easier.',
    features: [
      'Structured financial record management',
      'Income and expense organization',
      'Financial transaction tracking',
      'Database-driven financial data storage',
      'Financial data analysis',
    ],
    stack: [
      'SQL',
      'Database Design',
    ],
    contribution:
      'Worked on database design, structured financial data organization, and SQL-based financial record management.',
    accent: 'neon',
  },
  {
    id: 'music-genre',
    name: 'Music Genre Classification – Machine Learning',
    problem:
      'Identifying the genre of a music track from its audio characteristics can be challenging to perform consistently through manual analysis.',
    solution:
      'A machine learning project that uses audio feature extraction and a Convolutional Neural Network (CNN) to classify music into different genres.',
    features: [
      'Audio dataset processing',
      'Audio feature extraction using Librosa',
      'CNN-based music genre classification',
      'Deep learning model training',
      'Automated genre prediction',
    ],
    stack: [
      'Python',
      'TensorFlow',
      'Librosa',
      'CNN',
    ],
    contribution:
      'Worked on audio feature extraction, deep learning model development, and music genre classification using a CNN architecture.',
    accent: 'cyan',
  },
  {
    id: 'carbon-footprinting',
    name: 'Carbon Footprinting System',
    problem:
      'Individuals and organizations often lack a centralized way to understand the carbon emissions associated with their everyday activities.',
    solution:
      'A carbon footprint tracking system designed to help users record activities and understand their environmental impact through estimated carbon emissions.',
    features: [
      'Carbon footprint activity tracking',
      'Emission data management',
      'Estimated carbon emission calculation',
      'Environmental impact monitoring',
      'Carbon footprint analysis',
    ],
    stack: [
      'Add your actual technologies here',
    ],
    contribution:
      'Developed a system focused on organizing carbon footprint information and tracking estimated environmental impact.',
    accent: 'neon',
  },
];


export const milestones = [
  {
    title: 'Software Development Intern – M9Vends',
    text: 'May 2026 – Aug 2026 | Worked as a Software Development Intern, rebuilding the company portfolio as a routed React application featuring 7 pages and 26 reusable components. Developed secure user registration and login APIs using Node.js, bcrypt, and JWT, implementing password hashing, 7-day token authentication, asynchronous error handling, and duplicate email validation. Also participated in daily stand-ups and SaaS system design discussions, contributing to application architecture and technical decisions.',
  },
  {
    title: 'Interview Simulator – AI-Powered Assessment Platform',
    text: 'Aug 2025 – Oct 2026 | Developed an AI-powered interview assessment platform that evaluates candidates in web development and system design using resume-based assessments and adaptive follow-up questions. Implemented a 65/35 weighted scoring mechanism, parallel resume parsing using two API keys, and a three-stage answer evaluation pipeline consisting of gibberish detection, AI classification, and seven-dimensional evaluation. Integrated Groq and Ollama with token optimization, rate-limit management, JSON validation, and fallback mechanisms to improve reliability.',
  },
  {
    title: 'ExamGrid – Exam Timetable and Seating Scheduler',
    text: 'Jul 2026 – Oct 2026 | Developed a TypeScript-based examination management platform using Next.js and React. Built an editable structured input system with Excel import for five data categories: students, courses, rooms, faculty, and teaching assistants. Integrated separate scheduling workflows for theory examinations and lab quizzes, generating student timetables, seating arrangements, and faculty duty allocations. Implemented three PDF export formats and tested the system with 300+ students, 15+ faculty members, and 10+ examination rooms.',
  },
  {
    title: 'NPTEL Certifications – Elite + Top 5%',
    text: 'Achieved Elite certification with Gold and Top 5% recognition in Cloud Computing from IIT Kharagpur with a consolidated score of 90%. Also earned Elite certification with Silver and Top 5% recognition in Big Data Computing from IIT Kanpur with a consolidated score of 85%. These courses strengthened my understanding of cloud computing concepts, large-scale data processing, and distributed computing technologies.',
  },
];

export const whatIDo = [
  {
    id: 'fullstack',
    title: 'Full Stack Development',
    text: 'Build scalable web applications using React.js, Next.js, Node.js, and Express.js, combining responsive interfaces with robust backend services.',
    icon: 'Layers' as const,
  },
  {
    id: 'backend',
    title: 'Backend Engineering',
    text: 'Develop REST APIs, implement secure authentication using bcrypt and JWT, and work with MongoDB and PostgreSQL to build reliable backend systems.',
    icon: 'Server' as const,
  },
  {
    id: 'ai',
    title: 'AI & LLM Integration',
    text: 'Integrate LLMs using Groq and Ollama to build adaptive interview simulations, resume analysis, intelligent question generation, and AI-powered evaluation systems.',
    icon: 'Sparkles' as const,
  },
];


export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];
