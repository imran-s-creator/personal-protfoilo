import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  Braces,
  Code2,
  Github,
  Image,
  Instagram,
  LayoutTemplate,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Palette,
  PenTool,
  Send,
  Video,
  X,
} from 'lucide-react';

type SectionId = 'home' | 'about' | 'learning' | 'skills' | 'projects' | 'certifications' | 'education' | 'contact';
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
  { name: 'HTML', description: 'Building clear, semantic page structures.', icon: Code2 },
  { name: 'CSS', description: 'Styling responsive layouts with care.', icon: Palette },
  { name: 'JavaScript', description: 'Adding useful interaction to interfaces.', icon: Braces },
  { name: 'Frontend Development', description: 'Turning ideas into working websites.', icon: LayoutTemplate },
  { name: 'UI/UX Design', description: 'Planning flows that feel easy to use.', icon: PenTool },
  { name: 'Graphic Design', description: 'Creating visuals for digital projects.', icon: Palette },
  { name: 'Video Editing', description: 'Cutting together simple, focused stories.', icon: Video },
  { name: 'Photo Editing', description: 'Improving images for a cleaner finish.', icon: Image },
  { name: 'Communication / Public Speaking', description: 'Explaining ideas clearly to people.', icon: MessageCircle },
];

const projects = [
  {
    title: 'Mathesar',
    description: 'Open-source project contribution work and frontend improvements.',
    tech: ['GitHub', 'Open Source', 'Frontend'],
    github: 'https://github.com/imran-s-creator/mathesar-imran',
    live: '',
    image: 'https://cdn.ebnermediagroup.de/dotnet/img/1/7/7/9/0/1/5/Mathesar.jpg?width=640&format=webply',
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
    title: 'B.Tech Computer Science Engineering (Applied AI)',
    subtitle: 'St. Joseph University, Chennai',
    program: 'Kalvium',
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
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
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
                I&apos;m a computer science student learning frontend development and visual design by making projects that are useful, clear, and enjoyable to use.
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
              onPointerMove={(event) => {
                if (event.pointerType === 'touch') return;
                const rect = event.currentTarget.getBoundingClientRect();
                const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
                const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
                event.currentTarget.style.setProperty('--hero-tilt-x', `${-y * 2.5}deg`);
                event.currentTarget.style.setProperty('--hero-tilt-y', `${x * 2.5}deg`);
              }}
              onPointerLeave={(event) => {
                event.currentTarget.style.setProperty('--hero-tilt-x', '0deg');
                event.currentTarget.style.setProperty('--hero-tilt-y', '0deg');
              }}
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
            <SectionHeading eyebrow="About Me" title="A little about who I am and what I enjoy making." description="I am currently studying Computer Science Engineering with Applied AI at St. Joseph University. I enjoy combining code and design, especially when a small detail makes a website easier to understand or nicer to use." />
            <div className="about-grid">
              <InfoCard title="Who I am" value="Student and creative maker" detail="I like learning by building small things and improving them over time." />
              <InfoCard title="What I enjoy" value="Code, design, and editing" detail="I work across websites, graphics, photos, and short videos." />
              <InfoCard title="My interests" value="UI/UX, branding, and open source" detail="I enjoy seeing how design choices affect the way people use a product." />
              <InfoCard title="What I am improving" value="JavaScript and frontend depth" detail="I am getting better at structure, accessibility, and making ideas work on every screen." />
            </div>
          </div>
        </section>

        <section className="section learning-section" id="learning" data-section>
          <div className="container learning-grid">
            <div className="learning-panel">
              <span className="eyebrow">Currently Learning</span>
              <div className="learning-list">
                {['Frontend Development', 'JavaScript', 'UI/UX', 'Applied AI', 'Git & GitHub'].map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
            <div className="learning-panel learning-panel--note">
              <span className="eyebrow">Currently Working On</span>
              <p>Currently building and improving my personal projects while learning new technologies.</p>
            </div>
          </div>
        </section>

        <section className="section" id="skills" data-section>
          <div className="container">
            <SectionHeading eyebrow="Skills" title="Things I use to make and communicate ideas." description="A practical mix of development, design, editing, and communication skills I am building through coursework and personal projects." />
            <div className="skills-grid">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return <TiltCard key={skill.name} delay={index * 0.03} className="skill-card glass-card"><Icon size={20} strokeWidth={1.8} /><strong>{skill.name}</strong><p>{skill.description}</p></TiltCard>;
              })}
            </div>
          </div>
        </section>

        <section className="section" id="projects" data-section>
          <div className="container">
            <SectionHeading eyebrow="Projects" title="A few things I have been building and contributing to." description="These are practical projects and contributions that show what I am learning in code, design, and collaboration." />
            <div className="projects-grid">
              {projects.map((project, index) => (
                <TiltCard key={`${project.title}-${index}`} delay={index * 0.04} className="project-card glass-card">
                  <div className="project-preview">
                    <img
                      src={project.image}
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
                    <button type="button" className="text-button certificate-button" onClick={() => setActiveCertification(certificate)}>
                      View Certification <ArrowUpRight size={16} />
                    </button>
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
            <SectionHeading eyebrow="Education" title="Where I am learning and building my foundation." description="I am studying computer science while building practical experience through personal projects and open-source contribution." />
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
                    <h3>{item.title}</h3>
                    <p className="entry-subtitle">{item.subtitle}</p>
                    <p>
                      <a
                        href="https://kalvium.com/"
                        className="kalvium-trigger"
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label="Visit Kalvium website"
                      >
                        <span className="kalvium-accent">{item.program}</span>
                      </a>
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="social" aria-label="Social connections">
          <div className="container">
            <SectionHeading eyebrow="Social Connections" title="Find me in the places where I share and learn." description="You can follow my work, see what I am building, or send me a message directly." />
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
            <SectionHeading eyebrow="Contact" title="Have something to ask or build together?" description="Send a message and I will get back to you when I can." />
            <motion.form
              className="contact-form glass-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onSubmit={async (event) => {
                event.preventDefault();
                setContactStatus('sending');
                const form = event.currentTarget;
                const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;
                try {
                  if (endpoint) {
                    const response = await fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
                    if (!response.ok) throw new Error('Message could not be sent');
                  } else {
                    await new Promise((resolve) => window.setTimeout(resolve, 700));
                  }
                  setContactStatus('success');
                  form.reset();
                } catch {
                  setContactStatus('error');
                }
              }}
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
              <button type="submit" className="button button-primary submit-button" disabled={contactStatus === 'sending'}>
                {contactStatus === 'sending' ? 'Sending...' : 'Send Message'} <Send size={16} />
              </button>
              {contactStatus === 'success' ? <p className="form-feedback form-feedback--success" role="status">Message sent successfully!</p> : null}
              {contactStatus === 'error' ? <p className="form-feedback form-feedback--error" role="alert">Something went wrong. Please try again or email me directly.</p> : null}
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
