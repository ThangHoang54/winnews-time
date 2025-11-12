import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import type { AppContextType } from '../Layout';
import { Newspaper, Sparkles, ShieldCheck } from 'lucide-react';

// --- Translations ---

const translations = {
  heroTitle: {
    en: 'A Modern Take on Classic News.',
    fr: 'Une Vision Moderne des Nouvelles Classiques.',
  },
  heroSubtitle: {
    en: 'This project is a love letter to classic print journalism, reimagined for the digital age. Clean, fast, and focused on the content.',
    fr: "Ce projet est une lettre d'amour au journalisme imprimé classique, réimaginé pour l'ère numérique. Propre, rapide et centré sur le contenu.",
  },
  featuresTitle: {
    en: 'Our Philosophy',
    fr: 'Notre Philosophie',
  },
  feature1Title: {
    en: 'Content First',
    fr: 'Le Contenu Avant Tout',
  },
  feature1Desc: {
    en: 'A quiet, clean, and readable interface that puts the news front and center, free from clutter and distractions.',
    fr: 'Une interface sobre, propre et lisible qui met les nouvelles au premier plan, sans encombrement ni distraction.',
  },
  feature2Title: {
    en: 'Modern & Fast',
    fr: 'Moderne & Rapide',
  },
  feature2Desc: {
    en: 'Built with a modern tech stack (React, TypeScript, Tailwind) for a snappy, responsive, and app-like experience.',
    fr: "Construit avec une stack technique moderne (React, TypeScript, Tailwind) pour une expérience réactive, rapide et digne d'une application.",
  },
  feature3Title: {
    en: 'You Own Your Data',
    fr: 'Vous Possédez Vos Données',
  },
  feature3Desc: {
    en: 'All your preferences, saved articles, and reactions are stored directly in your browser. No accounts, no tracking.',
    fr: 'Toutes vos préférences, articles sauvegardés et réactions sont stockés directement dans votre navigateur. Pas de comptes, pas de suivi.',
  },
  devTitle: {
    en: 'From the Developer',
    fr: 'Du Développeur',
  },
  devBody: {
    en: "Hello! I built this project to practice my skills in front-end development and to create a news app that I would actually want to use. It's a demonstration of how to blend a classic aesthetic with modern web technologies. Thanks for visiting!",
    fr: "Bonjour ! J'ai construit ce projet pour pratiquer mes compétences en développement front-end et pour créer une application de nouvelles que j'aimerais vraiment utiliser. C'est une démonstration de la façon de mélanger une esthétique classique avec les technologies web modernes. Merci de votre visite !",
  },
  techTitle: {
    en: 'Technology Stack',
    fr: 'Stack Technique',
  },
  techBody: {
    en: 'This site is built and powered by the following technologies:',
    fr: 'Ce site est construit et alimenté par les technologies suivantes :',
  },
  techItems: [
    'React',
    'TypeScript',
    'React Router v6',
    'Tailwind CSS',
    'Lucide Icons',
    'Vite',
    'NewsAPI.org',
  ],
  ctaTitle: {
    en: "Ready to start reading?",
    fr: "Prêt à commencer la lecture ?",
  },
  ctaButton: {
    en: 'Back to Home',
    fr: "Retour à l'accueil",
  },
};

// --- Tech Pill Component ---

const TechPill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-block bg-accent/10 dark:bg-dark-accent/10 text-accent dark:text-dark-accent font-medium px-3 py-1 rounded-full text-sm">
    {children}
  </span>
);

// --- About Page Component ---

const About: React.FC = () => {
  const { language } = useOutletContext<AppContextType>();

  const features = [
    {
      title: translations.feature1Title[language],
      desc: translations.feature1Desc[language],
      Icon: Newspaper,
    },
    {
      title: translations.feature2Title[language],
      desc: translations.feature2Desc[language],
      Icon: Sparkles,
    },
    {
      title: translations.feature3Title[language],
      desc: translations.feature3Desc[language],
      Icon: ShieldCheck,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-16">
      {/* 1. Hero Section */}
      <section className="text-center">
        <h1 className="font-serif font-bold text-4xl md:text-5xl text-ink dark:text-dark-ink mb-4">
          {translations.heroTitle[language]}
        </h1>
        <p className="text-lg md:text-xl text-ink/70 dark:text-dark-ink/70">
          {translations.heroSubtitle[language]}
        </p>
      </section>

      {/* 2. Features ("Our Philosophy") */}
      <section>
        <h2 className="font-serif font-bold text-3xl text-center text-ink dark:text-dark-ink mb-10">
          {translations.featuresTitle[language]}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map(({ title, desc, Icon }) => (
            <div
              key={title}
              className="bg-stone-100 dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-ink/10 dark:border-dark-ink/10 flex flex-col items-center text-center"
            >
              <Icon className="w-10 h-10 text-accent dark:text-dark-accent mb-4" />
              <h3 className="font-semibold text-lg text-ink dark:text-dark-ink mb-2">
                {title}
              </h3>
              <p className="text-sm text-ink/80 dark:text-dark-ink/80">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. From the Developer */}
      <section className="bg-stone-100 dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-ink/10 dark:border-dark-ink/10">
        <h2 className="font-serif font-bold text-3xl text-ink dark:text-dark-ink mb-4">
          {translations.devTitle[language]}
        </h2>
        <p className="text-base text-ink/80 dark:text-dark-ink/80 leading-relaxed">
          {translations.devBody[language]}
        </p>
      </section>

      {/* 4. Technology Stack */}
      <section>
        <h2 className="font-serif font-bold text-3xl text-center text-ink dark:text-dark-ink mb-4">
          {translations.techTitle[language]}
        </h2>
        <p className="text-center text-ink/80 dark:text-dark-ink/80 mb-6">
          {translations.techBody[language]}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {translations.techItems.map((tech) => (
            <TechPill key={tech}>{tech}</TechPill>
          ))}
        </div>
      </section>

      {/* 5. CTA */}
      <section className="text-center py-10 border-t border-ink/10 dark:border-dark-ink/10">
        <h2 className="font-serif font-bold text-3xl text-ink dark:text-dark-ink mb-4">
          {translations.ctaTitle[language]}
        </h2>
        <Link
          to="/"
          className="px-6 py-3 bg-accent dark:bg-dark-accent text-white dark:text-ink font-semibold rounded-lg shadow-md hover:bg-accent/90 dark:hover:bg-dark-accent/90 transition-colors"
        >
          {translations.ctaButton[language]}
        </Link>
      </section>
    </div>
  );
};

export default About;