/* ═══════════════════════════════════════════════════════════════════════
   PORTFOLIO — MAIN.JS
   Author: Sadee Shadman
   ═══════════════════════════════════════════════════════════════════════ */

'use strict';

// ─── Typed Text Animation ─────────────────────────────────────────────────
const typedPhrases = [
  'Software Developer',
  'Full Stack Engineer',
  'Problem Solver',
  'Open Source Enthusiast',
];

(function initTyped() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  let phraseIdx = 0;
  let charIdx   = 0;
  let deleting  = false;
  const TYPING_SPEED   = 90;
  const DELETING_SPEED = 50;
  const PAUSE_AFTER    = 1800;
  const PAUSE_BEFORE   = 300;

  function type() {
    const phrase = typedPhrases[phraseIdx];

    if (!deleting) {
      el.textContent = phrase.slice(0, ++charIdx);
      if (charIdx === phrase.length) {
        deleting = true;
        setTimeout(type, PAUSE_AFTER);
        return;
      }
    } else {
      el.textContent = phrase.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting  = false;
        phraseIdx = (phraseIdx + 1) % typedPhrases.length;
        setTimeout(type, PAUSE_BEFORE);
        return;
      }
    }

    setTimeout(type, deleting ? DELETING_SPEED : TYPING_SPEED);
  }

  setTimeout(type, 600);
}());

// ─── Navbar: shrink on scroll + active link highlighting ─────────────────
(function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    // Shrink navbar
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Highlight active section link
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load
}());

// ─── Mobile Hamburger Menu ────────────────────────────────────────────────
(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  function closeMenu() {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close when a nav link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      closeMenu();
    }
  });
}());

// ─── Dark / Light Mode Toggle ─────────────────────────────────────────────
(function initTheme() {
  const btn  = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  const html = document.documentElement;

  const STORAGE_KEY = 'portfolio-theme';

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    localStorage.setItem(STORAGE_KEY, theme);
  }

  // Restore saved preference, then respect OS preference
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    applyTheme(saved);
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    applyTheme('light');
  }

  btn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });
}());

