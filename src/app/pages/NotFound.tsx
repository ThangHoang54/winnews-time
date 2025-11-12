import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import type { AppContextType } from '../Layout'; 

// Translations for the component
const translations = {
  title: { en: 'Page Not Found', fr: 'Page Introuvable' },
  message: {
    en: 'Sorry, the page you are looking for does not exist.',
    fr: "Désolé, la page que vous recherchez n'existe pas.",
  },
  button: { en: 'Go Back Home', fr: "Retour à l'accueil" },
};

const NotFound: React.FC = () => {
  // Get language from the Layout's context
  const { language } = useOutletContext<AppContextType>();

  return (
    <div className="text-center py-20">
      <h1 className="font-serif font-bold text-7xl text-accent dark:text-dark-accent">
        404
      </h1>
      <h2 className="text-3xl font-semibold mt-4 mb-2 text-ink dark:text-dark-ink">
        {translations.title[language]}
      </h2>
      <p className="text-lg text-ink/70 dark:text-dark-ink/70 mb-6">
        {translations.message[language]}
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-accent dark:bg-dark-accent text-white dark:text-ink font-semibold rounded-lg shadow-md hover:bg-accent/90 dark:hover:bg-dark-accent/90 transition-colors"
      >
        {translations.button[language]}
      </Link>
    </div>
  );
};

export default NotFound;