import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  Send,
  X,
} from 'lucide-react';

type SectionId = 'home' | 'about' | 'skills' | 'projects' | 'certifications' | 'education' | 'contact';
type Certification = { title: string; issuer: string; date: string; kind: 'participation' | 'completion'; image: string };

const sections: Array<{ id: SectionId; label: string }> = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

const skills = [
  'Frontend Development',
  'HTML',
  'CSS',
  'JavaScript',
  'UI/UX Design',
  'Graphic Design',
  'Video Editing',
  'Photo Editing',
  'Communication',
  'Public Speaking',
];

const projects = [
  {
    title: 'Mathesar',
    description: 'Open-source project contribution work and frontend improvements.',
    tech: ['GitHub', 'Open Source', 'Frontend'],
    github: 'https://github.com/imran-s-creator/mathesar-imran',
    live: '',
  },
];

const certifications: Certification[] = [
  {
    title: 'Certificate of Participation',
    issuer: 'Github Copilot Dev Days - Chennai 2026, Global AI Chennai / Global AI Community',
    date: 'April 11th, 2026',
    kind: 'participation',
    image: '/cert-global-ai-chennai.jpg',
  },
  {
    title: 'Certificate of Participation',
    issuer: 'Kalvium x Mathesar Open Source contribution program',
    date: '2026',
    kind: 'participation',
    image: '/cert-kalvium-participation.png',
  },
  {
    title: 'Certificate of Completion',
    issuer: 'Kalvium x Mathesar Open Source Contribution Program',
    date: '2026',
    kind: 'completion',
    image: '/cert-kalvium-completion.png',
  },
];