// ─── Language Toggle (EN/FR) ─────────────────────────────────────────────
(function initLanguage() {
  const html = document.documentElement;
  const btn = document.getElementById('lang-toggle');
  if (!btn) return;

  const STORAGE_KEY = 'portfolio-language';

  const typedPhrasesByLang = {
    en: ['Software Developer', 'Full Stack Engineer', 'Problem Solver', 'Open Source Enthusiast'],
    fr: ['Développeur logiciel', 'Ingénieur full stack', 'Résolution de problèmes', 'Passionné open source'],
  };

  const t = {
    en: {
      navAbout: 'About',
      navSkills: 'Skills',
      navProjects: 'Projects',
      navExperience: 'Experience',
      navEducation: 'Education',
      navContact: 'Contact',
      navResume: 'Resume',
      heroGreeting: "Hi, I'm",
      heroDescription: 'I build clean, performant, and accessible digital experiences. Passionate about turning complex problems into elegant solutions.',
      heroCtaWork: 'View My Work',
      heroCtaContact: 'Get In Touch',
      aboutTitle: 'About <span class="accent">Me</span>',
      aboutP1: "Hello! I'm <strong>Sadee Shadman</strong>, a software developer based in Montreal. I love building things for the web - from slick front-end interfaces to robust back-end systems.",
      aboutP2: "I'm currently a New Graduate from <strong>Concordia University</strong>, where I completed Bachelor of Engineering in Software Engineering. When I'm not coding, you'll find me working on my car, learning French, or exploring the latest in tech.",
      aboutP3: "I'm actively looking for opportunities where I can contribute, grow, and continue learning alongside talented teams. I am willing to relocate and open to remote work.",
      aboutFactEdu: '<i class="fas fa-graduation-cap accent"></i> BEng in Software Engineering, Concordia University',
      aboutFactOpen: '<i class="fas fa-briefcase accent"></i> Open to opportunities',
      aboutResume: 'Download Resume',
      skillsTitle: 'Technical <span class="accent">Skills</span>',
      skillsSubtitle: "Technologies I've been working with recently",
      projectsTitle: 'Featured <span class="accent">Projects</span>',
      projectsSubtitle: "Things I've worked on that I'm proud of",
      projectsCta: 'View All on GitHub',
      experienceTitle: 'Work <span class="accent">Experience</span>',
      educationTitle: 'Education',
      contactTitle: 'Get In <span class="accent">Touch</span>',
      contactSubtitle: "I'm currently open to new opportunities. Whether you have a question, a project idea, or just want to say hi - my inbox is always open!",
      contactResume: 'Download PDF',
      labelName: 'Name',
      labelEmail: 'Email',
      labelSubject: 'Subject',
      labelMessage: 'Message',
      placeholderName: 'Your Name',
      placeholderEmail: 'your@email.com',
      placeholderSubject: "What's this about?",
      placeholderMessage: 'Your message...',
      submitText: 'Send Message',
      formNote: 'Alternatively, email me directly at',
      footerCredit: 'Designed &amp; Built by <strong>Sadee Shadman</strong>',
      footerRights: '© <span id="year"></span> Sadee Shadman. All rights reserved.',
      langButton: 'FR',
      langAttr: 'en',
    },
    fr: {
      navAbout: 'À propos',
      navSkills: 'Compétences',
      navProjects: 'Projets',
      navExperience: 'Expérience',
      navEducation: 'Formation',
      navContact: 'Contact',
      navResume: 'CV',
      heroGreeting: 'Bonjour, je suis',
      heroDescription: "Je conçois des expériences numériques propres, performantes et accessibles. Je suis passionné par la transformation de problèmes complexes en solutions élégantes.",
      heroCtaWork: 'Voir mes projets',
      heroCtaContact: 'Me contacter',
      aboutTitle: 'À propos de <span class="accent">moi</span>',
      aboutP1: "Bonjour! Je suis <strong>Sadee Shadman</strong>, développeur logiciel basé à Montréal. J aime créer des produits web, des interfaces front-end soignées aux systèmes back-end robustes.",
      aboutP2: "Je suis récemment diplômé de <strong>Concordia University</strong>, où j ai terminé un baccalauréat en génie logiciel. En dehors du code, vous me trouverez en train de travailler sur ma voiture, d apprendre le français ou de suivre les dernières nouveautés tech.",
      aboutP3: "Je recherche activement des opportunités où je peux contribuer, évoluer et apprendre aux côtés d équipes talentueuses. Je suis ouvert à la relocalisation et au travail à distance.",
      aboutFactEdu: '<i class="fas fa-graduation-cap accent"></i> BEng en génie logiciel, Université Concordia',
      aboutFactOpen: '<i class="fas fa-briefcase accent"></i> Ouvert aux opportunités',
      aboutResume: 'Télécharger le CV',
      skillsTitle: 'Compétences <span class="accent">techniques</span>',
      skillsSubtitle: 'Technologies avec lesquelles je travaille récemment',
      projectsTitle: 'Projets <span class="accent">mis en avant</span>',
      projectsSubtitle: 'Travaux auxquels j ai contribué et dont je suis fier',
      projectsCta: 'Voir tout sur GitHub',
      experienceTitle: 'Expérience <span class="accent">professionnelle</span>',
      educationTitle: 'Formation',
      contactTitle: 'Entrer en <span class="accent">contact</span>',
      contactSubtitle: "Je suis actuellement ouvert à de nouvelles opportunités. Que vous ayez une question, une idée de projet ou simplement envie de dire bonjour, ma boîte mail reste ouverte!",
      contactResume: 'Télécharger le PDF',
      labelName: 'Nom',
      labelEmail: 'Email',
      labelSubject: 'Sujet',
      labelMessage: 'Message',
      placeholderName: 'Votre nom',
      placeholderEmail: 'votre@email.com',
      placeholderSubject: 'De quoi s agit-il?',
      placeholderMessage: 'Votre message...',
      submitText: 'Envoyer le message',
      formNote: 'Vous pouvez aussi m écrire directement à',
      footerCredit: 'Conçu et développé par <strong>Sadee Shadman</strong>',
      footerRights: '© <span id="year"></span> Sadee Shadman. Tous droits réservés.',
      langButton: 'EN',
      langAttr: 'fr',
    },
  };

  function setText(id, value, htmlContent = false) {
    const el = document.getElementById(id);
    if (!el) return;
    if (htmlContent) {
      el.innerHTML = value;
    } else {
      el.textContent = value;
    }
  }

  function applyLanguage(lang) {
    const dict = t[lang] || t.en;
    html.setAttribute('lang', dict.langAttr);
    btn.textContent = dict.langButton;
    btn.setAttribute('aria-label', lang === 'fr' ? 'Passer en anglais' : 'Switch to French');

    setText('nav-about', dict.navAbout);
    setText('nav-skills', dict.navSkills);
    setText('nav-projects', dict.navProjects);
    setText('nav-experience', dict.navExperience);
    setText('nav-education', dict.navEducation);
    setText('nav-contact', dict.navContact);
    setText('nav-resume', dict.navResume);
    setText('hero-greeting', dict.heroGreeting);
    setText('hero-description', dict.heroDescription);
    setText('hero-cta-work', dict.heroCtaWork);
    setText('hero-cta-contact', dict.heroCtaContact);
    setText('about-title', dict.aboutTitle, true);
    setText('about-p1', dict.aboutP1, true);
    setText('about-p2', dict.aboutP2, true);
    setText('about-p3', dict.aboutP3, true);
    setText('about-fact-edu', dict.aboutFactEdu, true);
    setText('about-fact-open', dict.aboutFactOpen, true);
    setText('about-resume', dict.aboutResume);
    setText('skills-title', dict.skillsTitle, true);
    setText('skills-subtitle', dict.skillsSubtitle);
    setText('projects-title', dict.projectsTitle, true);
    setText('projects-subtitle', dict.projectsSubtitle);
    setText('projects-cta', dict.projectsCta);
    setText('experience-title', dict.experienceTitle, true);
    setText('education-title', dict.educationTitle);
    setText('contact-title', dict.contactTitle, true);
    setText('contact-subtitle', dict.contactSubtitle);
    setText('contact-resume', dict.contactResume);
    setText('label-name', dict.labelName);
    setText('label-email', dict.labelEmail);
    setText('label-subject', dict.labelSubject);
    setText('label-message', dict.labelMessage);
    setText('submit-text', dict.submitText);
    setText('form-note', `${dict.formNote} <a href="mailto:shadmansadee@gmail.com">shadmansadee@gmail.com</a>`, true);
    setText('footer-credit', dict.footerCredit, true);
    setText('footer-rights', dict.footerRights, true);

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    if (nameInput) nameInput.placeholder = dict.placeholderName;
    if (emailInput) emailInput.placeholder = dict.placeholderEmail;
    if (subjectInput) subjectInput.placeholder = dict.placeholderSubject;
    if (messageInput) messageInput.placeholder = dict.placeholderMessage;

    const skillHeadings = document.querySelectorAll('.skill-card h3');
    if (skillHeadings.length >= 4) {
      skillHeadings[0].textContent = lang === 'fr' ? 'Langages' : 'Languages';
      skillHeadings[1].textContent = 'Frontend';
      skillHeadings[2].textContent = lang === 'fr' ? 'Back-end et données' : 'Backend & Data';
      skillHeadings[3].textContent = lang === 'fr' ? 'Outils et DevOps' : 'Tools & DevOps';
    }

    const projectTitles = document.querySelectorAll('.project-title');
    const projectDescriptions = document.querySelectorAll('.project-description');
    if (projectTitles.length >= 4 && projectDescriptions.length >= 4) {
      projectTitles[0].textContent = lang === 'fr' ? 'Projet de fin d études TrackMyDegree' : 'TrackMyDegree Capstone Project';
      projectTitles[1].textContent = 'CUMapNav';
      projectTitles[2].textContent = lang === 'fr' ? 'Simulateur de combat aérien' : 'Flight Combat Simulator';
      projectTitles[3].textContent = 'Wellora';

      projectDescriptions[0].textContent = lang === 'fr'
        ? 'Dans un contexte d équipe, j étais responsable du développement full-stack du tableau de bord administrateur sécurisé, de la génération automatique de séquences de stages à partir de modèles JSON propres à chaque programme, et de l autofill en un clic des PDF Acroform pour réduire les erreurs étudiantes et gagner du temps.'
        : 'In a team setting, I was responsible for full-stack development of the secure admin dashboard, building the automated co-op sequence generator from program-specific JSON templates, and implementing one-click PDF Acroform autofill to reduce student errors and save time.';
      projectDescriptions[1].textContent = lang === 'fr'
        ? 'Au sein de l équipe projet, j étais responsable des diagrammes de conception, des décisions UI/UX, de l identification et de l application des design patterns, ainsi que des tests d utilisabilité, de la documentation et de la présentation finale de l application.'
        : 'As part of the project team, I was responsible for design diagrams, UI/UX design decisions, identifying and applying design patterns, and leading usability testing, documentation, and final app presentation.';
      projectDescriptions[2].textContent = lang === 'fr'
        ? 'Dans un projet collaboratif, j étais responsable de l implémentation du système de combat à projectiles et de contributions à un simulateur C++17/OpenGL avec scène urbaine 3D, contrôles d avion basés sur la physique, et éclairage/ombrage en temps réel.'
        : 'Within a collaborative team project, I was responsible for implementing the projectile-based combat system and contributing to a C++17/OpenGL simulator with a 3D city scene, physics-driven aircraft controls, and real-time lighting and shadow mapping.';
      projectDescriptions[3].textContent = lang === 'fr'
        ? 'Projet solo: j ai rédigé et publié une étude de cas Medium sur le processus UI/UX d une application compagnon santé, couvrant les insights d enquête utilisateur, l analyse des besoins, la création de personas, la cartographie des parcours, le wireframing, le prototypage sur Figma, et un plan de tests d utilisabilité.'
        : 'Solo project: I authored and published a Medium case study on a health companion app UI/UX process, covering user survey insights, requirements analysis, persona design, user journey mapping, wireframing, prototype design in Figma, and a usability testing plan.';
    }

    const experienceRoles = document.querySelectorAll('#experience .timeline-role');
    if (experienceRoles.length >= 2) {
      experienceRoles[0].textContent = lang === 'fr' ? 'Développeur web' : 'Web Developer';
      experienceRoles[1].textContent = lang === 'fr' ? 'Tuteur' : 'Tutor';
    }

    const experienceBullets = document.querySelectorAll('#experience .timeline-details li');
    if (experienceBullets.length >= 5) {
      experienceBullets[0].textContent = lang === 'fr'
        ? 'Développement d un site web en production pour Constein Group, une startup d inspection résidentielle et de gestion immobilière basée à Ottawa.'
        : 'Developed a production website for Constein Group, a property management and home inspection startup based in Ottawa.';
      experienceBullets[1].textContent = lang === 'fr'
        ? 'Livraison d un produit agile présentant les services, l authentification, la communication client automatisée, et un flux automatisé de rapports d inspection résidentielle en Ontario.'
        : 'Delivered an agile product showcasing services, authentication, automated client communication, and an automated Ontario home inspection reporting workflow.';
      experienceBullets[2].textContent = lang === 'fr'
        ? 'Mise en place de pratiques qualité et CI avec Prettier, ESLint, vérifications TypeScript, couverture Jest, GitHub Actions, et automatisation end-to-end avec Puppeteer.'
        : 'Implemented quality and CI practices with Prettier, ESLint, TypeScript checks, Jest coverage, GitHub Actions, and end-to-end automation support with Puppeteer.';
      experienceBullets[3].textContent = lang === 'fr'
        ? 'Tutorat d élèves O-Level et A-Level en mathématiques, physique et chimie.'
        : 'Tutored O and A Level students in Mathematics, Physics, and Chemistry.';
      experienceBullets[4].textContent = lang === 'fr'
        ? 'Préparation des élèves selon les programmes britanniques Cambridge et Pearson Edexcel avec des plans de cours structurés et un coaching orienté examens.'
        : 'Prepared students under British Cambridge and Pearson Edexcel curriculums with structured lesson plans and exam-focused coaching.';
    }

    const educationRole = document.querySelector('#education .timeline-role');
    if (educationRole) {
      educationRole.textContent = lang === 'fr' ? 'BEng en génie logiciel' : 'BEng in Software Engineering';
    }

    const educationBullets = document.querySelectorAll('#education .timeline-details li');
    if (educationBullets.length >= 3) {
      educationBullets[0].innerHTML = lang === 'fr'
        ? '<strong>Cours principaux:</strong> Programmation orientée objet I et II, Processus et pratiques logicielles, Exigences et déploiement logiciel, Architecture et conception logicielle, Sécurité des systèmes d information, Tests logiciels, vérification et assurance qualité, Systèmes de données, Systèmes d exploitation, Structures de données et algorithmes, Gestion, mesure et contrôle qualité.'
        : '<strong>Core Courses:</strong> Object Oriented Programming I and II, Software Processes and Practices, Software Requirements and Deployment, Software Architecture and Design, Information Systems Security, Software Testing Verification and Quality Assurance, Data Systems, Operating Systems, Data Structures and Algorithms, Management Measurement and Quality Control.';
      educationBullets[1].innerHTML = lang === 'fr'
        ? '<strong>Cours optionnels:</strong> Graphisme informatique, Programmation avancée en C++, Introduction au développement de jeux vidéo.'
        : '<strong>Electives:</strong> Computer Graphics, Advanced Programming with C++, Introduction to Game Development.';
      educationBullets[2].innerHTML = lang === 'fr'
        ? '<strong>Bénévolat:</strong> ConUHacks X - le plus grand hackathon du Québec, accueillant plus de 1000 participants et 30 sponsors.'
        : '<strong>Volunteering:</strong> ConUHacks X - the largest hackathon in Quebec, welcoming over 1000 participants and 30 sponsors.';
    }

    const contactCardLabels = document.querySelectorAll('.contact-card strong');
    if (contactCardLabels.length >= 4) {
      contactCardLabels[0].textContent = 'Email';
      contactCardLabels[1].textContent = 'LinkedIn';
      contactCardLabels[2].textContent = 'GitHub';
      contactCardLabels[3].textContent = lang === 'fr' ? 'CV' : 'Resume';
    }

    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    if (Array.isArray(typedPhrases)) {
      typedPhrases.length = 0;
      typedPhrases.push(...typedPhrasesByLang[lang]);
    }

    localStorage.setItem(STORAGE_KEY, lang);
  }

  const savedLang = localStorage.getItem(STORAGE_KEY);
  const initialLang = savedLang === 'fr' ? 'fr' : 'en';
  applyLanguage(initialLang);

  btn.addEventListener('click', () => {
    const next = html.getAttribute('lang') === 'fr' ? 'en' : 'fr';
    applyLanguage(next);
  });
}());

