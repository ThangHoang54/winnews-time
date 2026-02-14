import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin } from 'lucide-react';

interface FooterProps {
  language: 'en' | 'fr';
}

const translations = {
  brandDescription: {
    en: 'Delivering curated world and cultural stories with timeless style — inspired by classic print journalism, reimagined for the digital age.',
    fr: 'Des histoires culturelles et mondiales triées sur le volet avec un style intemporel — inspirées du journalisme imprimé classique, réinventé pour l’ère numérique.',
  },
  linksTitle: { en: 'Links', fr: 'Liens' },
  home: { en: 'Home', fr: 'Accueil' },
  savedArticles: { en: 'Saved Articles', fr: 'Articles Sauvegardés' },
  myReactions: { en: 'My Reactions', fr: 'Mes Réactions' },
  aboutUs: { en: 'About Us', fr: 'À Propos' },
  legalTitle: { en: 'Legal', fr: 'Légal' },
  privacyPolicy: { en: 'Privacy Policy', fr: 'Politique de Confidentialité' },
  termsOfService: { en: 'Terms of Service', fr: "Conditions d'Utilisation" },
  followUsTitle: { en: 'Follow Us', fr: 'Suivez-Nous' },
  followText: {
    en: 'Stay connected for daily insights and curated perspectives.',
    fr: 'Restez connectés pour des perspectives et des analyses quotidiennes.',
  },
  author: {en: "Developed by Hoang Minh Thang", fr: "Réalisé par Hoang Minh Thang" },
  copyright: { en: 'All Rights Reserved.', fr: 'Tous Droits Réservés.' },
  poweredBy: { en: 'Powered by News API', fr: 'Propulsé par News API' },
};

const Footer: React.FC<FooterProps> = ({ language }) => {
  return (
    <footer className="border-t border-ink/20 dark:border-dark-ink/20 mt-16 py-12 bg-white dark:bg-[#0b0b0b]">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-sm text-ink/80 dark:text-dark-ink/80">

        {/* Brand / About Section */}
        <div className="sm:col-span-2 flex flex-col items-start text-center sm:text-left">
          <h3 className="text-2xl font-serif font-semibold text-ink dark:text-dark-ink mb-3">
            The WinNews Time
          </h3>
          <p className="text-ink/70 dark:text-dark-ink/70 leading-relaxed mb-4 max-w-md">
            {translations.brandDescription[language]}
          </p>
          <Link
            to="/about"
            className="inline-block text-accent dark:text-dark-accent hover:underline transition-all"
          >
            {translations.aboutUs[language]} →
          </Link>
        </div>

        {/* Quick Links */}
        <div className="text-center sm:text-left">
          <h4 className="font-semibold text-ink dark:text-dark-ink mb-3 uppercase tracking-wider">
            {translations.linksTitle[language]}
          </h4>
          <nav className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6">
            <Link
              to="/"
              className="hover:text-accent dark:hover:text-dark-accent transition-colors"
            >
              {translations.home[language]}
            </Link>
            <Link
              to="/privacy"
              className="hover:text-accent dark:hover:text-dark-accent transition-colors"
            >
              {translations.privacyPolicy[language]}
            </Link>
            <Link
              to="/saved"
              className="hover:text-accent dark:hover:text-dark-accent transition-colors"
            >
              {translations.savedArticles[language]}
            </Link>
            <Link
              to="/terms"
              className="hover:text-accent dark:hover:text-dark-accent transition-colors"
            >
              {translations.termsOfService[language]}
            </Link>
            <Link
              to="/reactions"
              className="hover:text-accent dark:hover:text-dark-accent transition-colors"
            >
              {translations.myReactions[language]}
            </Link>
          </nav>
        </div>

        {/* Social / Follow Section */}
        <div className="text-center sm:text-left">
          <h4 className="font-semibold text-ink dark:text-dark-ink mb-3 uppercase tracking-wider">
            {translations.followUsTitle[language]}
          </h4>
          <p className="text-ink/70 dark:text-dark-ink/70 mb-4 leading-relaxed max-w-xs mx-auto sm:mx-0">
            {translations.followText[language]}
          </p>
          <div className="flex justify-center sm:justify-start gap-4">
            {[Linkedin].map((Icon, idx) => (
              <a
                key={idx}
                href="https://www.linkedin.com/in/thanghoangm54/"
                target='_blank'
                className="flex items-center justify-center w-10 h-10 rounded-full border border-ink/20 dark:border-dark-ink/20 hover:bg-accent hover:text-white dark:hover:bg-dark-accent transition-all duration-300"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-ink/10 dark:border-dark-ink/10 mt-12 pt-6 text-sm text-ink/60 dark:text-dark-ink/60 px-6 text-center">
        <p className='mb-1'>
          {translations.author[language]}
        </p>
        <p>
          &copy; 2025 - {new Date().getFullYear()} The WinNews Time. {translations.copyright[language]}
        </p>
        <p className="mt-1">{translations.poweredBy[language]}</p>
      </div>
    </footer>
  );
};

export default Footer;