const education = [
  {
    year: '2025 – 2029',
    title: 'Kalvium',
    subtitle: 'St. Joseph University, Chennai',
    details: '',
  },
];

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/_immux_?igsh=Y3dpYjRlb2hqbHZy', icon: Instagram },
  { label: 'GitHub', href: 'https://github.com/imran-s-creator', icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/imran-s-44b8a53ab/', icon: Linkedin },
  { label: 'Email', href: 'mailto:imarnabu12007@gmail.com', icon: Mail },
];

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCertification, setActiveCertification] = useState<Certification | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target instanceof HTMLElement) {
          setActiveSection(visible.target.id as SectionId);
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.2, 0.35, 0.5, 0.65] },
    );

    document.querySelectorAll<HTMLElement>('[data-section]').forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setActiveCertification(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeCertification || menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeCertification, menuOpen]);

  const introVariants = useMemo(
    () => ({ hidden: { opacity: 0, y: 28, filter: 'blur(10px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } }),
    [],
  );

  return (
    <div className="app-shell">
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />
      <div className="grain" />

      <a className="skip-link" href="#home">Skip to content</a>

      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`} ref={navRef}>
        <div className="container nav-bar">

          <nav className="desktop-nav" aria-label="Primary navigation">
            {sections.map((section) => (
              <a key={section.id} className={activeSection === section.id ? 'is-active' : ''} href={`#${section.id}`}>
                {section.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="menu-button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.nav
              className="mobile-nav"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              {sections.map((section) => (
                <a key={section.id} className={activeSection === section.id ? 'is-active' : ''} href={`#${section.id}`} onClick={() => setMenuOpen(false)}>
                  {section.label}
                </a>
              ))}
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </header>

      <main>
        <section id="home" className="hero section" data-section>
          <div className="container hero-grid">
            <motion.div
              className="hero-copy"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            >
              <motion.span className="eyebrow" variants={introVariants} transition={{ duration: 0.5 }}>Personal Portfolio</motion.span>
              <motion.h1 variants={introVariants} transition={{ duration: 0.6 }}>
                Hi, I&apos;m <span>Imran</span>
              </motion.h1>
              <motion.p className="lead" variants={introVariants} transition={{ duration: 0.6 }}>
                Creative Developer & Designer building clean digital experiences through frontend work, UI/UX, and visual design.
              </motion.p>

              <motion.div className="hero-meta" variants={introVariants} transition={{ duration: 0.6 }}>
                <span>Location: Chennai</span>
                <span>Available for internships, collaborations, and freelance work</span>
              </motion.div>

              <motion.div className="hero-actions" variants={introVariants} transition={{ duration: 0.6 }}>
                <a className="button button-primary" href="#projects">View Projects</a>
                <a className="button button-secondary" href="#contact">Contact Me</a>
              </motion.div>
            </motion.div>

            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="profile-card">
                <div className="profile-photo" aria-hidden="true">
                  <img src="/imran-profile.png" alt="Imran" className="profile-photo-img" />
                </div>
              </div>


            </motion.div>
          </div>
        </section>

        <section className="section" id="about" data-section>
          <div className="container split-layout">
            <SectionHeading
              eyebrow="About Me"
              title="A simple introduction that sounds like a real person, not a template."
              description="I like making interfaces feel calm, intentional, and easy to use. Most of my work sits somewhere between front-end development and visual design, with a focus on details that make a site feel finished."
            />
            <div className="about-grid">
              <InfoCard title="Education" value="St. Joseph University, Chennai" detail="2025 – 2029" />
              <InfoCard title="Current status" value="Student / Creative Maker" detail="Working on projects, learning, and building a portfolio." />
              <InfoCard title="Interests" value="Design systems, motion, branding" detail="Also interested in editing, photography, and storytelling." />
              <InfoCard title="Career goal" value="Front-end design roles" detail="Wanting to build polished digital experiences with real users in mind." />
              <InfoCard title="Strengths" value="Clear communication" detail="Organized, adaptable, and comfortable working across design and code." />
            </div>
          </div>
        </section>

        <section className="section" id="skills" data-section>
          <div className="container">
            <SectionHeading eyebrow="Skills" title="A focused set of skills shown without fake percentages or hype." description="These cards are meant to feel clean and modern, with just enough motion to make the section feel alive when you hover or scroll past it." />
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <TiltCard key={skill} delay={index * 0.03} className="skill-card glass-card"><span>{skill}</span></TiltCard>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="projects" data-section>
          <div className="container">
            <SectionHeading eyebrow="Projects" title="Project case studies with room for the real work you want to show." description="Each card is structured like a portfolio case study so it can hold your actual screenshots, descriptions, and links without needing a redesign." />
            <div className="projects-grid">
              {projects.map((project, index) => (
                <TiltCard key={`${project.title}-${index}`} delay={index * 0.04} className="project-card glass-card">
                  <div className="project-preview">
                    <img
                      src="https://s3.typoniels.de/typoniels-strapi/production/mathesar_4694921f23.webp"
                      alt={project.title}
                      className="project-preview__image"
                    />
                  </div>
                  <div className="project-body">
                    <div>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                    </div>
                    <div className="project-tech">
                      {project.tech.map((item) => <span key={item}>{item}</span>)}
                    </div>
                    <div className="project-links">
                      <a href={project.github} target="_blank" rel="noreferrer noopener">GitHub <ArrowUpRight size={16} /></a>
                      {project.live ? <a href={project.live} target="_blank" rel="noreferrer noopener">Live Demo <ArrowUpRight size={16} /></a> : null}
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="certifications" data-section>
          <div className="container">
            <SectionHeading eyebrow="Certifications" title="A clean timeline for credentials, short courses, or workshops." description="This section keeps the layout minimal so it can hold your actual certificates without feeling crowded." />
            <div className="timeline-grid">
              {certifications.map((certificate, index) => (
                <motion.article
                  className="timeline-card glass-card"
                  key={`${certificate.title}-${index}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="certificate-preview" aria-hidden="true">
                    <img
                      src={certificate.image}
                      alt={certificate.title}
                      className="certificate-preview__img"
                    />
                  </div>
                  <div className="timeline-copy">
                    <span className="timeline-date">{certificate.date}</span>
                    <h3>{certificate.title}</h3>
                    <p>{certificate.issuer}</p>

                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <AnimatePresence>
          {activeCertification ? (
            <motion.div
              className="certificate-modal-overlay"
              role="dialog"
              aria-modal="true"
              aria-label="Certificate viewer"
              onMouseDown={() => setActiveCertification(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <motion.div
                className="certificate-modal"
                initial={{ opacity: 0, scale: 0.94, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                onMouseDown={(event) => event.stopPropagation()}
              >
                <button type="button" className="certificate-modal__close" onClick={() => setActiveCertification(null)} aria-label="Close certificate viewer">
                  <X size={18} />
                </button>

                <div className="certificate-modal__image-wrapper">
                  <img
                    src={activeCertification.image}
                    alt={`${activeCertification.title} – ${activeCertification.issuer}`}
                    className="certificate-modal__real-image"
                  />
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <section className="section" id="education" data-section>
          <div className="container split-layout">
            <SectionHeading eyebrow="Education" title="A minimal vertical timeline for study, experience, and milestones." description="Keep this honest and specific. Small details about what you learned or built tend to read better than oversized claims." />
            <div className="education-timeline">
              {education.map((item, index) => (
                <motion.article
                  key={`${item.year}-${index}`}
                  className="timeline-entry"
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="entry-year">{item.year}</span>
                  <div>
                    <h3>
                      <a
                        href="https://kalvium.com/"
                        className="kalvium-trigger"
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label="Visit Kalvium website"
                      >
                        <span className="kalvium-accent">{item.title}</span>
                      </a>
                    </h3>
                    <p className="entry-subtitle">{item.subtitle}</p>
                    {item.details ? <p>{item.details}</p> : null}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="social" aria-label="Social connections">
          <div className="container">
            <SectionHeading eyebrow="Let's Connect" title="Simple links that make it easy to reach you." description="These placeholders can be replaced with your real profiles when you are ready to publish." />
            <div className="social-grid">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className="social-card glass-card"
                    target={link.label === 'Email' ? undefined : '_blank'}
                    rel={link.label === 'Email' ? undefined : 'noreferrer'}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.45, delay: index * 0.05 }}
                    whileHover={{ y: -4, scale: 1.01 }}
                  >
                    <Icon size={18} />
                    <span>{link.label}</span>
                    <ArrowUpRight size={16} />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact" data-section>
          <div className="container contact-grid">
            <SectionHeading eyebrow="Contact" title="A minimal contact form for messages, inquiries, or opportunities." description="The form is intentionally simple so it feels personal rather than like a generic lead-capture block." />
            <motion.form
              className="contact-form glass-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onSubmit={(event) => event.preventDefault()}
            >
              <label>
                <span>Name</span>
                <input type="text" name="name" placeholder="Your name" />
              </label>
              <label>
                <span>Email</span>
                <input type="email" name="email" placeholder="your.email@example.com" />
              </label>
              <label>
                <span>Message</span>
                <textarea name="message" rows={5} placeholder="Tell me about your project or inquiry..." />
              </label>
              <button type="submit" className="button button-primary submit-button">
                Send Message <Send size={16} />
              </button>
            </motion.form>
          </div>
        </section>
      </main>
    </div>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="section-heading">
      <motion.span className="eyebrow" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.35 }}>
        {eyebrow}
      </motion.span>
      <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.45 }} transition={{ duration: 0.45, delay: 0.05 }}>
        {title}
      </motion.h2>
      <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.45 }} transition={{ duration: 0.45, delay: 0.1 }}>
        {description}
      </motion.p>
    </div>
  );
}

function InfoCard({ title, value, detail }: { title: string; value: string; detail: string }) {
  return (
    <motion.article className="info-card glass-card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.45 }} whileHover={{ y: -4 }}>
      <span>{title}</span>
      <strong>{value}</strong>
      <p>{detail}</p>
    </motion.article>
  );
}

function TiltCard({ children, className, delay = 0 }: { children: React.ReactNode; className: string; delay?: number }) {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement | null>(null);

  return (
    <motion.div
      ref={cardRef}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={(event) => {
        if (prefersReducedMotion || !cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
        cardRef.current.style.setProperty('--tilt-x', `${-y * 4}deg`);
        cardRef.current.style.setProperty('--tilt-y', `${x * 4}deg`);
      }}
      onPointerLeave={() => {
        if (!cardRef.current) return;
        cardRef.current.style.setProperty('--tilt-x', '0deg');
        cardRef.current.style.setProperty('--tilt-y', '0deg');
      }}
      whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.01 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
}

export default App;