// ─── Scroll-Reveal (Intersection Observer) ───────────────────────────────
(function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach(el => observer.observe(el));
}());

// ─── Staggered Reveal Delays for Card Grids ──────────────────────────────
(function initStagger() {
  const grids = ['.skills-grid', '.projects-grid'];
  grids.forEach(selector => {
    const grid = document.querySelector(selector);
    if (!grid) return;
    const cards = grid.querySelectorAll('.reveal');
    cards.forEach((card, i) => {
      card.style.transitionDelay = `${i * 0.1}s`;
    });
  });
}());

// ─── Contact Form: client-side validation + submission feedback ──────────
(function initContactForm() {
  const form      = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  if (!form || !submitBtn) return;

  function setFieldError(field, hasError) {
    if (hasError) {
      field.classList.add('error');
    } else {
      field.classList.remove('error');
    }
  }

  function validateForm() {
    let valid = true;
    const fields = form.querySelectorAll('[required]');
    fields.forEach(field => {
      const empty   = field.value.trim() === '';
      const badMail = field.type === 'email' && !field.value.includes('@');
      if (empty || badMail) {
        setFieldError(field, true);
        valid = false;
      } else {
        setFieldError(field, false);
      }
    });
    return valid;
  }

  // Clear error styling on input
  form.querySelectorAll('[required]').forEach(field => {
    field.addEventListener('input', () => setFieldError(field, false));
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!validateForm()) return;

    const isFrench = document.documentElement.getAttribute('lang') === 'fr';
    const sendingText = isFrench ? 'Envoi...' : 'Sending...';
    const successText = isFrench ? 'Message envoye!' : 'Message Sent!';
    const failText = isFrench ? 'Echec - essayez par email' : 'Failed - try email instead';
    const defaultText = isFrench ? 'Envoyer le message' : 'Send Message';

    submitBtn.disabled  = true;
    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${sendingText}`;

    try {
      const res = await fetch(form.action, {
        method:  'POST',
        body:    new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        submitBtn.innerHTML = `<i class="fas fa-check"></i> ${successText}`;
        submitBtn.style.background = '#22c55e';
        form.reset();
        setTimeout(() => {
          submitBtn.disabled  = false;
          submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i> ${defaultText}`;
          submitBtn.style.background = '';
        }, 4000);
      } else {
        throw new Error('Server error');
      }
    } catch {
      submitBtn.innerHTML = `<i class="fas fa-times"></i> ${failText}`;
      submitBtn.style.background = '#ef4444';
      submitBtn.disabled     = false;
      setTimeout(() => {
        submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i> ${defaultText}`;
        submitBtn.style.background = '';
      }, 4000);
    }
  });
}());

// ─── Smooth scroll polyfill for older Safari ─────────────────────────────
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}());

// ─── Footer: auto-update copyright year ──────────────────────────────────
(function initYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}());
